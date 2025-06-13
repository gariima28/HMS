import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MyForgotLogo from "../../../assets/images/Group 1092.svg"
import MyForgotLogoOTP from "../../../assets/images/Group 1093.svg"
import MyForgotLogoNew from "../../../assets/images/Group 1094.svg"

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import AnimateButton from 'components/@extended/AnimateButton';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';


// React Hook Form
import { useForm } from 'react-hook-form';

import { setPasswordApi, getOTPApi, verifyOTPApi } from 'api/api';
import { Alert, Snackbar } from '@mui/material';
export default function AuthForgetPass() {

  const navigate = useNavigate();

  // Snackbar state
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'info', // 'success', 'error', 'warning', 'info'
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Initialize the state with a fallback to the value in localStorage, if it exists
  const [forgetState, setForgetState] = useState(localStorage.getItem('forget_Page') || 'OTP Page');

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, } = useForm();

  // Persist the forgetState to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('forget_Page', forgetState);
  }, [forgetState]);


  // GET OTP

  const getOTP = async (data) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email)
      const response = await getOTPApi(formData);
      console.log(response, 'getOTP');
      if (response.status === 200) {
        if (response?.data?.status === 'success') {
          localStorage.setItem('forgetToken', response.data.token);
          setForgetState('Verify Page');
          setSnackbar({
            open: true,
            message: response.data.message,
            severity: 'success',
          });
        }
        else {
          setSnackbar({
            open: true,
            message: response.data.message,
            severity: 'error',
          });
        }
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.message || 'An error occurred');
      setSnackbar({
        open: true,
        message: error.response ? error.response.data.message : 'An error occurred during forget password.',
        severity: 'error',
      });
    }
  };

  // VERIFY OTP

  const otpRefs = useRef([]);

  const handleKeyUp = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    } else if (e.key === 'Backspace' && index > 0 && value === '') {
      otpRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = async (data) => {
    console.log(data)
    try {
      const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
      const formData = new FormData();
      formData.append('OTP', otp)
      const response = await verifyOTPApi(formData);
      console.log(response, 'verify Otp');
      if (response.status === 200) {
        if (response?.data?.status === 'success') {
          setForgetState('New Password Page');
          setSnackbar({
            open: true,
            message: response.data.message,
            severity: 'success',
          });
        }
        else {
          setSnackbar({
            open: true,
            message: response.data.message,
            severity: 'error',
          });
        }
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.message || 'An error occurred');
      console.log(error)
      setSnackbar({
        open: true,
        message: error.response ? error.response.data.message : 'An error occurred during forget password.',
        severity: 'error',
      });
    }
  };

  // Change Password

  const [showPassword, setShowPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  const password = watch('password', '');

  const passwordRequirements = [
    { label: 'At least 8 characters', isValid: password.length >= 8 },
    { label: 'At least 1 uppercase letter', isValid: /[A-Z]/.test(password) },
    { label: 'At least 1 lowercase letter', isValid: /[a-z]/.test(password) },
    { label: 'At least 1 number', isValid: /[0-9]/.test(password) },
    { label: 'At least 1 special character', isValid: /[!@#$%^&*]/.test(password) },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.isValid);

  const setPassword = async (data) => {
    if (!isPasswordValid) {
      setShowRequirements(true); // Show the requirements when the password doesn't meet criteria
    }
    else {
      try {
        const formData = new FormData();
        formData.append('password', data.password)
        const response = await setPasswordApi(formData);
        console.log(response, 'verify Otp');
        if (response.status === 200) {
          if (response?.data?.status === 'success') {
            setSnackbar({
              open: true,
              message: response.data.message,
              severity: 'error',
            });
            navigate('/forgetSuccess')
            setTimeout(() => {
              localStorage.setItem('forget_Page', 'OTP Page');
            }, 700);
          }
          else {
            setSnackbar({
              open: true,
              message: response.data.message,
              severity: 'error',
            });
          }
        }
      } catch (error) {
        console.error('Error:', error.response?.data?.message || 'An error occurred');
        console.log(error)
        setSnackbar({
          open: true,
          message: error.response ? error.response.data.message : 'An error occurred during forget password.',
          severity: 'error',
        });
      }
    }
  };

  const returnToLogin = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('forgetToken')
    localStorage.setItem('forget_Page', 'OTP Page');
    navigate('/');
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    paddingTop: '0px',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',

    }),
  }));
  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', fontWeight: 900, color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {forgetState === 'OTP Page'
        ?
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} sx={{}} >
            <Grid item xs={10} sm={6} sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
              <form noValidate onSubmit={handleSubmit(getOTP)}>
                <Typography variant="h3">Forget Password ?</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1} sx={{ my: '20px' }}>
                      <InputLabel htmlFor="email-login">Email Address</InputLabel>
                      <OutlinedInput id="email-login" type="email" placeholder="Enter email address" error={Boolean(errors.email)} {...register('email', { required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Must be a valid email', }, })} />
                    </Stack>
                    {errors.email && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.email.message}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" sx={{ backgroundColor: '#0D6A84', color: '#fff', '&:hover, &:active, &:focus': { backgroundColor: '#0D6A84', color: '#fff' } }} >
                        Next
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: -2 }}>
                    <Stack direction='row' justifyContent="center" alignItems="center" spacing={0.2}>
                      <Link
                        component={RouterLink}
                        to="/"
                        onClick={returnToLogin}
                        color="text.primary"
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 512 512">
                          <path fill="#85ea62" d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z" />
                        </svg>
                        Return to the Login Page?
                      </Link>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={10} sm={6} sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ height: '100%', textAlign: 'center',display:'flex', justifyContent:'center' }}
              >
                <Grid item sx={{ borderRadius: '50px' }}>
                  <Box sx={{ width: '85%' }}>
                    <img
                      src={MyForgotLogo}
                      alt="Logo"
                      style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '0px 20px 20px 0px', }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        :
        forgetState === 'Verify Page'
          ?
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4} sx={{}}>
              <Grid item xs={10} sm={6} sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                <form noValidate onSubmit={handleSubmit(verifyOTP)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="otp-input">Enter OTP</InputLabel>
                        <Stack direction="row" spacing={1} justifyContent="start">
                          {Array.from({ length: 4 }).map((_, index) => (
                            <OutlinedInput key={index} alignItems='center' inputProps={{ maxLength: 1 }} inputRef={(el) => (otpRefs.current[index] = el)} {...register(`otp${index + 1}`, { required: true })} onKeyUp={(e) => handleKeyUp(e, index)} sx={{ width: 38, textAlign: 'center' }} />
                          ))}
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" sx={{ backgroundColor: '#0D6A84', color: '#fff', '&:hover, &:active, &:focus': { backgroundColor: '#0D6A84', color: '#fff' } }} >
                          Verify OTP
                        </Button>
                      </AnimateButton>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: -2 }}>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.2}>
                        <Link sx={{ display: 'flex', alignItems: 'center', gap: 1 }} variant="body" component={RouterLink} color="text.primary" to="/" onClick={returnToLogin}  >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 512 512">
                            <path fill="#85ea62" d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z" />
                          </svg> Return to the Login Page?
                        </Link>
                      </Stack>
                    </Grid>

                  </Grid>
                </form>
              </Grid>

              <Grid item xs={10} sm={6} sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '85%' }}>
                  <img
                    src={MyForgotLogoOTP}
                    alt="Logo"
                    style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '0px 20px 20px 0px', }}
                  />
                </Box>
              </Grid>

            </Grid>
          </Box>

          :
          forgetState === 'New Password Page'
            ?
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={4} sx={{}}>
                <Grid item xs={10} sm={6} sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                  <form noValidate onSubmit={handleSubmit(setPassword)}>
                    <Grid container spacing={3}>
                      {/* Password Field */}
                      <Grid item xs={12}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="password">New Password</InputLabel>
                          <OutlinedInput id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter new password" fullWidth {...register('password', { required: true })} endAdornment={<IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end" > {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>} />
                        </Stack>
                      </Grid>

                      {/* Password Requirements */}
                      {showRequirements && (
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            {passwordRequirements?.map((req, index) => (
                              <Stack key={index} direction="row" alignItems="center" spacing={0.2}>
                                {req.isValid ? (
                                  <CheckCircleIcon color="success" fontSize='12px' />
                                ) : (
                                  <CancelIcon color="error" fontSize='12px' />
                                )}
                                <Typography variant="body2" color={req.isValid ? 'success.main' : 'error.main'} sx={{ fontSize: '12px' }} >
                                  {req.label}
                                </Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Grid>
                      )}

                      {/* Submit Button */}
                      <Grid item xs={12}>
                        <AnimateButton>
                          <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" sx={{ backgroundColor: '#0D6A84', color: '#fff', '&:hover, &:active, &:focus': { backgroundColor: '#0D6A84', color: '#fff' } }} >
                            Change Password
                          </Button>
                        </AnimateButton>
                      </Grid>

                      <Grid item xs={12} sx={{ mt: -2 }}>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.2}>
                          <Link sx={{ display: 'flex', alignItems: 'center', gap: 1 }} variant="body" component={RouterLink} color="text.primary" to="/" onClick={returnToLogin} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 512 512">
                          <path fill="#85ea62" d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z" />
                        </svg> Return to the Login Page?
                          </Link>
                        </Stack>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item xs={11} sm={6} sx={{}}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"

                    sx={{ height: '100%', textAlign: 'center', }}
                  >
                    <Grid item sx={{ borderRadius: '50px' }}>
                      <Box sx={{ width: '85%' }}>
                        <img
                          src={MyForgotLogoNew}
                          alt="Logo"
                          style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '0px 20px 20px 0px', }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Box>

            :
            ''
      }

    </>
  );
}

