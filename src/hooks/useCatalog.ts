import { useEffect, useSyncExternalStore } from "react";
import { perfumes as examples } from "../data/perfumes.ts";
import type { Perfume } from "../data/perfumes.ts";
import {
  CatalogConfigurationError,
  fetchCatalogPerfumes,
} from "../lib/catalog.ts";

export type CatalogMode = "loading" | "demo" | "live" | "offline";
export type CatalogSource =
  "pending" | "database" | "empty" | "unconfigured" | "cache" | "unavailable";
export interface CatalogState {
  perfumes: Perfume[];
  mode: CatalogMode;
  source: CatalogSource;
  loading: boolean;
  isDemo: boolean;
  error: string | null;
  updatedAt: number | null;
}

const FRESHNESS_MS = 5 * 60 * 1000;
const RETRY_DELAY_MS = 30 * 1000;
const initialState: CatalogState = {
  perfumes: examples,
  mode: "loading",
  source: "pending",
  loading: true,
  isDemo: true,
  error: null,
  updatedAt: null,
};

/** Shared memory cache: navigation and concurrent consumers use one request. */
export function createCatalogStore(
  fetcher: (signal?: AbortSignal) => Promise<Perfume[]> = fetchCatalogPerfumes,
  now: () => number = Date.now,
) {
  let state: CatalogState = initialState;
  let freshUntil = 0;
  let request: Promise<void> | null = null;
  let controller: AbortController | null = null;
  let lastLive: Perfume[] | null = null;
  const listeners = new Set<() => void>();
  const publish = (next: CatalogState) => {
    state = next;
    listeners.forEach((notify) => notify());
  };
  const load = (force = false): Promise<void> => {
    if (request) return request;
    if (!force && now() < freshUntil) return Promise.resolve();
    controller = new AbortController();
    const currentController = controller;
    publish({ ...state, loading: true, error: null });
    request = Promise.resolve()
      .then(() => fetcher(currentController.signal))
      .then((records) => {
        if (currentController.signal.aborted) return;
        const hasRecords = records.length > 0;
        lastLive = hasRecords ? records : null;
        freshUntil = now() + FRESHNESS_MS;
        publish({
          perfumes: hasRecords ? records : examples,
          mode: hasRecords ? "live" : "demo",
          source: hasRecords ? "database" : "empty",
          loading: false,
          isDemo: !hasRecords,
          error: null,
          updatedAt: now(),
        });
      })
      .catch((error: unknown) => {
        if (currentController.signal.aborted) return;
        const notConfigured = error instanceof CatalogConfigurationError;
        freshUntil = now() + (notConfigured ? FRESHNESS_MS : RETRY_DELAY_MS);
        publish({
          ...state,
          perfumes: lastLive ?? examples,
          mode: notConfigured ? "demo" : "offline",
          source: notConfigured
            ? "unconfigured"
            : lastLive
              ? "cache"
              : "unavailable",
          loading: false,
          isDemo: !lastLive,
          error: notConfigured
            ? null
            : "No pudimos actualizar el catálogo. Intenta de nuevo.",
        });
      })
      .finally(() => {
        request = null;
        controller = null;
      });
    return request;
  };

  return {
    getSnapshot: () => state,
    getServerSnapshot: () => initialState,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    load,
    retry: () => {
      void load(true);
    },
    // Used only for disposal; route unmounts keep the shared request alive.
    dispose: () => {
      controller?.abort();
      listeners.clear();
    },
  };
}

const catalogStore = createCatalogStore();

export default function useCatalog() {
  const state = useSyncExternalStore(
    catalogStore.subscribe,
    catalogStore.getSnapshot,
    catalogStore.getServerSnapshot,
  );
  useEffect(() => {
    void catalogStore.load();
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void catalogStore.load();
    };
    const refreshWhenOnline = () => {
      catalogStore.retry();
    };
    document.addEventListener("visibilitychange", refreshWhenVisible);
    window.addEventListener("online", refreshWhenOnline);
    return () => {
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.removeEventListener("online", refreshWhenOnline);
    };
  }, []);
  return { ...state, retry: catalogStore.retry };
}
