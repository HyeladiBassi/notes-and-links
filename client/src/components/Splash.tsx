import { CssBaseline, Box, Container } from '@mui/material';
import LinkMe from '../assets/LinkMe.svg';

const Splash = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Box
          sx={{
            bgcolor: '#219EF2',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box component="img" src={LinkMe} sx={{ width: '70%' }} />
        </Box>
      </Container>
    </>
  );
};

export default Splash;
