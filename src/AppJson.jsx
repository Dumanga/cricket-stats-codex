import { useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import ClientCarousel from "./components/ClientCarousel.jsx";
import CategoryGrid from "./components/CategoryGridSquare.jsx";
import ProductShowcase from "./components/ProductShowcaseClean.jsx";
import CartSection from "./components/CartSection.jsx";
import { heroSlides, clientLogos } from "./data/siteContent.js";
import { categories, productCatalog } from "./data/fromJson.js";
import { MIN_ORDER_QUANTITY } from "./data/products.js";
import { formatCurrency } from "./utils/currency.js";

const navSections = [
  { id: "hero", label: "Home" },
  { id: "categories", label: "Categories" },
  { id: "products", label: "Products" },
  { id: "cart", label: "Cart" },
];

const WHOLESALE_NUMBER = "94755808854"; // WhatsApp number in international format without '+'

const normalizeQuantity = (value) => {
  if (!Number.isFinite(value) || value <= 0) {
    return MIN_ORDER_QUANTITY;
  }

  const rounded = Math.ceil(value / 50) * 50;
  return Math.max(MIN_ORDER_QUANTITY, rounded);
};

const App = () => {
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const cartRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [cartItems, setCartItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const sectionRefs = {
    hero: heroRef,
    categories: categoriesRef,
    products: productsRef,
    cart: cartRef,
  };

  const scrollToSection = (id) => {
    const section = sectionRefs[id]?.current;

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);

    if (typeof document !== "undefined") {
      const anchor = document.getElementById(`product-${categoryId}`);

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    scrollToSection("products");
  };

  const addToCart = (item) => {
    setCartItems((current) => {
      const existing = current.find((cartItem) => cartItem.sku === item.sku);

      if (existing) {
        return current.map((cartItem) =>
          cartItem.sku === item.sku
            ? {
                ...cartItem,
                quantity: cartItem.quantity + MIN_ORDER_QUANTITY,
              }
            : cartItem,
        );
      }

      return [
        ...current,
        {
          ...item,
          quantity: MIN_ORDER_QUANTITY,
        },
      ];
    });

    if (typeof window !== "undefined" && cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const updateQuantity = (sku, quantity) => {
    setCartItems((current) =>
      current.map((item) =>
        item.sku === sku
          ? {
              ...item,
              quantity: normalizeQuantity(quantity),
            }
          : item,
      ),
    );
  };

  const removeItem = (sku) => {
    setCartItems((current) => current.filter((item) => item.sku !== sku));
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const distinctCategories = new Set(cartItems.map((item) => item.categoryId)).size;

    return {
      subtotal,
      totalUnits,
      distinctCategories,
    };
  }, [cartItems]);

  const isCheckoutReady = useMemo(() => {
    return (
      cartItems.length > 0 &&
      customerDetails.name.trim() !== "" &&
      customerDetails.phone.trim() !== "" &&
      customerDetails.address.trim() !== ""
    );
  }, [cartItems.length, customerDetails.address, customerDetails.name, customerDetails.phone]);

  const checkoutMessage = useMemo(() => {
    if (!isCheckoutReady) {
      return "";
    }

    const lines = [
      `New pouch inquiry from ${customerDetails.name.trim()}`,
      "",
      "Order details:",
      ...cartItems.map((item, index) =>
        `${index + 1}. ${item.name} | Qty: ${item.quantity} | ${formatCurrency(item.unitPrice)} each | Line: ${formatCurrency(
          item.quantity * item.unitPrice,
        )}`,
      ),
      "",
      `Subtotal: ${formatCurrency(totals.subtotal)}`,
      "",
      "Delivery address:",
      customerDetails.address.trim(),
      "",
      `Contact: ${customerDetails.phone.trim()}`,
    ];

    if (customerDetails.notes.trim()) {
      lines.push("", `Notes: ${customerDetails.notes.trim()}`);
    }

    return lines.join("\n");
  }, [cartItems, customerDetails, totals.subtotal, isCheckoutReady]);

  const checkoutLink = useMemo(() => {
    if (!isCheckoutReady || checkoutMessage.length === 0) {
      return "";
    }

    const encodedMessage = encodeURIComponent(checkoutMessage);
    return `https://wa.me/${WHOLESALE_NUMBER}?text=${encodedMessage}`;
  }, [checkoutMessage, isCheckoutReady]);

  return (
    <div className="min-h-screen bg-brand-light/40 text-slate-800">
      <Navbar onNavigate={scrollToSection} sections={navSections} />

      <main>
        <HeroCarousel slides={heroSlides} sectionRef={heroRef} />
        {(() => {
          const brandImages = Array.from({ length: 13 }, (_, i) => `/brands/${i + 1}.png`);
          return <ClientCarousel images={brandImages} />;
        })()}
        <CategoryGrid
          categories={categories}
          onSelect={handleCategorySelect}
          sectionRef={categoriesRef}
        />

        <ProductShowcase
          catalog={productCatalog}
          categoriesMeta={categories}
          activeCategory={activeCategory}
          onAddToCart={addToCart}
          sectionRef={productsRef}
        />

        <CartSection
          sectionRef={cartRef}
          items={cartItems}
          onQuantityChange={updateQuantity}
          onRemove={removeItem}
          totals={totals}
          formData={customerDetails}
          onFormChange={setCustomerDetails}
          checkoutLink={checkoutLink}
          isCheckoutDisabled={!isCheckoutReady}
        />
      </main>

      <footer className="bg-slate-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 text-sm text-slate-300">
          © {new Date().getFullYear()} KraftPouch Co. All rights reserved.
        </div>
      </footer>

      <a
        href={`https://wa.me/${WHOLESALE_NUMBER}?text=Hi%20I%27d%20like%20to%20share%20my%20requirements`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.149-.672.15-.198.297-.768.966-.941 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.075-.149-.672-1.611-.922-2.206-.242-.579-.487-.5-.672-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.421h-.004a8.995 8.995 0 01-4.596-1.259l-.329-.195-3.429.9.915-3.343-.214-.343a9.007 9.007 0 01-1.375-4.71c.003-4.986 4.062-9.05 9.053-9.05 2.417.001 4.686.943 6.396 2.654a8.94 8.94 0 012.658 6.4c-.003 4.99-4.067 9.053-9.075 9.053m7.695-16.748A10.61 10.61 0 0012.05 0C5.495 0 .24 5.255.238 11.732c0 2.065.54 4.084 1.565 5.854L0 24l6.548-1.713a11.73 11.73 0 005.468 1.393h.005c6.573 0 11.905-5.338 11.908-11.911a11.84 11.84 0 00-3.48-8.385z" />
        </svg>
        Chat on WhatsApp
      </a>
    </div>
  );
};

export default App;
