import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    // <AuthWrapper>
    // </AuthWrapper>

    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Grid
        item
        sx={{
          width: '80%',
          height: '88vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </Grid>

    //  <Grid sx={{width:'80%', height:'70vh'}} >
    //   <Grid item xs={12}>
    //     {/* <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
    //     </Stack> */}
    //     <Typography variant="h3">Login</Typography>
    //   </Grid>
    //   <Grid item xs={12}>
    //     <AuthLogin />
    //   </Grid>
    // </Grid>
  );
}

