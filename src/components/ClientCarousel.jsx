const ClientCarousel = ({ logos }) => {
  const sequence = [...logos, ...logos];

  return (
    <div className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 mb-6 text-center">
          Trusted by 250+ craft food brands
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track" style={{ animationDuration: `${logos.length * 3.5}s` }}>
            {sequence.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="marquee-item">
                <div className="text-sm font-semibold text-slate-700">{logo.name}</div>
                <div className="text-xs text-slate-400">{logo.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCarousel;
