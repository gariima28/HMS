// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthForgetPass from './auth-forms/AuthForgetPass';

import successImg from 'assets/images/passwordSuccess.png';
import MainCard from 'components/MainCard';
import { Button, Card } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function ForgetSuccess() {

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'none',
        '& pre': {
          m: 0,
          p: '16px !important',
          fontSize: '0.75rem'
        },
      }}
    >
      <img src={successImg} alt="Success" width={500} />
      <Button variant='contained' sx={{ backgroundColor: '#5c89db', px: 9, '&:hover': { backgroundColor: '#3b6bc6' } }}
        onClick={() => {
          localStorage.clear();
          navigate('/')
        }}>Home</Button>
    </Card>
  );
}

