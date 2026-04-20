import React, { useState, useMemo } from 'react';
import { useSavedRecipes } from '../hooks/useSavedRecipes';

const IngredientsPage = ({ onViewRecipe, onGoHome }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchIngredient, setSearchIngredient] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isSaved, toggleSave } = useSavedRecipes();

  const allIngredients = [
    'Chicken', 'Beef', 'Salmon', 'Shrimp', 'Tofu', 'Egg', 'Milk', 'Cheese',
    'Tomato', 'Lettuce', 'Cucumber', 'Carrot', 'Broccoli', 'Spinach', 'Garlic', 'Onion',
    'Rice', 'Pasta', 'Bread', 'Flour', 'Olive Oil', 'Butter', 'Salt', 'Pepper',
    'Lemon', 'Lime', 'Orange', 'Apple', 'Banana', 'Strawberry', 'Chocolate', 'Vanilla'
  ];

  const filteredIngredients = useMemo(() => {
    return allIngredients.filter(ing =>
      ing.toLowerCase().includes(searchIngredient.toLowerCase())
    );
  }, [searchIngredient]);

  // Mock recipe data based on selected ingredients
  const recipes = [
    { id: 1, title: 'Avocado Salad', ingredients: ['Avocado', 'Lettuce', 'Cheese'], image: '/images/3_Data/Lab_03/avacador_salad.png' },
    { id: 2, title: 'Corn Salad', ingredients: ['Corn', 'Tomato', 'Olive Oil'], image: '/images/3_Data/Lab_03/corn_salad.png' },
    { id: 3, title: 'Shrimp & Bean Salad', ingredients: ['Shrimp', 'Bean', 'Potato'], image: '/images/3_Data/Lab_03/Bean, shrimp, and potato salad.png' },
    { id: 4, title: 'Italian-style Tomato', ingredients: ['Pasta', 'Tomato', 'Garlic', 'Olive Oil'], image: '/images/3_Data/Lab_03/Italian-style tomato.png' },
    { id: 5, title: 'Five Color Salad', ingredients: ['Vegetable', 'Carrot', 'Garlic', 'Onion'], image: '/images/3_Data/Lab_03/five_color_salad.png' },
    { id: 6, title: 'Sunny-side up Eggs', ingredients: ['Egg', 'Cheese', 'Butter'], image: '/images/3_Data/Lab_03/Sunny-side up fried eggs.png' },
    { id: 7, title: 'Cabbage & Shrimp', ingredients: ['Cabbage', 'Shrimp', 'Lettuce', 'Tomato'], image: '/images/3_Data/Lab_03/salad_with_cabbage_and_shrimp.png' },
    { id: 8, title: 'Cucumber Salad', ingredients: ['Cucumber', 'Tomato', 'Butter', 'Cheese'], image: '/images/3_Data/Lab_03/cucumber_salad_charry_tomatoes.png' },
  ];

  const filteredRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) return recipes;
    return recipes.filter(recipe =>
      selectedIngredients.some(ing => recipe.ingredients.includes(ing))
    );
  }, [selectedIngredients]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
    setCurrentPage(1);
  };

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const paginatedRecipes = filteredRecipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={onGoHome} className="text-pink-100 hover:text-white mb-4 text-sm">← Home</button>
          <h1 className="text-4xl font-bold mb-4">Browse by Ingredients</h1>
          <p className="text-pink-100">Select ingredients to find recipes you can make</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Ingredients Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Ingredients</h3>
              
              {/* Search */}
              <div className="mb-4 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchIngredient}
                  onChange={(e) => setSearchIngredient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Selected */}
              {selectedIngredients.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">SELECTED ({selectedIngredients.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredients.map(ing => (
                      <button
                        key={ing}
                        onClick={() => toggleIngredient(ing)}
                        className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full hover:bg-pink-600 transition"
                      >
                        {ing} ✕
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedIngredients([])}
                    className="mt-3 w-full text-sm text-pink-500 hover:text-pink-600 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* All Ingredients */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredIngredients.map(ingredient => (
                  <label key={ingredient} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient)}
                      onChange={() => toggleIngredient(ingredient)}
                      className="w-4 h-4 text-pink-500 rounded"
                    />
                    <span className="text-sm text-gray-700">{ingredient}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Recipes */}
          <main className="lg:col-span-3">
            {filteredRecipes.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg">No recipes match your selected ingredients</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                        <h3 className="font-bold text-gray-900 mb-2">{recipe.title}</h3>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.slice(0, 2).map(ing => (
                            <span key={ing} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                              {ing}
                            </span>
                          ))}
                          {recipe.ingredients.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              +{recipe.ingredients.length - 2}
                            </span>
                          )}
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
                    {Array.from({ length: totalPages }).map((_, i) => (
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default IngredientsPage;
