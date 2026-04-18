import React from 'react';

const SummerRecipes = () => {
  const summerRecipes = [
    {
      id: 1,
      title: 'Italian-style tomato salad',
      category: 'salad',
      image: 'https://images.unsplash.com/photo-1608032077018-c9aad9565d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 2,
      title: 'Spaghetti with vegetables',
      category: 'spaghetti',
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 3,
      title: 'Lotus delight salad',
      category: 'salad',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 4,
      title: 'Snack cakes',
      category: 'cake',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80'
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">This Summer Recipes</h2>
          <p className="text-gray-600">We have all your Independence Day sweets covered.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {summerRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-44 object-cover"
                />
                <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{recipe.title}</h3>
                    <p className="text-sm text-pink-500 mt-1">{recipe.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummerRecipes;