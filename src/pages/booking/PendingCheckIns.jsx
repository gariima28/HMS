import { Box, Divider, Typography, Pagination } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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

const PendingCheckIns = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);

  // Fetch data with SWR
  const { data, error, isLoading } = useSWR(`${ServerIP}/booking/getPendingCheckIn`, fetcher);

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

  const cardsData = data?.pendingCheckIn || [];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <Box>
      <Grid2 sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Pending Check-Ins</Typography>
      </Grid2>
      <Grid2 sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ color: 'red' }}>
          <InfoCircleOutlined />  The check-in periods for these bookings have passed, but the guests have not arrived yet.
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Grid2>

      {showLoader ? <PlaceholderCards /> :
        cardsData.length > 0 ? (
          <>
            {/* Cards Data */}
            <Grid2 container spacing={3} sx={{ maxHeight: 500, overflow: 'auto' }}>
              {currentCards.map((item) => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.bookingNo}>
                  <CheckInCheckoutCards
                    name={item.guestName}
                    mobile={item.phoneNo}
                    bookingNo={item.bookingNo}
                    bookingId={item.bookingId}
                    totalRooms={item.totalRoom}
                  />
                </Grid2>
              ))}
            </Grid2>

            {/* Pagination */}
            <Grid2 display="flex" justifyContent="center" alignItems="center">
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
            </Grid2>
          </>
        ) : (
          <NoDataFound />
        )
      }
    </Box>
  );
};

export default PendingCheckIns;
