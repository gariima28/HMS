import React, { useState, useEffect } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Edit } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DynamicDataTable from 'components/DynamicDataTable';
import { styled } from '@mui/material/styles';
import DialogModal from 'components/DialogModal';
import useSWR, { mutate } from "swr";
import axios from 'axios';
import HashLoader from 'components/Skeleton/HashLoader';
import { addRoomApi, allRoomTypesApi, getRoomDataByIdApi, updateRoomApi } from 'api/api';
import { useForm } from 'react-hook-form';
import ErrorPage from 'components/ErrorPage';

const ServerIP = 'https://www.auth.edu2all.in/hms';
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
    color: status === 'enable' ? '#57C168' : 'red',
  },
}));

// Table Columns

const columns = [
  { id: 'roomNo', label: 'Room No', minWidth: 170 },
  { id: 'roomType', label: 'Room Type', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

// API Call when data updates
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const Rooms = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [modalTitle, setModalTitle] = useState('Add New Rooms');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [roomId, setRoomId] = useState();
  const [allRoomTypes, setAllRoomTypes] = useState([]);
  const { reset } = useForm();
  const [showLoader, setShowLoader] = useState(false);

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
        optionId: rt.roomTypesId,
        optionValue: rt.roomName,
        optionName: rt.roomName,
      })),
      value: updateFormDataa.roomType, // Tied to the fetched data
      updateValFunc: handleUpdateFormDataaRoomType,
    },
    {
      id: 'roomNumber',
      field: 'textInput',
      fieldType: 'text',
      fieldName: 'Room Number *',
      placeholder: 'Enter Room Number',
      value: updateFormDataa.roomNumber, // Tied to the fetched data
      updateValFunc: handleUpdateFormDataaRoomNumber,
    },
  ];


  // Fetch all room types when component mounts
  useEffect(() => {
    getAllRoomTypes();
  }, []);

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


  // Get API
  const { data, error } = useSWR(`${ServerIP}/room/getAll`, fetcher, {
    onLoadingSlow: () => setShowLoader(true),
    onSuccess: () => setShowLoader(false),
  });

  const refreshData = () => {
    mutate(`${ServerIP}/room/getAll`);
  };

  const handleDialogState = (title, button, roomId) => {
    setModalTitle(title);
    setButtonName(button);
    if (button === 'Update') {
      getRoomsDataById(roomId);
    }
    setModalOpen(!modalOpen);
  };

  const handleClosingDialogState = () => {
    setModalOpen(!modalOpen);
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (data) {
      setShowLoader(true)
      const transformedRows = data.room.map((room) => ({
        ...room,
        image: room.icon ? room.roomImage.split('/').pop() : '-',
        status: <CustomButton variant="outlined" status={room.status ? 'enable' : 'disable'}>{room.status ? 'Enabled' : 'Disabled'}</CustomButton>,
        action: (
          <Stack justifyContent="end" spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Rooms', 'Update', room.roomId)}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={room.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={room.status ? 'error' : 'success'} onClick={() => UpdateRoomsStatus(room.roomId, room.status)}>{room.status ? 'Disable' : 'Enable'}</Button>
          </Stack>
        ),
      }));

      setTimeout(() => {
        setShowLoader(false)
        setRows(transformedRows);
      }, 1000);
    }
  }, [data]);

  const handleSnackbarMessage = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const AddNewRoom = async (formData) => {
    setShowLoader(true);

    console.log(formData.roomType, formData.roomNumber);
    if (!formData.roomType || !formData.roomNumber) {
      setTimeout(() => {
        handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
        setShowLoader(false);
      }, 1000);
      return;
    }

    try {
      const jsonData = {
        "roomNo": formData.roomNumber,
        "roomType": formData.roomType,
      }

      const response = await addRoomApi(jsonData);
      if (response.status === 200 && response?.data?.status === 'success') {
        setTimeout(() => {
          setShowLoader(false);
          handleSnackbarMessage('Room Added Successfully', 'success');
          setModalOpen(false);
          refreshData();

          reset({
            roomNo: '',
            roomType: '',
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setShowLoader(false);
          handleSnackbarMessage('Error adding room', 'error');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowLoader(false);
        handleSnackbarMessage(`Error adding room, ${error}`, 'error');
      }, 1000);
    }
  };


  const getRoomsDataById = async (id) => {
    setShowLoader(true);
    setRoomId(id);

    try {
      const response = await getRoomDataByIdApi(id);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          console.log(response)
          setUpdateFormDataa({
            roomType: response?.data?.room?.roomType,
            roomNumber: response?.data?.room?.roomNo,
            roomTypeOriginal: response?.data?.room?.roomType,
            roomNumberOriginal: response?.data?.room?.roomNo,
          });
          // reset();
        }
      }
    } catch (error) {
      console.error('Error fetching room data by id:', error);
    } finally {
      setShowLoader(false);
    }
  };


  const UpdateRoomsStatus = async (id, roomStatus) => {
    setShowLoader(true)
    try {
      const jsonData = {
        "status": roomStatus ? false : true,
      }
      const response = await updateRoomApi(id, jsonData);
      if (response?.status === 200) {
        setTimeout(() => {
          handleSnackbarMessage(response?.data?.message, 'success');
          refreshData();
          setShowLoader(false)
        }, 1000);
      } else {
        setTimeout(() => {
          setShowLoader(false)
          handleSnackbarMessage(response?.data?.message, 'error');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowLoader(false)
        handleSnackbarMessage('Error during update', 'error');
      }, 1000);
    } finally {
      setTimeout(() => {
        setShowLoader(false)
      }, 1000);
    }
  };



  const UpdateRoomsData = async (data) => {
    setShowLoader(true);

    try {
      const jsonData = {};

      // Only append the updated room number if it's different
      if (data.roomNumber !== updateFormDataa.roomNumberOriginal) {
        jsonData.roomNo = data.roomNumber; // Use a property instead of `.append`
      }

      // Only append the updated room type if it's different
      if (data.roomType !== updateFormDataa.roomTypeOriginal) {
        jsonData.roomType = data.roomType; // Use a property instead of `.append`
      }

      // Check if there are changes to submit
      if (Object.keys(jsonData).length > 0) {
        // Make the API call
        const response = await updateRoomApi(roomId, jsonData);
        if (response?.status === 200 && response?.data?.status === 'success') {
          setShowLoader(false);
          refreshData();
          handleSnackbarMessage(response?.data?.message, 'success');
          setModalOpen(false);
        } else {
          setShowLoader(false);
          handleSnackbarMessage(response?.data?.message || 'Error during update.', 'error');
        }
      } else {
        // No changes to submit
        setShowLoader(false);
        handleSnackbarMessage('No changes made.', 'warning');
      }
    } catch (error) {
      setShowLoader(false);
      console.error('Error during update:', error);
      handleSnackbarMessage('Error during update. Please try again later.', 'error');
    }
  };


  if (error) return (
    <ErrorPage
      errorMessage={`${error}`}
      onReload={() => { window.location.reload(), console.log(error, 'dhbj') }}
      statusCode={`${error.status}`}
    />
  );
  if (!data) return <Typography variant="subtitle1"><HashLoader /></Typography>;

  return (
    <Box>
      {showLoader && <HashLoader />}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h5">All Rooms</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add New Rooms', 'Create')}>
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* Data Table */}
      <DynamicDataTable columns={columns} rows={rows} />

      {/* Modals for all Add and Update */}
      <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewRoom : UpdateRoomsData} reset={reset} updateFormDataa={updateFormDataa} />

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Rooms;
