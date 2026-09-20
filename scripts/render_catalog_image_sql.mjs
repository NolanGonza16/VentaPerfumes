import fs from "node:fs";

const [minimum = "1", maximum = "9999"] = process.argv.slice(2);
const catalog = JSON.parse(
  fs.readFileSync(new URL("../catalog/august-products.json", import.meta.url), "utf8"),
);
const rows = catalog.records.filter(
  (record) => record.origen_ref >= Number(minimum) && record.origen_ref <= Number(maximum),
);
const quote = (value) =>
  value ? `'${String(value).replaceAll("'", "''")}'` : "null";

process.stdout.write(`
update public.catalog_perfumes
set imagen_url = case origen_ref
${rows.map((record) => `  when ${record.origen_ref} then ${quote(record.imagen_url)}`).join("\n")}
end,
updated_at = now()
where origen_ref between ${Number(minimum)} and ${Number(maximum)};
`);
