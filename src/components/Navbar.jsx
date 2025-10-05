import { useState } from "react";

const Navbar = ({ onNavigate, sections }) => {
  const [open, setOpen] = useState(false);

  const handleNavigate = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <button
          className="text-2xl font-display font-semibold text-brand-dark"
          onClick={() => handleNavigate("hero")}
          type="button"
        >
          KraftPouch Co.
        </button>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-700">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavigate(id)}
              className="hover:text-brand-dark transition-colors"
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavigate("cart")}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand text-white px-4 py-2 text-sm font-medium shadow hover:bg-brand-dark transition"
            type="button"
          >
            View Cart
          </button>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-2 text-sm"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-3 text-sm font-medium text-slate-700">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavigate(id)}
                className="text-left px-2 py-2 rounded-lg hover:bg-brand-light/80"
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
