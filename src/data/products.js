export const productCatalog = [
  {
    categoryId: "kraft",
    headline: "Classic Kraft Standup",
    summary: "Natural kraft with food-grade lining and resealable zip.",
    variants: [
      { sku: "kraft-100", label: "100 g", dimensions: "110 x 180 + 30 mm", features: ["Matt finish", "Food-safe liner"], unitPrice: 4.2 },
      { sku: "kraft-250", label: "250 g", dimensions: "130 x 210 + 35 mm", features: ["Valve ready", "Heat seal top"], unitPrice: 5.1 },
      { sku: "kraft-500", label: "500 g", dimensions: "160 x 230 + 40 mm", features: ["Tear notch", "High barrier"], unitPrice: 6.8 },
      { sku: "kraft-1kg", label: "1 kg", dimensions: "200 x 300 + 45 mm", features: ["Quad seal", "Bulk friendly"], unitPrice: 9.4 },
    ],
  },
  {
    categoryId: "window",
    headline: "Window Pouches",
    summary: "Crystal-clear window fronts with kraft backing.",
    variants: [
      { sku: "window-100", label: "100 g", dimensions: "120 x 200 + 30 mm", features: ["Clear window", "Zip lock"], unitPrice: 4.9 },
      { sku: "window-250", label: "250 g", dimensions: "150 x 230 + 35 mm", features: ["High clarity", "Tear notch"], unitPrice: 5.6 },
      { sku: "window-500", label: "500 g", dimensions: "180 x 260 + 40 mm", features: ["Matt back", "Heat seal"], unitPrice: 7.2 },
      { sku: "window-1kg", label: "1 kg", dimensions: "220 x 310 + 45 mm", features: ["Reinforced base", "Food safe"], unitPrice: 9.9 },
    ],
  },
  {
    categoryId: "duo",
    headline: "Duo-Color Metallized",
    summary: "Glossy metallic backs paired with frosted fronts.",
    variants: [
      { sku: "duo-100", label: "100 g", dimensions: "110 x 190 + 30 mm", features: ["Double layer", "UV shield"], unitPrice: 5.3 },
      { sku: "duo-250", label: "250 g", dimensions: "140 x 220 + 35 mm", features: ["Metallic sheen", "Valve ready"], unitPrice: 6.4 },
      { sku: "duo-500", label: "500 g", dimensions: "170 x 250 + 40 mm", features: ["Easy tear", "Superior aroma lock"], unitPrice: 8.1 },
      { sku: "duo-1kg", label: "1 kg", dimensions: "210 x 310 + 45 mm", features: ["Stand firm", "Custom print"], unitPrice: 10.2 },
    ],
  },
  {
    categoryId: "flat",
    headline: "Flat Bottom Bricks",
    summary: "Quad seal structure ideal for bulk fills.",
    variants: [
      { sku: "flat-500", label: "500 g", dimensions: "130 x 80 x 230 mm", features: ["Shelf ready", "Tear notch"], unitPrice: 8.9 },
      { sku: "flat-1kg", label: "1 kg", dimensions: "160 x 90 x 280 mm", features: ["Stable base", "Tin tie option"], unitPrice: 11.5 },
      { sku: "flat-2kg", label: "2 kg", dimensions: "200 x 110 x 330 mm", features: ["Foil liner", "Heat seal"], unitPrice: 14.2 },
      { sku: "flat-5kg", label: "5 kg", dimensions: "260 x 140 x 420 mm", features: ["Reinforced gusset", "Bulk valve"], unitPrice: 18.6 },
    ],
  },
];

export const MIN_ORDER_QUANTITY = 100;
