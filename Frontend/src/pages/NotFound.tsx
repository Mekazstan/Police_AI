
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-6xl font-bold text-police-red mb-4 animate-pulse">404</h1>
        <p className="text-xl text-gray-800 mb-6">This investigation has been classified</p>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="police-button inline-block">
          Return to Headquarters
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
