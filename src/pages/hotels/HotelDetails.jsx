import { useEffect, useState } from 'react';
import { Edit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DynamicDataTable from 'components/DynamicDataTable';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Box, Button, Stack, Typography } from '@mui/material';
import useSWR, { mutate } from "swr";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { updateHotelApi } from 'api/api';
import { Snackbar, Alert } from '@mui/material';

import HashLoader from 'components/HashLoader';

const ServerIP = 'http://89.116.122.211:5001'
const token = `Bearer ${localStorage.getItem('token')}`;

const CustomButton = styled(Button)(({status}) => ({
  borderRadius: '50px',
  backgroundColor:  status === 'enable' ? '#E6F4EA' : '#fee5e5',
  borderColor: status === 'enable' ? '#57C168' : 'red',
  color: status === 'enable' ? '#57C168' : 'red',
  padding: '2px 26px',
  fontSize: '12px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor:  status === 'enable' ? '#D4ECD9' : '#fccfcf',
    borderColor: status === 'enable' ? '#57C168' : 'red',
    color: status === 'enable' ? '#57C168' : 'red'
  },
}));

const columns = [
  { id: 'hotelName', label: 'Hotel Name', minWidth: 170 },
  { id: 'hotelEmail', label: 'Hotel Email', minWidth: 100 },
  { id: 'phoneNo', label: 'Contact', minWidth: 170 },
  { id: 'address', label: 'Address', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);


const HotelDetails = () => {

  const [rows, setRows] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const { data, error, isValidating } = useSWR(`${ServerIP}/hotel/getAllHotels`, fetcher, {
    onLoadingSlow: () => setShowLoader(true),
    onSuccess: () => setShowLoader(false),
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (data) {
      setShowLoader(true)
      const transformedRows = data.map((hotels) => ({
        ...hotels,
        status: <CustomButton variant="outlined" status={`${hotels.status? 'enable' : 'disable'}`}> {hotels.status ? 'Active' : 'InActive'} </CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button component={Link} to={`/hotelForm/${hotels.hotelId}`} variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={hotels.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={`${hotels.status ? 'error' : 'success'}`} onClick={() => handleDisableHotel(hotels?.hotelId, hotels.status)}>{`${hotels.status ? 'Disable' : 'Enable'}`}</Button>
          </Stack>
        ),
      }));
      setTimeout(() => {
        setShowLoader(false)
        setRows(transformedRows);
      }, 1000);
    }
  }, [data]);

  const refreshData = () => {
    mutate(`${ServerIP}/hotel/getAllHotels`);
  };


  const handleDisableHotel = async (hotelId, status) => {
    setShowLoader(true)
    console.log('start')
    try {
      console.log('try')
      console.log(status)
      const formData = new FormData();
      formData.append('status', !status)

      const response = await updateHotelApi(hotelId, formData);
      console.log(response, 'try1')
      if (response.status === 200) {
        if (response?.data?.status === 'success') {
          console.log(response?.data?.message, 'success');
          setSnackbar({ open: true, message: response?.data?.message, severity: 'success' });
          refreshData();
        }
        else {
          setSnackbar({ open: true, message: response?.data?.msg || 'Error occurred', severity: 'error' });
        }
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message || 'Error occurred', severity: 'error' });
      console.error(error);
    } finally {
      setTimeout(() => {
        setShowLoader(false)
      }, 1000);
      console.log('finally')
    }
  };



  if (error) return <Typography variant="subtitle1">Error loading data</Typography>;
  if (!data) return <Typography variant="subtitle1"><HashLoader /></Typography>;


  return (
    <Box>
      {showLoader && <HashLoader />}
      <DynamicDataTable columns={columns} rows={rows} />

      {/* SnackBar */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      
    </Box>
  );
}

export default HotelDetails
