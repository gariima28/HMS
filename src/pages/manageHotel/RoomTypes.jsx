import React from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Edit } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DynamicDataTable from 'components/DynamicDataTable';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import DialogModal from 'components/DialogModal';
import useSWR, { mutate } from "swr";
import axios from 'axios';
import HashLoader from 'components/Skeleton/HashLoader';
import PlaceholderTable from 'components/Skeleton/PlaceholderTable';
import ErrorPage from 'components/ErrorPage';

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

// Custom Button CSS using Material UI Styles
const FeatureButton = styled(Button)(({ status }) => ({
  borderRadius: '50px',
  backgroundColor: status === 'featured' ? '#7367f01a' : '#0000001a',
  borderColor: status === 'featured' ? '#4634ff' : '#000',
  color: status === 'featured' ? '#4634ff' : '#000',
  padding: '2px 26px',
  fontSize: '12px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: status === 'featured' ? '#7267f03a' : '#0000003c',
    borderColor: status === 'featured' ? '#4634ff' : '#000',
    color: status === 'featured' ? '#4634ff' : '#000',
  },
}));

// Table Columns
const columns = [
  { id: 'roomName', label: 'Name', minWidth: 170 },
  { id: 'roomFare', label: 'Fare', minWidth: 100 },
  { id: 'noOfRooms', label: 'Rooms', minWidth: 100 },
  { id: 'adult', label: 'Adult', minWidth: 100 },
  { id: 'children', label: 'Child', minWidth: 100 },
  { id: 'featureStatus', label: 'Feature Status', minWidth: 100 },
  { id: 'roomTypeStatus', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

// API Call when ever data updates 
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const RoomTypes = () => {

  const [rows, setRows] = useState([]);
  const [toaster, setToaster] = useState(false);
  const [msgToaster, setMsgToaster] = useState('');
  const [toaterErrorSuccessState, setToaterErrorSuccessState] = useState('success');

  const [showLoader, setShowLoader] = useState(false);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);

  // get API
  const { data, error } = useSWR(`${ServerIP}/roomTypes/getAll`, fetcher, {
    onLoadingSlow: () => setShowDataTableLoader(true),
    onSuccess: () => setShowDataTableLoader(false),
  });

  // Function to refresh the data
  const refreshData = () => {
    mutate(`${ServerIP}/roomTypes/getAll`);
  };

  // Toast Open Handle
  const handleOpeningToasterState = (message, severity) => {
    setMsgToaster(message);
    setToaterErrorSuccessState(severity);
    setToaster(true);
    refreshData();
  };

  // Toast Close Handle
  const handleClosingToasterState = () => {
    setToaster(false);
  };

  // useEffect
  useEffect(() => {
    if (data) {
      setShowDataTableLoader(true)
      setMsgToaster(data?.message)
      console.log(data?.roomTypes, 'data');
      const transformedRows = data.roomTypes.map((roomType) => ({
        ...roomType,
        // noOfRooms: roomType.roomTypeImage.join(", "),
        featureStatus: <FeatureButton variant="outlined" status={roomType?.roomTypeStatus ? 'featured' : 'unFeatured'}> {roomType?.roomTypeStatus ? 'Featured' : 'UnFeatured'} </FeatureButton>,
        roomTypeStatus: <CustomButton variant="outlined" status={`${roomType.roomTypeStatus ? 'enable' : 'disable'}`}> {roomType.roomTypeStatus ? 'Enabled' : 'Disabled'} </CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} href={`addUpdateRoomType/${roomType.roomTypesId}`}>Edit</Button>
            {/* <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New RoomTypes', 'Update', roomType.roomTypesId)}>Edit</Button> */}
            <Button variant="outlined" size="small" startIcon={roomType.roomTypeStatus ? <EyeInvisibleFilled /> : <EyeFilled />} color={`${roomType.roomTypeStatus ? 'error' : 'success'}`} onClick={() => UpdateRoomTypesStatus(roomType?.roomTypesId, roomType.roomTypeStatus)}>{`${roomType.roomTypeStatus ? 'Disable' : 'Enable'}`}</Button>
          </Stack>
        ),
      }));

      setRows(transformedRows);
      setTimeout(() => {
        setShowDataTableLoader(false)
      }, 1800);
    }
    if (msgToaster) {
      handleOpeningToasterState();
    }
  }, [data]);


  if (error) return (
    <ErrorPage
      errorMessage={`${error}`}
      onReload={() => { window.location.reload() }}
      statusCode={`${error.status}`}
    />
  );
  if (!data) return <Typography variant="subtitle1"><HashLoader /></Typography>;

  return (
    <Box>
      {showLoader && <HashLoader />}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h5">All RoomTypes</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="outlined" href={`addUpdateRoomType/add`}>
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* Data Table */}
      {showDataTableLoader ? <PlaceholderTable /> : rows.length > 0 && <DynamicDataTable columns={columns} rows={rows} />}

      {/* Modals for all Add and Update */}
      {/* <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewAmenity : UpdateRoomTypesData} /> */}

      {/* SnackBar */}
      <Snackbar open={toaster} autoHideDuration={5000} onClose={handleClosingToasterState}>
        <Alert onClose={handleClosingToasterState} severity={toaterErrorSuccessState} variant="filled" sx={{ width: '100%', color: '#fff', fontSize: '14px' }}>
          {msgToaster}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default RoomTypes;




















