import fs from "node:fs/promises";

const overrides = new Map([
  [12, "https://media.falabella.com/falabellaPE/16732418_001/w%3D1500%2Ch%3D1500%2Cfit%3Dcover"],
  [16, "https://www.intenseoud.com/cdn/shop/files/kwycev0dvpgr8rxyz9ex.webp?v=1775798942"],
  [25, "https://aromatica.cr/cdn/shop/files/Blue-Seduction-Summer-Essence-EDT-para-hombre-100-ml-Aromatica-CR-188825454.webp?v=1729094548&width=1200"],
  [68, "https://armaf.com/cdn/shop/files/ArabianSky.jpg?v=1739111241&width=1600"],
  [164, "https://static.thcdn.com/productimg/original/17694634-1015338373905848.jpg"],
  [172, "https://d3pllp7nz3wmw5.cloudfront.net/product_images/10766880206-1_FULL.jpg"],
  [173, "https://cf.shopee.com.br/file/568e717c61233e2cc358f5fe1ee5c13a"],
  [175, "https://www.perfumenz.co.nz/cdn/shop/products/gabrielle_chanel_1200x1200.jpg?v=1509926968"],
  [367, "https://media.falabella.com/falabellaCL/117898842_01/w=1500,h=1500,fit=cover"],
  [368, "https://i5-mx.walmartimages.com/mg/gm/3pp/asr/6714f388-b3f3-48d1-b58e-775934fabef8.ee1243b26819e1f40abbe62925c412d9.jpeg?odnBg=ffffff&odnHeight=2000&odnWidth=2000"],
  [369, "https://i5.walmartimages.com/asr/bf09079e-19e9-4383-896a-1a1707aa6cad.baff84e8bf0669c331f7977d90e6558d.jpeg"],
  [370, "https://www.mcdaidpharmacy.ie/cdn/shop/files/Hugo_Boss_Orange_Eau_De_Toilette_100ml_-6461810.png?v=1733915676"],
  [371, "https://ik.imagekit.io/scentfied/products/hugo-boss-the-scent-edt.webp"],
  [372, "https://www.perfumenz.co.nz/cdn/shop/products/boss_the_scent_her_100ml_1200x1200.jpg?v=1568779672"],
  [373, "https://i5.walmartimages.com/asr/e574e3d7-f1dd-4c71-a2f0-32cfc2b4c041.62d8f571a1b65a59f0f100d5092ed717.jpeg"],
  [562, "https://www.perfumes.com.ph/cdn/shop/files/nautica-blue-edt-100ml-perfume-philippines-best-price.webp?v=1698716982&width=2048"],
  [577, "https://cdn.shopify.com/s/files/1/2170/5343/products/Olympea-Legend_2048x2048.png?v=1571610008"],
  [579, "https://www.montrealdutyfree.ca/cdn/shop/files/808528_2.jpg?v=1751465770&width=1500"],
  [580, "https://mado.mu/cdn/shop/files/7381759S_S1.jpg?v=1730883184&width=1445"],
  [581, "https://www.news-parfums.com/61976-tm_thickbox_default/1-million-night-elixir-parfum-elixir.jpg"],
  [582, "https://assets.goldenscent.com/catalog/product/cache/2/small_image/750x750/9df78eab33525d08d6e5fb8d27136e95/3/3/3349668579839_paco_rabanne_1_million_parfum_edp_100ml.png"],
  [605, "https://i5-mx.walmartimages.com/mg/gm/3pp/asr/af619589-8471-48bc-9d8e-777997d63d75.c2acc93be7f8d7c34f9af17a454d7be5.jpeg?odnBg=ffffff&odnHeight=2000&odnWidth=2000"],
  [607, "https://beautyhouse.com/cdn/shop/files/03ivteczwr.png?v=1765306850&width=900"],
  [610, "https://api.azuperfumes.com/wp-content/uploads/2025/12/117762.webp"],
  [631, "https://lattafa.com/wp-content/uploads/2024/07/2-12.jpg"],
  [634, "https://mpfperfumeserelogios.com.br/654-medium_default/moustache-rochas-eau-de-parfum-perfume-masculino-75ml.jpg"],
  [636, "https://fragrancebysabrina.com/cdn/shop/files/SC_Sweet_Tooth_EDP_75ml_P.jpg?v=1770939284&width=1600"],
  [663, "https://imageengine.victorinox.com/transform/cd378ccd-2a51-497a-9080-bb8ee3641ab0/FRA_V0000890_S1?io=transform:fit,width:1600,height:1600"],
  [684, "https://dam.elcorteingles.es/producto/www-001013512250344-00.jpg?height=1200&impolicy=Resize&width=967"],
  [702, "https://valentino-cdn.thron.com/delivery/public/image/valentino/4addd88c-e3d5-4f3a-a357-1a44ddc9d27d/ihqstx/std/1536x0/Born-In-Roma-Extradose-Eau-De-Parfum-100Ml?quality=90&format=jpg"],
  [703, "https://www.valentino-beauty.us/dw/image/v2/AAFM_PRD/on/demandware.static/-/Sites-valentino-master-catalog/default/dw361f6083/images/pdp/MPL01750/3614273672412.jpeg?sw=1600&sh=1600"],
  [705, "https://www.valentino-beauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-valentino-master-catalog/default/dwd7edd8ca/images/pdp/MPL02809/vlt_frag_bir-extradose_launch-25_dmi_uomo-100ml_3614274350739_front%20white-1x1.jpg?sw=1600&sh=1600"],
  [724, "https://www.viktor-rolf.com/cdn/shop/files/square_model_vr_frag_2025_spicebomb_edt_packshot_premium_90ml_3605521515346_1600x.jpg?v=1760520792"],
  [732, "https://grossiste-elite.com/cdn/shop/files/temptation3fond.png?v=1752158593"],
  [733, "https://f.nooncdn.com/p/pzsku/Z5B92B6606972B75DD45CZ/45/_/1739965586/d85eb22c-b082-4a92-9ab8-b51a96ebb7e0.jpg"],
  [734, "https://cdn.shopify.com/s/files/1/0259/7733/products/xerjoff-erba-pura-100ml_1024x1024.png?v=1645409956"],
  [737, "https://mcprod.ulta.com.mx/media/catalog/product/3/3/3365440787971.png"],
  [738, "https://bogart-april-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/583ee03651b9a9d1750a5fa69072bda5214d852b_d1726632-37aa-4be4-be8e-front.jpeg"],
  [739, "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000491332236/azKU90UHB4-000000000491332236_1.jpg"],
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
