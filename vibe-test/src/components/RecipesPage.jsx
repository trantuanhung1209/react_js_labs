import React, { useState, useMemo } from 'react';
import { useSavedRecipes } from '../hooks/useSavedRecipes';

const RecipesPage = ({ onViewRecipe, onGoHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const { isSaved, toggleSave } = useSavedRecipes();

  const recipes = [
    { id: 1, title: 'Avocado Salad', category: 'Salads', rating: 5, reviews: 120, image: '/images/3_Data/Lab_03/avacador_salad.png' },
    { id: 2, title: 'Vegetable & Shrimp', category: 'Main Dishes', rating: 5, reviews: 95, image: '/images/3_Data/Lab_03/Vegetable and shrimp spaghetti.png' },
    { id: 3, title: 'Sunny-side up Eggs', category: 'Breakfast', rating: 4.8, reviews: 150, image: '/images/3_Data/Lab_03/Sunny-side up fried eggs.png' },
    { id: 4, title: 'Snack Cakes', category: 'Desserts', rating: 5, reviews: 200, image: '/images/3_Data/Lab_03/Snack cakes.png' },
    { id: 5, title: 'Italian-style Tomato', category: 'Main Dishes', rating: 4.9, reviews: 85, image: '/images/3_Data/Lab_03/Italian-style tomato.png' },
    { id: 6, title: 'Five Color Salad', category: 'Salads', rating: 4.7, reviews: 110, image: '/images/3_Data/Lab_03/five_color_salad.png' },
    { id: 7, title: 'Bean & Shrimp Salad', category: 'Main Dishes', rating: 4.9, reviews: 75, image: '/images/3_Data/Lab_03/Bean, shrimp, and potato salad.png' },
    { id: 8, title: 'Cucumber Salad', category: 'Breakfast', rating: 4.8, reviews: 95, image: '/images/3_Data/Lab_03/cucumber_salad_charry_tomatoes.png' },
    { id: 9, title: 'Lotus Delight', category: 'Desserts', rating: 5, reviews: 170, image: '/images/3_Data/Lab_03/lotus_delight_salad.png' },
    { id: 10, title: 'Potato Salad', category: 'Main Dishes', rating: 4.9, reviews: 130, image: '/images/3_Data/Lab_03/Potato Salad.png' },
    { id: 11, title: 'Cabbage Salad', category: 'Salads', rating: 4.8, reviews: 80, image: '/images/3_Data/Lab_03/salad_with_cabbage_and_shrimp.png' },
    { id: 12, title: 'Italian Tomato Salad', category: 'Desserts', rating: 4.9, reviews: 165, image: '/images/3_Data/Lab_03/italian_style_tomato_salad.png' },
  ];

  const filteredRecipes = useMemo(() => {
    let filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'topRated') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'mostReviewed') {
      filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [searchQuery, sortBy]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const paginatedRecipes = filteredRecipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={onGoHome} className="text-pink-100 hover:text-white mb-4 text-sm">← Home</button>
          <h1 className="text-4xl font-bold mb-4">Browse All Recipes</h1>
          <p className="text-pink-100 mb-6">Explore thousands of delicious recipes</p>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">Showing {paginatedRecipes.length} recipes</p>
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="newest">Newest</option>
            <option value="topRated">Top Rated</option>
            <option value="mostReviewed">Most Reviewed</option>
          </select>
        </div>

        {/* Grid */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {paginatedRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => onViewRecipe && onViewRecipe(recipe)}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer group"
                >
                  <div className="relative h-40 bg-gray-200 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(recipe);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition ${
                        isSaved(recipe.id)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white/80 hover:bg-white text-pink-500'
                      }`}
                    >
                      ♥
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-pink-500 font-semibold mb-1">{recipe.category}</p>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{recipe.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>⭐ {recipe.rating}</span>
                      <span>({recipe.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-full font-medium transition ${
                      currentPage === i + 1
                        ? 'bg-pink-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
