import ProductCard from "./ProductCard.jsx";

const ProductShowcase = ({ catalog, categoriesMeta, activeCategory, onAddToCart, sectionRef }) => {
  return (
    <section ref={sectionRef} id="products" className="section-padding bg-brand-light/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-display font-semibold text-slate-900">Product Showcase</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Browse stock sizes across each pouch category. All variants support custom branding after confirmation.
            </p>
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Dispatch in 7-10 days
          </div>
        </div>

        <div className="mt-12 space-y-12">
          {catalog.map((categoryGroup) => {
            const meta = categoriesMeta.find((category) => category.id === categoryGroup.categoryId);
            const isActive = activeCategory === categoryGroup.categoryId;

            return (
              <article
                key={categoryGroup.categoryId}
                id={`product-${categoryGroup.categoryId}`}
                className={`scroll-mt-28 rounded-3xl border bg-white/90 p-6 shadow-sm transition lg:p-10 ${
                  isActive ? "border-brand-dark shadow-lg" : "border-slate-200"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand-dark text-sm font-semibold">
                        {categoryGroup.variants.length}
                      </span>
                      <h3 className="text-2xl font-display font-semibold text-slate-900">
                        {categoryGroup.headline}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl text-sm text-slate-600">{categoryGroup.summary}</p>
                  </div>
                  {meta && (
                    <div className="relative inline-flex overflow-hidden rounded-2xl border border-slate-200 bg-white/60 px-4 py-3 text-xs font-medium text-slate-500">
                      <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-brand-dark" aria-hidden />
                      Category: {meta.title}
                    </div>
                  )}
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {categoryGroup.variants.map((variant) => (
                    <ProductCard
                      key={variant.sku}
                      variant={variant}
                      categoryLabel={meta?.title ?? categoryGroup.headline}
                      onAdd={() =>
                        onAddToCart({
                          sku: variant.sku,
                          name: `${meta?.title ?? categoryGroup.headline} · ${variant.label}`,
                          categoryId: categoryGroup.categoryId,
                          label: variant.label,
                          unitPrice: variant.unitPrice,
                        })
                      }
                    />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
