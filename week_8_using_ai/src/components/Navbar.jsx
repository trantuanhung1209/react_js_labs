import { useState, useEffect } from "react"
import { Menu, X, Search, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "./Logo"
import LoginModal from "./LoginModal"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
    setIsMenuOpen(false)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  const handleLoginSuccess = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setIsMenuOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/search/${searchInput}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo />

            {/* Search Bar */}
            <div className="hidden md:flex ml-6 relative">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What would you like to cook?"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-pink-500 text-sm font-medium">
              What to cook
            </a>
            <a href="#" className="text-gray-700 hover:text-pink-500 text-sm font-medium">
              Recipes
            </a>
            <a href="#" className="text-gray-700 hover:text-pink-500 text-sm font-medium">
              Ingredients
            </a>
            <a href="#" className="text-gray-700 hover:text-pink-500 text-sm font-medium">
              Occasions
            </a>
            <a href="#" className="text-gray-700 hover:text-pink-500 text-sm font-medium">
              About Us
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-3 px-3 py-2 bg-gray-100 rounded-full">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm font-medium text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition flex items-center gap-1"
                  title="Logout"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={openLoginModal}
                  className="px-4 py-1 text-sm font-medium text-pink-500 hover:text-pink-600 focus:outline-none">
                  Login
                </button>
                <button className="px-4 py-1 text-sm font-medium text-white bg-pink-500 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
                  Subscribe
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="What would you like to cook?"
                className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
            <a href="#" className="block text-gray-700 hover:text-pink-500 font-medium">
              What to cook
            </a>
            <a href="#" className="block text-gray-700 hover:text-pink-500 font-medium">
              Recipes
            </a>
            <a href="#" className="block text-gray-700 hover:text-pink-500 font-medium">
              Ingredients
            </a>
            <a href="#" className="block text-gray-700 hover:text-pink-500 font-medium">
              Occasions
            </a>
            <a href="#" className="block text-gray-700 hover:text-pink-500 font-medium">
              About Us
            </a>
            <div className="flex space-x-4 pt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full w-full">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700 flex-1">{user.email}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm font-medium text-pink-500 border border-pink-500 rounded-full hover:bg-pink-50 focus:outline-none">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={openLoginModal}
                    className="px-4 py-1 text-sm font-medium text-pink-500 border border-pink-500 rounded-full hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 w-1/2">
                    Login
                  </button>
                  <button className="px-4 py-1 text-sm font-medium text-white bg-pink-500 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 w-1/2">
                    Subscribe
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />
      </div>
    </header>
  )
}

export default Navbar
