import { useContext } from 'react';
import { TextField, Typography, Button, Stack } from '@mui/material';
import { useFormik, FormikValues } from 'formik';
import { useMutation } from '@apollo/client';
import { AuthContext } from 'components/Auth';
import * as Yup from 'yup';
import { USER_LOGIN } from 'gql/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const { setIsLogin } = useContext(AuthContext);
  const [loginUser, loginUserState] = useMutation(USER_LOGIN);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: FormikValues) => {
    return loginUser({
      variables: {
        email: values.email,
        password: values.password
      }
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <Stack spacing={2}>
      <Typography component="h1" sx={{ mb: 4 }}>Welcome, login</Typography>
      <Stack sx={{ mt: 4, mb: 2 }} spacing={2} component="form">
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
        <Button type="submit" sx={{ mt: 4 }} onClick={handleSubmit}>
          Get In
        </Button>
      </Stack>
      <Typography>
        Create a new account if you don&apos;t have one here:&nbsp;
        <Button type="button" variant="text" onClick={() => setIsLogin(false)}>
          Register
        </Button>
      </Typography>
    </Stack>
  );
};

export default Login;
