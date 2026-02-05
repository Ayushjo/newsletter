import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleConfirm = async () => {
    if (!token || !email) {
      setError("Invalid confirmation link. Missing token or email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/newsletter/confirm-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to confirm subscription.');
      }

      setSuccess(true);
      console.log(`✅ Subscription confirmed for: ${email}`);
    } catch (err: any) {
        console.error("Confirmation error:", err);
        setError(err.message || "An unexpected error occurred.");
    } finally {
        setLoading(false);
    }
  };

  if (success) {
      return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6 sm:p-8 bg-gray-50 text-gray-800 font-sans text-center">
            <div className="mb-8 max-w-xl w-full">
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-green-600 tracking-tight leading-tight">
                Subscription Confirmed!
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Thank you for subscribing. You have successfully verified your email.
                </p>
            </div>
             <div className="mt-12 text-sm text-gray-400">
                <p>&copy; 2026 Newsletter. All rights reserved.</p>
            </div>
        </div>
      )
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 sm:p-8 bg-gray-50 text-gray-800 font-sans text-center">
      <div className="mb-8 max-w-xl w-full">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-gray-900 tracking-tight leading-tight">
          Confirm Subscription
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Click the button below to confirm your subscription{email ? ` for ${email}` : ''}.
        </p>
      </div>

      <div className="w-full max-w-md">
        <button
          onClick={handleConfirm}
          disabled={loading || !token || !email}
          className={`w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-white rounded-lg border-none cursor-pointer transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-95
            ${loading || !token || !email ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
          `}
        >
          {loading ? 'Confirming...' : 'Confirm Subscription'}
        </button>
        {error && (
            <p className="text-red-500 text-sm mt-4 animate-pulse">
                {error}
            </p>
        )}
      </div>

      <div className="mt-12 text-sm text-gray-400">
        <p>&copy; 2026 Newsletter. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
