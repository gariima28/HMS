// material-ui
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  flexDirection: 'column',
  textAlign: 'center',
}));

const Loader = ({ delay = 0 }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoader(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);


  return (
    showLoader && <LoaderWrapper>
    <Box sx={{ mb: 3 }}>
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: '150px', height: 'auto' }}
      />
    </Box>
    <CircularProgress color="primary" size={80} />
    <Typography variant="h6" sx={{ mt: 2 }}>
      Loading, please wait...
    </Typography>
  </LoaderWrapper>
  )
}

export default Loader;
