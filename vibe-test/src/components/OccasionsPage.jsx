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
      { id: 1, title: 'Chocolate Cake', occasion: 'birthday', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
      { id: 2, title: 'Elegant Salmon', occasion: 'wedding', image: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=400&h=300&fit=crop' },
      { id: 3, title: 'Beef Filet Mignon', occasion: 'dinner', image: 'https://images.unsplash.com/photo-1568043666747-3b7e2a5f7b1a?w=400&h=300&fit=crop' },
      { id: 4, title: 'Turkey Dinner', occasion: 'holiday', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561081?w=400&h=300&fit=crop' },
      { id: 5, title: 'Picnic Sandwiches', occasion: 'picnic', image: 'https://images.unsplash.com/photo-1481070414801-51fd1d529d5b?w=400&h=300&fit=crop' },
      { id: 6, title: 'Brunch Pancakes', occasion: 'brunch', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop' },
      { id: 7, title: 'Pasta for Two', occasion: 'date', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop' },
      { id: 8, title: 'Tiramisu', occasion: 'birthday', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop' },
      { id: 9, title: 'Gourmet Appetizers', occasion: 'dinner', image: 'https://images.unsplash.com/photo-1568043666747-3b7e2a5f7b1a?w=400&h=300&fit=crop' },
      { id: 10, title: 'Holiday Cookies', occasion: 'holiday', image: 'https://images.unsplash.com/photo-1548365328-c9fa89d128fa?w=400&h=300&fit=crop' },
      { id: 11, title: 'Cold Salads', occasion: 'picnic', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop' },
      { id: 12, title: 'Eggs Benedict', occasion: 'brunch', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop' },
    ],
    birthday: [
      { id: 1, title: 'Chocolate Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
      { id: 8, title: 'Tiramisu', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop' },
    ],
    wedding: [
      { id: 2, title: 'Elegant Salmon', image: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=400&h=300&fit=crop' },
    ],
    dinner: [
      { id: 3, title: 'Beef Filet Mignon', image: 'https://images.unsplash.com/photo-1568043666747-3b7e2a5f7b1a?w=400&h=300&fit=crop' },
      { id: 9, title: 'Gourmet Appetizers', image: 'https://images.unsplash.com/photo-1568043666747-3b7e2a5f7b1a?w=400&h=300&fit=crop' },
    ],
    holiday: [
      { id: 4, title: 'Turkey Dinner', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561081?w=400&h=300&fit=crop' },
      { id: 10, title: 'Holiday Cookies', image: 'https://images.unsplash.com/photo-1548365328-c9fa89d128fa?w=400&h=300&fit=crop' },
    ],
    picnic: [
      { id: 5, title: 'Picnic Sandwiches', image: 'https://images.unsplash.com/photo-1481070414801-51fd1d529d5b?w=400&h=300&fit=crop' },
      { id: 11, title: 'Cold Salads', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop' },
    ],
    brunch: [
      { id: 6, title: 'Brunch Pancakes', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop' },
      { id: 12, title: 'Eggs Benedict', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop' },
    ],
    date: [
      { id: 7, title: 'Pasta for Two', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop' },
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
