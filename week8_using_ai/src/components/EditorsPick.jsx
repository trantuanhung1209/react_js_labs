import React from 'react';

const EditorsPick = () => {
  const editorPickRecipes = [
    {
      id: 1,
      title: 'Stuffed sticky rice ball',
      time: '23 minutes',
      author: 'Jennifer King',
      authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
      description: 'Stuffed sticky rice ball: a delightful Asian treat with chewy, glutinous rice and a flavorful surprise filling...',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 2,
      title: 'Strawberry smoothie',
      time: '10 minutes',
      author: 'Matthew Martinez',
      authorImg: 'https://randomuser.me/api/portraits/men/42.jpg',
      description: 'Savor the refreshing delight of a strawberry smoothie. Made with ripe strawberries, this creamy blend offers...',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80'
    },
    {
      id: 3,
      title: 'Latte Art',
      time: '15 minutes',
      author: 'Sarah Hill',
      authorImg: 'https://randomuser.me/api/portraits/women/57.jpg',
      description: 'Latte art is the skillful craft of creating captivating designs on the surface of a latte...',
      image: 'https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 4,
      title: 'Butter fried noodles',
      time: '18 minutes',
      author: 'Julia Lopez',
      authorImg: 'https://randomuser.me/api/portraits/women/63.jpg',
      description: 'Butter fried noodles: Savory noodles cooked in butter for a delicious and satisfying meal...',
      image: 'https://images.unsplash.com/photo-1634864572865-1cf8ff8bd23d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80'
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">Editor's pick</h2>
          <p className="text-gray-600">Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {editorPickRecipes.map((recipe) => (
            <div key={recipe.id} className="flex bg-white rounded-lg overflow-hidden shadow-md">
              <div className="w-1/3 min-h-[180px]">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-5 relative">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-800">{recipe.title}</h3>
                  <button className="text-pink-500 hover:text-pink-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center mt-3">
                  <img 
                    src={recipe.authorImg} 
                    alt={recipe.author}
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                  <span className="text-sm text-gray-700">{recipe.author}</span>
                </div>
                
                <p className="mt-3 text-sm text-gray-600">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorsPick;