import { useState } from 'react';

const NewsLetterSignUpPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Email is required');
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Dummy success action
    alert(`Signed up with: ${email}`);
    setEmail('');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 sm:p-8 bg-gray-50 text-gray-800 font-sans text-center">
      <div className="mb-8 max-w-xl w-full">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-gray-900 tracking-tight leading-tight">Subscribe to the Newsletter</h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Stay updated with our latest news and updates. Join our community and never miss a beat.
        </p>
      </div>

      <div className="w-full max-w-md">
        <form className="flex flex-col sm:flex-row w-full gap-4" onSubmit={handleSignup}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className={`flex-1 w-full px-4 py-3.5 text-base border rounded-lg outline-none transition-all duration-200 placeholder-gray-400
              ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/20'}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            // Removed required attribute to allow custom validation testing
          />
          <button type="submit" className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-lg border-none cursor-pointer transition-all duration-200 hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-600/20">
            Subscribe
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-2 text-left animate-pulse">
            {error}
          </p>
        )}
      </div>

      <div className="mt-12 text-sm text-gray-400">
        <p>&copy; 2026 Newsletter. All rights reserved.</p>
      </div>
    </div>
  )
}

export default NewsLetterSignUpPage