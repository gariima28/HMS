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
import PlaceholderTable from 'components/Skeleton/PlaceholderTable';

const ServerIP = 'https://www.auth.edu2all.in/hms';
const token = `Bearer ${localStorage.getItem('token')}`;

// Custom Button CSS using Material UI Styles
const CustomButton = styled(Button)(({ status }) => ({
  borderRadius: '50px',
  backgroundColor: status === 'enable' ? '#DBE9ED' : '#FFD8D8',
  borderColor: status === 'enable' ? '#DBE9ED' : '#FFD8D8',
  color: status === 'enable' ? '#0D6A84' : '#C90303',
  padding: '2px 26px',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: status === 'enable' ? '#0D6A84' : '#C90303',
    borderColor: status === 'enable' ? '#0D6A84' : '#C90303',
    color: status === 'enable' ? '#ffffff' : '#ffffff',
  },
}));


const EditButton = styled(Button)(({ status }) => ({
  borderRadius: '50px',
  backgroundColor: 'transparent',
  borderColor: '#0D6A84',
  color: '#0D6A84',
  padding: '2px 14px',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#0D6A84',
    borderColor: '#0D6A84',
    color: '#ffffff',
  },
}));

const EnableButton = styled(Button)(({ status }) => ({
  borderRadius: '50px',
  backgroundColor: 'transparent',
  borderColor: status === 'enable' ? '#C90303' : '#0D6A84',
  color: status === 'enable' ? '#C90303' : '#0D6A84',
  padding: '2px 16px',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: status === 'enable' ? '#C90303' : '#0D6A84',
    borderColor: status === 'enable' ? '#C90303' : '#0D6A84',
    color: status === 'enable' ? '#ffffff' : '#ffffff',
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
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);
  const [showModalLoader, setShowModalLoader] = useState(false);

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
      fieldName: 'Room Type ',
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
      fieldType: 'number',
      fieldName: 'Room Number ',
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
      fieldName: 'Room Type ',
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
      fieldType: 'number',
      fieldName: 'Room Number ',
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
    onLoadingSlow: () => setShowDataTableLoader(true),
    onSuccess: () => setShowDataTableLoader(false),
  });

  const refreshData = () => {
    mutate(`${ServerIP}/room/getAll`);
  };

  useEffect(() => {
    if (!modalOpen) {
      // Reset form states when modal closes
      setFormDataa({
        roomType: '',
        roomNumber: '',
      });
      setUpdateFormDataa({
        roomType: '',
        roomNumber: '',
        roomTypeOriginal: '',
        roomNumberOriginal: '',
      });
    }
  }, [modalOpen]);

  const handleDialogState = (title, button, roomId) => {
    setModalTitle(title);
    setButtonName(button);

    if (button === 'Create') {
      reset({
        roomType: '',
        roomNumber: '',
      });
      setFormDataa({
        roomType: '',
        roomNumber: '',
      });
      setUpdateFormDataa({
        roomType: '',
        roomNumber: '',
        roomTypeOriginal: '',
        roomNumberOriginal: '',
      });
    }

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
      setShowDataTableLoader(true)
      const transformedRows = data.room.map((room) => ({
        ...room,
        image: room.icon ? room.roomImage.split('/').pop() : '-',
        status: <CustomButton variant="outlined" status={room.status ? 'enable' : 'disable'}>{room.status ? 'Enabled' : 'Disabled'}</CustomButton>,
        action: (
          <Stack justifyContent="end" spacing={2} direction="row">
            <EditButton variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Rooms', 'Update', room.roomId)}>Edit</EditButton>
            <EnableButton variant="outlined" size="small" status={room.status ? 'enable' : 'disable'} startIcon={room.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={room.status ? 'error' : 'success'} onClick={() => UpdateRoomsStatus(room.roomId, room.status)}>{room.status ? 'Disable' : 'Enable'}</EnableButton>
          </Stack>
        ),
      }));

      setRows(transformedRows);
      setTimeout(() => {
        setShowDataTableLoader(false)
      }, 1800);
    }
  }, [data]);

  useEffect(() => {

    console.log(formDataa.roomType, 'formDataa roomType')
    console.log(formDataa.roomNumber, 'formDataa roomNumber')

    console.log(updateFormDataa.roomType, 'roomType')
    console.log(updateFormDataa.roomNumber, 'roomNumber')
    console.log(updateFormDataa.roomTypeOriginal, 'roomTypeOriginal')
    console.log(updateFormDataa.roomNumberOriginal, 'roomNumberOriginal')

  }, [updateFormDataa, formDataa])

  const handleSnackbarMessage = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const AddNewRoom = async (formData) => {
    setShowModalLoader(true);

    console.log(formData.roomType, formData.roomNumber);
    if (!formData.roomType || !formData.roomNumber) {
      setTimeout(() => {
        handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
        setShowModalLoader(false);
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
          setShowModalLoader(false);
          handleSnackbarMessage('Room Added Successfully', 'success');
          setModalOpen(false);
          refreshData();

          reset({
            roomNo: '',
            roomType: '',
          });
          setFormDataa({
            roomType: '',
            roomNumber: '',
          });

        }, 1000);
      } else {
        setTimeout(() => {
          setShowModalLoader(false);
          handleSnackbarMessage(`Error adding room - ${response?.data?.message}`, 'error',);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowModalLoader(false);
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
          reset({
            roomType: '',
            roomNumber: '',
          });
          setUpdateFormDataa({
            roomType: '',
            roomNumber: '',
            roomTypeOriginal: '',
            roomNumberOriginal: '',
          });
          setFormDataa({
            roomType: '',
            roomNumber: '',
          });
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
    setShowModalLoader(true);

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
          setTimeout(() => {
            setShowModalLoader(false);
            refreshData();
            reset({
              roomType: '',
              roomNumber: '',
            });
            setUpdateFormDataa({
              roomType: '',
              roomNumber: '',
              roomTypeOriginal: '',
              roomNumberOriginal: '',
            });
            setFormDataa({
              roomType: '',
              roomNumber: '',
            });
            handleSnackbarMessage(response?.data?.message, 'success');
            setModalOpen(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setShowModalLoader(false);
            handleSnackbarMessage(response?.data?.message, 'error');
          }, 1000);
        }
      } else {
        // No changes to submit
        setShowModalLoader(false);
        handleSnackbarMessage('No changes made.', 'warning');
      }
    } catch (error) {
      setShowModalLoader(false);
      console.error('Error during update:', error);
      handleSnackbarMessage('Error during update. Please try again later.', 'error');
    }
  };


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
          <Typography variant="h5">All Rooms</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <AddButton variant="outlined" onClick={() => handleDialogState('Add New Rooms', 'Create')}>
              + Add Room
            </AddButton>
          </Stack>
        </Grid>
      </Grid>

      {/* Data Table */}
      {showDataTableLoader ? <PlaceholderTable /> : rows.length > 0 && <DynamicDataTable columns={columns} rows={rows} />}

      {/* Modals for all Add and Update */}
      <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewRoom : UpdateRoomsData} reset={reset} updateFormDataa={updateFormDataa} showModalLoader={showModalLoader} />

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
