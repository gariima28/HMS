import { useEffect, useState } from 'react';
import { Edit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DynamicDataTable from 'components/DynamicDataTable';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import useSWR from "swr";
import axios from 'axios';

const LocalGirjesh = 'http://192.168.20.109:5001';
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

  const [toaster, setToaster] = useState(false)
  const [msgToaster, setMsgToaster] = useState('')

  const { data, error } = useSWR(`${ServerIP}/hotel/getAllHotels`, fetcher);

  const handleOpeningToasterState = () => {
    setToaster(true);
  };

  const handleClosingToasterState = () => {
    setToaster(false);
  };

  useEffect(() => {
    if (data) {
      console.log(data, 'data');
      const transformedRows = data.map((hotels) => ({
        ...hotels,
        status: <CustomButton variant="outlined" status={`${hotels.status? 'enable' : 'disable'}`}> {hotels.status ? 'Active' : 'InActive'} </CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Amenities', 'Update')}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={hotels.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={`${hotels.status ? 'error' : 'success'}`} onClick={() => UpdateAmenitiesStatus(hotels?.amenitiesId, hotels.status)}>{`${hotels.status ? 'Disable' : 'Enable'}`}</Button>
          </Stack>
        ),
      }));
      setRows(transformedRows);
    }
    if (msgToaster) {
      handleOpeningToasterState();
    }
  }, [data, msgToaster]);



  if (error) return <Typography variant="subtitle1">Error loading data</Typography>;
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;


  return (
    <Box>
      <DynamicDataTable columns={columns} rows={rows} />

      {/* SnackBar */}
      <Snackbar open={toaster} autoHideDuration={5000} onClose={handleClosingToasterState} message={msgToaster} />
    </Box>
  );
}

export default HotelDetails
