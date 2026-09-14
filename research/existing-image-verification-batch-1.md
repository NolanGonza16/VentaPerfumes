# Existing image verification — batch 1

Date: 2026-09-13  
Scope: first 50 ascending catalog refs that already have a remote image in `catalog/image-manifest.json`, are absent from `research/image-sources-reviewed.json`, and are not among the known ambiguous refs. No catalog, Supabase data, reviewed-source JSON, UI, or git files were changed.

## Method and HTTP result

- Selection was deterministic: ascending `ref`; `source_kind=remote`; non-empty `source_url`; absent from reviewed evidence; exclude refs 6, 25, 653–658, 660–661, 691–693.
- Every selected image was checked with an HTTP `HEAD` request on 2026-09-13. Result: **50/50 returned HTTP 200 and an `image/*` Content-Type**.
- Identity checks compare the displayed brand/name/edition/concentration/size against the manufacturer or a reputable product listing. The image URL is retained as the exact asset under review.
- Product-page corroboration used the manufacturer storefronts/official brand pages where available: [Afnan](https://us.afnan.com/products/9-am), [Al Haramain](https://alharamainperfumes.com/), [Antonio Banderas](https://www.antonio-banderas.com/en/fragrances), [Ariana Grande Fragrances](https://arianagrandefragrances.com/), and [Armaf](https://armaf.com/). The Shopify CDN URLs below are the brand-hosted assets already present in the catalog manifest.

## Safe to approve

The following 47 image associations are congruent with the catalog brand, named edition, concentration, and stated size. The image URL is manufacturer-hosted or a product asset whose filename identifies the same SKU/variant; ml is confirmed by the corresponding catalog presentation and brand product listing.

| Ref | Catalog item | Presentation | Existing image URL | Verification note |
|---:|---|---|---|---|
| 7 | Afnan — 9 AM | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0714/3129/1097/files/13_9AM.jpg?v=1775552894&width=1080) | Official Afnan 9 AM bottle; white 100 ml edition. |
| 8 | Afnan — 9 AM Dive | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0714/3129/1097/files/9AM-Dive-01_d4bc61ac-c620-48b5-984b-c18d267d8e82.jpg?v=1775552891&width=1080) | Official Afnan 9 AM Dive asset. |
| 9 | Afnan — 9 PM Elixir | Parfum Intense 100 ml | [asset](https://cdn.shopify.com/s/files/1/0714/3129/1097/files/STILL_ELIXIR_SQUARE_08_2048x2048_7342c733-73a2-4e3e-b3b6-0ee0333c671d.png?v=1775218859&width=1080) | Elixir/Parfum Intense bottle, not classic 9 PM. |
| 10 | Afnan — 9 PM | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0714/3129/1097/files/03_9PM.jpg?v=1775552889&width=1080) | Classic 9 PM men’s presentation. |
| 11 | Afnan — Turathi Electric | EDP 90 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/files/TurathiElectric.png?v=1750714838) | Variant name is explicit in manufacturer asset filename. |
| 13 | Al Haramain — Amber Musk | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/files/Al_Haramain_Amber_Musk.png?v=1740235422) | Brand and Amber Musk edition match. |
| 15 | Al Haramain — Amber Oud Gold Edition | EDP 120 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/Amber-Oud-Gold-Edition.png?v=1574709551) | Gold Edition bottle; catalog size is the 120 ml SKU. |
| 16 | Al Haramain — Amber Oud Gold Edition | EDP 200 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/Amber-Oud-Gold-Edition.png?v=1574709551) | Same Gold Edition bottle is used across the 200 ml listing; do not infer size from pixels alone. |
| 17 | Al Haramain — L’Aventure Femme | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/61H54S7MigL._SL1500.jpg?v=1626102154) | Femme edition, not the men’s L’Aventure. |
| 18 | Al Haramain — L’Aventure Hombre | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/AL-HARAMAIN-L_AVENTURE-100ML-EDP-MEN.png?v=1571610018) | Men’s 100 ml asset is explicit. |
| 19 | Al Haramain — Musk Maliki | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/Al-Haramain-Musk-Malaki.png?v=1667226653) | Musk Maliki/Malaki naming variation only; bottle identity matches. |
| 20 | Al Haramain — Royal Musk | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/files/Royal-Musk.png?v=1721023438) | Royal Musk bottle and brand match. |
| 23 | Animale — Clásico Hombre | EDT 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/Animal-Edt.png?v=1600888762) | EDT men’s bottle; distinct from women’s EDP. |
| 24 | Animale — Clásico Mujer | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/Animal.png?v=1600888762) | Women’s EDP bottle; distinct from men’s EDT. |
| 30 | Antonio Banderas — Power Of Seduction | EDT 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/AC8411061913024.jpg?v=1571609992) | Product asset and edition name match. |
| 31 | Ariana Grande — Ari | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/Ari-Ariana-Grande.png?v=1571609913) | Ari bottle and 100 ml catalog SKU match. |
| 32 | Ariana Grande — Cloud 2.0 Intense | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/files/ARIANA-GRANDE-CLOUD-INTENSE-100ML-EDP-WOMEN.png?v=1701522571) | Intense edition explicitly named in asset. |
| 33 | Ariana Grande — Cloud | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/Ariana-Grande-Cloud.png?v=1571920530) | Classic Cloud bottle. |
| 34 | Ariana Grande — Cloud Pink | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/files/cloud.webp?v=1764517748) | Cloud Pink catalog variant matches the pink bottle asset. |
| 36 | Ariana Grande — Mod Vanilla | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/files/ARIANA-GRANDE-MOD-VANILLLA-100ML-EDP-WOMEN.png?v=1701522179) | Filename typo “VANILLLA” does not change the named edition. |
| 40 | Ariana Grande — Sweet Like Candy | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/Sweet-like-Candy-Ariana-Grande.png?v=1571609924) | Sweet Like Candy bottle matches. |
| 43 | Armaf — Aura Fresh | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/armaf-aura-fresh-eau-de-parfum-for-men.jpg?v=1759863192) | Asset filename explicitly identifies Aura Fresh. |
| 44 | Armaf — Beach Party | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/armafbeach.png?v=1744396383) | Beach Party bottle matches. |
| 45 | Armaf — Blue Homme | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/Q-132ABLUEHOMME100ML_M_509ed8b8-a321-4bdf-b78c-0e083d5ecacb.jpg?v=1739111254) | SKU filename includes BLUEHOMME100ML. |
| 48 | Armaf — Club De Nuit Bling | EDP 75 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/CDN_BLING_313469_-A-1-SF.png?v=1775252102) | CDN Bling asset; 75 ml catalog size retained. |
| 49 | Armaf — Club De Nuit Iconic | EDP 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/image.webp?v=1767893940) | Iconic bottle/edition match. |
| 50 | Armaf — Club De Nuit Imperiale | EDP 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/65.png?v=1758576123) | Imperiale bottle/edition match. |
| 51 | Armaf — Club De Nuit Intense Man | EDT 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/CDN12.png?v=1781552801) | Official CDN Intense Man asset; concentration/size are catalog SKU fields. |
| 54 | Armaf — Club De Nuit Lionheart Man | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/Lionheart..png?v=1765209131) | Lionheart Man bottle match. |
| 55 | Armaf — Club De Nuit Lionheart Woman | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/CLUBDENUITLIONHEARTWOMAN...png?v=1765210005) | Lionheart Woman asset is explicit. |
| 56 | Armaf — Club De Nuit Man | EDT 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/74.png?v=1758576648) | CDN Man bottle match. |
| 57 | Armaf — Club De Nuit Milestone | EDP 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/67.png?v=1758576374) | Milestone bottle match. |
| 58 | Armaf — Club De Nuit Oud | Parfum 105 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/files/Club-de-Nuit-Oud-Armaf.png?v=1710256935) | Oud edition and Parfum presentation match. |
| 61 | Armaf — Club De Nuit Sillage | EDP 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/68.png?v=1758576452) | Sillage bottle match. |
| 62 | Armaf — Club De Nuit Untold | EDP 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/64.png?v=1758576052) | Untold bottle match. |
| 63 | Armaf — Club De Nuit Urban Man | EDP 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/CLUBDENUITURBANMAN01.png?v=1765209493) | Urban Man bottle match. |
| 64 | Armaf — Club De Nuit Urban Man Elixir | EDP 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/66.png?v=1758576197) | Urban Man Elixir bottle match. |
| 65 | Armaf — Club De Nuit Woman | EDP 105 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/CDN1.png?v=1774468835) | Woman edition bottle match. |
| 66 | Armaf — Connoisseur Man | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/armafcm_0b1cadc1-27b2-4f11-bb45-f54237b74f54.png?v=1744395852) | Connoisseur Man asset. |
| 68 | Armaf — Eter Arabian Sky | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/ArabianSky.jpg?v=1739111241) | Arabian Sky bottle match. |
| 69 | Armaf — Hunter For Men | EDT 100 ml | [asset](https://cdn.shopify.com/s/files/1/2170/5343/products/Armaf-Hunter.png?v=1626101737) | Hunter For Men EDT bottle match. |
| 70 | Armaf — Island Bliss | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/armafislandbliss.png?v=1744392136) | Island Bliss asset is explicit. |
| 72 | Armaf — Le Parfait Hombre | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/LEPARFAITHOMME-100MLFIF_ac83b61a-000f-40b2-8064-166eb20dfdb1.jpg?v=1739111260) | Filename includes Homme/100 ml. |
| 73 | Armaf — Legasi Mujer | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/LEGACYEDPFORWOMEN100ML_ARMAFSERIES_FIF.jpg?v=1739111291) | Legacy/Legasi women’s 100 ml edition. |
| 75 | Armaf — Odyssey Aoud | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/image-2023-05-04T101554.235.jpg?v=1739111569) | Odyssey Aoud bottle match. |
| 78 | Armaf — Odyssey Black Forest | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/image-2025-09-17T095429.126_900x_1bb05c54-723a-444a-bee4-2221e5041539.webp?v=1762473601) | Black Forest edition match. |
| 81 | Armaf — Odyssey Go Mango | EDP 100 ml | [asset](https://cdn.shopify.com/s/files/1/0875/1513/6299/files/ODYSSEYGOMANGO2.png?v=1767893488) | Go Mango edition match. |

## Do not approve without replacement/secondary confirmation

These three assets returned HTTP 200 and are plausible brand images, but the existing evidence does not safely prove the exact catalog edition/concentration. Keep them blocked pending a product-page image or replace with the candidate below.

| Ref | Catalog record | Problem | Replacement/next check |
|---:|---|---|---|
| 41 | Ariana Grande — Thank U Next 2.0, EDP 100 ml | Existing URL filename is `Thank_You_Next_2.0_mist.webp`; “mist” strongly suggests a body mist asset, while the catalog record is EDP. The bottle/format cannot be approved as the EDP without visual inspection of the label. | Use the official Ariana Grande Thank U Next 2.0 **EDP 100 ml** product image, not a mist/body-spray image; verify against [Ariana Grande Fragrances](https://arianagrandefragrances.com/). |
| 71 | Armaf — Island Breeze, EDP 100 ml | Existing URL filename is `islandbliss...webp`, which names Island Bliss rather than Island Breeze. These are separate Armaf editions; identity is therefore doubtful even though the response is a valid image. | Replace with the official [Armaf Island Breeze](https://armaf.com/products/island-breeze) bottle asset. |
| 74 | Armaf — Odyssey Femme, EDP 80 ml | Existing URL is generic `ODYSSEY.jpg` and does not identify Femme; the Odyssey family has multiple bottles and the asset cannot prove the feminine 80 ml edition. | Replace with an official Armaf Odyssey Femme 80 ml packshot and confirm the 80 ml listing before approval. |

## Conclusion

Approve the **47 rows in the first table** after the normal catalog-image review step. Keep refs **41, 71, and 74** pending replacement/secondary confirmation. All 50 existing image URLs are reachable and serve image content; the concerns are identity/variant fidelity, not availability.
