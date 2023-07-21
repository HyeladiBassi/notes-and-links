import { TextField, Typography, Button, Stack } from '@mui/material';
import { useFormik, FormikValues } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { USER_LOGIN } from 'gql/auth';
import { useMutationResponse } from '../../gql/useApiResponse';
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginResponse {
  token: string;
  name: string;
  email: string;
  readonly _id: string;
}

const Login = () => {
  const { call: login, state } = useMutationResponse<LoginResponse>(
    'login',
    USER_LOGIN
  );
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: FormikValues) => {
    return login({
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  const saveUser = (data: LoginResponse) => {
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('_id', data._id);
    localStorage.setItem('email', data.email);
    localStorage.setItem('name', data.name);
    navigate('/');
  };

  useEffect(() => {
    if (state.data && state.data.token && !state.loading) {
      saveUser(state.data);
    }
  }, [state]);

  return (
    <Stack spacing={2} p={0}>
      <Typography component="h1" sx={{ mb: 4 }}>
        Welcome, login
      </Typography>
      <Stack component="form" sx={{ mt: 4, mb: 2 }} spacing={2}>
        <TextField
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button
          type="button"
          sx={{ mt: 4 }}
          onClick={() => formik.handleSubmit()}
        >
          Get In
        </Button>
      </Stack>
      <Typography>
        Create a new account if you don&apos;t have one here:&nbsp;
        <Button
          type="button"
          variant="text"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Typography>
    </Stack>
  );
};

export default Login;
