import { Link } from 'react-router-dom';

const Logo = () => {
    return (
      <Link to="/" className="flex items-center hover:opacity-80 transition">
        <svg className="h-8 w-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C7.58 2 4 5.58 4 10c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.31-2.69 6-6 6z" />
          <path d="M12 4c-3.31 0-6 2.69-6 6 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.21-1.79 4-4 4z" />
          <path d="M12 6c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.21-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2 0-1.1.9-2 2-2s2 .9 2 2c0 1.1-.9 2-2 2z" />
        </svg>
        <span className="text-2xl font-bold text-pink-500 ml-2">Chefify</span>
      </Link>
    )
  }
  
  export default Logo
  