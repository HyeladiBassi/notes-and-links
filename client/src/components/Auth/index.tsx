import {
  PropsWithChildren,
  createContext,
  useState,
  useRef,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';
import Login from './Login';
import Register from './Register';

interface AuthState {
  isLoggedIn: boolean;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isLogin: false,
  setIsLogin: () => {
    return;
  },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useRef<boolean>(localStorage.getItem('token') !== null);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn.current, isLogin, setIsLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const Auth = () => {
  const { isLogin } = useContext(AuthContext);
  return isLogin ? <Login /> : <Register />;
};

export default Auth;
