import { MIN_ORDER_QUANTITY } from "../data/products.js";
import { formatCurrency } from "../utils/currency.js";

const ProductCard = ({ variant, categoryLabel, onAdd }) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            {categoryLabel} · {variant.label}
          </h3>
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-dark">
            MOQ {MIN_ORDER_QUANTITY}
          </span>
        </div>
        <p className="mt-4 text-sm text-slate-600">Pouch size: {variant.dimensions}</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          {variant.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-dark" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-400">Unit price</div>
          <div className="text-lg font-semibold text-slate-900">{formatCurrency(variant.unitPrice)}</div>
          <div className="text-xs text-slate-400">Ex-works · Taxes extra</div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center rounded-full bg-brand text-white px-5 py-2 font-medium shadow hover:bg-brand-dark transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
