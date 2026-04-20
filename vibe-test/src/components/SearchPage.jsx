import { useState, useMemo, useEffect } from 'react';
import { useSavedRecipes } from '../hooks/useSavedRecipes';

const RECIPE_TYPES = [
  'Pan-fried',
  'Stir-fried',
  'Grilled',
  'Roasted',
  'Sauteed',
  'Baked',
  'Steamed',
  'Stewed'
];

const SUGGESTED_CATEGORIES = [
  'Sweet Cake',
  'Black Cake',
  'Pizzle Verde',
  'Healthy food'
];

// Salad mockup data
const ALL_RECIPES = [
  {
    id: 1,
    title: 'Cucumber salad, cherry tomatoes',
    type: 'Grilled',
    time: 32,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 2,
    title: 'Italian-style tomato salad',
    type: 'Pan-fried',
    time: 32,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Potato Salad',
    type: 'Sauteed',
    time: 32,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b39?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 4,
    title: 'Salad with cabbage and shrimp',
    type: 'Steamed',
    time: 32,
    rating: 3,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561081?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 5,
    title: 'Five-color salad',
    type: 'Pan-fried',
    time: 32,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1478097143696-c6838f899bdd?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 6,
    title: 'Corn Salad',
    type: 'Grilled',
    time: 32,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 7,
    title: 'Salad with cabbage and shrimp',
    type: 'Steamed',
    time: 32,
    rating: 3,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 8,
    title: 'Lotus delight salad',
    type: 'Sauteed',
    time: 32,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 9,
    title: 'Avocado Salad',
    type: 'Pan-fried',
    time: 32,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 10,
    title: 'Greek Salad',
    type: 'Roasted',
    time: 28,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b39?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 11,
    title: 'Caesar Salad',
    type: 'Pan-fried',
    time: 25,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561081?w=400&h=300&fit=crop',
    isFavorite: false
  },
  {
    id: 12,
    title: 'Caprese Salad',
    type: 'Steamed',
    time: 15,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1478097143696-c6838f899bdd?w=400&h=300&fit=crop',
    isFavorite: false
  },
];

const ITEMS_PER_PAGE = 9;

