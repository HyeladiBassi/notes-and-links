import { useEffect } from 'react';
import { TextField, Stack, Typography, Link, Button } from '@mui/material';
import { useFormik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useMutationResponse } from '../../gql/useApiResponse';
import { USER_REGISTER } from 'gql/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().required('A name is required for this user'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const { call: createUser, state } = useMutationResponse<{ success: boolean }>(
    'createUser',
    USER_REGISTER
  );
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: FormikValues) => {
    return createUser({
      variables: {
        input: {
          email: values.email,
          name: values.name,
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

  useEffect(() => {
    if (state.data && state.data.success && !state.loading && !state.error) {
      navigate('/login');
    }
  }, [state]);

  return (
    <Stack spacing={2} p={0}>
      <Typography sx={{ mb: 4 }}>Welcome, Create account</Typography>
      <Stack component="form" sx={{ mt: 4, mb: 2 }} spacing={2}>
        <TextField
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
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
        <Button type="button" variant="text" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Typography>
    </Stack>
  );
};

export default Register;
