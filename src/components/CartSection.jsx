import { formatCurrency } from "../utils/currency.js";

const CartSection = ({
  sectionRef,
  items,
  onQuantityChange,
  onRemove,
  totals,
  formData,
  onFormChange,
  checkoutLink,
  isCheckoutDisabled,
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFormChange({ ...formData, [name]: value });
  };

  return (
    <section ref={sectionRef} id="cart" className="section-padding bg-white scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-display font-semibold text-slate-900">Cart & Checkout</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Review SKUs, confirm dispatch quantities, and share delivery details. Orders are confirmed via WhatsApp for a quick back-and-forth with our sales desk.
            </p>
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
            WhatsApp-first workflow
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
              {items.length === 0 ? (
                <div className="text-sm text-slate-500">
                  Your cart is empty. Add pouch sizes from the catalog above to see them here.
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item.sku} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                          <div className="text-xs text-slate-400">SKU: {item.sku}</div>
                          <div className="mt-1 text-xs text-slate-500">Unit price: {formatCurrency(item.unitPrice)}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(item.sku)}
                          className="text-xs font-medium text-rose-500 hover:text-rose-600"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <label className="flex items-center gap-2">
                          <span className="text-xs uppercase tracking-wide text-slate-500">Quantity</span>
                          <input
                            type="number"
                            min={100}
                            step={50}
                            value={item.quantity}
                            onChange={(event) => onQuantityChange(item.sku, Number(event.target.value) || 0)}
                            className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                        </label>
                        <div className="text-sm font-semibold text-slate-900">
                          Line total: {formatCurrency(item.quantity * item.unitPrice)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">Subtotal</div>
                <div className="text-2xl font-semibold text-slate-900">{formatCurrency(totals.subtotal)}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">Total units</div>
                <div className="text-lg font-semibold text-slate-900">{totals.totalUnits}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">Categories</div>
                <div className="text-lg font-semibold text-slate-900">{totals.distinctCategories}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Buyer Details</h3>
              <p className="mt-2 text-xs text-slate-500">Provide dispatch information so our team can share freight quotes and confirm delivery timelines.</p>

              <form className="mt-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Contact name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Priya Sharma"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Delivery address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Building, street, city, pincode"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Mention custom print, valve, or urgent timelines"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </div>
              </form>
            </div>

            <div className="rounded-3xl border border-brand/40 bg-brand/10 p-6 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white text-xs font-semibold">
                  i
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-dark">WhatsApp Checkout</div>
                  <p className="mt-2 text-xs text-slate-600">
                    Tap checkout to open WhatsApp with your order summary. Our sales desk will confirm availability, freight, and payment terms within 2 business hours.
                  </p>
                  <a
                    href={isCheckoutDisabled ? undefined : checkoutLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                      isCheckoutDisabled
                        ? "cursor-not-allowed bg-slate-200 text-slate-500"
                        : "bg-brand text-white hover:bg-brand-dark"
                    }`}
                    aria-disabled={isCheckoutDisabled}
                  >
                    {isCheckoutDisabled ? "Add items & fill details" : "Checkout via WhatsApp"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
