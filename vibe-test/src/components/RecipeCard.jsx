import { useSavedRecipes } from '../hooks/useSavedRecipes';

export default function RecipeCard({ image, title, duration, onClick, recipe }) {
  const { isSaved, toggleSave } = useSavedRecipes();
  
  const handleSave = (e) => {
    e.stopPropagation();
    toggleSave(recipe);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-300">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Bookmark Icon */}
        <button 
          onClick={handleSave}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition ${
            isSaved(recipe?.id) 
              ? 'bg-pink-500' 
              : 'bg-white/80 hover:bg-white'
          }`}
        >
          <span className={isSaved(recipe?.id) ? 'text-white' : 'text-pink-500'}>♥</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-2">{title}</h3>
        <p className="text-gray-500 text-xs">{duration}</p>
      </div>
    </div>
  );
}