// import { EyeInvisibleFilled } from '@ant-design/icons';
// import { Edit } from '@mui/icons-material';
// import { Box, Button, Stack, Typography } from '@mui/material';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';
// import { styled } from '@mui/material/styles';
// import DialogModal from 'components/DialogModal';
// import { useState } from 'react';

// const FeaturedButton = styled(Button)(() => ({
//   borderRadius: '50px',
//   backgroundColor: '#7367f01a',
//   borderColor: '#4634ff',
//   color: '#4634ff',
//   padding: '2px 26px',
//   fontSize: '12px',
//   textTransform: 'none',

//   '&:hover': {
//     backgroundColor: '#D4ECD9',
//     borderColor: '#57C168',
//   },
// }));

// const UnFeaturedButton = styled(Button)(() => ({
//   borderRadius: '50px',
//   backgroundColor: '#0000001a',
//   borderColor: '#000',
//   color: '#000',
//   padding: '2px 26px',
//   fontSize: '12px',
//   textTransform: 'none',

//   '&:hover': {
//     backgroundColor: '#D4ECD9',
//     borderColor: '#57C168',
//   },
// }));

// const EnabledButton = styled(Button)(() => ({
//   borderRadius: '50px',
//   backgroundColor: '#E6F4EA',
//   borderColor: '#57C168',
//   color: '#57C168',
//   padding: '2px 26px',
//   fontSize: '12px',
//   textTransform: 'none',

//   '&:hover': {
//     backgroundColor: '#D4ECD9',
//     borderColor: '#57C168',
//   },
// }));


// const columns = [
//   { id: 'name', label: 'Name', minWidth: 120 },
//   { id: 'fare', label: 'Fare', minWidth: 120 },
//   { id: 'rooms', label: 'Rooms', minWidth: 120 },
//   { id: 'adult', label: 'Adult', minWidth: 120 },
//   { id: 'child', label: 'Child', minWidth: 120 },
//   { id: 'featureStatus', label: 'Feature Status', minWidth: 100, align: 'center' },
//   { id: 'status', label: 'Status', minWidth: 120, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 120, align: 'right' },
// ];


// const RoomTypes = () => {

//   const [modalTitle, setModalTitle] = useState('Add New RoomTypes');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleDialogState = (title, button) => {
//     setModalTitle(title);
//     setButtonName(button);
//     setModalOpen(!modalOpen);
//   };

//   const handleClosingDialogState = () => {
//     setModalOpen(!modalOpen);
//   };

//   const rows = [
//     {
//       name: 'Accessible Room',
//       fare: '$350.00',
//       rooms: 7,
//       adult: 2,
//       child: 2,
//       featureStatus: <UnFeaturedButton variant="outlined"> UnFeatured </UnFeaturedButton>,
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update Room Type', 'Create')}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Luxury Suite',
//       fare: '$220.00',
//       rooms: 7,
//       adult: 2,
//       child: 2,
//       featureStatus: <FeaturedButton variant="outlined"> Featured </FeaturedButton>,
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Walker Cantrell',
//       fare: '$60.00',
//       rooms: 7,
//       adult: 2,
//       child: 2,
//       featureStatus: <FeaturedButton variant="outlined"> Featured </FeaturedButton>,
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Mini Suite',
//       fare: '$120.00',
//       rooms: 7,
//       adult: 2,
//       child: 2,
//       featureStatus: <FeaturedButton variant="outlined"> Featured </FeaturedButton>,
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Murphy',
//       fare: '$350.00',
//       rooms: 7,
//       adult: 2,
//       child: 2,
//       featureStatus: <FeaturedButton variant="outlined"> Featured </FeaturedButton>,
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'President Suite',
//       fare: '$220.00',
//       rooms: 7,
//       adult: 2,
//       child: 2,
//       featureStatus: <FeaturedButton variant="outlined"> Featured </FeaturedButton>,
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Executive Suite',
//       fare: '$60.00',
//       rooms: 7,
//       adult: 2,
//       child: 2,
//       featureStatus: <FeaturedButton variant="outlined"> Featured </FeaturedButton>,
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//   ];

//   const InputFields = [
//     { id:'A1', fieldName : 'RoomTypes Title *'},
//     { id:'A2', fieldName : 'Icon *'}
//   ]

//   return (
//     <Box>
//       <Grid2 sx={{ display: 'flex', mb: 3 }}>
//         <Grid2 alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant='h4'>All Room Types</Typography>
//         </Grid2>
//         <Grid2>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" href={`bookingDetailsPage/${1}`}>+ Add New</Button>
//           </Stack>
//         </Grid2>
//       </Grid2>
//       <DynamicDataTable columns={columns} rows={rows} />

//     </Box>
//   );
// }

// export default RoomTypes
