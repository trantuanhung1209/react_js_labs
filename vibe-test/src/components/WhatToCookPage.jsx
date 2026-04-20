import React, { useState, useMemo } from 'react';
import { useSavedRecipes } from '../hooks/useSavedRecipes';

const WhatToCookPage = ({ onViewRecipe, onGoHome }) => {
  const [selectedMealType, setSelectedMealType] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedTime, setSelectedTime] = useState('any');
  const [currentPage, setCurrentPage] = useState(1);
  const { isSaved, toggleSave } = useSavedRecipes();

  const mealTypes = [
    { id: 'all', label: 'All Meals', icon: '🍽️' },
    { id: 'breakfast', label: 'Breakfast', icon: '🥐' },
    { id: 'lunch', label: 'Lunch', icon: '🥗' },
    { id: 'dinner', label: 'Dinner', icon: '🍽️' },
    { id: 'dessert', label: 'Dessert', icon: '🍰' },
    { id: 'snacks', label: 'Snacks', icon: '🍿' }
  ];

  const dietaryOptions = [
    { id: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'glutenfree', label: 'Gluten Free' },
    { id: 'keto', label: 'Keto' },
    { id: 'paleo', label: 'Paleo' }
  ];

  const timeRanges = [
    { id: 'any', label: 'Any Time' },
    { id: '15', label: 'Under 15 min' },
    { id: '30', label: 'Under 30 min' },
    { id: '60', label: 'Under 1 hour' }
  ];

  // Mock recipes with meal types and dietary info
  const allRecipes = [
    { id: 1, title: 'Caesar Salad', type: 'lunch', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', time: 15, dietary: ['vegan', 'vegetarian', 'glutenfree'] },
    { id: 2, title: 'Grilled Chicken Breast', type: 'dinner', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop', time: 45, dietary: ['keto', 'paleo'] },
    { id: 3, title: 'Pancakes', type: 'breakfast', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', time: 30, dietary: ['vegetarian'] },
    { id: 4, title: 'Chocolate Cake', type: 'dessert', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', time: 60, dietary: ['vegetarian'] },
    { id: 5, title: 'Trail Mix', type: 'snacks', image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b39?w=400&h=300&fit=crop', time: 5, dietary: ['vegan', 'vegetarian'] },
    { id: 6, title: 'Buddha Bowl', type: 'lunch', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', time: 25, dietary: ['vegan', 'vegetarian', 'glutenfree'] },
    { id: 7, title: 'Salmon with Vegetables', type: 'dinner', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', time: 50, dietary: ['paleo', 'keto'] },
    { id: 8, title: 'Smoothie Bowl', type: 'breakfast', image: 'https://images.unsplash.com/photo-1590080876-1f0b3b1c1f00?w=400&h=300&fit=crop', time: 10, dietary: ['vegan', 'vegetarian'] },
  ];

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
      const matchesMealType = selectedMealType === 'all' || recipe.type === selectedMealType;
      const matchesDietary = selectedDietary.length === 0 || selectedDietary.some(d => recipe.dietary.includes(d));
      const matchesTime = selectedTime === 'any' || recipe.time <= parseInt(selectedTime);
      
      return matchesMealType && matchesDietary && matchesTime;
    });
  }, [selectedMealType, selectedDietary, selectedTime]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const paginatedRecipes = filteredRecipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={onGoHome} className="text-pink-100 hover:text-white mb-4 text-sm">← Home</button>
          <h1 className="text-4xl font-bold mb-2">What to Cook</h1>
          <p className="text-pink-100">Discover recipes based on your preferences and dietary needs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-20 space-y-6">
              {/* Meal Type */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Meal Type</h3>
                <div className="space-y-2">
                  {mealTypes.map(meal => (
                    <button
                      key={meal.id}
                      onClick={() => { setSelectedMealType(meal.id); setCurrentPage(1); }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                        selectedMealType === meal.id
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{meal.icon}</span>
                      <span>{meal.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cooking Time */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Cooking Time</h3>
                <div className="space-y-2">
                  {timeRanges.map(time => (
                    <button
                      key={time.id}
                      onClick={() => { setSelectedTime(time.id); setCurrentPage(1); }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedTime === time.id
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Dietary</h3>
                <div className="space-y-2">
                  {dietaryOptions.map(option => (
                    <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDietary.includes(option.id)}
                        onChange={() => {
                          setSelectedDietary(prev => 
                            prev.includes(option.id)
                              ? prev.filter(d => d !== option.id)
                              : [...prev, option.id]
                          );
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 text-pink-500 rounded"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Recipes Grid */}
          <main className="lg:col-span-3">
            {paginatedRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No recipes match your filters</p>
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
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
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
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>⏱ {recipe.time} min</span>
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

export default WhatToCookPage;