AuthForgetPass.propTypes = { isDemo: PropTypes.bool };






// export default function AuthForgetPass() {
//   const navigate = useNavigate();

//   // Initialize the state with a fallback to the value in localStorage, if it exists
//   const [forgetState, setForgetState] = useState(localStorage.getItem('forget_Page') || 'OTP Page');

//   const { register, handleSubmit, watch, formState: { errors, isSubmitting }, } = useForm();

//   // Persist the forgetState to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('forget_Page', forgetState);
//   }, [forgetState]);

//   // GET OTP
//   const getOTP = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append('email', data.email);
//       const response = await getOTPApi(formData);
//       if (response.status === 200 && response?.data?.status === 'success') {
//         localStorage.setItem('forgetToken', response.data.token);
//         setForgetState('Verify Page');
//       }
//     } catch (error) {
//       console.error('Error:', error.response?.data?.message || 'An error occurred');
//     }
//   };

//   // VERIFY OTP
//   const otpRefs = useRef([]);

//   const handleKeyUp = (e, index) => {
//     const { value } = e.target;
//     if (value.length === 1 && index < otpRefs.current.length - 1) {
//       otpRefs.current[index + 1].focus();
//     } else if (e.key === 'Backspace' && index > 0 && value === '') {
//       otpRefs.current[index - 1].focus();
//     }
//   };

