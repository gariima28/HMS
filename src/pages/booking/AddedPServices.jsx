import React from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DynamicDataTable from 'components/DynamicDataTable';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import DialogModal from 'components/DialogModal';
import useSWR, { mutate } from "swr";
import axios from 'axios';
import { addAmenitiesApi, getAmenitiesDataByIdApi, updateAmenitiesApi, updateAmenitiesStatus } from 'api/api';
import NoDataFound from 'pages/NoDataFound';
import PlaceholderTable from 'components/Skeleton/PlaceholderTable';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'https://www.auth.edu2all.in/hms'
const token = `Bearer ${localStorage.getItem('token')}`;

// Custom Button CSS using Material UI Styles
const CustomButton = styled(Button)(({ status }) => ({
  borderRadius: '50px',
  backgroundColor: status === 'enable' ? '#E6F4EA' : '#fee5e5',
  borderColor: status === 'enable' ? '#57C168' : 'red',
  color: status === 'enable' ? '#57C168' : 'red',
  padding: '2px 26px',
  fontSize: '12px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: status === 'enable' ? '#D4ECD9' : '#fccfcf',
    borderColor: status === 'enable' ? '#57C168' : 'red',
    color: status === 'enable' ? '#57C168' : 'red'
  },
}));

const AddButton = styled(Button)(({ status }) => ({
  borderRadius: '10px',
  backgroundColor: '#0D6A84',
  borderColor: status === 'enable' ? '#FFD8D8' : '#0D6A84',
  color: '#FFFFFF',
  padding: '8px 20px',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'none',
  '&:hover': {
    // backgroundColor: '',
    // borderColor: '',
    //color: '',
  },
}));

// Table Columns
const columns = [
  { id: 'sno', label: 'S.No', minWidth: 100 },
  { id: 'localDate', label: 'Date', minWidth: 100 },
  { id: 'roomNo', label: 'Room Number', minWidth: 120 },
  { id: 'service', label: 'Service', minWidth: 100 },
  { id: 'quantity', label: 'Quantity', minWidth: 100 },
  { id: 'cost', label: 'Cost', minWidth: 100 },
  { id: 'total', label: 'Total', minWidth: 100 },
  { id: 'addedBy', label: 'Added By', minWidth: 100 },
  // { id: 'action', label: 'Action', minWidth: 100, align: 'center' },
];

// API Call when ever data updates 
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const AddedPServices = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);

  // get API
  const { data, error } = useSWR(`${ServerIP}/booking/getAllPremBooking`, fetcher);

  // Function to refresh the data
  const refreshData = () => {
    mutate(`${ServerIP}/booking/getAllPremBooking`);
  };

  // useEffect
  useEffect(() => {
    if (data) {
      setShowDataTableLoader(true)
      // setMsgToaster(data?.message)
      console.log(data?.bookings, 'data');
      const transformedRows = data?.bookings?.map((allPremBookings, index) => ({
        ...allPremBookings,
        sno: index + 1,
        cost: allPremBookings.cost ?? '-',
        total: allPremBookings.total ?? '-',
        addedBy: allPremBookings.addedBy ?? '-',
        quantity: allPremBookings.quantity[0] ?? '-',
        service: allPremBookings.premiumServiceList ?? '-',
        status: <CustomButton variant="outlined" status={`${allPremBookings.status ? 'enable' : 'disable'}`}> {allPremBookings.status ? 'Enabled' : 'Disabled'} </CustomButton>,
        // action: (
        //   <Stack justifyContent='end' spacing={2} direction="row">
        //     <Stack justifyContent='end' spacing={2} direction="row">
        //       <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New BedTypes', 'Update', BedType.bedTypeId)}>Edit</Button>
        //       <Button variant="outlined" size="small" startIcon={<DeleteOutline />} color="error" onClick={() => handleDeleteButton(BedType?.bedTypeId)}>Delete</Button>
        //     </Stack>
        //   </Stack>
        // ),
      }));
      setRows(transformedRows);
      setTimeout(() => {
        setShowDataTableLoader(false)
      }, 1800);
    }
  }, [data]);

  if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

  return (
    <Box>
      {/* Heading */}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h5">Add Premium Service</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">

            <AddButton component={Link} variant="outlined" to='/addService'>
              + Add New
            </AddButton>
          </Stack>
        </Grid>
      </Grid>

      {/* Data Table */}
      {showDataTableLoader ? <PlaceholderTable /> : rows?.length > 0 ? <DynamicDataTable columns={columns} rows={rows} /> : <NoDataFound />}
    </Box>
  );
};


export default AddedPServices
