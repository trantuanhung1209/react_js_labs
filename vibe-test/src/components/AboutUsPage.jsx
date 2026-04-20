import React from 'react';

const AboutUsPage = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <button onClick={onGoHome} className="text-pink-100 hover:text-white mb-4 text-sm">← Home</button>
          <h1 className="text-5xl font-bold mb-4">About Chefify</h1>
          <p className="text-xl text-pink-100">Bringing delicious recipes and culinary inspiration to your kitchen</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                At Chefify, we believe cooking should be enjoyable, accessible, and inspiring for everyone. Our mission is to help home cooks discover new recipes, learn cooking techniques, and share their culinary creations with a community of food lovers.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We curate thousands of tested recipes from around the world, making it easy for you to find exactly what you're looking for – whether you're planning a weeknight dinner or preparing for a special occasion.
              </p>
            </div>
            <img 
              src="/images/3_Data/Lab_03/five_color_salad.png"
              alt="Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-pink-50 rounded-lg p-6">
              <div className="text-4xl mb-3">🥘</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Quality Recipes</h3>
              <p className="text-gray-600">Every recipe is tested and reviewed to ensure reliability and taste. We only feature recipes we're proud to recommend.</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-6">
              <div className="text-4xl mb-3">👨‍🍳</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Expert Community</h3>
              <p className="text-gray-600">Learn from professional chefs and experienced home cooks. Our community shares tips, tricks, and culinary wisdom.</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-6">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Global Cuisine</h3>
              <p className="text-gray-600">Explore diverse cuisines from around the world. From Asian to European, we celebrate culinary traditions everywhere.</p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Chefify was founded in 2020 by a group of passionate food enthusiasts who wanted to make cooking more accessible and enjoyable for everyone. What started as a small blog has grown into a thriving community of millions of cooks around the world.
            </p>
            <p>
              Our team includes food writers, photographers, nutritionists, and software engineers who work together to create the best recipe platform possible. We're committed to continuous innovation and always listening to our community's feedback.
            </p>
            <p>
              Today, Chefify hosts over 50,000 recipes covering every cuisine, dietary preference, and skill level. Whether you're a beginner or an experienced cook, we have something for you.
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet the Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO', image: '/images/3_Data/Lab_03/avatar.png' },
              { name: 'Michael Chen', role: 'Head Chef', image: '/images/3_Data/Lab_03/avatar.png' },
              { name: 'Emma Davis', role: 'Food Writer', image: '/images/3_Data/Lab_03/avatar_small.png' },
              { name: 'Alex Rodriguez', role: 'Tech Lead', image: '/images/3_Data/Lab_03/avatar.png' },
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-pink-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">By The Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-lg p-8 text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p>Recipes</p>
            </div>
            <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-lg p-8 text-center">
              <div className="text-4xl font-bold mb-2">10M+</div>
              <p>Monthly Users</p>
            </div>
            <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-lg p-8 text-center">
              <div className="text-4xl font-bold mb-2">195</div>
              <p>Countries</p>
            </div>
            <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-lg p-8 text-center">
              <div className="text-4xl font-bold mb-2">24</div>
              <p>Languages</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16 bg-pink-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-pink-500 hover:text-pink-600">hello@chefify.com</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">123 Culinary Street, Food City, FC 12345</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Social</h3>
              <p className="text-gray-600">Follow us @ChefifyRecipes</p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">Subscribe to get weekly recipes and cooking tips delivered to your inbox</p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Chefify. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
