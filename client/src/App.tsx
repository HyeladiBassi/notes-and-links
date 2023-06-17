import { CssBaseline, Box, Container } from '@mui/material';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </>
  );
};

export default App;
