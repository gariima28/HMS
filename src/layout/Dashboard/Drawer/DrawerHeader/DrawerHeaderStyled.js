// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'center' : 'center',
  padding: theme.spacing(open ? 1 : 0),
}));

export default DrawerHeaderStyled;
