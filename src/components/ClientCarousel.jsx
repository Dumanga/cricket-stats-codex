const ClientCarousel = ({ logos = [], images = [] }) => {
  const useImages = images && images.length > 0;
  const base = useImages ? images : logos;
  const sequence = [...base, ...base];

  const durationSec = (useImages ? images.length : logos.length) * 3.5;

  return (
    <div className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 mb-6 text-center">
          Trusted by 200 + Brands
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track" style={{ animationDuration: `${durationSec}s` }}>
            {sequence.map((item, index) => (
              <div key={`brand-${index}`} className="marquee-item">
                {useImages ? (
                  <img
                    src={item}
                    alt={`Brand ${((index % base.length) + 1).toString().padStart(2, '0')}`}
                    className="h-24 sm:h-28 lg:h-28 object-contain rounded-md"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="text-sm font-semibold text-slate-700">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.note}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCarousel;
