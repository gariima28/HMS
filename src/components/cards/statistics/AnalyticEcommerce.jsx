
import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';
import { Container, display } from '@mui/system';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '8px',
  // backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px'
}));

export default function AnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, extra, backgroundColor, image, to }) {
  const cardsData = [
    { title: 'Card 1', count: 123, color: '#B1B1B14D' },
    { title: 'Card 2', count: 456, color: '#E5E0FA' },
    { title: 'Card 3', count: 789, color: '#E2D2A94D' },
    { title: 'Card 4', count: 101, color: '#E6A7EB36' }
  ];
  // const bgColors = ['#B1B1B14D', '#E5E0FA', '#E2D2A94D', '#E6A7EB36'];
  // const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];

  return (
    <>
      <Link to={to} style={{ textDecoration: 'none' }}>
        <MainCard contentSX={{ p: 2.25, backgroundColor: backgroundColor }} key={''} >
          <Stack spacing={0.5}>
            <Grid container columnSpacing={2.75} sx={{ display: 'flex' }}>
              <ImageContainer>
                {typeof image === 'string' ? (
                  <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  image
                )}
              </ImageContainer>
              <Grid>
                <Typography variant="h6" color="#718EBF">
                  {title}
                </Typography>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="h4" color="inherit">
                      {count}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <Box sx={{ pt: 2.25 }}>
            <Typography variant="caption" color="text.secondary">
              You made an extra
              <Typography variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                {extra}
              </Typography>
              this year
            </Typography>
          </Box> */}
          </Stack>
        </MainCard>
      </Link>
    </>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  to: PropTypes.string
};
