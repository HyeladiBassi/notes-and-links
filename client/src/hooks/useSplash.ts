import { useState, useEffect } from 'react';

const getLoadedFromStorage = () => {
  const loaded = window.localStorage.getItem('SPLASH_LOADED');
  if (loaded) return JSON.parse(loaded).loaded;
  return false;
};

const useSplash = () => {
  const loadedFromStorage = getLoadedFromStorage();

  const [loading, setLoading] = useState(!loadedFromStorage);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      window.localStorage.setItem(
        'SPLASH_LOADED',
        JSON.stringify({ loaded: true })
      );
    }, 3000);
  }, []);

  return loading;
};

export default useSplash;
