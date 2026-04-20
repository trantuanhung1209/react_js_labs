import RecipeCard from './RecipeCard';

export default function RecipeGrid({ title, subtitle, recipes, onViewRecipe }) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pink-500 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              image={recipe.image}
              title={recipe.title}
              duration={recipe.duration}
              recipe={recipe}
              onClick={() => onViewRecipe && onViewRecipe(recipe)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
