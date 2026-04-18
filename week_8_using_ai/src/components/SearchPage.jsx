import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';

export default function SearchPage() {
  const { query } = useParams();
  const searchQuery = query || 'Salad';
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilter, setShowFilter] = useState(true);

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [timeRange, setTimeRange] = useState([5, 120]);

  const recipesPerPage = 9;
  // Mock data - replace with actual API call
  const allRecipes = [
    // Salads
    {
      id: 1,
      title: 'Cucumber salad, cherry tomatoes',
      time: '15 minutes',
      type: 'Grilled',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Italian-style tomato salad',
      time: '10 minutes',
      type: 'Fresh',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Potato Salad',
      time: '20 minutes',
      type: 'Roasted',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Salad with cabbage and shrimp',
      time: '18 minutes',
      type: 'Fresh',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'Five-color salad',
      time: '12 minutes',
      type: 'Grilled',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1515182629504-727d7753751f?w=500&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'Corn Salad',
      time: '25 minutes',
      type: 'Roasted',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop'
    },
    {
      id: 7,
      title: 'Salad with cabbage and shrimp',
      time: '18 minutes',
      type: 'Fresh',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop'
    },
    {
      id: 8,
      title: 'Lotus delight salad',
      time: '30 minutes',
      type: 'Grilled',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=400&fit=crop'
    },
    {
      id: 9,
      title: 'Avocado Salad',
      time: '8 minutes',
      type: 'Fresh',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop'
    },
    // Pizza
    {
      id: 10,
      title: 'Margherita Pizza',
      time: '25 minutes',
      type: 'Baked',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop'
    },
    {
      id: 11,
      title: 'Pepperoni Pizza',
      time: '30 minutes',
      type: 'Baked',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=500&h=400&fit=crop'
    },
    {
      id: 12,
      title: 'Vegetarian Pizza',
      time: '28 minutes',
      type: 'Baked',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1511689915661-c6f0ee4dba89?w=500&h=400&fit=crop'
    },
    {
      id: 13,
      title: 'BBQ Chicken Pizza',
      time: '35 minutes',
      type: 'Baked',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=400&fit=crop'
    },
    // Pasta
    {
      id: 14,
      title: 'Spaghetti Carbonara',
      time: '20 minutes',
      type: 'Fresh',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4c?w=500&h=400&fit=crop'
    },
    {
      id: 15,
      title: 'Penne Arrabbiata',
      time: '18 minutes',
      type: 'Fresh',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=400&fit=crop'
    },
    {
      id: 16,
      title: 'Fettuccine Alfredo',
      time: '22 minutes',
      type: 'Fresh',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1645112411341-6c4ee5381b80?w=500&h=400&fit=crop'
    },
    // Chicken
    {
      id: 17,
      title: 'Grilled Chicken Breast',
      time: '25 minutes',
      type: 'Grilled',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=400&fit=crop'
    },
    {
      id: 18,
      title: 'Roasted Chicken',
      time: '45 minutes',
      type: 'Roasted',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1598066978212-f63f8f988f73?w=500&h=400&fit=crop'
    },
    {
      id: 19,
      title: 'Chicken Stir Fry',
      time: '20 minutes',
      type: 'Grilled',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=400&fit=crop'
    },
    // Fish & Seafood
    {
      id: 20,
      title: 'Grilled Salmon',
      time: '20 minutes',
      type: 'Grilled',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop'
    },
    {
      id: 21,
      title: 'Baked Fish',
      time: '30 minutes',
      type: 'Baked',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=500&h=400&fit=crop'
    },
    {
      id: 22,
      title: 'Shrimp Fried Rice',
      time: '15 minutes',
      type: 'Fried',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=500&h=400&fit=crop'
    },
    // Soup
    {
      id: 23,
      title: 'Tomato Soup',
      time: '20 minutes',
      type: 'Fresh',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1547592166-7aae4d755744?w=500&h=400&fit=crop'
    },
    {
      id: 24,
      title: 'Chicken Noodle Soup',
      time: '30 minutes',
      type: 'Fresh',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1603046891750-36bde5e88981?w=500&h=400&fit=crop'
    },
    {
      id: 25,
      title: 'Vegetable Soup',
      time: '25 minutes',
      type: 'Fresh',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1547592166-7aae4d755744?w=500&h=400&fit=crop'
    },
    // Steak
    {
      id: 26,
      title: 'Grilled Steak',
      time: '20 minutes',
      type: 'Grilled',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&h=400&fit=crop'
    },
    {
      id: 27,
      title: 'Sirloin Steak',
      time: '18 minutes',
      type: 'Grilled',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&h=400&fit=crop'
    },
    // Dessert
    {
      id: 28,
      title: 'Chocolate Cake',
      time: '40 minutes',
      type: 'Baked',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop'
    },
    {
      id: 29,
      title: 'Strawberry Cheesecake',
      time: '30 minutes',
      type: 'Baked',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1533134242443-742ce1801911?w=500&h=400&fit=crop'
    }
  ];

  const types = ['Grilled', 'Roasted', 'Fresh', 'Baked', 'Steamed', 'Fried'];
  const ratingOptions = [5, 4, 3, 2, 1];

  // Apply filters and search
  useEffect(() => {
    let filtered = allRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(recipe => selectedTypes.includes(recipe.type));
    }

    // Apply time filter
    filtered = filtered.filter(recipe => {
      const time = parseInt(recipe.time);
      return time >= timeRange[0] && time <= timeRange[1];
    });

    // Apply rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedRatings.some(rating => recipe.rating >= rating)
      );
    }

    // Apply sorting
    if (sortBy === 'time') {
      filtered.sort((a, b) => parseInt(a.time) - parseInt(b.time));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedTypes, selectedRatings, timeRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const handleApplyFilters = () => {
    setShowFilter(false);
  };
  const hasResults = filteredRecipes.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilter ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
            <div className="bg-white rounded-lg p-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900 mb-6">FILTERS</h3>

              {/* Type Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 cursor-pointer">Type</h4>
                <div className="space-y-2">
                  {types.map(type => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="w-4 h-4 text-pink-500 rounded cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Time</h4>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600">
                    {timeRange[0]} minutes
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="120"
                    value={timeRange[1]}
                    onChange={(e) => setTimeRange([timeRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                  <label className="flex items-center text-sm text-gray-600">
                    {timeRange[1]} minutes
                  </label>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Rating</h4>
                <div className="space-y-2">
                  {ratingOptions.map(rating => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => handleRatingChange(rating)}
                        className="w-4 h-4 text-pink-500 rounded cursor-pointer"
                      />
                      <span className="ml-2 flex items-center text-sm text-gray-700">
                        {Array(5).fill(0).map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApplyFilters}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Apply
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header with Sort */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {searchQuery} <span className="text-gray-500">({filteredRecipes.length})</span>
              </h1>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              >
                <option value="relevance">A-Z</option>
                <option value="time">Time</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {hasResults ? (
              <>
                {/* Recipe Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedRecipes.map(recipe => (
                    <div
                      key={recipe.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer group"
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition">
                          <svg
                            className="w-5 h-5 text-pink-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{recipe.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-pink-500">{recipe.time}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-600">{recipe.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg transition ${
                          currentPage === page
                            ? 'bg-pink-500 text-white'
                            : 'hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16">
                <div className="mb-6">
                  <svg
                    className="w-32 h-32 text-pink-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Sorry, no results were found for "{searchQuery}"
                </h2>
                <p className="text-gray-600 mb-6">We have all your Independence Day sweets covered.</p>
                <div className="flex gap-2">
                  {['Sweet Cake', 'Black Cake', 'Picnic Snacks', 'Healthy Food'].map(tag => (
                    <button
                      key={tag}
                      className="px-4 py-2 border border-pink-300 text-pink-500 rounded-full hover:bg-pink-50 transition text-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
