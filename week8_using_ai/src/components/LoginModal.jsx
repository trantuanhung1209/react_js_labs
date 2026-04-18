import { useState } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [step, setStep] = useState(1); // 1: email, 2: password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Test credentials
  const TEST_EMAIL = 'admin@gmail.com';
  const TEST_PASSWORD = 'admin123';

  const handleContinue = (e) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (!email) {
        setError('Please enter your email');
        return;
      }
      if (!email.includes('@')) {
        setError('Please enter a valid email');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!password) {
        setError('Please enter your password');
        return;
      }
      handleLogin();
    }
  };

  const handleLogin = () => {
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        // Login successful
        setSuccess(true);
        const userData = {
          email: email,
          name: 'Admin User',
          avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Close modal and call callback
        setTimeout(() => {
          setIsLoading(false);
          if (onLoginSuccess) {
            onLoginSuccess(userData);
          }
          handleClose();
        }, 1500);
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  const handleClose = () => {
    setStep(1);
    setEmail('');
    setPassword('');
    setError('');
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 relative overflow-hidden max-h-screen">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 hover:bg-gray-100 transition rounded-full"
        >
          <X size={24} className="text-gray-700" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Side - Image with Quote */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-300 to-teal-400 p-8 flex-col justify-between relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full transform translate-x-40 -translate-y-32"></div>
            </div>

            {/* Quote */}
            <div className="relative z-10">
              <p className="text-white text-3xl font-bold leading-tight">
                "Embrace the art of cooking, where flavors come alive!"
              </p>
            </div>

            {/* Food Image */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop"
                alt="Food"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {step === 1 ? 'Login' : 'Enter Password'}
              </h2>
              <p className="text-gray-600">
                {step === 1 
                  ? 'Enter your email to log in.' 
                  : `Logging in as ${email}`}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleContinue} className="space-y-4">
              {/* Email Step */}
              {step === 1 && (
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
              )}

              {/* Password Step */}
              {step === 2 && (
                <div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle size={20} className="text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-green-700 text-sm">Login successful! Redirecting...</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || success}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-400 text-white font-semibold py-3 rounded-lg transition"
              >
                {isLoading ? 'Loading...' : (step === 1 ? 'Continue' : 'Login')}
              </button>
            </form>

            {/* Back Button */}
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="w-full text-gray-600 hover:text-gray-800 font-semibold py-2 transition mt-2"
              >
                Back
              </button>
            )}

            {/* Divider */}
            {step === 1 && (
              <>
                <div className="my-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-600">OR</span>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-600 mb-6">
                  By continuing, you agree to the updated{' '}
                  <a href="#" className="text-pink-500 hover:underline">
                    Terms of Sale
                  </a>
                  ,{' '}
                  <a href="#" className="text-pink-500 hover:underline">
                    Terms of Service
                  </a>
                  , and{' '}
                  <a href="#" className="text-pink-500 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.85 4.05-1.26 1.24-3.16 2.6-6.14 2.6-4.72 0-8.6-3.88-8.6-8.6s3.88-8.6 8.6-8.6c2.25 0 3.94.75 5.23 2.03l2.45-2.46c-1.73-1.73-4.39-2.8-7.68-2.8-6.27 0-11.43 5.16-11.43 11.43s5.16 11.43 11.43 11.43c3.02 0 5.42-.988 7.21-2.85.95-.99 1.69-2.41 1.9-4.05h-9.11v-3.26h-.01z" />
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Continue with Facebook
                  </button>

                  <button
                    onClick={() => handleSocialLogin('Apple')}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.08 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.48-2.53 3.23l-.35-.28zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    Continue with Apple
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
