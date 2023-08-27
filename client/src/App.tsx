import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from '@mui/material';
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
import Register from 'components/Auth/Register';
import Login from 'components/Auth/Login';
import { appLoader } from 'loaders/appLoader';
import { authLoader } from 'loaders/authLoader';
import Main from 'components/Main';
import storageService from 'services/storageService';

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
    element: <Main />,
    loader: appLoader,
  },
  {
    path: '/login',
    element: <Login />,
    loader: authLoader,
  },
  {
    path: '/register',
    element: <Register />,
    loader: authLoader,
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
  const token = storageService.get('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = from([
  errorLink,
  authLink,
  new HttpLink({
    uri: `http://localhost:${process.env.REACT_APP_SERVER_PORT}/graphql`,
  }),
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
        <Container maxWidth="sm" sx={{ minHeight: '100vh', p: 0 }}>
          <RouterProvider router={router} />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
