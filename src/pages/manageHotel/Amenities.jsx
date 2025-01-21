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
import HashLoader from 'components/HashLoader';
import NoDataFound from '../NoDataFound';
import { addAmenitiesApi, getAmenitiesDataByIdApi, updateAmenitiesApi, updateAmenitiesStatus } from 'api/api';
import { useForm } from 'react-hook-form';

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
  { id: 'amenitiesName', label: 'Title', minWidth: 170 },
  { id: 'image', label: 'Icon', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

// API Call when data updates
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const Amenities = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [modalTitle, setModalTitle] = useState('Add New Amenities');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [amenitiesId, setAmenitiesId] = useState([]);
  const { reset } = useForm();
  const [showLoader, setShowLoader] = useState(false);

  const [formDataa, setFormDataa] = useState({
    amenitiesName: '',
    amenitiesStatus: '',
    amenitiesIcon: ''
  });

  const [updateFormDataa, setUpdateFormDataa] = useState({
    amenitiesName: '',
    amenitiesIcon: '',
    amenitiesNameOriginal: '',
    amenitiesIconOriginal: ''
  });

  console.log(updateFormDataa, 'updateFormDataa')

  // Input handling functions
  const handleFormDataaAmenitiesName = (val) => setFormDataa({ ...formDataa, amenitiesName: val });
  const handleFormDataaAmenitiesStatus = (val) => setFormDataa({ ...formDataa, amenitiesStatus: val });
  const handleFormDataaAmenitiesIcon = (val) => setFormDataa({ ...formDataa, amenitiesIcon: val });
  const handleUpdateFormDataaAmenitiesName = (val) => setUpdateFormDataa({ ...updateFormDataa, amenitiesName: val });
  const handleUpdateFormDataaAmenitiesIcon = (val) => setUpdateFormDataa({ ...updateFormDataa, amenitiesIcon: val });

  const AddInputFields = [
    { id: 'amenitiesName', field: 'textInput', fieldType: 'text', validation: { required: true, pattern: /^[A-Z]/, patternMsg: 'This field can only contain characters'}, fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', updateValFunc: handleFormDataaAmenitiesName },
    { id: 'amenitiesStatus', field: 'select', fieldName: 'Status *', validation: { required: true }, fieldOptions: [ { optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' }, ], value: formDataa.amenitiesStatus, updateValFunc: handleFormDataaAmenitiesStatus, },
    { id: 'amenitiesIcon', field: 'fileType', fieldType: 'file', validation: { required: true }, fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], updateValFunc: handleFormDataaAmenitiesIcon }
  ];

  const UpdateInputFields = [
    { id: 'amenitiesName', field: 'textInput', fieldType: 'text', fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', value: updateFormDataa.amenitiesName, updateValFunc: handleUpdateFormDataaAmenitiesName },
    { id: 'amenitiesIcon', field: 'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], value: updateFormDataa.amenitiesIcon, updateValFunc: handleUpdateFormDataaAmenitiesIcon }
  ];

  // Get API
  const { data, error } = useSWR(`${ServerIP}/amenites/getAll`, fetcher, {
    onLoadingSlow: () => setShowLoader(true),
    onSuccess: () => setShowLoader(false),
  });

  const refreshData = () => {
    mutate(`${ServerIP}/amenites/getAll`);
  };

  const handleDialogState = (title, button, amenityId) => {
    setModalTitle(title);
    setButtonName(button);
    if (button === 'Update') {
      getAmenitiesDataById(amenityId);
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
      const transformedRows = data.Amenities.map((amenity) => ({
        ...amenity,
        image: amenity.icon === null ? '-' : amenity.icon.split('/').pop(),
        status: <CustomButton variant="outlined" status={`${amenity.status ? 'enable' : 'disable'}`}> {amenity.status ? 'Enabled' : 'Disabled'} </CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Amenities', 'Update', amenity.amenitiesId)}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={amenity.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={`${amenity.status ? 'error' : 'success'}`} onClick={() => UpdateAmenitiesStatus(amenity?.amenitiesId, amenity.status)}>{`${amenity.status ? 'Disable' : 'Enable'}`}</Button>
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

  const AddNewAmenity = async (formData) => {
    setShowLoader(true);

    console.log(formData.amenitiesName, formData.amenitiesStatus, formData.amenitiesIcon);
    if (!formData.amenitiesName || !formData.amenitiesStatus || !formData.amenitiesIcon) {
      setTimeout(() => {
        handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
        setShowLoader(false);
      }, 1000);
      return;
    }

    try {
      const formDataPayload = new FormData();
      formDataPayload.append('amenitiesName', formData.amenitiesName);
      formDataPayload.append('status', formData.amenitiesStatus);
      formDataPayload.append('icon', formData.amenitiesIcon[0]);

      const response = await addAmenitiesApi(formDataPayload);
      if (response.status === 200 && response?.data?.status === 'success') {
        setTimeout(() => {
          setShowLoader(false);
          handleSnackbarMessage('Amenity Added Successfully', 'success');
          setModalOpen(false);
          refreshData();

          reset({
            amenitiesName: '',
            amenitiesStatus: '',
            amenitiesIcon: null,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setShowLoader(false);
          handleSnackbarMessage('Error adding amenity', 'error');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowLoader(false);
        handleSnackbarMessage(`Error adding amenity, ${error}`, 'error');
      }, 1000);
    }
  };


  const getAmenitiesDataById = async (id) => {
    setShowLoader(true);
    setAmenitiesId(id);

    try {
      const response = await getAmenitiesDataByIdApi(id);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          console.log(response)
          setUpdateFormDataa({
            amenitiesName: response?.data?.amenity?.amenitiesName,
            amenitiesIcon: response?.data?.amenity?.icon,
            amenitiesNameOriginal: response?.data?.amenity?.amenitiesName,
            amenitiesIconOriginal: response?.data?.amenity?.icon,
          });
          // reset();
        }
      }
    } catch (error) {
      console.error('Error fetching amenity data by id:', error);
    } finally {
      setShowLoader(false);
    }
  };


  const UpdateAmenitiesStatus = async (id, amenityStatus) => {
    setShowLoader(true)
    try {
      const formData = new FormData();
      formData.append('status', amenityStatus ? false : true);
      const response = await updateAmenitiesStatus(id, formData);
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

  const UpdateAmenitiesData = async (data) => {
    setShowLoader(true);

    try {
      const formData = new FormData();

      // Only append the updated name if it's different
      if (data.amenitiesName !== updateFormDataa.amenitiesNameOriginal) {
        formData.append('amenitiesName', updateFormDataa.amenitiesName);
      }

      // Only append the updated icon if it's different
      if (data.amenitiesIcon !== updateFormDataa.amenitiesIconOriginal) {
        // Ensure the icon is the selected file (check if it's an actual file object)
        if (data.amenitiesIcon && data.amenitiesIcon[0]) {
          formData.append('icon', data.amenitiesIcon[0]);
        }
      }

      // If the formData has any changes, make the API call
      if (formData.has('amenitiesName') || formData.has('icon')) {
        const response = await updateAmenitiesApi(amenitiesId, formData);
        if (response?.status === 200) {
          setTimeout(() => {
            setShowLoader(false);
            refreshData();
            handleSnackbarMessage(response?.data?.message, 'success');
            setModalOpen(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setShowLoader(false);
            handleSnackbarMessage(response?.data?.message, 'error');
          }, 1000);
        }
      } else {
        // No changes to submit
        setShowLoader(false);
        handleSnackbarMessage('No changes made.', 'warning');
      }
    } catch (error) {
      setTimeout(() => {
        setShowLoader(false);
        handleSnackbarMessage('Error during update', 'error');
      }, 1000);
    } finally {
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  };


  if (error) return <Typography variant="subtitle1"><NoDataFound/></Typography>;
  if (!data) return <Typography variant="subtitle1"><HashLoader /></Typography>;

  return (
    <Box>
      {showLoader && <HashLoader />}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h5">All Amenities</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add New Amenities', 'Create')}>
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* Data Table */}
      <DynamicDataTable columns={columns} rows={rows} />

      {/* Modals for all Add and Update */}
      <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewAmenity : UpdateAmenitiesData} reset={reset} updateFormDataa={updateFormDataa} />

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Amenities;




















// import React, { useState, useEffect } from 'react';
// import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
// import { Edit } from '@mui/icons-material';
// import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';
// import { styled } from '@mui/material/styles';
// import DialogModal from 'components/DialogModal';
// import useSWR, { mutate } from "swr";
// import axios from 'axios';
// import HashLoader from 'components/HashLoader';
// import NoDataFound from '../NoDataFound';
// import { addAmenitiesApi, getAmenitiesDataByIdApi, updateAmenitiesApi, updateAmenitiesStatus } from 'api/api';
// import { useForm } from 'react-hook-form';

// const ServerIP = 'https://www.auth.edu2all.in/hms';
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
//     color: status === 'enable' ? '#57C168' : 'red',
//   },
// }));

// // Table Columns
// const columns = [
//   { id: 'amenitiesName', label: 'Title', minWidth: 170 },
//   { id: 'image', label: 'Icon', minWidth: 100 },
//   { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];

// // API Call when data updates
// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

// const Amenities = () => {
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
//   const [modalTitle, setModalTitle] = useState('Add New Amenities');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [amenitiesId, setAmenitiesId] = useState([]);
//   const { reset } = useForm();
//   const [showLoader, setShowLoader] = useState(false);

//   const [formDataa, setFormDataa] = useState({
//     amenitiesName: '',
//     amenitiesStatus: '',
//     amenitiesIcon: ''
//   });

//   const [updateFormDataa, setUpdateFormDataa] = useState({
//     amenitiesName: '',
//     amenitiesIcon: '',
//     amenitiesNameOriginal: '',
//     amenitiesIconOriginal: ''
//   });

//   // Input handling functions
//   const handleFormDataaAmenitiesName = (val) => setFormDataa({ ...formDataa, amenitiesName: val });
//   const handleFormDataaAmenitiesStatus = (val) => setFormDataa({ ...formDataa, amenitiesStatus: val });
//   const handleFormDataaAmenitiesIcon = (val) => setFormDataa({ ...formDataa, amenitiesIcon: val });
//   const handleUpdateFormDataaAmenitiesName = (val) => setUpdateFormDataa({ ...updateFormDataa, amenitiesName: val });
//   const handleUpdateFormDataaAmenitiesIcon = (val) => setUpdateFormDataa({ ...updateFormDataa, amenitiesIcon: val });

//   const AddInputFields = [
//     { id: 'amenitiesName', field: 'textInput', fieldType: 'text', validation: { required: true, pattern: /^[A-Z]/, patternMsg: 'This field can only contain characters'}, fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', updateValFunc: handleFormDataaAmenitiesName },
//     { id: 'amenitiesStatus', field: 'select', fieldName: 'Status *', validation: { required: true }, fieldOptions: [ { optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' }, ], value: formDataa.amenitiesStatus, updateValFunc: handleFormDataaAmenitiesStatus, },
//     { id: 'amenitiesIcon', field: 'fileType', fieldType: 'file', validation: { required: true }, fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], updateValFunc: handleFormDataaAmenitiesIcon }
//   ];

//   const UpdateInputFields = [
//     { id: 'amenitiesName', field: 'textInput', fieldType: 'text', fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', value: updateFormDataa.amenitiesName, updateValFunc: handleUpdateFormDataaAmenitiesName },
//     { id: 'amenitiesIcon', field: 'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], value: updateFormDataa.amenitiesIcon, updateValFunc: handleUpdateFormDataaAmenitiesIcon }
//   ];

//   // Get API
//   const { data, error } = useSWR(`${ServerIP}/amenites/getAll`, fetcher, {
//     onLoadingSlow: () => setShowLoader(true),
//     onSuccess: () => setShowLoader(false),
//   });

//   const refreshData = () => {
//     mutate(`${ServerIP}/amenites/getAll`);
//   };

//   const handleDialogState = (title, button, amenityId) => {
//     setModalTitle(title);
//     setButtonName(button);
//     if (button === 'Update') {
//       getAmenitiesDataById(amenityId);
//     }
//     setModalOpen(!modalOpen);
//   };

//   const handleClosingDialogState = () => {
//     setModalOpen(!modalOpen);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   useEffect(() => {
//     if (data) {
//       setShowLoader(true)
//       const transformedRows = data.Amenities.map((amenity) => ({
//         ...amenity,
//         image: amenity.icon === null ? '-' : amenity.icon.split('/').pop(),
//         status: <CustomButton variant="outlined" status={`${amenity.status ? 'enable' : 'disable'}`}> {amenity.status ? 'Enabled' : 'Disabled'} </CustomButton>,
//         action: (
//           <Stack justifyContent='end' spacing={2} direction="row">
//             <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Amenities', 'Update', amenity.amenitiesId)}>Edit</Button>
//             <Button variant="outlined" size="small" startIcon={amenity.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={`${amenity.status ? 'error' : 'success'}`} onClick={() => UpdateAmenitiesStatus(amenity?.amenitiesId, amenity.status)}>{`${amenity.status ? 'Disable' : 'Enable'}`}</Button>
//           </Stack>
//         ),
//       }));

//       setTimeout(() => {
//         setShowLoader(false)
//         setRows(transformedRows);
//       }, 1000);
//     }
//   }, [data]);

//   const handleSnackbarMessage = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   // const AddNewAmenity = async (formData, reset) => {
//   //   setShowLoader(true)
//   //   // Validate that all fields are correctly populated
//   //   console.log(formData.amenitiesName, formData.amenitiesStatus, formData.amenitiesIcon)
//   //   if (!formData.amenitiesName || !formData.amenitiesStatus || !formData.amenitiesIcon) {
//   //     setTimeout(() => {
//   //       handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
//   //       setShowLoader(false)
//   //     }, 1000);
//   //     return;
//   //   }

//   //   try {
//   //     const formDataPayload = new FormData();
//   //     formDataPayload.append('amenitiesName', formData.amenitiesName);
//   //     formDataPayload.append('status', formData.amenitiesStatus);
//   //     formDataPayload.append('icon', formData.amenitiesIcon);

//   //     const response = await addAmenitiesApi(formDataPayload);
//   //     if (response.status === 200 && response?.data?.status === 'success') {
//   //       setTimeout(() => {
//   //         setShowLoader(false)
//   //         handleSnackbarMessage('Amenity Added Successfully', 'success');
//   //         setModalOpen(false);
//   //         refreshData();
//   //         reset();
//   //       }, 1000);
//   //     } else {
//   //       setTimeout(() => {
//   //         setShowLoader(false)
//   //         handleSnackbarMessage('Error adding amenity', 'error');
//   //       }, 1000);
//   //     }
//   //   } catch (error) {
//   //     setTimeout(() => {
//   //       setShowLoader(false)
//   //       handleSnackbarMessage(`Error adding amenity, ${error}`, 'error');
//   //     }, 1000);
//   //   } finally {
//   //     setTimeout(() => {
//   //       setShowLoader(false)
//   //       // reset();
//   //     }, 1000);
//   //   }
//   // };

//   const AddNewAmenity = async (formData) => {
//     setShowLoader(true);

//     console.log(formData.amenitiesName, formData.amenitiesStatus, formData.amenitiesIcon);
//     if (!formData.amenitiesName || !formData.amenitiesStatus || !formData.amenitiesIcon) {
//       setTimeout(() => {
//         handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
//         setShowLoader(false);
//       }, 1000);
//       return;
//     }

//     try {
//       const formDataPayload = new FormData();
//       formDataPayload.append('amenitiesName', formData.amenitiesName);
//       formDataPayload.append('status', formData.amenitiesStatus);
//       formDataPayload.append('icon', formData.amenitiesIcon[0]); // File input returns an array

//       const response = await addAmenitiesApi(formDataPayload);
//       if (response.status === 200 && response?.data?.status === 'success') {
//         setTimeout(() => {
//           setShowLoader(false);
//           handleSnackbarMessage('Amenity Added Successfully', 'success');
//           setModalOpen(false);
//           refreshData();

//           // Reset form fields after successful submission
//           reset({
//             amenitiesName: '',
//             amenitiesStatus: '',
//             amenitiesIcon: null, // Ensure the file input resets
//           });
//         }, 1000);
//       } else {
//         setTimeout(() => {
//           setShowLoader(false);
//           handleSnackbarMessage('Error adding amenity', 'error');
//         }, 1000);
//       }
//     } catch (error) {
//       setTimeout(() => {
//         setShowLoader(false);
//         handleSnackbarMessage(`Error adding amenity, ${error}`, 'error');
//       }, 1000);
//     }
//   };


//   const getAmenitiesDataById = async (id) => {
//     setShowLoader(true)
//     setAmenitiesId(id);
//     try {
//       const response = await getAmenitiesDataByIdApi(id);
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setUpdateFormDataa({
//           amenitiesName: response?.data?.amenity?.amenitiesName,
//           amenitiesIcon: response?.data?.amenity?.icon,
//           amenitiesNameOriginal: response?.data?.amenity?.amenitiesName,
//           amenitiesIconOriginal: response?.data?.amenity?.icon,
//         });
//       }
//     } catch (error) {
//       console.log('Error fetching amenity data by id');
//     } finally {
//       setTimeout(() => {
//         setShowLoader(false)
//       }, 1000);
//     }
//   };

//   const UpdateAmenitiesStatus = async (id, amenityStatus) => {
//     setShowLoader(true)
//     try {
//       const formData = new FormData();
//       formData.append('status', amenityStatus ? false : true);
//       const response = await updateAmenitiesStatus(id, formData);
//       if (response?.status === 200) {
//         setTimeout(() => {
//           handleSnackbarMessage(response?.data?.message, 'success');
//           refreshData();
//           setShowLoader(false)
//         }, 1000);
//       } else {
//         setTimeout(() => {
//           setShowLoader(false)
//           handleSnackbarMessage(response?.data?.message, 'error');
//         }, 1000);
//       }
//     } catch (error) {
//       setTimeout(() => {
//         setShowLoader(false)
//         handleSnackbarMessage('Error during update', 'error');
//       }, 1000);
//     } finally {
//       setTimeout(() => {
//         setShowLoader(false)
//       }, 1000);
//     }
//   };

//   const UpdateAmenitiesData = async () => {
//     setShowLoader(true)
//     try {
//       const formData = new FormData();
//       if (updateFormDataa.amenitiesName !== updateFormDataa.amenitiesNameOriginal) {
//         formData.append('amenitiesName', updateFormDataa.amenitiesName);
//       }
//       if (updateFormDataa.amenitiesIcon !== updateFormDataa.amenitiesIconOriginal) {
//         formData.append('icon', updateFormDataa.amenitiesIcon);
//       }
//       const response = await updateAmenitiesApi(amenitiesId, formData);
//       if (response?.status === 200) {
//         setTimeout(() => {
//           setShowLoader(false)
//           refreshData()
//           handleSnackbarMessage(response?.data?.message, 'success');
//           setModalOpen(false);
//         }, 1000);
//       } else {
//         setTimeout(() => {
//           setShowLoader(false)
//           handleSnackbarMessage(response?.data?.message, 'error');
//         }, 1000);
//       }
//     } catch (error) {
//       setTimeout(() => {
//         setShowLoader(false)
//         handleSnackbarMessage('Error during update', 'error');
//       }, 1000);
//     } finally {
//       setTimeout(() => {
//         setShowLoader(false)
//       }, 1000);
//     }
//   };

//   if (error) return <Typography variant="subtitle1"><NoDataFound/></Typography>;
//   if (!data) return <Typography variant="subtitle1"><HashLoader /></Typography>;

//   return (
//     <Box>
//       {showLoader && <HashLoader />}
//       <Grid sx={{ display: 'flex', mb: 3 }}>
//         <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant="h5">All Amenities</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={() => handleDialogState('Add New Amenities', 'Create')}>
//               + Add New
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       {/* Data Table */}
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all Add and Update */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewAmenity : UpdateAmenitiesData} reset={reset} />

//       {/* Snackbar for Notifications */}
//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//         <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Amenities;




































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
// import { addAmenitiesApi, getAmenitiesDataByIdApi, updateAmenitiesApi, updateAmenitiesStatus } from 'api/api';
// // import { useForm } from 'react-hook-form';

// // const LocalGirjesh = 'http://192.168.20.109:5001';
// const ServerIP = 'http://89.116.122.211:5001'
// const token = `Bearer ${localStorage.getItem('token')}`;

// // Custom Button CSS using Material UI Styles
// const CustomButton = styled(Button)(({status}) => ({
//   borderRadius: '50px',
//   backgroundColor:  status === 'enable' ? '#E6F4EA' : '#fee5e5',
//   borderColor: status === 'enable' ? '#57C168' : 'red',
//   color: status === 'enable' ? '#57C168' : 'red',
//   padding: '2px 26px',
//   fontSize: '12px',
//   textTransform: 'none',

//   '&:hover': {
//     backgroundColor:  status === 'enable' ? '#D4ECD9' : '#fccfcf',
//     borderColor: status === 'enable' ? '#57C168' : 'red',
//     color: status === 'enable' ? '#57C168' : 'red'
//   },
// }));

// // Table Columns
// const columns = [
//   { id: 'amenitiesName', label: 'Title', minWidth: 170 },
//   { id: 'image', label: 'Icon', minWidth: 100 },
//   { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];

// // API Call when ever data updates 
// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

// const Amenities = () => {

//   // All useStates
//   const [modalTitle, setModalTitle] = useState('Add New Amenities');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [amenitiesId, setAmenitiesId] = useState([]);
//   const [toaster, setToaster] = useState(false);
//   const [msgToaster, setMsgToaster] = useState('');
//   const [toaterErrorSuccessState, setToaterErrorSuccessState] = useState('success');

//   // Add Amenities State Function
//   const [formDataa, setFormDataa] = useState({
//     amenitiesName:'',
//     amenitiesStatus:'',
//     amenitiesIcon:''
//   })

//   // Update Amenities State Function
//   const [updateFormDataa, setUpdateFormDataa] = useState({
//     amenitiesName:'',
//     amenitiesIcon:'',
//     amenitiesNameOriginal:'',
//     amenitiesIconOriginal:''
//   })

//   // Add Amenities Name
//   const handleFormDataaAmenitiesName = (val) => {
//     setFormDataa({
//       ...formDataa,
//       amenitiesName: val
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
//       amenitiesIcon: val
//     });
//   }

//   // Update Amenities Name
//   const handleUpdateFormDataaAmenitiesName = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       amenitiesName: val
//     });
//   }

//   // Update Amenities Icon
//   const handleUpdateFormDataaAmenitiesIcon = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       amenitiesIcon: val
//     });
//   }

//   const AddInputFields = 
//   [
//     { id: 'amenitiesName', field:'textInput', fieldType: 'text', fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name',  updateValFunc: handleFormDataaAmenitiesName },
//       {
//         id: 'amenitiesStatus',
//         field: 'select',
//         fieldName: 'Status *',
//         fieldOptions: [
//           { optionId: 'active', optionName: 'Active', optionValue: 'true' },
//           { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' },
//         ],
//         value: formDataa.amenitiesStatus,
//         updateValFunc: handleFormDataaAmenitiesStatus,
//       },
//     { id: 'amenitiesIcon', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'],  updateValFunc: handleFormDataaAmenitiesIcon }
//   ];

//   const UpdateInputFields =
//   [
//     { id: 'amenitiesName', field:'textInput', fieldType: 'text', fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', value:updateFormDataa.amenitiesName, updateValFunc: handleUpdateFormDataaAmenitiesName },
//     { id: 'amenitiesIcon', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], value:updateFormDataa.amenitiesIcon, updateValFunc: handleUpdateFormDataaAmenitiesIcon }
//   ];

//   // get API
//   const { data, error } = useSWR(`${ServerIP}/amenites/getAll`, fetcher);

//   // Function to refresh the data
//   const refreshData = () => {
//     mutate(`${ServerIP}/amenites/getAll`);
//   };

//   // Dialog Open Handle
//   const handleDialogState = (title, button, amenityId) => {
//     setModalTitle(title);
//     setButtonName(button);
//     if(button==='Update'){
//       getAmenitiesDataById(amenityId);
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
//     if (data) {
//       setMsgToaster(data?.message || 'All Amenities')
//       console.log(data?.Amenities, 'data');
//       const transformedRows = data.Amenities.map((amenity) => ({
//         ...amenity,
//         image: amenity.icon === null ? '-' : amenity.icon.split('/').pop(),
//         status: <CustomButton variant="outlined" status={`${amenity.status? 'enable' : 'disable'}`}> {amenity.status ? 'Enabled' : 'Disabled'} </CustomButton>,
//         action: (
//           <Stack justifyContent='end' spacing={2} direction="row">
//             <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState( 'Update New Amenities', 'Update', amenity.amenitiesId )}>Edit</Button>
//             <Button variant="outlined" size="small" startIcon={amenity.status ? <EyeInvisibleFilled /> : <EyeFilled/> } color={`${amenity.status? 'error' : 'success'}`} onClick={()=> UpdateAmenitiesStatus( amenity?.amenitiesId, amenity.status )}>{`${amenity.status? 'Disable' : 'Enable'}`}</Button>
//           </Stack>
//         ),
//       }));
//       setRows(transformedRows);
//     }
//     if(msgToaster){
//       handleOpeningToasterState();
//     }
//   }, [data]);

//   // Add Function
//   const AddNewAmenity = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('amenitiesName', formDataa.amenitiesName);
//       formData.append('status', formDataa.amenitiesStatus);
//       formData.append('icon', formDataa.amenitiesIcon);

//       const response = await addAmenitiesApi(formData);

//       if (response.status === 200 && response?.data?.status === 'success') {
//         setMsgToaster(response?.data?.message || 'Amenity Added Successfully');
//         setToaterErrorSuccessState('success');
//         setToaster(true);
//         setModalOpen(false);
//         refreshData();
//       } else {
//         setMsgToaster(response?.data?.message || 'Error adding amenity');
//         setToaterErrorSuccessState('error');
//         setToaster(true);
//       }
//     } catch (error) {
//       console.error('Error adding amenity:', error);
//       setMsgToaster('Error adding amenity');
//       setToaterErrorSuccessState('error');
//       setToaster(true);
//     }
//   };


  
//   // Get Amenities data by id
//   const getAmenitiesDataById = async (id) => {
//     setAmenitiesId(id)
//     try {
//         var response = await getAmenitiesDataByIdApi(id);
//         console.log(response, 'get by id')
//         if (response?.status === 200) {
//             if (response?.data?.status === 'success') {
//               setUpdateFormDataa({ 
//                 amenitiesName: response?.data?.amenity?.amenitiesName,
//                 amenitiesIcon: response?.data?.amenity?.icon,
//                 amenitiesNameOriginal: response?.data?.amenity?.amenitiesName,
//                 amenitiesIconOriginal: response?.data?.amenity?.icon
//                 });
//             }
//         }
//         else {
//             console.log(response?.data?.message);
//         }
//     }
//     catch (error) {
//       console.log('catch')
//     } 
//     finally {
//       console.log('finally')
//     }
//   }

//   // Update Function
//   const UpdateAmenitiesStatus = async (id, amenityStatus) => {
//     try {
//       const formData = new FormData();
//       formData.append('status', amenityStatus ? false : true)
//       var response = await updateAmenitiesStatus(id, formData);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setMsgToaster(response?.data?.message)
//           refreshData();
//         }
//         else {
//           setMsgToaster(response?.data?.message)
//           refreshData();
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
//   const UpdateAmenitiesData = async () => {
//     try {
//       const formData = new FormData();
//       if(updateFormDataa.amenitiesName !== updateFormDataa.amenitiesNameOriginal){
//         formData.append('amenitiesName', updateFormDataa.amenitiesName)
//       }
//       if(updateFormDataa.amenitiesIcon !== updateFormDataa.amenitiesIconOriginal){
//         formData.append('icon', updateFormDataa.amenitiesIcon)
//       }
//       var response = await updateAmenitiesApi(amenitiesId, formData);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setMsgToaster(response?.data?.message)
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

//   if (error) {<Typography variant="subtitle1">- Error loading data</Typography> };
//   if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

//   return (
//     <Box>
//       {/* Heading */}
//       <Grid sx={{ display: 'flex', mb: 3 }}>
//         <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant="h5">All Amenities</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={() => handleDialogState('Add New Amenities', 'Create')}>
//               + Add New
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       {/* Data Table */}
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all Add and Update */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewAmenity : UpdateAmenitiesData} />

//       {/* SnackBar */}
//       <Snackbar open={toaster} autoHideDuration={5000} onClose={handleClosingToasterState}>
//         <Alert onClose={handleClosingToasterState} severity={toaterErrorSuccessState} variant="filled" sx={{ width: '100%', color: '#fff', fontSize: '14px' }}>
//           {msgToaster}
//         </Alert>
//       </Snackbar>

//     </Box>
//   );
// };

// export default Amenities;


























//working


// import React from 'react'
// import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
// import { Edit } from '@mui/icons-material';
// import { Box, Button, Snackbar, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';
// import { styled } from '@mui/material/styles';
// import { useEffect, useState } from 'react';
// import DialogModal from 'components/DialogModal';
// import useSWR from "swr";
// import axios from 'axios';
// import { addAmenitiesApi, getAmenitiesDataByIdApi, updateAmenitiesStatus } from 'api/api';

// // const LocalGirjesh = 'http://192.168.20.109:5001';
// const ServerIP = 'http://89.116.122.211:5001'
// const token = `Bearer ${localStorage.getItem('token')}`;

// const CustomButton = styled(Button)(({status}) => ({
//   borderRadius: '50px',
//   backgroundColor:  status === 'enable' ? '#E6F4EA' : '#fee5e5',
//   borderColor: status === 'enable' ? '#57C168' : 'red',
//   color: status === 'enable' ? '#57C168' : 'red',
//   padding: '2px 26px',
//   fontSize: '12px',
//   textTransform: 'none',

//   '&:hover': {
//     backgroundColor:  status === 'enable' ? '#D4ECD9' : '#fccfcf',
//     borderColor: status === 'enable' ? '#57C168' : 'red',
//     color: status === 'enable' ? '#57C168' : 'red'
//   },
// }));

// const columns = [
//   { id: 'amenitiesName', label: 'Title', minWidth: 170 },
//   { id: 'image', label: 'Icon', minWidth: 100 },
//   { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];

// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

// const Amenities = () => {
//   const [modalTitle, setModalTitle] = useState('Add New Amenities');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [amenitiesId, setAmenitiesId] = useState([]);

//   const [formDataa, setFormDataa] = useState({
//     amenitiesName:'',
//     amenitiesStatus:'',
//     amenitiesIcon:''
//   })

//   const [updateFormDataa, setUpdateFormDataa] = useState({
//     amenitiesName:'',
//     amenitiesIcon:''
//   })

//   const [toaster, setToaster] = useState(false)
//   const [msgToaster, setMsgToaster] = useState('')

//   const handleFormDataaAmenitiesName = (val) => {
//     setFormDataa({
//       ...formDataa,
//       amenitiesName: val
//     });
//   }

//   const handleFormDataaAmenitiesStatus = (val) => {
//     setFormDataa({
//       ...formDataa,
//       amenitiesStatus: val
//     });
//   }

//   const handleFormDataaAmenitiesIcon = (val) => {
//     setFormDataa({
//       ...updateFormDataa,
//       amenitiesIcon: val
//     });
//   }

//   const handleUpdateFormDataaAmenitiesName = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       amenitiesName: val
//     });
//   }

//   const handleUpdateFormDataaAmenitiesIcon = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       amenitiesIcon: val
//     });
//   }

//   // const Items = 
//   const AddInputFields = 
//   [
//     { id: 'amenitiesName', field:'textInput', fieldType: 'text', fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name',  updateValFunc: handleFormDataaAmenitiesName },
//     { id: 'amenitiesStatus', field:'select', feildOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'InActive', optionValue: 'false' }], fieldName: 'Status *',  updateValFunc: handleFormDataaAmenitiesStatus  },
//     { id: 'amenitiesIcon', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'],  updateValFunc: handleFormDataaAmenitiesIcon }
//   ];

//   // const Items = 
//   const UpdateInputFields =
//   [
//     { id: 'amenitiesName', field:'textInput', fieldType: 'text', fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', value:updateFormDataa.amenitiesName, updateValFunc: handleUpdateFormDataaAmenitiesName },
//     { id: 'amenitiesIcon', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], value:updateFormDataa.amenitiesIcon, updateValFunc: handleUpdateFormDataaAmenitiesIcon }
//   ];

//   // get API
//   const { data, error } = useSWR(`${ServerIP}/amenites/getAll`, fetcher);

//   const handleDialogState = (amenityId, title, button) => {
//     console.log('api call start')
//     getAmenitiesDataById(amenityId);
//     console.log('api call done')
//     setModalTitle(title);
//     setButtonName(button);
//     setModalOpen(!modalOpen);
//   };

//   const handleClosingDialogState = () => {
//     setModalOpen(!modalOpen);
//   };

//   const handleOpeningToasterState = () => {
//     setToaster(true);
//   };

//   const handleClosingToasterState = () => {
//     setToaster(false);
//   };

//   useEffect(() => {
//     if (data) {
//       console.log(data?.Amenities, 'data');
//       const transformedRows = data.Amenities.map((amenity) => ({
//         ...amenity,
//         image: amenity.icon === null ? '-' : amenity.icon.split('/').pop(),
//         status: <CustomButton variant="outlined" status={`${amenity.status? 'enable' : 'disable'}`}> {amenity.status ? 'Enabled' : 'Disabled'} </CustomButton>,
//         action: (
//           <Stack justifyContent='end' spacing={2} direction="row">
//             <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState( amenity.amenitiesId, 'Update New Amenities', 'Update')}>Edit</Button>
//             <Button variant="outlined" size="small" startIcon={amenity.status ? <EyeInvisibleFilled /> : <EyeFilled/> } color={`${amenity.status? 'error' : 'success'}`} onClick={()=> UpdateAmenitiesStatus( amenity?.amenitiesId, amenity.status )}>{`${amenity.status? 'Disable' : 'Enable'}`}</Button>
//           </Stack>
//         ),
//       }));
//       setRows(transformedRows);
//     }
//     if(msgToaster){
//       handleOpeningToasterState();
//     }
//   }, [data, msgToaster, modalOpen]);

//   // const AddNewAmenity = async (data) => { // addAmenitiesApi
//   //   console.log('start', data)
//   // };

//   const AddNewAmenity = async () => {
//     console.log('start')
//     try {
//       console.log('try')
//       const formData = new FormData();
//       formData.append('amenitiesName', formDataa.amenitiesName)
//       formData.append('status', formDataa.amenitiesStatus)
//       formData.append('icon', formDataa.amenitiesIcon)

//       const response = await addAmenitiesApi(formData);
//       console.log(response, 'response')
//       if (response.status === 200) {
//         if(response?.data?.status === 'success'){
//           console.log(response?.data?.message, 'success')
//           navigate('/amenities');
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

  
//   // Get Exam category data by id
//   const getAmenitiesDataById = async (id) => {
//     setAmenitiesId(id)
//     try {
//         var response = await getAmenitiesDataByIdApi(id);
//         console.log(response, 'get by id')
//         if (response?.status === 200) {
//             if (response?.data?.status === 'success') {
//                 setloaderState(false);
//                 setUpdateFormDataa({ ...updateFormDataa, amenitiesName: response?.data?.amenity?.amenitiesName });
//                 setUpdateFormDataa({ ...updateFormDataa, amenitiesIcon: response?.data?.amenity?.amenitiesIcon });
//             }
//         }
//         else {
//             console.log(response?.data?.message);
//         }
//     }
//     catch { }
//   }

//   // console.log('first')

//   const UpdateAmenitiesStatus = async (id, amenityStatus) => {
//     try {
//       const formData = new FormData();
//       formData.append('status', amenityStatus ? false : true)
//       var response = await updateAmenitiesStatus(id, formData);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setMsgToaster(response?.data?.message)
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


//   const UpdateAmenitiesData = async (amenityStatus) => {
//     try {
//       const formData = new FormData();
//       formData.append('status', amenityStatus ? false : true)
//       var response = await updateAmenitiesStatus(amenitiesId, formData);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setMsgToaster(response?.data?.message)
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

//   if (error) return <Typography variant="subtitle1">Error loading data</Typography>;
//   if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

//   return (
//     <Box>
//       <Grid sx={{ display: 'flex', mb: 3 }}>
//         <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant="h5">All Amenities</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={() => handleDialogState('Add New Amenities', 'Create')}>
//               + Add New
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewAmenity : UpdateAmenitiesData} />

//       {/* SnackBar */}
//       <Snackbar open={toaster} autoHideDuration={5000} onClose={handleClosingToasterState} message={msgToaster} />

//     </Box>
//   );
// };

// export default Amenities;
























// import { EyeInvisibleFilled } from '@ant-design/icons';
// import { AcUnitRounded, Edit } from '@mui/icons-material';
// import { Box, Button, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';
// import { styled } from '@mui/material/styles';
// import { useState } from 'react';
// import DialogModal from 'components/DialogModal';

// const CustomButton = styled(Button)(() => ({
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
//     color: '#57C168',
//   },
// }));

// const columns = [
//   { id: 'amenitiesName', label: 'Title', minWidth: 170 },
//   { id: 'icon', label: 'Icon', minWidth: 100, align: 'center' },
//   { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];


// const Amenities = () => {

//   const [modalTitle, setModalTitle] = useState('Add New Amenities');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);
  
//   const handleDialogState = (title,button) => {
//     setModalTitle(title);
//     setButtonName(button);
//     setModalOpen(!modalOpen);
//   };
  
//   const handleClosingDialogState = () => {
//     setModalOpen(!modalOpen);
//   };

//   const rows = [
//     {
//       amenitiesName: `${1.} ${'AC'}`, icon: <AcUnitRounded />,
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}  onClick={() => handleDialogState('Update New Amenities', 'Update')}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       amenitiesName: 'Freezer', icon: <AcUnitRounded />,
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       amenitiesName: 'Pool', icon: <AcUnitRounded />,
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       amenitiesName: 'Unlimited Wifi', icon: <AcUnitRounded />,
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       amenitiesName: 'AC', icon: <AcUnitRounded />,
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//   ];

//   const InputFields = [
//     { id:'A1', fieldName : 'Amenities Title *'},
//     { id:'A2', fieldName : 'Icon *'}
//   ]

//   return (
//     <Box>
//       <Grid sx={{ display: 'flex', mb: 3 }}>
//         <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant="subtitle1">All Amenities</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={()=> handleDialogState('Add New Amenities', 'Create')}>+ Add New</Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={InputFields}/>


//     </Box>
//   );
// }

// export default Amenities




















// import { EyeInvisibleFilled } from '@ant-design/icons';
// import { AcUnitRounded, Edit } from '@mui/icons-material';
// import { Box, Button, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';
// import { styled } from '@mui/material/styles';
// import { useEffect, useState } from 'react';
// import DialogModal from 'components/DialogModal';
// import useSWR from "swr";
// import axios from 'axios';

// const LocalGirjesh = 'http://192.168.20.109:5001'
// const token = `Bearer ${localStorage.getItem('token')}`;

// const columns = [
//   { id: 'amenitiesName', label: 'Title', minWidth: 170 },
//   { id: 'icon', label: 'Icon', minWidth: 100, align: 'center' },
//   { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];


// const Amenities = () => {

//   const [modalTitle, setModalTitle] = useState('Add New Amenities');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([]);
  
//   const fetcher = url => axios.get(url).then(res => res.data)

//   const { data, isLoading, error } = useSWR(`${LocalGirjesh}/amenites/getAll`, fetcher);
//   if (error) return <p>Error loading data</p>;
//   if (isLoading) return <div>loading...</div>;
  
//   useEffect(() => {
//     if (data) {
//       console.log(data, 'data')
//       setRows(data);
//     }
//   }, [data]);


//   const handleDialogState = (title,button) => {
//     setModalTitle(title);
//     setButtonName(button);
//     setModalOpen(!modalOpen);
//   };
  
//   const handleClosingDialogState = () => {
//     setModalOpen(!modalOpen);
//   };


//   const InputFields = [
//     { id:'A1', fieldName : 'Amenities Title *'},
//     { id:'A2', fieldName : 'Icon *'}
//   ]


//   return (
//     <Box>
//       <Grid sx={{ display: 'flex', mb: 3 }}>
//         <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant="subtitle1">All Amenities</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={()=> handleDialogState('Add New Amenities', 'Create')}>+ Add New</Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={InputFields}/>


//     </Box>
//   );
// }

// export default Amenities























// const CustomButton = styled(Button)(() => ({
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
//     color: '#57C168',
//   },
// }));


  // const getAllAmenities = async () => {
  //   try {
  //     var response = await allAmenitiesApi();
  //     if (response?.status === 200) {
  //       if (response?.data?.status === 'success') {
  //         setRows(response?.data?.Amenities);
  //         toast.success(response.data.message);
  //       }
  //       else {
  //         toast.error(response?.data?.message);
  //       }
  //     }
  //     else {
  //       console.log(response?.data?.message);
  //     }
  //   }
  //   catch (error) {
  //     console.log('Error Facing during Get All Fee Group API - ', error)
  //   }
  // }




// import { Box, Button, Stack, Typography } from '@mui/material';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   { id: 'population', label: 'Population', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US'), },
//   { id: 'size', label: 'Size\u00a0(km\u00b2)', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US'), },
//   { id: 'density', label: 'Density', minWidth: 170, align: 'right', format: (value) => value.toFixed(2), },
// ];

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];


// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }


// // ==============================|| SAMPLE PAGE ||============================== //

// const Amenities = () => {
//   return (
//     <Box>
//       <Grid2 sx={{ display: 'flex', mb: 3 }}>
//         <Grid2 alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant='h4'>All Amenities</Typography>
//         </Grid2>
//         <Grid2>
//         <Stack justifyContent='start' spacing={2} direction="row">
//           <Button variant="outlined">+ Add New</Button>
//         </Stack>
//         </Grid2>
//       </Grid2>
//       <DynamicDataTable columns={columns} rows={rows} />
//     </Box>
//   );
// }

// export default Amenities





