import { useState, useEffect } from "react";

const useLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    window.addEventListener("load", handleLoaded);
    return () => {
      window.removeEventListener("load", handleLoaded);
    };
  }, []);

  return isLoaded;
};

export default useLoaded;
