import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';


export default function DashboardDefault() {


  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} sx={{}}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000"  backgroundColor="#B1B1B14D" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" backgroundColor="#E5E0FA"/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943"  backgroundColor="#E2D2A94D" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395"  backgroundColor="#E6A7EB36" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
    </Grid>
  );
}





// import { LogoutOutlined } from '@ant-design/icons';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';


// export default function DashboardDefault() {
//   return (
//     <Grid container rowSpacing={4.5} columnSpacing={2.75}>
//       {/* row 1 */}
//       <Grid item xs={12} sx={{ mb: -2.25 }}>
//         <Typography variant="h5">Dashboard</Typography>
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Delayed Checkout" count="674" icon={<LogoutOutlined />} iconColor='#EB2321' iconBorderColor='#EB2321' />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Pending Check-In" count="660" icon={<LogoutOutlined />} iconColor='#FF9E43' iconBorderColor='#FF9E43' />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Upcoming Check-In" count="0" icon={<LogoutOutlined />} iconColor='#1D9FF1' iconBorderColor='#1D9FF1' />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Upcoming Checkout" count="0" icon={<LogoutOutlined />} iconColor='#1D9FF1' iconBorderColor='#1D9FF1' />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Today's Booked Room" count="0" />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Today's Available Room" count="48" iconColor='' />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Active Booking" count="674" iconColor='' />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Total Bookings" count="674" iconColor='' />
//       </Grid>
//       {/* <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4} lg={3}>
//         <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
//       </Grid> */}

//       <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
//     </Grid>
//   );
// }

