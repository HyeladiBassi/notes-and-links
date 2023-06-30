import { createTheme, ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import Splash from './components/Splash';
import useSplash from './hooks/useSplash';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import Auth, { AuthProvider } from 'components/Auth';
import Register from 'components/Auth/Register';
import AppLoader from './components/AppLoader';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLoader />
  },
  {
    path: '/login',
    element: <Auth />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const link = from([
  errorLink,
  authLink,
  new HttpLink({ uri: 'http://localhost:8000/graphql' }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = () => {
  const loading = useSplash();

  if (loading) return <Splash />;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AuthProvider>
            <Container maxWidth="sm" sx={{ p: 0, minHeight: '100vh' }}>
              <RouterProvider router={router} />
            </Container>
          </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
