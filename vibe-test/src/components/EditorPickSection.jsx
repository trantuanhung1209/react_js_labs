import EditorPickCard from './EditorPickCard';

export default function EditorPickSection({ picks, onViewRecipe }) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pink-500 mb-2">Editor's pick</h2>
          <p className="text-gray-600 text-sm">
            Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {picks.map((pick, index) => (
            <EditorPickCard
              key={index}
              image={pick.image}
              title={pick.title}
              chef={pick.chef}
              avatar={pick.avatar}
              description={pick.description}
              pick={pick}
              onViewRecipe={onViewRecipe}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
