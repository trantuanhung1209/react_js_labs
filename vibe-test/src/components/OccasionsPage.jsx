import React, { useState } from 'react';
import { useSavedRecipes } from '../hooks/useSavedRecipes';

const OccasionsPage = ({ onViewRecipe, onGoHome }) => {
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { isSaved, toggleSave } = useSavedRecipes();

  const occasions = [
    {
      id: 'all',
      name: 'All Occasions',
      icon: '🎉',
      description: 'Browse all special occasion recipes'
    },
    {
      id: 'birthday',
      name: 'Birthday',
      icon: '🎂',
      description: 'Celebrate with delicious cakes and treats'
    },
    {
      id: 'wedding',
      name: 'Wedding',
      icon: '💍',
      description: 'Elegant recipes for your special day'
    },
    {
      id: 'dinner',
      name: 'Dinner Party',
      icon: '🍽️',
      description: 'Impress your guests with these recipes'
    },
    {
      id: 'holiday',
      name: 'Holiday',
      icon: '🎄',
      description: 'Festive recipes for celebrations'
    },
    {
      id: 'picnic',
      name: 'Picnic',
      icon: '🧺',
      description: 'Easy portable recipes for outdoor fun'
    },
    {
      id: 'brunch',
      name: 'Brunch',
      icon: '☕',
      description: 'Perfect morning recipes'
    },
    {
      id: 'date',
      name: 'Date Night',
      icon: '❤️',
      description: 'Romantic recipes for two'
    },
  ];

  const recipesData = {
    all: [
      { id: 1, title: 'Snack Cakes', occasion: 'birthday', image: '/images/3_Data/Lab_03/Snack cakes.png' },
      { id: 2, title: 'Vegetable & Shrimp', occasion: 'wedding', image: '/images/3_Data/Lab_03/Vegetable and shrimp spaghetti.png' },
      { id: 3, title: 'Italian-style Tomato', occasion: 'dinner', image: '/images/3_Data/Lab_03/Italian-style tomato.png' },
      { id: 4, title: 'Bean & Shrimp Salad', occasion: 'holiday', image: '/images/3_Data/Lab_03/Bean, shrimp, and potato salad.png' },
      { id: 5, title: 'Cucumber Salad', occasion: 'picnic', image: '/images/3_Data/Lab_03/cucumber_salad_charry_tomatoes.png' },
      { id: 6, title: 'Sunny-side up Eggs', occasion: 'brunch', image: '/images/3_Data/Lab_03/Sunny-side up fried eggs.png' },
      { id: 7, title: 'Italian Tomato Pasta', occasion: 'date', image: '/images/3_Data/Lab_03/italian_style_tomato_salad.png' },
      { id: 8, title: 'Lotus Delight', occasion: 'birthday', image: '/images/3_Data/Lab_03/lotus_delight_salad.png' },
      { id: 9, title: 'Avocado Salad', occasion: 'dinner', image: '/images/3_Data/Lab_03/avacador_salad.png' },
      { id: 10, title: 'Corn Salad', occasion: 'holiday', image: '/images/3_Data/Lab_03/corn_salad.png' },
      { id: 11, title: 'Cabbage Salad', occasion: 'picnic', image: '/images/3_Data/Lab_03/salad_with_cabbage_and_shrimp.png' },
      { id: 12, title: 'Five Color Salad', occasion: 'brunch', image: '/images/3_Data/Lab_03/five_color_salad.png' },
    ],
    birthday: [
      { id: 1, title: 'Snack Cakes', image: '/images/3_Data/Lab_03/Snack cakes.png' },
      { id: 8, title: 'Lotus Delight', image: '/images/3_Data/Lab_03/lotus_delight_salad.png' },
    ],
    wedding: [
      { id: 2, title: 'Vegetable & Shrimp', image: '/images/3_Data/Lab_03/Vegetable and shrimp spaghetti.png' },
    ],
    dinner: [
      { id: 3, title: 'Italian-style Tomato', image: '/images/3_Data/Lab_03/Italian-style tomato.png' },
      { id: 9, title: 'Avocado Salad', image: '/images/3_Data/Lab_03/avacador_salad.png' },
    ],
    holiday: [
      { id: 4, title: 'Bean & Shrimp Salad', image: '/images/3_Data/Lab_03/Bean, shrimp, and potato salad.png' },
      { id: 10, title: 'Corn Salad', image: '/images/3_Data/Lab_03/corn_salad.png' },
    ],
    picnic: [
      { id: 5, title: 'Cucumber Salad', image: '/images/3_Data/Lab_03/cucumber_salad_charry_tomatoes.png' },
      { id: 11, title: 'Cabbage Salad', image: '/images/3_Data/Lab_03/salad_with_cabbage_and_shrimp.png' },
    ],
    brunch: [
      { id: 6, title: 'Sunny-side up Eggs', image: '/images/3_Data/Lab_03/Sunny-side up fried eggs.png' },
      { id: 12, title: 'Five Color Salad', image: '/images/3_Data/Lab_03/five_color_salad.png' },
    ],
    date: [
      { id: 7, title: 'Italian Tomato Pasta', image: '/images/3_Data/Lab_03/italian_style_tomato_salad.png' },
    ],
  };

  const displayRecipes = selectedOccasion === 'all' 
    ? recipesData.all 
    : recipesData[selectedOccasion] || [];

  const itemsPerPage = 12;
  const totalPages = Math.ceil(displayRecipes.length / itemsPerPage);
  const paginatedRecipes = displayRecipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={onGoHome} className="text-pink-100 hover:text-white mb-4 text-sm">← Home</button>
          <h1 className="text-4xl font-bold mb-4">Recipes for Every Occasion</h1>
          <p className="text-pink-100">Find the perfect recipe for your next celebration</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Occasions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {occasions.map(occasion => (
            <button
              key={occasion.id}
              onClick={() => {
                setSelectedOccasion(occasion.id);
                setCurrentPage(1);
              }}
              className={`p-4 rounded-lg transition transform hover:scale-105 ${
                selectedOccasion === occasion.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-900 shadow hover:shadow-lg'
              }`}
            >
              <div className="text-3xl mb-2">{occasion.icon}</div>
              <p className="font-bold text-sm mb-1">{occasion.name}</p>
              <p className={`text-xs ${selectedOccasion === occasion.id ? 'text-pink-100' : 'text-gray-600'}`}>
                {occasion.description}
              </p>
            </button>
          ))}
        </div>

        {/* Recipes */}
        {displayRecipes.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No recipes found for this occasion</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {occasions.find(o => o.id === selectedOccasion)?.name} Recipes
            </h2>
            
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
                    <h3 className="font-bold text-gray-900">{recipe.title}</h3>
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
      </div>
    </div>
  );
};

export default OccasionsPage;
