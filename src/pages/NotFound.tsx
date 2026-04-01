import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="mobile-shell shell-top-inset flex min-h-[100dvh] items-center justify-center bg-muted px-6 pb-8">
      <div className="w-full max-w-sm text-center">
        <h1 className="mb-3 font-heading text-4xl font-bold">404</h1>
        <p className="mb-6 text-lg text-muted-foreground sm:text-xl">Oops! Page not found</p>
        <a href="/" className="font-medium text-accent underline underline-offset-4 hover:text-accent/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
