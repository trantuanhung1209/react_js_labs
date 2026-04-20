import { useState } from 'react';
import { useAuth } from '../context/useAuth';

export default function LoginModal({ isOpen, onClose }) {
  const { login, signup, socialLogin, isLoading, error } = useAuth();
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [localError, setLocalError] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!loginData.email || !loginData.password) {
      setLocalError('Please enter email and password');
      return;
    }
    try {
      await login(loginData.email, loginData.password);
      setLoginData({ email: '', password: '' });
      onClose();
    } catch (err) {
      setLocalError(err.message || 'Login failed');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      setLocalError('Please fill in all fields');
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    if (signupData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    try {
      await signup(
        signupData.firstName,
        signupData.lastName,
        signupData.email,
        signupData.password
      );
      setSignupData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
      onClose();
    } catch (err) {
      setLocalError(err.message || 'Signup failed');
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLogin = async (provider) => {
    setLocalError('');
    try {
      const email = `user.${provider}.${Date.now()}@example.com`;
      const firstName = provider.charAt(0).toUpperCase() + provider.slice(1);
      await socialLogin(provider, email, firstName, 'User');
      onClose();
    } catch (err) {
      setLocalError(err.message || `${provider} login failed`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        .slide-in {
          animation: slideInRight 0.5s ease-in-out forwards;
        }
        .slide-out {
          animation: slideOutLeft 0.5s ease-in-out forwards;
        }
      `}</style>

      <div className="bg-white rounded-2xl max-w-4xl w-full flex overflow-hidden shadow-2xl relative" style={{ height: '600px' }}>
        {/* Left Side - Image with Quote */}
        <div 
          className="hidden md:flex md:w-1/2 bg-gradient-to-b from-blue-300 to-blue-400 relative transition-transform duration-500 ease-in-out" 
          style={{
            transform: isSignupMode ? 'translateX(-100%)' : 'translateX(0)',
          }}
        >
          <img
            src="/images/3_Data/Lab_03/Lotus delight salad_01.png"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
          {/* Quote Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <p className="text-white text-3xl font-bold text-center px-6 leading-tight">
              "Embrace the art of cooking, where flavors come alive!"
            </p>
          </div>
        </div>

        {/* Right Side - Form Container with Slide Animation */}
        <div className="w-full md:w-1/2 relative overflow-hidden" style={{ perspective: '1000px' }}>
          {/* Login Form */}
          <div
            className="w-full p-8 absolute inset-0 transition-transform duration-500 ease-in-out"
            style={{
              transform: isSignupMode ? 'translateX(100%)' : 'translateX(0)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-transparent hover:bg-gray-100 rounded-full p-2 transition"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Title */}
            <h1 className="text-4xl font-bold text-black mb-2">Login</h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base mb-6">Enter your credentials to log in.</p>

            {/* Error Message */}
            {(localError || error) && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{localError || error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleContinue} className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 250px)' }}>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 border-t border-gray-300" />
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            {/* Signup Link */}
            <p className="text-gray-600 text-sm text-center mb-4">
              Don't have an account?{' '}
              <button
                onClick={() => setIsSignupMode(true)}
                className="text-pink-500 font-semibold hover:text-pink-600 transition"
              >
                Sign up
              </button>
            </p>

            {/* Terms Text */}
            <p className="text-gray-600 text-xs text-center mb-4">
              By continuing, you agree to the updated{' '}
              <a href="#" className="text-gray-800 font-semibold hover:text-pink-500">
                Terms of Sale
              </a>
              ,{' '}
              <a href="#" className="text-gray-800 font-semibold hover:text-pink-500">
                Terms of Service
              </a>
              , and{' '}
              <a href="#" className="text-gray-800 font-semibold hover:text-pink-500">
                Privacy Policy
              </a>
              .
            </p>

            {/* Social Login Buttons */}
            <div className="space-y-2">
              {/* Google */}
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#4285F4"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-pink-500">Google</span>
              </button>

              {/* Facebook */}
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 text-sm">
                <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-blue-600">Facebook</span>
              </button>

              {/* Apple */}
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 text-sm">
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.29.89 3.08.9 1.18-.24 2.31-1.09 3.69-.89 2.07.21 3.71 1.23 4.04 4.09-3.5 2.19-2.93 6.66.5 7.92-.51 1.5-1.18 2.02-2.81 2.65zm-3.03-11.4c.03-1.6 1.2-2.95 2.82-3.12 1.48-1.34-.37-3.84-2.33-3.72-1.38 2.11-.29 3.55-.49 6.84z" />
                </svg>
                <span className="text-black">Apple</span>
              </button>
            </div>
          </div>

          {/* Signup Form */}
          <div
            className="w-full p-8 absolute inset-0 transition-transform duration-500 ease-in-out"
            style={{
              transform: isSignupMode ? 'translateX(0)' : 'translateX(100%)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-transparent hover:bg-gray-100 rounded-full p-2 transition"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Title */}
            <h1 className="text-4xl font-bold text-black mb-2">Sign up</h1>

            {/* Error Message */}
            {(localError || error) && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{localError || error}</p>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSignupSubmit} className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 180px)' }}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    placeholder="Input first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    placeholder="Input last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="example.email@gmail.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 rounded bg-pink-500 border-pink-500 text-pink-500 focus:ring-pink-500 cursor-pointer mt-1"
                  required
                />
                <label htmlFor="terms" className="text-gray-700 text-xs">
                  By signing up, I agree with the{' '}
                  <a href="#" className="text-pink-500 font-semibold hover:text-pink-600">
                    Terms of Use
                  </a>
                  {' '}&{' '}
                  <a href="#" className="text-pink-500 font-semibold hover:text-pink-600">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>

            {/* Already have account */}
            <p className="text-gray-600 text-sm text-center mb-3">
              Already have an account?{' '}
              <button
                onClick={() => setIsSignupMode(false)}
                className="text-pink-500 font-semibold hover:text-pink-600 transition"
              >
                Log in
              </button>
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 border-t border-gray-300" />
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-2">
              {/* Google */}
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#4285F4"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-pink-500">Google</span>
              </button>

              {/* Facebook */}
              <button 
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-blue-600">Facebook</span>
              </button>

              {/* Apple */}
              <button 
                type="button"
                onClick={() => handleSocialLogin('apple')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.29.89 3.08.9 1.18-.24 2.31-1.09 3.69-.89 2.07.21 3.71 1.23 4.04 4.09-3.5 2.19-2.93 6.66.5 7.92-.51 1.5-1.18 2.02-2.81 2.65zm-3.03-11.4c.03-1.6 1.2-2.95 2.82-3.12 1.48-1.34-.37-3.84-2.33-3.72-1.38 2.11-.29 3.55-.49 6.84z" />
                </svg>
                <span className="text-black">Apple</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