export default function SearchPage({ searchQuery = '', onViewRecipe }) {
  const [query, setQuery] = useState(searchQuery);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [timeRange, setTimeRange] = useState([15, 60]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState('A-Z');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState(ALL_RECIPES);
  const { isSaved, toggleSave } = useSavedRecipes();

  // Initialize state from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Get query parameter
    const qParam = params.get('q');
    if (qParam) {
      setQuery(qParam);
      setCurrentPage(1);
    } else if (searchQuery) {
      // Fallback to prop if no URL param
      setQuery(searchQuery);
      setCurrentPage(1);
    }

    // Get types parameter (comma-separated)
    const typesParam = params.get('types');
    if (typesParam) {
      setSelectedTypes(typesParam.split(',').filter(t => t));
    }

    // Get time range parameters
    const timeMinParam = params.get('timeMin');
    const timeMaxParam = params.get('timeMax');
    if (timeMinParam || timeMaxParam) {
      setTimeRange([
        timeMinParam ? parseInt(timeMinParam) : 15,
        timeMaxParam ? parseInt(timeMaxParam) : 60
      ]);
    }

    // Get rating parameter
    const ratingParam = params.get('rating');
    if (ratingParam) {
      setSelectedRating(parseInt(ratingParam));
    }

    // Get sort parameter
    const sortParam = params.get('sort');
    if (sortParam && ['A-Z', 'Z-A'].includes(sortParam)) {
      setSortBy(sortParam);
    }

    // Get page parameter
    const pageParam = params.get('page');
    if (pageParam) {
      setCurrentPage(Math.max(1, parseInt(pageParam)));
    }
  }, [searchQuery]);

  // Update URL whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (query) params.set('q', query);
    if (selectedTypes.length > 0) params.set('types', selectedTypes.join(','));
    if (timeRange[0] !== 15 || timeRange[1] !== 60) {
      params.set('timeMin', timeRange[0]);
      params.set('timeMax', timeRange[1]);
    }
    if (selectedRating !== null) params.set('rating', selectedRating);
    if (sortBy !== 'A-Z') params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState(null, '', newUrl);
  }, [query, selectedTypes, timeRange, selectedRating, sortBy, currentPage]);

  // Sync isFavorite status with localStorage on mount
  useEffect(() => {
    const updated = ALL_RECIPES.map(recipe => ({
      ...recipe,
      isFavorite: isSaved(recipe.id)
    }));
    setRecipes(updated);
  }, [isSaved]);

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    let filtered = recipes.filter(recipe => {
      // Search query filter
      const matchesQuery = recipe.title.toLowerCase().includes(query.toLowerCase());

      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(recipe.type);

      // Time filter
      const matchesTime = recipe.time >= timeRange[0] && recipe.time <= timeRange[1];

      // Rating filter
      const matchesRating = selectedRating === null || recipe.rating === selectedRating;

      return matchesQuery && matchesType && matchesTime && matchesRating;
    });

    // Sort
    if (sortBy === 'A-Z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Z-A') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filtered;
  }, [query, selectedTypes, timeRange, selectedRating, sortBy, recipes]);

  // Pagination
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecipes.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredRecipes, currentPage]);

  const handleTypeChange = (type) => {
    setCurrentPage(1);
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleRatingChange = (rating) => {
    setCurrentPage(1);
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const handleFavoriteToggle = (id) => {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    // Toggle save in localStorage
    const recipeToSave = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      time: `${recipe.time} minutes`,
      type: recipe.type,
      rating: recipe.rating
    };

    toggleSave(recipeToSave);

    // Update local state
    setRecipes(recipes.map(r =>
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Container */}
      <div className="flex gap-6 max-w-7xl mx-auto px-4 py-8">
        
        {/* Left Sidebar - Filters */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              FILTERS
            </h2>

            {/* Type Filter */}
            <div className="mb-8">
              <h3 className="font-bold text-sm mb-4 flex justify-between items-center cursor-pointer">
                Type
                <span className="text-pink-500 text-lg">∧</span>
              </h3>
              <div className="space-y-3">
                {RECIPE_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="w-4 h-4 rounded border-gray-300 text-pink-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Time Filter */}
            <div className="mb-8">
              <h3 className="font-bold text-sm mb-4 flex justify-between items-center">
                Time
                <span className="text-pink-500 text-lg">∧</span>
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{timeRange[0]} minutes</span>
                  <span>{timeRange[1]} minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={timeRange[0]}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setTimeRange([parseInt(e.target.value), timeRange[1]]);
                  }}
                  className="w-full accent-pink-500 cursor-pointer"
                />
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={timeRange[1]}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setTimeRange([timeRange[0], parseInt(e.target.value)]);
                  }}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-8">
              <h3 className="font-bold text-sm mb-4 flex justify-between items-center">
                Rating
                <span className="text-pink-500 text-lg">∧</span>
              </h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRating === rating}
                      onChange={() => {
                        setCurrentPage(1);
                        handleRatingChange(rating);
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-pink-500 cursor-pointer"
                    />
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < rating ? 'text-yellow-400 text-sm' : 'text-gray-300 text-sm'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition">
              Apply
            </button>
          </div>
        </div>

        {/* Right Content - Results */}
        <div className="flex-1">
          {filteredRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Sorry, no results were found for "{query}"
              </h2>
              <p className="text-gray-600 mb-6">
                We have all your Independence Day sweets covered.
              </p>
              
              {/* Suggested Categories */}
              <div className="flex gap-3 flex-wrap justify-center">
                {SUGGESTED_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setQuery(category)}
                    className="px-4 py-2 rounded-full border-2 border-pink-500 text-pink-500 hover:bg-pink-50 transition font-medium text-sm"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Header with title and sort */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Salad <span className="text-gray-500">({filteredRecipes.length})</span>
                </h2>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>

              {/* Recipe Grid - 3 columns */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {paginatedRecipes.map((recipe) => (
                  <div 
                    key={recipe.id}
                    onClick={() => onViewRecipe && onViewRecipe(recipe)}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition group cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteToggle(recipe.id);
                        }}
                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:shadow-lg transition"
                      >
                        <svg
                          className={`w-6 h-6 transition ${recipe.isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 h-10">
                        {recipe.title}
                      </h3>
                      <p className="text-pink-500 text-xs font-semibold">
                        ⏱ {recipe.time} minutes
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="text-gray-600 hover:text-gray-800 transition"
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {[...Array(Math.min(totalPages, 11))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 11) {
                      pageNum = i + 1;
                    } else if (currentPage <= 6) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 5) {
                      pageNum = totalPages - 10 + i;
                    } else {
                      pageNum = currentPage - 5 + i;
                    }

                    if (pageNum > totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded ${
                          currentPage === pageNum
                            ? 'bg-pink-500 text-white font-bold'
                            : 'border border-gray-300 text-gray-700 hover:border-pink-500'
                        } transition`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 11 && currentPage < totalPages - 5 && (
                    <span className="text-gray-600">...</span>
                  )}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="text-gray-600 hover:text-gray-800 transition"
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
