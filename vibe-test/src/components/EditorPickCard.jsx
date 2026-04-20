import { useSavedRecipes } from '../hooks/useSavedRecipes';

export default function EditorPickCard({ image, title, chef, avatar, description, pick, onViewRecipe }) {
  const { isSaved, toggleSave } = useSavedRecipes();
  
  const handleSave = (e) => {
    e.stopPropagation();
    toggleSave(pick);
  };

  return (
    <div 
      onClick={() => onViewRecipe && onViewRecipe(pick)}
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
            isSaved(pick?.id) 
              ? 'bg-pink-500' 
              : 'bg-white/80 hover:bg-white'
          }`}
        >
          <span className={isSaved(pick?.id) ? 'text-white' : 'text-pink-500'}>♥</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-3">{title}</h3>

        {/* Chef Info */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={avatar}
            alt={chef}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-xs font-medium text-gray-700">{chef}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed mb-3">{description}</p>

        {/* Duration */}
        <p className="text-gray-500 text-xs">20 minutes</p>
      </div>
    </div>
  );
}
