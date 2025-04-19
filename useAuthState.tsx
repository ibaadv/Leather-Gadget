// ../hooks/useAuthState.ts
import { useState, useEffect } from "react";

export function useAuthState() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // Simulate auth logic
      // setIsLoggedIn(true);
      // setIsFirstTime(false);
    }, 2000);
  }, []);

  const markAsOpened = async () => {
    setIsFirstTime(false);
  };

  return { isFirstTime, isLoggedIn, isLoading, markAsOpened };
}

export default useAuthState;
