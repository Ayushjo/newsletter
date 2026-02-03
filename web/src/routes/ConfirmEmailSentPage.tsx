import { Link, useLocation } from "react-router-dom";

const ConfirmEmailSentPage = () => {
  const location = useLocation();
  const email = location.state?.email || "your email";

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 sm:p-8 bg-gray-50 text-gray-800 font-sans text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Check your inbox</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We've sent a confirmation email to <span className="font-semibold text-gray-900">{email}</span>.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Please click on the link in the email to confirm your subscription. If you don't see it, check your spam folder.
        </p>

        <Link 
          to="/" 
          className="inline-block w-full px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-lg border-none no-underline transition-all duration-200 hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-600/20"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmailSentPage;
