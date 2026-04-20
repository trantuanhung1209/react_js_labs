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
    image: '/images/3_Data/Lab_03/cucumber_salad_charry_tomatoes.png',
    isFavorite: false
  },
  {
    id: 2,
    title: 'Italian-style tomato salad',
    type: 'Pan-fried',
    time: 32,
    rating: 5,
    image: '/images/3_Data/Lab_03/italian_style_tomato_salad.png',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Potato Salad',
    type: 'Sauteed',
    time: 32,
    rating: 4,
    image: '/images/3_Data/Lab_03/Potato Salad.png',
    isFavorite: false
  },
  {
    id: 4,
    title: 'Salad with cabbage and shrimp',
    type: 'Steamed',
    time: 32,
    rating: 3,
    image: '/images/3_Data/Lab_03/salad_with_cabbage_and_shrimp.png',
    isFavorite: false
  },
  {
    id: 5,
    title: 'Five-color salad',
    type: 'Pan-fried',
    time: 32,
    rating: 5,
    image: '/images/3_Data/Lab_03/five_color_salad.png',
    isFavorite: false
  },
  {
    id: 6,
    title: 'Corn Salad',
    type: 'Grilled',
    time: 32,
    rating: 4,
    image: '/images/3_Data/Lab_03/corn_salad.png',
    isFavorite: false
  },
  {
    id: 7,
    title: 'Bean, Shrimp & Potato Salad',
    type: 'Steamed',
    time: 32,
    rating: 3,
    image: '/images/3_Data/Lab_03/Bean, shrimp, and potato salad.png',
    isFavorite: false
  },
  {
    id: 8,
    title: 'Lotus delight salad',
    type: 'Sauteed',
    time: 32,
    rating: 5,
    image: '/images/3_Data/Lab_03/lotus_delight_salad.png',
    isFavorite: false
  },
  {
    id: 9,
    title: 'Avocado Salad',
    type: 'Pan-fried',
    time: 32,
    rating: 4,
    image: '/images/3_Data/Lab_03/avacador_salad.png',
    isFavorite: false
  },
  {
    id: 10,
    title: 'Lotus Delight',
    type: 'Roasted',
    time: 28,
    rating: 5,
    image: '/images/3_Data/Lab_03/Lotus delight salad_01.png',
    isFavorite: false
  },
  {
    id: 11,
    title: 'Vegetable & Shrimp Spaghetti',
    type: 'Pan-fried',
    time: 25,
    rating: 4,
    image: '/images/3_Data/Lab_03/Vegetable and shrimp spaghetti.png',
    isFavorite: false
  },
  {
    id: 12,
    title: 'Sunny-side up Fried Eggs',
    type: 'Steamed',
    time: 15,
    rating: 5,
    image: '/images/3_Data/Lab_03/Sunny-side up fried eggs.png',
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
      {/* Header Section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">Search Recipes</h1>
          <p className="text-pink-100 mb-6">Find your perfect recipe from our extensive collection</p>
          
          {/* Quick Search Bar */}
          <div className="mb-6">
            <form onSubmit={(e) => { e.preventDefault(); setCurrentPage(1); }} className="flex gap-2">
              <div className="flex-1 flex items-center bg-white/90 rounded-lg px-4 py-3 hover:bg-white transition">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="Quick search recipes..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 bg-transparent ml-2 text-sm outline-none text-gray-800 placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-pink-500 font-semibold rounded-lg hover:bg-pink-50 transition"
              >
                Search
              </button>
            </form>
          </div>
          
          {/* Search Stats */}
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-pink-200 text-xs font-semibold uppercase">Total Recipes</p>
              <p className="font-bold text-2xl mt-1">{filteredRecipes.length}</p>
            </div>
            <div>
              <p className="text-pink-200 text-xs font-semibold uppercase">Filters Applied</p>
              <p className="font-bold text-2xl mt-1">
                {selectedTypes.length + (timeRange[0] !== 15 || timeRange[1] !== 60 ? 1 : 0) + (selectedRating !== null ? 1 : 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Container */}
      <div className="flex gap-6 max-w-7xl mx-auto px-4 pb-8">
        
        {/* Left Sidebar - Filters */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-lg p-6 sticky top-24 shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 pb-4 border-b border-gray-200">
              <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-gray-900">FILTERS</span>
            </h2>

            {/* Type Filter */}
            <div className="mb-8 pb-6 border-b border-gray-100">
              <h3 className="font-bold text-sm mb-4 text-gray-900">Recipe Type</h3>
              <div className="space-y-3">
                {RECIPE_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer hover:text-pink-500 transition">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="w-4 h-4 rounded border-gray-300 text-pink-500 cursor-pointer accent-pink-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Time Filter */}
            <div className="mb-8 pb-6 border-b border-gray-100">
              <h3 className="font-bold text-sm mb-4 text-gray-900">Cooking Time</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-gray-600 font-semibold">
                  <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded">{timeRange[0]} min</span>
                  <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded">{timeRange[1]} min</span>
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
            <div>
              <h3 className="font-bold text-sm mb-4 text-gray-900">Rating</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer hover:text-pink-500 transition">
                    <input
                      type="checkbox"
                      checked={selectedRating === rating}
                      onChange={() => {
                        setCurrentPage(1);
                        handleRatingChange(rating);
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-pink-500 cursor-pointer accent-pink-500"
                    />
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition mt-6">
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
                    className="px-6 py-2 rounded-full border-2 border-pink-300 text-pink-600 hover:border-pink-500 hover:bg-pink-50 hover:shadow-md transition font-semibold text-sm bg-white"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Header with title and sort */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  Results <span className="text-gray-400">({filteredRecipes.length})</span>
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent hover:border-pink-300 transition bg-white cursor-pointer"
                  >
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                  </select>
                </div>
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
                <div className="flex justify-center items-center gap-2 mb-8 py-6 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                  >
                    ‹ Previous
                  </button>

                  <div className="flex gap-1 mx-4">
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
                        className={`w-8 h-8 rounded-lg font-semibold transition ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md'
                            : 'border border-gray-200 text-gray-700 hover:border-pink-500 hover:bg-pink-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  </div>
                  {totalPages > 11 && currentPage < totalPages - 5 && (
                    <span className="text-gray-400 font-bold">...</span>
                  )}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                  >
                    Next ›
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
