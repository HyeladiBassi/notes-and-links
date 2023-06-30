import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Auth, { AuthProvider, AuthContext } from './Auth';

const MainApp = () => {
  return <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />;
};

const AppLoader = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
    else navigate('/');
  }, [isLoggedIn]);

  return (
    <AuthProvider>
      {isLoggedIn ? <MainApp /> : <Auth />}
    </AuthProvider>
  ); 
};

export default AppLoader;