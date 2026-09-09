# August catalog import — in progress

The private PDF contains 742 rows, including gift sets, body sprays and unrelated accessories.
The extraction matched the PDF's declared count. Descriptions spanning pages are preserved.
Source PDF and wholesale costs remain exclusively in ignored local working files.

## Published batch

- Supplier rows 7–10: Afnan 9 AM, 9 AM Dive, 9 PM Elixir and 9 PM.
- All four are 100 ml as listed by the supplier.
- Retail prices: ₡22,100 / ₡24,650 / ₡32,300 / ₡24,650.
- Price rule: wholesale price multiplied by 1.70; no currency conversion.
- Notes and photos: official Afnan pages recorded in catalog/reviewed-august.json.
- Occasions and descriptions: editorial interpretation of the documented profile.
- Availability: under order, not an assertion of current physical stock.
- Ratings, longevity, projection and sillage: unverified, stored as NULL, never invented.
- Photo resolution checked: 1080×1350 for 9 AM and 9 PM, 1080×1080 for
  9 AM Dive 100 ml, 2048×2048 for 9 PM Elixir. The 150 ml Dive photo was rejected.

## Remaining

738 supplier rows have not been imported. This is not a completed catalog.
Confirm inclusion of gift sets/splashes and exclude unrelated accessories.
Resolve ambiguous variants and missing volumes before publication.
Research the remaining exact products, source their images, and verify community metrics.
Imported four also still need sourced ratings and performance data.

## Demo removal

Demo records now exist only as automated-test fixtures. Production contains no demo
fallback, including during initial loading, an empty database, or an outage.
Historical Git revisions preserve the removed demonstration content.
