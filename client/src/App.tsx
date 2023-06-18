import { CssBaseline, Box, Container } from '@mui/material';
import Splash from './components/Splash';
import useSplash from './hooks/useSplash';

const App = () => {
  const loading = useSplash();

  if (loading) return <Splash />;

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </>
  );
};

export default App;
