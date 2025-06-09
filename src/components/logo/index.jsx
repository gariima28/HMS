import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

// project import
import Logo from './LogoMain';
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  return (
    <ButtonBase disableRipple component={Link}>
      <Grid >
        <Logo />

      </Grid>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