//   const verifyOTP = async (data) => {
//     const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
//     try {
//       const formData = new FormData();
//       formData.append('OTP', otp);
//       const response = await verifyOTPApi(formData);
//       if (response.status === 200 && response?.data?.status === 'success') {
//         setForgetState('New Password Page');
//       }
//     } catch (error) {
//       console.error('Error:', error.response?.data?.message || 'An error occurred');
//     }
//   };

//   // Change Password
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRequirements, setShowRequirements] = useState(false);

//   const password = watch('password', '');

//   const passwordRequirements = [
//     { label: 'At least 8 characters', isValid: password.length >= 8 },
//     { label: 'At least 1 uppercase letter', isValid: /[A-Z]/.test(password) },
//     { label: 'At least 1 lowercase letter', isValid: /[a-z]/.test(password) },
//     { label: 'At least 1 number', isValid: /[0-9]/.test(password) },
//     { label: 'At least 1 special character', isValid: /[!@#$%^&*]/.test(password) },
//   ];

//   const isPasswordValid = passwordRequirements.every((req) => req.isValid);

//   const setPassword = async (data) => {
//     if (!isPasswordValid) {
//       setShowRequirements(true); // Show the requirements when the password doesn't meet criteria
//     }
//     else {
//       try {
//         const formData = new FormData();
//         formData.append('password', data.password);
//         const response = await setPasswordApi(formData);
//         if (response.status === 200 && response?.data?.status === 'success') {
//           navigate('/forgetSuccess');
//         }
//       } catch (error) {
//         console.error('Error:', error.response?.data?.message || 'An error occurred');
//       }
//     }
//   };

//   const returnToLogin = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('forgetToken');
//     navigate('/');
//   };

