import { useEffect, useState } from "react";

const SLIDE_INTERVAL = 6000;

const HeroCarousel = ({ slides, sectionRef }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[current];

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-brand-light via-white to-transparent" id="hero">
      <div className="max-w-6xl mx-auto">
        <div className="hero-overlay rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-10 lg:p-12">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark/70">Trusted by growing D2C brands</p>
              <h1 className="mt-4 text-3xl font-display font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
                {activeSlide.title}
              </h1>
              <p className="mt-4 text-base text-slate-600 sm:text-lg">
                {activeSlide.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-700">
                <span className="inline-flex items-center rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
                  {activeSlide.highlight}
                </span>
                <a
                  href="#products"
                  className="inline-flex items-center rounded-full bg-brand text-white px-4 py-2 font-medium shadow hover:bg-brand-dark transition"
                >
                  Explore products
                </a>
              </div>
              <div className="mt-8 flex items-center gap-3">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrent(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === current ? "bg-brand-dark w-8" : "bg-slate-300 w-3"
                    }`}
                    type="button"
                    aria-label={`View slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="relative isolate min-h-[280px] overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-lg backdrop-blur">
                <div className="font-semibold text-brand-dark">Small-batch friendly</div>
                <p className="text-xs text-slate-600">Ready in 7-10 days · Free dieline assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
