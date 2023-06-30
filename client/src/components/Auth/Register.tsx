import { useContext } from 'react';
import { TextField, Stack, Typography, Link, Button } from '@mui/material';
import { useFormik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from 'components/Auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const { setIsLogin } = useContext(AuthContext);

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: FormikValues) => {
    return;
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <Stack spacing={2}>
      <Typography sx={{ mb: 4 }}>Welcome, Create account</Typography>
      <Stack sx={{ mt: 4, mb: 2 }} spacing={2}>
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
        <TextField
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <Typography>
          By clicking the “Create your account” button, you agree to our&nbsp;
          <Link href="#" target="_blank">
            Terms of Use
          </Link>
          .
        </Typography>
      </Stack>
      <Button type="submit" sx={{ mt: 4 }}>
        Create your account
      </Button>
      <Typography>
        Already have an account?&nbsp;
        <Button type="button" variant="text" onClick={() => setIsLogin(true)}>
          Login
        </Button>
      </Typography>
    </Stack>
  );
};

export default Register;
