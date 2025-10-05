const CategoryGrid = ({ categories, onSelect, sectionRef }) => {
  const sequence = [...categories, ...categories];
  const animationDuration = `${categories.length * 4.5}s`;

  return (
    <section ref={sectionRef} id="categories" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-display font-semibold text-slate-900">Shop by Category</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              A curated selection of pouches covering stand-up, windowed, metallized, and bulk-ready options.
            </p>
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
            MOQ 100 · Dispatch in 7 days
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/70 to-transparent" />

          <div className="category-track" style={{ animationDuration }}>
            {sequence.map((category, index) => (
              <button
                key={`${category.id}-${index}`}
                onClick={() => onSelect(category.id)}
                type="button"
                className="relative flex min-w-[18rem] max-w-[18rem] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/65 to-white/30" />
                </div>
                <div className="relative flex h-full flex-col justify-between p-6">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                      {category.title}
                    </span>
                    <p className="mt-4 text-sm text-slate-600">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-6 text-sm font-semibold text-brand-dark flex items-center gap-2">
                    View sizes
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand-dark">?</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
