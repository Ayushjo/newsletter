import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import './ErrorPage.css';

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
    <div className="error-page-container">
      <div className="error-content">
        <h1 className="error-title">{errorTitle}</h1>
        <p className="error-subtitle">Unexpected Error Occurred</p>
        <p className="error-message">
          <i>{errorMessage}</i>
        </p>
        <Link to="/" className="error-home-link">
          Go Initial Page
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
