
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

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, extra, backgroundColor }) {
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
      {/* {
        cardsData.map((card, index) => (
       
        ))} */}
           <MainCard contentSX={{ p: 2.25, backgroundColor: backgroundColor }} key={''} >
            <Stack spacing={0.5}>
              <Typography variant="h6" color="text.secondary">
                {title}
              </Typography>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="h4" color="inherit">
                    {count}
                  </Typography>
                </Grid>
                {percentage && (
                  <Grid item>
                    <Chip
                      variant="combined"
                      color={color}
                      icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
                      label={`${percentage}%`}
                      sx={{ ml: 1.25, pl: 1 }}
                      size="small"
                    />
                  </Grid>
                )}
              </Grid>
            </Stack>
            <Box sx={{ pt: 2.25 }}>
              <Typography variant="caption" color="text.secondary">
                You made an extra{' '}
                <Typography variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                  {extra}
                </Typography>{' '}
                this year
              </Typography>
            </Box>
          </MainCard>
    </>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string
};