//   return (
//     <>
//       {forgetState === 'OTP Page'
//         ?
//         <form noValidate onSubmit={handleSubmit(getOTP)}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Stack spacing={1}>
//                 <InputLabel htmlFor="email-login">Email Address</InputLabel>
//                 <OutlinedInput id="email-login" type="email" placeholder="Enter email address" fullWidth error={Boolean(errors.email)} {...register('email', { required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Must be a valid email', }, })} />
//               </Stack>
//               {errors.email && (
//                 <FormHelperText error id="standard-weight-helper-text-email-login">
//                   {errors.email.message}
//                 </FormHelperText>
//               )}
//             </Grid>
//             <Grid item xs={12}>
//               <AnimateButton>
//                 <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" sx={{ backgroundColor: '#4634ff', color: '#fff', '&:hover, &:active, &:focus': { backgroundColor: '#4634ff', color: '#fff' } }} >
//                   Get OTP
//                 </Button>
//               </AnimateButton>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: -2 }}>
//               <Stack justifyContent="center" alignItems="center" spacing={0.2} >
//                 <Link variant="body" component={RouterLink} color="text.primary" to="/" onClick={returnToLogin} sx={{ m: 0 }} >
//                   Return to the Login Page?
//                 </Link>
//               </Stack>
//             </Grid>
//           </Grid>
//         </form>
//         :
//         forgetState === 'Verify Page'
//           ?
//           <form noValidate onSubmit={handleSubmit(verifyOTP)}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="otp-input">Enter OTP</InputLabel>
//                   <Stack direction="row" spacing={1} justifyContent="start">
//                     {Array.from({ length: 4 }).map((_, index) => (
//                       <OutlinedInput key={index} alignItems='center' inputProps={{ maxLength: 1 }} inputRef={(el) => (otpRefs.current[index] = el)} {...register(`otp${index + 1}`, { required: true })} onKeyUp={(e) => handleKeyUp(e, index)} sx={{ width: 38, textAlign: 'center' }} />
//                     ))}
//                   </Stack>
//                 </Stack>
//               </Grid>

//               <Grid item xs={12}>
//                 <AnimateButton>
//                   <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" sx={{ backgroundColor: '#4634ff', color: '#fff', '&:hover, &:active, &:focus': { backgroundColor: '#4634ff', color: '#fff' } }} >
//                     Verify OTP
//                   </Button>
//                 </AnimateButton>
//               </Grid>

//               <Grid item xs={12} sx={{ mt: -2 }}>
//                 <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.2}>
//                   <Link variant="body" component={RouterLink} color="text.primary" to="/" onClick={returnToLogin} sx={{ m: 0 }} >
//                     Return to the Login Page?
//                   </Link>
//                 </Stack>
//               </Grid>
//             </Grid>
//           </form>
//           :
//           forgetState === 'New Password Page'
//             ?
//             <form noValidate onSubmit={handleSubmit(setPassword)}>
//               <Grid container spacing={3}>
//                 {/* Password Field */}
//                 <Grid item xs={12}>
//                   <Stack spacing={1}>
//                     <InputLabel htmlFor="password">New Password</InputLabel>
//                     <OutlinedInput id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter new password" fullWidth {...register('password', { required: true })} endAdornment={<IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end" > {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>} />
//                   </Stack>
//                 </Grid>

//                 {/* Password Requirements */}
//                 {showRequirements && (
//                   <Grid item xs={12}>
//                     <Stack spacing={1}>
//                       {passwordRequirements.map((req, index) => (
//                         <Stack key={index} direction="row" alignItems="center" spacing={0.2}>
//                           {req.isValid ? (
//                             <CheckCircleIcon color="success" fontSize='12px' />
//                           ) : (
//                             <CancelIcon color="error" fontSize='12px' />
//                           )}
//                           <Typography variant="body2" color={req.isValid ? 'success.main' : 'error.main'} sx={{ fontSize: '12px' }} >
//                             {req.label}
//                           </Typography>
//                         </Stack>
//                       ))}
//                     </Stack>
//                   </Grid>
//                 )}

//                 {/* Submit Button */}
//                 <Grid item xs={12}>
//                   <AnimateButton>
//                     <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" sx={{ backgroundColor: '#4634ff', color: '#fff', '&:hover, &:active, &:focus': { backgroundColor: '#4634ff', color: '#fff' } }} >
//                       Change Password
//                     </Button>
//                   </AnimateButton>
//                 </Grid>

//                 <Grid item xs={12} sx={{ mt: -2 }}>
//                   <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.2}>
//                     <Link variant="body" component={RouterLink} color="text.primary" to="/" onClick={returnToLogin} sx={{ m: 0 }} >
//                       Return to the Login Page?
//                     </Link>
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </form>
//             :
//             ''
//       }

//     </>
//   );
// }

