import { useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import ClientCarousel from "./components/ClientCarousel.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import ProductShowcase from "./components/ProductShowcase.jsx";
import CartSection from "./components/CartSection.jsx";
import { heroSlides, clientLogos, categories } from "./data/siteContent.js";
import { productCatalog, MIN_ORDER_QUANTITY } from "./data/products.js";
import { formatCurrency } from "./utils/currency.js";

const navSections = [
  { id: "hero", label: "Home" },
  { id: "categories", label: "Categories" },
  { id: "products", label: "Products" },
  { id: "cart", label: "Cart" },
];

const WHOLESALE_NUMBER = "919876543210";

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

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "kraft");
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
        <ClientCarousel logos={clientLogos} />
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
    </div>
  );
};

export default App;
