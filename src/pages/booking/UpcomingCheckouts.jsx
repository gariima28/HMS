import { Box, Divider, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import CheckInCheckoutCards from 'components/CheckInCheckoutCards';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import PlaceholderCards from 'components/Skeleton/PlaceholderCards';
import useSWR from 'swr';
import { HashLoader } from 'react-spinners';
import ErrorPage from 'components/ErrorPage';
import axios from 'axios';
import NoDataFound from '../NoDataFound';

const ServerIP = 'https://www.auth.edu2all.in/hms';
const token = `Bearer ${localStorage.getItem('token')}`;

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const UpcomingCheckouts = () => {

  const [showLoader, setShowLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);

  // Fetch data with SWR
  const { data, error, isLoading } = useSWR(`${ServerIP}/booking/getUpcomingCheckOut`, fetcher);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else if (data) {
      const timer = setTimeout(() => setShowLoader(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, data]);

  if (error) {
    return (
      <ErrorPage
        errorMessage={error?.response?.data?.message || 'An error occurred'}
        onReload={() => window.location.reload()}
        statusCode={error?.response?.status || '500'}
      />
    );
  }

  const cardsData = data?.upcomingCheckOut || [];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <>
      <Box>
        <Grid sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Upcoming Checkout Bookings</Typography>
        </Grid>
        <Grid sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ color: 'red' }}>
            <InfoCircleOutlined /> These Guests are scheduled to check out soon.
          </Typography>
          <Divider sx={{ mt: 1 }} />
        </Grid>

        {showLoader ? <PlaceholderCards /> :
          cardsData.length > 0 ? (
            <>
              {/* Cards Data */}
              <Grid container spacing={3} sx={{ maxHeight: 500, overflow: 'auto' }}>
                {currentCards.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.bookingNo}>
                    <CheckInCheckoutCards
                      name={item.guestName}
                      mobile={item.phoneNo}
                      bookingNo={item.bookingNo}
                      bookingId={item.bookingId}
                      totalRooms={item.totalRoom}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Grid display="flex" justifyContent="center" alignItems="center">
                <Pagination
                  count={Math.ceil(cardsData.length / cardsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    mt: 2,
                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: '#0d6efd',
                      color: 'white',
                    },
                    '& .MuiPaginationItem-root': {
                      color: '#000',
                    },
                  }}
                />
              </Grid>
            </>
          ) : (
            <NoDataFound />
          )
        }
      </Box>
    </>
  );
};

export default UpcomingCheckouts;





















// import { Box, Divider, Typography, Pagination } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import CheckInCheckoutCards from 'components/CheckInCheckoutCards';
// import { InfoCircleOutlined } from '@ant-design/icons';
// import { useEffect, useState } from 'react';
// import { allUpcomingCheckout } from 'api/api';
// import PlaceholderCards from 'components/PlaceholderCards';

// const UpcomingCheckouts = () => {
//   const [cardsData, setCardsData] = useState([]);
//   const [showLoader, setShowLoader] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [cardsPerPage] = useState(12);

//   useEffect(() => {
//     getAllUpcomingCheckout();
//   }, []);

//   const getAllUpcomingCheckout = async () => {
//     setShowLoader(true)
//     try {
//       const response = await allUpcomingCheckout();
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setTimeout(() => {
//           setShowLoader(false)
//           setCardsData(response?.data?.upcomingCheckOut || []);
//         }, 3500);
//       } else {
//         console.log(response?.data?.message);
//       }
//     } catch (error) {
//       console.log('catch');
//     }
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

//   return (
//     <>
//       <Box>
//         <Grid sx={{ mb: 3 }}>
//           <Typography variant="subtitle1">Upcoming Checkout Bookings</Typography>
//         </Grid>
//         <Grid sx={{ mb: 3 }}>
//           <Typography variant="subtitle1" sx={{ color: 'red' }}>
//             <InfoCircleOutlined /> The check-in periods for these bookings have passed, but the guests have not arrived yet.
//           </Typography>
//           <Divider sx={{ mt: 1 }} />
//         </Grid>

//         {showLoader ? <PlaceholderCards /> :
//           cardsData.length > 0 ? (
//             <>
//               {/* Cards Data */}
//               <Grid container spacing={3} sx={{ minHeight: 500, overflow: 'auto' }}>
//                 {currentCards.map((item) => (
//                   <Grid item xs={12} sm={6} md={4} lg={3} key={item.bookingNo}>
//                     <CheckInCheckoutCards
//                       name={item.guestName}
//                       mobile={item.phoneNo}
//                       bookingNo={item.bookingNo}
//                       totalRooms={item.totalRoom}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>

//               {/* Pagination */}
//               <Grid display="flex" justifyContent="center" alignItems="center">
//                 <Pagination
//                   count={Math.ceil(cardsData.length / cardsPerPage)}
//                   page={currentPage}
//                   onChange={handlePageChange}
//                   color="primary"
//                   sx={{
//                     mt: 2,
//                     '& .MuiPaginationItem-root.Mui-selected': {
//                       backgroundColor: '#0d6efd',
//                       color: 'white',
//                     },
//                     '& .MuiPaginationItem-root': {
//                       color: '#000',
//                     },
//                   }}
//                 />
//               </Grid>
//             </>
//           ) : (
//             <img src="" alt="" />
//           )
//         }
//       </Box>
//     </>
//   );
// };

// export default UpcomingCheckouts;





















// import { Box, Divider, Typography, Pagination } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import CheckInCheckoutCards from 'components/CheckInCheckoutCards';
// import { InfoCircleOutlined } from '@ant-design/icons';
// import { useEffect, useState } from 'react';
// import { allUpcomingCheckout } from 'api/api';

// const UpcomingCheckouts = () => {
//   const [cardsData, setCardsData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [cardsPerPage] = useState(12);

//   useEffect(() => {
//     getAllUpcomingCheckout();
//   }, [])


//   const getAllUpcomingCheckout = async () => {
//     try {
//       var response = await allUpcomingCheckout();
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setCardsData(response?.data?.pendingCheckIn)
//         }
//       }
//       else {
//         console.log(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('catch');
//     }
//     finally {
//       console.log('finally');
//     }
//   }

//   // Handle page change
//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   // Calculate the index of the last card on the current page
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

//   return (
//     <Box>
//       <Grid sx={{ mb: 3 }}>
//         <Typography variant="subtitle1">Upcoming Checkout Bookings</Typography>
//       </Grid>
//       <Grid sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" sx={{ color: 'red' }}>
//           <InfoCircleOutlined />  The check-in periods for these bookings have passed, but the guests have not arrived yet.
//         </Typography>
//         <Divider sx={{ mt: 1 }} />
//       </Grid>

//       {/* Fixed Height Grid for Cards */}
//       <Grid container spacing={3} sx={{ minHeight: 500, overflow: 'auto' }}>
//         {currentCards.map((item) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={item.bookingNo}>
//             <CheckInCheckoutCards
//               name={item.guestName}
//               mobile={item.phoneNo}
//               bookingNo={item.bookingNo}
//               totalRooms={item.totalRoom}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Pagination Component */}
//       <Grid display='flex' justifyContent='center' alignItems='center'>
//         <Pagination
//           count={Math.ceil(cardsData.length / cardsPerPage)}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//           sx={{
//             mt: 2,
//             '& .MuiPaginationItem-root.Mui-selected': {
//               backgroundColor: '#0d6efd',
//               color: 'white',
//             },
//             '& .MuiPaginationItem-root': {
//               color: '#000',
//             },
//           }}
//         />
//       </Grid>
//     </Box>
//   );
// };

// export default UpcomingCheckouts;
