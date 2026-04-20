export default function HeroSection() {
  return (
    <section className="relative h-96 bg-gray-200 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("/images/3_Data/Lab_03/lotus_delight_salad.png")',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Recipe Card */}
      <div className="absolute left-1/8 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 w-80">
        {/* Recipe of the day label */}
        <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
          Recipe of the day
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-pink-500 mb-3">Salad Caprese</h2>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          Classic Italian Salad Caprese-ripe tomatoes, fresh mozzarella, herbs, olive oil and
          balsamic vinegar create a refreshing dish for lunch or appetizer.
        </p>

        {/* Recipe Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xl">🥗</span>
          </div>
          <span className="text-sm font-medium text-gray-800">Salad Caprese</span>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-pink-500 text-white py-2 rounded-lg font-medium hover:bg-pink-600 transition">
          View now →
        </button>
      </div>
    </section>
  );
}
