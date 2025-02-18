import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { loginApi } from 'api/api';
import HashLoader from 'components/Skeleton/HashLoader';
import { useGeolocated } from 'react-geolocated';

export default function AuthLogin({ isDemo = false }) {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  // for location
  const [latiTude, setLatiTude] = React.useState();
  const [longiTude, setLongiTude] = React.useState();

  // Snackbar state
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'info', // 'success', 'error', 'warning', 'info'
  });
  // for location
  const { coords } =
  useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  
  // for location
  useEffect(() => {
    if (coords) {
      setLatiTude(coords.latitude);
      setLongiTude(coords.longitude);
    }
  }, [coords]);
  

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setShowLoader(true)
      const data = { email: values.email, password: values.password, lat: latiTude , log: longiTude };
      const response = await loginApi(data);

      if (response.status === 200) {
        if (response?.data?.status === 'success') {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('roleType', response.data.roleType);
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('email', response.data.email);
          setTimeout(() => {
            window.location.reload();
            setSnackbar({
              open: true,
              message: response.data.message,
              severity: 'success',
            });
          }, 3000);
        } else {
          setTimeout(() => {
            setSnackbar({
              open: true,
              message: response.data.message,
              severity: 'error',
            });
          }, 2100);
        }
      }
    } catch (error) {
      setErrors({
        submit: error.response ? error.response.data.message : 'An error occurred',
      });
      setStatus({ success: false });
      setTimeout(() => {
        setSnackbar({
          open: true,
          message: error.response ? error.response.data.message : 'An error occurred during login.',
          severity: 'error',
        });
      }, 4000);
    } finally {
      setTimeout(() => {
        setShowLoader(false)
      }, 2000);
      setSubmitting(false);
    }
  };


  return (
    <>
      {showLoader && <HashLoader />}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', fontWeight: 900 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={handleLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked"
                        sx={{
                          color: '#4634ff', '&.Mui-checked': { backgroundColor: '#fff', color: '#4634ff', borderRadius: '4px', },
                          '&.Mui-checked:hover': { backgroundColor: '#fff', color: '#4634ff', }, '&:hover': {
                            backgroundColor: '#fff',
                            color: '#4634ff',
                          },
                        }} size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} color="text.primary" to="/forgetPass">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#4634ff', color: '#fff', '&:hover, &:active, &:focus': { backgroundColor: '#4634ff', color: '#fff' } }}
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
