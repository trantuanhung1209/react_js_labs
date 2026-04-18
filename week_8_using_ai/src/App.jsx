import { useEffect, useState } from 'react';
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import RecipeVideos from "./components/RecipeVideos"
import SummerRecipes from "./components/SummerRecipes"
import EditorsPick from './components/EditorsPick';
import Footer from "./components/Footer";
import DiscoverModal from './components/DiscoverModal';


function App() {
  const [showModal, setShowModal] = useState(false);

  // Hiển thị modal khi vào trang web (chỉ lần đầu tiên)
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenDiscoverModal');
    if (!hasSeenModal) {
      setShowModal(true);
      localStorage.setItem('hasSeenDiscoverModal', 'true');
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <DiscoverModal isOpen={showModal} onClose={handleCloseModal} />
      <main className="flex-grow">
        <Hero />
        <SummerRecipes/>
        <RecipeVideos/>
        <EditorsPick/>
      </main>
      <Footer />
    </div>
  )
}

export default App
