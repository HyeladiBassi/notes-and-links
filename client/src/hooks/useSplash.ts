import { useState, useEffect } from 'react';
import storageService from 'services/storageService';

const useSplash = () => {
  const [loading, setLoading] = useState(!storageService.get('splashLoaded'));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      storageService.save({ splashLoaded: true });
    }, 3000);
  }, []);

  return loading;
};

export default useSplash;
