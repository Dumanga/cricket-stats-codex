import raw from "../assets/productDetails.json";

const slugify = (str) =>
  String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const inferFeatures = (categoryName) => {
  const name = categoryName.toLowerCase();
  const features = ["Zip lock", "Food-safe liner"];
  if (name.includes("window")) features.unshift("Clear window");
  if (name.includes("transparent")) features.unshift("Transparent front");
  if (name.includes("aluminum") || name.includes("alu") || name.includes("foil")) features.push("High barrier");
  if (name.includes("vacuum")) return ["Embossed channels", "Vacuum seal compatible"];
  if (name.includes("spout")) return ["Spout fitment", "Leak resistant"];
  return features;
};

const variantLabel = (v) => v.capacity ?? v.dimensions ?? "Variant";

const summarize = (variants) => {
  const caps = variants.map((v) => v.capacity).filter(Boolean);
  const uniqueCaps = Array.from(new Set(caps));
  if (uniqueCaps.length === 0) return `${variants.length} variants available`;
  return `${uniqueCaps[0]} – ${uniqueCaps[uniqueCaps.length - 1]} · ${variants.length} variants`;
};

const input = raw?.catalog ?? [];

export const categories = input.map((group, index) => {
  const id = slugify(group.category || `category-${index + 1}`);
  const displayId = index + 1;
  const image = `/prodImgs/${displayId}.png`;
  return {
    id,
    displayId,
    title: group.category,
    description: summarize(group.variants || []),
    image,
  };
});

export const productCatalog = input.map((group, index) => {
  const categoryId = slugify(group.category || `category-${index + 1}`);
  const features = inferFeatures(group.category || "");
  return {
    categoryId,
    headline: group.category,
    summary: summarize(group.variants || []),
    variants: (group.variants || []).map((v) => ({
      sku: `${categoryId}-${variantLabel(v).toString().replace(/\s+/g, '').toLowerCase()}`,
      label: variantLabel(v),
      dimensions: v.dimensions ?? "–",
      features,
      unitPrice: Number.isFinite(v.price) ? v.price : 0,
    })),
  };
});

