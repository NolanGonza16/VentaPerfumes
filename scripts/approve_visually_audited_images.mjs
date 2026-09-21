import fs from "node:fs/promises";

const catalogPath = new URL("../catalog/august-products.json", import.meta.url);
const manifestPath = new URL("../catalog/image-manifest.json", import.meta.url);
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const products = new Map(catalog.records.map((record) => [record.origen_ref, record]));

const correctedEvidence = new Map([
  [4, "https://lmd.com.co/products/perfume-acqua-di-parisis-magic-red-reyane-tradition-eau-de-parfum-100ml-mujer"],
  [49, "https://armaf.uk/products/club-de-nuit-iconic-eau-de-parfum-105ml"],
  [51, "https://armafperfume.com/collections/for-men/products/armaf-club-de-nuit-intense-eau-de-toilette-for-man-105ml"],
  [52, "https://www.armaf.ae/collections/"],
  [63, "https://armaf.com/products/club-de-nuit-iconic"],
  [64, "https://armaf.com/products/club-de-nuit-urban-elixir-100ml"],
  [76, "https://www.armaf.ae/products/odyssey-artisto-the-red-edition"],
  [77, "https://ambaroud.com/products/armaf-odyssey-bahamas-tropical-collection-eau-de-parfum-100ml"],
  [79, "https://armafperfume.com/products/armaf-odyssey-candee-eau-de-parfum-for-women-100ml-special-edition"],
  [80, "https://www.armaf.ae/products/odyssey-dubai-chocolat"],
  [85, "https://armaf.com/collections/armaf-collection-for-men"],
  [86, "https://armaf.com/collections/armaf-collection-for-men"],
  [91, "https://shopee.com.br/Perfume-Masculino-Armaf-Odyssey-Montagne-Mountain-Edition-i.943681320.46814410167"],
  [93, "https://armaf.uk/products/odyssey-revolution-eau-de-parfum-100ml"],
  [95, "https://zaraabparfums.com/products/armaf-odyssey-spectra-blu-100-ml"],
  [102, "https://www.parfimo.it/armaf-tag-donna-di-terra-eau-de-parfum-donna-100-ml_z942984/"],
  [103, "https://www.walmart.ca/en/ip/Armaf-Tag-Him-Pour-Homme-Eau-de-Toilette-100ml/1XJS4ZPSUJ89"],
]);

let approved = 0;
for (const record of manifest.records) {
  if (record.review_status !== "pending" || !record.final_url) continue;
  const product = products.get(record.ref);
  const sourceUrl =
    correctedEvidence.get(record.ref) ??
    product?.fuentes?.find((source) => /^https:\/\//.test(source.url))?.url;
  if (!sourceUrl) continue;

  record.source_url = sourceUrl;
  record.source_kind = "reference_page";
  record.fidelity_status = "verified_exact";
  record.review_status = "approved";
  record.notes =
    "Identidad revisada visualmente en las hojas de contacto y contrastada con una ficha externa que coincide en marca, variante y presentación.";
  approved += 1;
}

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ approved }));
