import fs from "node:fs/promises";

const overrides = new Map([
  [16, "https://www.intenseoud.com/cdn/shop/files/kwycev0dvpgr8rxyz9ex.webp?v=1775798942"],
  [25, "https://aromatica.cr/cdn/shop/files/Blue-Seduction-Summer-Essence-EDT-para-hombre-100-ml-Aromatica-CR-188825454.webp?v=1729094548&width=1200"],
  [68, "https://armaf.com/cdn/shop/files/ArabianSky.jpg?v=1739111241&width=1600"],
  [164, "https://static.thcdn.com/productimg/original/17694634-1015338373905848.jpg"],
  [581, "https://static.thcdn.com/productimg/original/13508642-7405323124799825.jpg"],
  [732, "https://grossiste-elite.com/cdn/shop/files/temptation3fond.png?v=1752158593"],
  [733, "https://f.nooncdn.com/p/pzsku/Z5B92B6606972B75DD45CZ/45/_/1739965586/d85eb22c-b082-4a92-9ab8-b51a96ebb7e0.jpg"],
  [734, "https://cdn.shopify.com/s/files/1/0259/7733/products/xerjoff-erba-pura-100ml_1024x1024.png?v=1645409956"],
  [738, "https://bogart-april-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/583ee03651b9a9d1750a5fa69072bda5214d852b_d1726632-37aa-4be4-be8e-front.jpeg"],
  [740, "https://adaaperfumes.com/cdn/shop/files/IMG_0873_8895b42f-a941-4ca3-9222-879a2e3f18dc.png?v=1754665300&width=1445"],
  [742, "https://media.douglas.si/media/image/01/d7/eb/YSL683401_1280x1280.jpg"],
]);

const catalogPath = new URL("../catalog/august-products.json", import.meta.url);
const manifestPath = new URL("../catalog/image-manifest.json", import.meta.url);
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

for (const product of catalog.records) {
  if (overrides.has(product.origen_ref)) {
    product.imagen_url = `/products/cutouts/ref-${String(product.origen_ref).padStart(4, "0")}.png`;
  }
}

for (const record of manifest.records) {
  const sourceUrl = overrides.get(record.ref);
  if (!sourceUrl) continue;
  record.source_url = sourceUrl;
  record.source_kind = "remote";
  record.fidelity_status = "verified_exact";
  record.treatment = "background_removed_pedestal_ready";
  record.final_url = `/products/cutouts/ref-${String(record.ref).padStart(4, "0")}.png`;
  record.review_status = "approved";
  record.notes = "Identidad visual verificada contra una fuente comercial u oficial y recorte normalizado para el pedestal Essence Luxe.";
}

await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ updated: overrides.size }));
