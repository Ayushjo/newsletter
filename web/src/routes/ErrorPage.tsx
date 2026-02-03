import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;
  let errorTitle = "Oops!";

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.statusText || error.data?.message || "Unknown error occurred.";
    if (error.status === 404) {
        errorTitle = "404";
        errorMessage = "Sorry, the page you are looking for does not exist.";
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 sm:p-8 bg-gray-50 text-gray-800 font-sans text-center">
      <div className="max-w-lg w-full">
        <h1 className="text-5xl sm:text-7xl font-black mb-4 text-gray-900">{errorTitle}</h1>
        <p className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">Unexpected Error Occurred</p>
        <p className="text-base sm:text-lg text-gray-500 mb-8 leading-relaxed">
          <i>{errorMessage}</i>
        </p>
        <Link to="/" className="inline-block px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-lg border-none no-underline transition-all duration-200 hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-600/20">
          Go Initial Page
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
