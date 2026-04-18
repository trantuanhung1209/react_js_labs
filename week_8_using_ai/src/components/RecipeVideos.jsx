import React from 'react';

const RecipeVideos = () => {
  const videoRecipes = [
    {
      id: 1,
      title: 'Salad with cabbage and shrimp',
      time: '12 minutes',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80'
    },
    {
      id: 2,
      title: 'Salad of cave beans, shrimp and potatoes',
      time: '25 minutes',
      image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    {
      id: 3,
      title: 'Sunny-side up fried egg',
      time: '15 minutes',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
    },
    {
      id: 4,
      title: 'Lotus delight salad',
      time: '20 minutes',
      image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80'
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">Recipes With Videos</h2>
          <p className="text-gray-600">Cooking Up Culinary Creations with Step-by-Step Videos</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </button>
                </div>
                <button className="absolute top-2 right-2 text-pink-500 hover:text-pink-600 bg-white rounded-full p-1.5 shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{recipe.title}</h3>
                <p className="text-xs text-pink-500 mt-1">{recipe.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeVideos;