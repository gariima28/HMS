import React, { useEffect, useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Edit } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DynamicDataTable from 'components/DynamicDataTable';
import { styled } from '@mui/material/styles';
import DialogModal from 'components/DialogModal';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { addRoomApi, allRoomTypesApi, getRoomDataByIdApi, updateRoomApi } from 'api/api';

const ServerIP = 'http://89.116.122.211:5001';
const token = `Bearer ${localStorage.getItem('token')}`;

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
    color: status === 'enable' ? '#57C168' : 'red',
  },
}));

// Table Columns
const columns = [
  { id: 'roomNumber', label: 'Room Number', minWidth: 120 },
  { id: 'type', label: 'Type', minWidth: 120 },
  { id: 'status', label: 'Status', minWidth: 120, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 120, align: 'right' },
];

// API Call fetcher
const fetcher = (url) =>
  axios.get(url, { headers: { Authorization: token } }).then((res) => res.data);

const Room = () => {
  // All useStates
  const [modalTitle, setModalTitle] = useState('Add New Room');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [allRoomTypes, setAllRoomTypes] = useState([]);
  const [roomId, setRoomId] = useState();
  const [toaster, setToaster] = useState(false);
  const [msgToaster, setMsgToaster] = useState('');
  const [toaterErrorSuccessState, setToaterErrorSuccessState] = useState(
    'success'
  );

  // Add Room State Function
  const [formDataa, setFormDataa] = useState({
    roomType: '',
    roomNumber: '',
  });

  // Update Room State Function
  const [updateFormDataa, setUpdateFormDataa] = useState({
    roomType: '',
    roomNumber: '',
    roomTypeOriginal: '',
    roomNumberOriginal: '',
  });

  // Handlers for Add Room Form
  const handleFormDataaRoomType = (val) => {
    setFormDataa({
      ...formDataa,
      roomType: val,
    });
  };

  const handleFormDataaRoomNumber = (val) => {
    setFormDataa({
      ...formDataa,
      roomNumber: val,
    });
  };

  // Handlers for Update Room Form
  const handleUpdateFormDataaRoomType = (val) => {
    setUpdateFormDataa({
      ...updateFormDataa,
      roomType: val,
    });
  };

  const handleUpdateFormDataaRoomNumber = (val) => {
    setUpdateFormDataa({
      ...updateFormDataa,
      roomNumber: val,
    });
  };

  // Add Input Fields with roomType as select
  const AddInputFields = [
    {
      id: 'roomType',
      field: 'select',
      fieldName: 'Room Type *',
      placeholder: 'Select Room Type',
      fieldOptions: allRoomTypes.map((rt) => ({
        optionId: rt.roomTypesId, // Adjust based on your API response
        optionValue: rt.roomName, // The value to be submitted
        optionName: rt.roomName, // The display name
      })),
      value: formDataa.roomType,
      updateValFunc: handleFormDataaRoomType,
    },
    {
      id: 'roomNumber',
      field: 'textInput',
      fieldType: 'text',
      fieldName: 'Room Number *',
      placeholder: 'Enter Room Number',
      value: formDataa.roomNumber,
      updateValFunc: handleFormDataaRoomNumber,
    },
  ];

  // Update Input Fields with roomType as select
  const UpdateInputFields = [
    {
      id: 'roomType',
      field: 'select',
      fieldName: 'Room Type *',
      placeholder: 'Select Room Type',
      fieldOptions: allRoomTypes.map((rt) => ({
        optionId: rt.roomTypesId, // Adjust based on your API response
        optionValue: rt.roomName, // The value to be submitted
        optionName: rt.roomName, // The display name
      })),
      value: updateFormDataa.roomType,
      updateValFunc: handleUpdateFormDataaRoomType,
    },
    {
      id: 'roomNumber',
      field: 'textInput',
      fieldType: 'text',
      fieldName: 'Room Number *',
      placeholder: 'Enter Room Number',
      value: updateFormDataa.roomNumber,
      updateValFunc: handleUpdateFormDataaRoomNumber,
    },
  ];

  // SWR for fetching room data
  const { data, error } = useSWR(`${ServerIP}/room/getAll`, fetcher);

  // Function to refresh the data
  const refreshData = () => {
    mutate(`${ServerIP}/room/getAll`);
  };

  // Dialog Open Handle
  const handleDialogState = (title, button, roomId = null) => {
    setModalTitle(title);
    setButtonName(button);
    if (button === 'Update' && roomId) {
      getRoomDataById(roomId);
    }
    setModalOpen(true);
  };

  // Dialog Close Handle
  const handleClosingDialogState = () => {
    setModalOpen(false);
  };

  // Toast Open Handle
  const handleOpeningToasterState = (message, severity = 'success') => {
    setMsgToaster(message);
    setToaterErrorSuccessState(severity);
    setToaster(true);
    refreshData();
  };

  // Toast Close Handle
  const handleClosingToasterState = () => {
    setToaster(false);
  };

  // Fetch all room types when component mounts
  useEffect(() => {
    getAllRoomTypes();
  }, []);

  // useEffect to handle data fetching and transformation
  useEffect(() => {
    if (data) {
      const transformedRows = data.room.map((room) => ({
        ...room,
        roomNumber: room.roomNo,
        type: room.roomType, // Adjust based on your API response
        status: (
          <CustomButton
            variant="outlined"
            status={`${room.status ? 'enable' : 'disable'}`}
          >
            {room.status ? 'Enabled' : 'Disabled'}
          </CustomButton>
        ),
        action: (
          <Stack justifyContent="end" spacing={2} direction="row">
            <Button
              variant="outlined"
              size="small"
              startIcon={<Edit />}
              onClick={() =>
                handleDialogState('Update Room', 'Update', room.roomId)
              }
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={room.status ? <EyeInvisibleFilled /> : <EyeFilled />}
              color={room.status ? 'error' : 'success'}
              onClick={() => UpdateRoomStatus(room?.roomId, room?.status)}
            >
              {room.status ? 'Disable' : 'Enable'}
            </Button>
          </Stack>
        ),
      }));
      setRows(transformedRows);
    }
    if (msgToaster) {
      // Ensure that toaster state is managed correctly
      // This line was previously calling handleOpeningToasterState without arguments, which might cause issues
      // Removed or adjust as needed
    }
  }, [data]);

  // Add New Room Function
  const AddNewRoom = async () => {
    try {
      const payload = {
        roomType: formDataa.roomType, // Selected room type ID
        roomNo: formDataa.roomNumber,
      };
      const response = await addRoomApi(payload);
      if (response.status === 200 && response.data.status === 'success') {
        handleOpeningToasterState(response.data.message, 'success');
        setModalOpen(false);
      } else {
        handleOpeningToasterState(response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error adding room:', error);
      handleOpeningToasterState('Error adding room', 'error');
    }
  };

  // Get all room types
  const getAllRoomTypes = async () => {
    try {
      const response = await allRoomTypesApi();
      if (response?.status === 200 && response?.data?.status === 'success') {
        setAllRoomTypes(response?.data?.roomTypes);
      } else {
        console.error(response?.data?.message);
      }
    } catch (error) {
      console.error('Error fetching room types:', error);
    }
  };

  // Get Room data by ID for updating
  const getRoomDataById = async (id) => {
    setRoomId(id);
    try {
      const response = await getRoomDataByIdApi(id);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setUpdateFormDataa({
          roomType: response?.data?.room?.roomType, // Adjust based on your API response
          roomNumber: response?.data?.room?.roomNo,
          roomTypeOriginal: response?.data?.room?.roomType,
          roomNumberOriginal: response?.data?.room?.roomNo,
        });
      } else {
        console.error(response?.data?.message);
      }
    } catch (error) {
      console.error('Error fetching room data:', error);
    }
  };

  // Update Room Status Function
  const UpdateRoomStatus = async (id, currentStatus) => {
    try {
      const payload = {
        status: !currentStatus, // Toggle status
      };
      const response = await updateRoomApi(id, payload);
      if (response?.status === 200 && response?.data?.status === 'success') {
        handleOpeningToasterState(response?.data?.message, 'success');
      } else {
        handleOpeningToasterState(response?.data?.message, 'error');
      }
    } catch (error) {
      console.error('Error updating room status:', error);
      handleOpeningToasterState('Error updating room status', 'error');
    }
  };

  // Update Room Data Function
  const UpdateRoomData = async () => {
    try {
      const payload = {
        roomType: updateFormDataa.roomType, // Selected room type ID
        roomNo: updateFormDataa.roomNumber,
      };
      const response = await updateRoomApi(roomId, payload);
      if (response?.status === 200 && response?.data?.status === 'success') {
        handleOpeningToasterState(response?.data?.message, 'success');
        setModalOpen(false);
      } else {
        handleOpeningToasterState(response?.data?.message, 'error');
      }
    } catch (error) {
      console.error('Error updating room:', error);
      handleOpeningToasterState('Error updating room', 'error');
    }
  };

  if (error) {
    return (
      <Typography variant="subtitle1">- Error loading data</Typography>
    );
  }
  if (!data)
    return (
      <Typography variant="subtitle1">
        Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...
      </Typography>
    );

  return (
    <Box>
      {/* Heading */}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent="center" sx={{ flexGrow: 1 }}>
          <Typography variant="h5">All Rooms</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent="start" spacing={2} direction="row">
            <Button
              variant="outlined"
              onClick={() => handleDialogState('Add New Room', 'Create')}
            >
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* Data Table */}
      <DynamicDataTable columns={columns} rows={rows} />

      {/* Modals for all Add and Update */}
      <DialogModal
        handleClosingDialogState={handleClosingDialogState}
        modalOpen={modalOpen}
        title={modalTitle}
        buttonName={buttonName === 'Create' ? 'Save Changes' : 'Update'}
        InputFields={
          buttonName === 'Create' ? AddInputFields : UpdateInputFields
        }
        onSubmit={buttonName === 'Create' ? AddNewRoom : UpdateRoomData}
      />

      {/* SnackBar */}
      <Snackbar
        open={toaster}
        autoHideDuration={5000}
        onClose={handleClosingToasterState}
      >
        <Alert
          onClose={handleClosingToasterState}
          severity={toaterErrorSuccessState}
          variant="filled"
          sx={{ width: '100%', color: '#fff', fontSize: '14px' }}
        >
          {msgToaster}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Room;
















// import React from 'react'
// import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
// import { Edit } from '@mui/icons-material';
// import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';
// import { styled } from '@mui/material/styles';
// import { useEffect, useState } from 'react';
// import DialogModal from 'components/DialogModal';
// import useSWR, { mutate } from "swr";
// import axios from 'axios';
// import { addRoomApi, allRoomTypesApi, getRoomDataByIdApi, updateRoomApi } from 'api/api';
// // import { useForm } from 'react-hook-form';

// // const LocalGirjesh = 'http://192.168.20.109:5001';
// const ServerIP = 'http://89.116.122.211:5001'
// const token = `Bearer ${localStorage.getItem('token')}`;

// // Custom Button CSS using Material UI Styles
// const CustomButton = styled(Button)(({ status }) => ({
//   borderRadius: '50px',
//   backgroundColor: status === 'enable' ? '#E6F4EA' : '#fee5e5',
//   borderColor: status === 'enable' ? '#57C168' : 'red',
//   color: status === 'enable' ? '#57C168' : 'red',
//   padding: '2px 26px',
//   fontSize: '12px',
//   textTransform: 'none',

//   '&:hover': {
//     backgroundColor: status === 'enable' ? '#D4ECD9' : '#fccfcf',
//     borderColor: status === 'enable' ? '#57C168' : 'red',
//     color: status === 'enable' ? '#57C168' : 'red'
//   },
// }));

// // Table Columns

// const columns = [
//   { id: 'roomNumber', label: 'Room Number', minWidth: 120 },
//   { id: 'type', label: 'Type', minWidth: 120 },
//   { id: 'status', label: 'Status', minWidth: 120, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 120, align: 'right' },
// ];


// // API Call when ever data updates 
// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

// const Room = () => {

//   // All useStates
//   const [modalTitle, setModalTitle] = useState('Add New Room');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [allRoomTypes, setAllRoomTypes] = useState([]);
//   const [roomId, setRoomId] = useState();
//   const [toaster, setToaster] = useState(false);
//   const [msgToaster, setMsgToaster] = useState('');
//   const [toaterErrorSuccessState, setToaterErrorSuccessState] = useState('success');

//   // Add Room State Function
//   const [formDataa, setFormDataa] = useState({
//     roomType: '',
//     roomNumber: ''
//   })

//   // Update Room State Function
//   const [updateFormDataa, setUpdateFormDataa] = useState({
//     roomType: '',
//     roomNumber: '',
//     roomTypeOriginal: '',
//     roomNumberOriginal: ''
//   })

//   // Add Room Type
//   const handleFormDataaRoomType = (val) => {
//     setFormDataa({
//       ...formDataa,
//       roomType: val
//     });
//   }

//   // Add Room Number
//   const handleFormDataaRoomNumber = (val) => {
//     setFormDataa({
//       ...formDataa,
//       roomNumber: val
//     });
//   }

//   // Update Room Type
//   const handleUpdateFormDataaRoomType = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       roomType: val
//     });
//   }

//   // Update Room Number
//   const handleUpdateFormDataaRoomNumber = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       roomNumber: val
//     });
//   }

//   const AddInputFields =
//     [
//       { id: 'roomType', field: 'textInput', fieldType: 'text', fieldName: 'Room Type *', placeholder: 'Enter Room Type', updateValFunc: handleFormDataaRoomType },
//       { id: 'roomNumber', field: 'textInput', fieldType: 'text', fieldName: 'Room Number *', placeholder: 'Enter Room Number', updateValFunc: handleFormDataaRoomNumber },
//     ];

//   const UpdateInputFields =
//     [
//       { id: 'roomType', field: 'textInput', fieldType: 'text', fieldName: 'Room Type *', placeholder: 'Enter Room Type', value: updateFormDataa.roomType, updateValFunc: handleUpdateFormDataaRoomType },
//       { id: 'roomNumber', field: 'textInput', fieldType: 'text', fieldName: 'Room Number *', placeholder: 'Enter Room Number', value: updateFormDataa.roomNumber, updateValFunc: handleUpdateFormDataaRoomNumber }
//     ];

//   // get API
//   const { data, error } = useSWR(`${ServerIP}/room/getAll`, fetcher);

//   // Function to refresh the data
//   const refreshData = () => {
//     mutate(`${ServerIP}/room/getAll`);
//   };

//   // Dialog Open Handle
//   const handleDialogState = (title, button, roomId) => {
//     setModalTitle(title);
//     setButtonName(button);
//     if (button === 'Update') {
//       getRoomDataById(roomId);
//     }
//     setModalOpen(!modalOpen);
//   };

//   // Dialog Close Handle
//   const handleClosingDialogState = () => {
//     setModalOpen(!modalOpen);
//   };

//   // Toast Open Handle
//   const handleOpeningToasterState = (message, severity) => {
//     setMsgToaster(message);
//     setToaterErrorSuccessState(severity);
//     setToaster(true);
//     refreshData();
//   };

//   // Toast Close Handle
//   const handleClosingToasterState = () => {
//     setToaster(false);
//   };

//   // useEffect
//   useEffect(() => {
//     getAllRoomTypes()
//     if (data) {
//       setMsgToaster(data?.message)
//       console.log(data, 'data');
//       const transformedRows = data.room.map((room) => ({
//         ...room,
//         roomNumber: room.roomNo,
//         type: room.roomType,
//         status: <CustomButton variant="outlined" status={`${room.status ? 'enable' : 'disable'}`}> {room.status ? 'Enabled' : 'Disabled'} </CustomButton>,
//         action: (
//           <Stack justifyContent='end' spacing={2} direction="row">
//             <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Room', 'Update', room.roomId)}>Edit</Button>
//             <Button variant="outlined" size="small" startIcon={room.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={`${room.status ? 'error' : 'success'}`} onClick={() => UpdateRoomStatus(room?.roomId, room?.status)}>{`${room.status ? 'Disable' : 'Enable'}`}</Button>
//           </Stack>
//         ),
//       }));
//       setRows(transformedRows);
//     }
//     if (msgToaster) {
//       handleOpeningToasterState();
//     }
//   }, [data]);

//   // Add Function
//   const AddNewRoom = async () => {
//     console.log(formDataa, 'formDataa')
//     console.log('start')
//     try {
//       const data = {
//         'roomType': formDataa.roomType,
//         'roomNo': formDataa.roomNumber
//       }
//       console.log(data)
//       const response = await addRoomApi(data);
//       console.log(response, 'response')
//       if (response.status === 200) {
//         if (response?.data?.status === 'success') {
//           console.log(response?.data?.message, 'success')
//           // navigate('/room');
//           setModalOpen(false); 
//           refreshData();
//         }
//       }
//     }
//     catch (error) {
//       console.log('catch')
//     }
//     finally {
//       console.log('finally')
//     }
//   };


//   // Get Room data by id
//   const getAllRoomTypes = async () => {
//     try {
//       var response = await allRoomTypesApi();
//       console.log(response, 'all room types')
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setAllRoomTypes(response?.data?.roomTypes)
//         }
//       }
//       else {
//         console.log(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('catch')
//     }
//     finally {
//       console.log('finally')
//     }
//   }

//   // Get Room data by id
//   const getRoomDataById = async (id) => {
//     setRoomId(id)
//     try {
//       var response = await getRoomDataByIdApi(id);
//       console.log(response, 'get by id')
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setUpdateFormDataa({
//             roomType: response?.data?.room?.roomType,
//             roomNumber: response?.data?.room?.roomNo,
//             roomTypeOriginal: response?.data?.room?.roomType,
//             roomNumberOriginal: response?.data?.room?.roomNo
//           });
//         }
//       }
//       else {
//         console.log(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('catch')
//     }
//     finally {
//       console.log('finally')
//     }
//   }

//   // Update Function
//   const UpdateRoomStatus = async (id, roomStatus) => {
//     try {
//       const data={
//         'status': roomStatus ? false : true
//       }
//       var response = await updateRoomApi(id, data);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setMsgToaster(response?.data?.message)
//           refreshData();
//         }
//         else {
//           setMsgToaster(response?.data?.message)
//         }
//       } else {
//         setMsgToaster(response?.data?.message)
//       }
//     } catch (error) {
//       console.error('Error during update:', error);
//       setMsgToaster('Error during update:', error)
//     }
//   }


//   // Update Status Function
//   const UpdateRoomData = async () => {
//     try {
//       const data = {
//         'roomType': updateFormDataa.roomType,
//         'roomNo': updateFormDataa.roomNumber
//       }
//       var response = await updateRoomApi(roomId, data);
//       console.log(response, 'facili')
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setMsgToaster(response?.data?.message)
//           setModalOpen(false);
//           refreshData();
//         }
//         else {
//           setMsgToaster(response?.data?.message)
//         }
//       } else {
//         setMsgToaster(response?.data?.message)
//       }
//     } catch (error) {
//       console.error('Error during update:', error);
//       setMsgToaster('Error during update:', error)
//     }
//   }

//   if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
//   if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

//   return (
//     <Box>
//       {/* Heading */}
//       <Grid sx={{ display: 'flex', mb: 3 }}>
//         <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant="h5">All Room</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={() => handleDialogState('Add New Room', 'Create')}>
//               + Add New
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       {/* Data Table */}
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all Add and Update */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewRoom : UpdateRoomData} />

//       {/* SnackBar */}

//       <Snackbar open={toaster} autoHideDuration={5000} onClose={handleClosingToasterState} >
//         <Alert onClose={handleClosingToasterState} severity={toaterErrorSuccessState} variant="filled" sx={{ width: '100%', color: '#fff', fontSize: '14px' }} >
//           {msgToaster}
//         </Alert>
//       </Snackbar>

//     </Box>
//   );
// };

// export default Room;























// import { EyeInvisibleFilled, EyeOutlined } from '@ant-design/icons';
// import { Edit } from '@mui/icons-material';
// import { Box, Button, Stack, Typography } from '@mui/material';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';
// import { styled } from '@mui/material/styles';
// import { useState } from 'react';
// import DialogModal from 'components/DialogModal';

// const DisabledButton = styled(Button)(() => ({
//   borderRadius: '50px',
//   backgroundColor: '#ff9f431a',
//   borderColor: '#ff9f43',
//   color: '#ff9f43',
//   padding: '2px 26px',
//   fontSize: '12px',
//   textTransform: 'none',

//   '&:hover': {
//     backgroundColor: '#ff9f431a',
//     borderColor: '#ff9f43',
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
//   { id: 'roomNumber', label: 'Room Number', minWidth: 120 },
//   { id: 'type', label: 'Type', minWidth: 120 },
//   { id: 'status', label: 'Status', minWidth: 120, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 120, align: 'right' },
// ];


// const Room = () => {

//   const [modalTitle, setModalTitle] = useState('Add New Amenities');
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
//       roomNumber: '101',
//       type: 'Executive Suite',
//       status: <DisabledButton variant="outlined"> Disabled </DisabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update Room', 'Create')}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeOutlined />} color="success">Enable</Button>
//         </Stack>
//     },
//     {
//       roomNumber: '101',
//       type: 'Executive Suite',
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       roomNumber: '101',
//       type: 'Executive Suite',
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       roomNumber: '101',
//       type: 'Executive Suite',
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       roomNumber: '101',
//       type: 'Executive Suite',
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       roomNumber: '101',
//       type: 'Executive Suite',
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       roomNumber: '101',
//       type: 'Executive Suite',
//       status: <EnabledButton variant="outlined"> Enabled </EnabledButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//   ];

//   const InputFields = [
//     { id:'A1', fieldName : 'Room Type *'},
//     { id:'A2', fieldName : 'Room Number *'}
//   ]

//   // Add Amenities State Function
//   const [formDataa, setFormDataa] = useState({
//     roomType: '',
//     roomNumber: ''
//   })

//   // Update Amenities State Function
//   const [updateFormDataa, setUpdateFormDataa] = useState({
//     roomType: '',
//     roomNumber: '',
//     roomTypeOriginal: '',
//     roomNumberOriginal: ''
//   })

//   // Add Amenities Name
//   const handleFormDataaAmenitiesName = (val) => {
//     setFormDataa({
//       ...formDataa,
//       roomType: val
//     });
//   }

//   // Add Amenities Status
//   const handleFormDataaAmenitiesStatus = (val) => {
//     setFormDataa({
//       ...formDataa,
//       amenitiesStatus: val
//     });
//   }

//   // Add Amenities Icon
//   const handleFormDataaAmenitiesIcon = (val) => {
//     setFormDataa({
//       ...formDataa,
//       roomNumber: val
//     });
//   }

//   // Update Amenities Name
//   const handleUpdateFormDataaAmenitiesName = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       roomType: val
//     });
//   }

//   // Update Amenities Icon
//   const handleUpdateFormDataaAmenitiesIcon = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       roomNumber: val
//     });
//   }

//   const AddInputFields =
//     [
//       { id: 'roomType', field: 'textInput', fieldType: 'text', fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', updateValFunc: handleFormDataaAmenitiesName },
//       { id: 'roomNumber', field: 'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], updateValFunc: handleFormDataaAmenitiesIcon }
//     ];

//   const UpdateInputFields =
//     [
//       { id: 'roomType', field: 'textInput', fieldType: 'text', fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', value: updateFormDataa.roomType, updateValFunc: handleUpdateFormDataaAmenitiesName },
//       { id: 'roomNumber', field: 'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], value: updateFormDataa.roomNumber, updateValFunc: handleUpdateFormDataaAmenitiesIcon }
//     ];

//   return (
//     <Box>
//       <Grid2 sx={{ display: 'flex', mb: 3 }}>
//         <Grid2 alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant='h4'>All Room</Typography>
//         </Grid2>
//         <Grid2>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={() => handleDialogState('Add New Room', 'Create')}>+ Add New</Button>
//           </Stack>
//         </Grid2>
//       </Grid2>
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={InputFields} />


//     </Box>
//   );
// }

// export default Room
