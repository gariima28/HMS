import React, { useEffect, useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Edit } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DynamicDataTable from 'components/DynamicDataTable';
import { styled } from '@mui/material/styles';
import DialogModal from 'components/DialogModal';
import useSWR, { mutate } from "swr";
import axios from 'axios';
import { addFacilitiesApi, getFacilitiesDataByIdApi, updateFacilitiesApi } from 'api/api';

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

const columns = [
  { id: 'facilityName', label: 'Title', minWidth: 170 },
  { id: 'image', label: 'Icon', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const Facilities = () => {
  const [modalTitle, setModalTitle] = useState('Add New Facilities');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [facilitiesId, setFacilitiesId] = useState();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const [formData, setFormData] = useState({
    facilityName: '',
    status: '',
    facilityImage: ''
  });

  const [updateFormData, setUpdateFormData] = useState({
    facilityName: '',
    facilityImage: '',
    facilityNameOriginal: '',
    facilityImageOriginal: ''
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSnackbarMessage = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const AddInputFields = [
    { id: 'facilityName', field: 'textInput', fieldType: 'text', fieldName: 'Facilities Title *', placeholder: 'Enter Facilities Name', updateValFunc: (val) => setFormData({ ...formData, facilityName: val }) },
    { id: 'status', field: 'select', fieldName: 'Status *', fieldOptions: [ { optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' }, ], value: formData.status, updateValFunc: (val) => setFormData({ ...formData, status: val }), },
    { id: 'facilityImage', field: 'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], updateValFunc: (val) => setFormData({ ...formData, facilityImage: val }) },
  ];

  const UpdateInputFields = [
    { id: 'facilityName', field: 'textInput', fieldType: 'text', fieldName: 'Facilities Title *', value: updateFormData.facilityName, updateValFunc: (val) => setUpdateFormData({ ...updateFormData, facilityName: val }) },
    { id: 'facilityImage', field: 'fileType', fieldType: 'file', fieldName: 'Icon *', value: updateFormData.facilityImage, updateValFunc: (val) => setUpdateFormData({ ...updateFormData, facilityImage: val }) },
  ];

  const { data, error } = useSWR(`${ServerIP}/facilities/getAll`, fetcher);

  const refreshData = () => {
    mutate(`${ServerIP}/facilities/getAll`);
  };

  const handleDialogState = (title, button, facilityId) => {
    setModalTitle(title);
    setButtonName(button);
    if (button === 'Update') {
      getFacilitiesDataById(facilityId);
    }
    setModalOpen(true);
  };

  const handleClosingDialogState = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (data) {
      const transformedRows = data.Facilities.map((facility) => ({
        ...facility,
        image: facility.icon ? facility.facilityImage.split('/').pop() : '-',
        status: <CustomButton variant="outlined" status={facility.status ? 'enable' : 'disable'}>{facility.status ? 'Enabled' : 'Disabled'}</CustomButton>,
        action: (
          <Stack justifyContent="end" spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Facilities', 'Update', facility.facilityId)}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={facility.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={facility.status ? 'error' : 'success'} onClick={() => UpdateFacilitiesStatus(facility.facilityId, facility.status)}>{facility.status ? 'Disable' : 'Enable'}</Button>
          </Stack>
        ),
      }));
      setRows(transformedRows);
    }
  }, [data]);
  const AddNewFacility = async () => {
    // Validate that all fields are correctly populated
    if (!formData.facilityName || !formData.status || !formData.facilityImage) {
      handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('facilityName', formData.facilityName);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('icon', formData.facilityImage);

      const response = await addFacilitiesApi(formDataToSend);

      if (response.status === 200 && response?.data?.status === 'success') {
        handleSnackbarMessage('Facility Added Successfully', 'success');
        setModalOpen(false);
        refreshData();
      } else {
        handleSnackbarMessage(response?.data?.message || 'Error adding facility', 'error');
      }
    } catch (error) {
      console.error('Error adding facility:', error);
      handleSnackbarMessage('Error adding facility', 'error');
    }
  };

  const getFacilitiesDataById = async (id) => {
    setFacilitiesId(id);
    try {
      const response = await getFacilitiesDataByIdApi(id);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setUpdateFormData({
          facilityName: response?.data?.Facility?.facilityName,
          facilityImage: response?.data?.Facility?.facilityImage,
          facilityNameOriginal: response?.data?.Facility?.facilityName,
          facilityImageOriginal: response?.data?.Facility?.facilityImage
        });
      }
    } catch (error) {
      console.log('Error fetching facility data:', error);
    }
  };

  const UpdateFacilitiesStatus = async (id, facilityStatus) => {
    try {
      const formData = new FormData();
      formData.append('status', !facilityStatus);
      const response = await updateFacilitiesApi(id, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        handleSnackbarMessage(response?.data?.message, 'success');
        refreshData();
      } else {
        handleSnackbarMessage(response?.data?.message, 'error');
      }
    } catch (error) {
      console.error('Error during update:', error);
      handleSnackbarMessage('Error during update', 'error');
    }
  };

  const UpdateFacilitiesData = async () => {
    try {
      const formData = new FormData();
      if (updateFormData.facilityName !== updateFormData.facilityNameOriginal) {
        formData.append('facilityName', updateFormData.facilityName);
      }
      if (updateFormData.facilityImage !== updateFormData.facilityImageOriginal) {
        formData.append('icon', updateFormData.facilityImage);
      }
      const response = await updateFacilitiesApi(facilitiesId, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        handleSnackbarMessage(response?.data?.message, 'success');
        setModalOpen(false);
        refreshData();
      } else {
        handleSnackbarMessage(response?.data?.message, 'error');
      }
    } catch (error) {
      console.error('Error during update:', error);
      handleSnackbarMessage('Error during update', 'error');
    }
  };

  if (error) return <Typography variant="subtitle1">Error loading data</Typography>;
  if (!data) return <Typography variant="subtitle1">Loading data...</Typography>;

  return (
    <Box>
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent="center" sx={{ flexGrow: 1 }}>
          <Typography variant="h5">All Facilities</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent="start" spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add New Facilities', 'Create')}>+ Add New</Button>
          </Stack>
        </Grid>
      </Grid>
      <DynamicDataTable columns={columns} rows={rows} />
      <DialogModal
        handleClosingDialogState={handleClosingDialogState}
        modalOpen={modalOpen}
        title={modalTitle}
        buttonName={buttonName}
        InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields}
        onSubmit={buttonName === 'Create' ? AddNewFacility : UpdateFacilitiesData}
      />
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Facilities;


























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
// import { addFacilitiesApi, getFacilitiesDataByIdApi, updateFacilitiesApi } from 'api/api';
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
//   { id: 'facilityName', label: 'Title', minWidth: 170 },
//   { id: 'image', label: 'Icon', minWidth: 100 },
//   { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];

// // API Call when ever data updates 
// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

// const Facilities = () => {

//   // All useStates
//   const [modalTitle, setModalTitle] = useState('Add New Facilities');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [facilitiesId, setFacilitiesId] = useState();
//   const [toaterErrorSuccessState, setToaterErrorSuccessState] = useState('success');

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

//   // Add Facilities State Function
//   const [formDataa, setFormDataa] = useState({
//     facilityName:'',
//     status:'',
//     facilityImage:''
//   })

//   // Update Facilities State Function
//   const [updateFormDataa, setUpdateFormDataa] = useState({
//     facilityName:'',
//     facilityImage:'',
//     facilityNameOriginal:'',
//     facilityImageOriginal:''
//   })

//   // Add Facilities Name
//   const handleFormDataaFacilitiesName = (val) => {
//     setFormDataa({
//       ...formDataa,
//       facilityName: val
//     });
//   }

//   // Add Facilities Status
//   const handleFormDataaFacilitiesStatus = (val) => {
//     setFormDataa({
//       ...formDataa,
//       status: val
//     });
//   }

//   // Add Facilities Icon
//   const handleFormDataaFacilitiesIcon = (val) => {
//     setFormDataa({
//       ...formDataa,
//       facilityImage: val
//     });
//   }

//   // Update Facilities Name
//   const handleUpdateFormDataaFacilitiesName = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       facilityName: val
//     });
//   }

//   // Update Facilities Icon
//   const handleUpdateFormDataaFacilitiesIcon = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       facilityImage: val
//     });
//   }

//   const AddInputFields = 
//   [
//     { id: 'facilityName', field:'textInput', fieldType: 'text', fieldName: 'Facilities Title *', placeholder: 'Enter Facilities Name',  updateValFunc: handleFormDataaFacilitiesName },
//       {
//         id: 'status',
//         field: 'select',
//         fieldName: 'Status *',
//         fieldOptions: [
//           { optionId: 'active', optionName: 'Active', optionValue: 'true' },
//           { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' },
//         ],
//         value: formDataa.status,
//         updateValFunc: handleFormDataaFacilitiesStatus,
//       }, 
//     { id: 'facilityImage', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'],  updateValFunc: handleFormDataaFacilitiesIcon }
//   ];

//   const UpdateInputFields =
//   [
//     { id: 'facilityName', field:'textInput', fieldType: 'text', fieldName: 'Facilities Title *', placeholder: 'Enter Facilities Name', value:updateFormDataa.facilityName, updateValFunc: handleUpdateFormDataaFacilitiesName },
//     { id: 'facilityImage', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], value:updateFormDataa.facilityImage, updateValFunc: handleUpdateFormDataaFacilitiesIcon }
//   ];

//   // get API
//   const { data, error } = useSWR(`${ServerIP}/facilities/getAll`, fetcher);

//   // Function to refresh the data
//   const refreshData = () => {
//     mutate(`${ServerIP}/facilities/getAll`);
//   };

//   // Dialog Open Handle
//   const handleDialogState = (title, button, facilityId) => {
//     setModalTitle(title);
//     setButtonName(button);
//     if(button==='Update'){
//       getFacilitiesDataById(facilityId);
//     }
//     setModalOpen(!modalOpen);
//   };

//   // Dialog Close Handle
//   const handleClosingDialogState = () => {
//     setModalOpen(!modalOpen);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   const handleSnackbarMessage = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   // useEffect
//   useEffect(() => {
//     if (data) {
//       console.log(data, 'data');
//       const transformedRows = data.Facilities.map((facility) => ({
//         ...facility,
//         image: facility.icon === null ? '-' : facility.facilityImage.split('/').pop(),
//         status: <CustomButton variant="outlined" status={`${facility.status? 'enable' : 'disable'}`}> {facility.status ? 'Enabled' : 'Disabled'} </CustomButton>,
//         action: (
//           <Stack justifyContent='end' spacing={2} direction="row">
//             <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState( 'Update New Facilities', 'Update', facility.facilityId )}>Edit</Button>
//             <Button variant="outlined" size="small" startIcon={facility.status ? <EyeInvisibleFilled /> : <EyeFilled/> } color={`${facility.status? 'error' : 'success'}`} onClick={()=> UpdateFacilitiesStatus( facility?.facilityId, facility?.status )}>{`${facility.status? 'Disable' : 'Enable'}`}</Button>
//           </Stack>
//         ),
//       }));
//       setRows(transformedRows);
//     }
//   }, [data]);

//   // Add Function
//   const AddNewFacility = async () => {
//     console.log('start')
//     try {
//       console.log('try')
//       const formData = new FormData();
//       formData.append('facilityName', formDataa.facilityName)
//       formData.append('status', formDataa.status)
//       formData.append('icon', formDataa.facilityImage)
//       const response = await addFacilitiesApi(formData);

//       if (response.status === 200 && response?.data?.status === 'success') {
//         setMsgToaster(response?.data?.message || 'Facility Added Successfully');
//         setToaterErrorSuccessState('success');
//         setToaster(true);
//         setModalOpen(false);
//         refreshData();
//       } else {
//         setMsgToaster(response?.data?.message || 'Error adding facility');
//         setToaterErrorSuccessState('error');
//         setToaster(true);
//       }
//     } catch (error) {
//       console.error('Error adding facility:', error);
//       setMsgToaster('Error adding facility');
//       setToaterErrorSuccessState('error');
//       setToaster(true);
//     }
//   };

  
//   // Get Facilities data by id
//   const getFacilitiesDataById = async (id) => {
//     setFacilitiesId(id)
//     try {
//         var response = await getFacilitiesDataByIdApi(id);
//         console.log(response, 'get by id')
//         if (response?.status === 200) {
//             if (response?.data?.status === 'success') {
//               setUpdateFormDataa({ 
//                 facilityName: response?.data?.Facility?.facilityName,
//                 facilityImage: response?.data?.Facility?.facilityImage,
//                 facilityNameOriginal: response?.data?.Facility?.facilityName,
//                 facilityImageOriginal: response?.data?.Facility?.facilityImage
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
//   const UpdateFacilitiesStatus = async (id, facilityStatus) => {
//     try {
//       const formData = new FormData();
//       formData.append('status', facilityStatus ? false : true)
//       var response = await updateFacilitiesApi(id, formData);
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
//   const UpdateFacilitiesData = async () => {
//     try {
//       const formData = new FormData();
//       if(updateFormDataa.facilityName !== updateFormDataa.facilityNameOriginal){
//         formData.append('facilityName', updateFormDataa.facilityName)
//       }
//       if(updateFormDataa.facilityImage !== updateFormDataa.facilityImageOriginal){
//         formData.append('icon', updateFormDataa.facilityImage)
//       }
//       var response = await updateFacilitiesApi(facilitiesId, formData);
//       console.log(response, 'facili')
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setMsgToaster(response?.data?.message)
//           setToaster(true);
//           setModalOpen(false);
//           refreshData();
//         }
//         else {
//           setMsgToaster(response?.data?.message)
//           setToaster(true);
//           setModalOpen(false);
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
//           <Typography variant="h5">All Facilities</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={() => handleDialogState('Add New Facilities', 'Create')}>
//               + Add New
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       {/* Data Table */}
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all Add and Update */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewFacility : UpdateFacilitiesData} />


//       {/* Snackbar for Notifications */}
//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//         <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//     </Box>
//   );
// };

// export default Facilities;












// import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
// import { AcUnitRounded, Edit } from '@mui/icons-material';
// import { Box, Button, Snackbar, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';
// import { styled } from '@mui/material/styles';
// import { useEffect, useState } from 'react';
// import DialogModal from 'components/DialogModal';
// import useSWR from "swr";
// import axios from 'axios';
// import { updateFacilitiesStatus } from 'api/api';

// const LocalGirjesh = 'http://192.168.20.109:5001';
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
//   { id: 'facilityName', label: 'Title', minWidth: 170 },
//   { id: 'facilityImage', label: 'Icon', minWidth: 100 },
//   { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];

// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

// const Facilities = () => {
//   const [modalTitle, setModalTitle] = useState('Add New Facilities');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([]);

//   const [toaster, setToaster] = useState(false)
//   const [msgToaster, setMsgToaster] = useState('')

//   const { data, error } = useSWR(`${ServerIP}/facilities/getAll`, fetcher);

//   const handleDialogState = (title, button) => {
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

//   const InputFields = [
//     { id: 'A1', fieldName: 'Facilities Title *' },
//     { id: 'A2', fieldName: 'Icon *' }
//   ];

//   useEffect(() => {
//     if (data) {
//       const transformedRows = data.Facilities.map((facility) => ({
//         ...facility,
//         facilityImage: facility.facilityImage.split('/').pop(),
//         // <img src={facility.facilityImage} alt="" />,
//         status: <CustomButton variant="outlined" status={`${facility.status? 'enable' : 'disable'}`}> {facility.status ? 'Enabled' : 'Disabled'} </CustomButton>,
//         action: (
//           <Stack justifyContent='end' spacing={2} direction="row">
//             <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Facilities', 'Update')}>Edit</Button>
//             <Button variant="outlined" size="small" startIcon={facility.status ? <EyeInvisibleFilled /> : <EyeFilled/> } color={`${facility.status? 'error' : 'success'}`} onClick={()=> UpdateFacilitiesStatus( facility?.facilitiesId, facility.status )}>{`${facility.status? 'Disable' : 'Enable'}`}</Button>
//           </Stack>
//         ),
//       }));
//       setRows(transformedRows);
//     }
//     if(msgToaster){
//       handleOpeningToasterState();
//     }
//   }, [data, msgToaster]);

//   const UpdateFacilitiesStatus = async (id, facilityStatus) => {
//     try {
//       const formData = new FormData();
//       formData.append('status', facilityStatus ? false : true)
//       var response = await updateFacilitiesStatus(id, formData);
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
//           <Typography variant="h5">All Facilities</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={() => handleDialogState('Add New Facilities', 'Create')}>
//               + Add New
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={InputFields} />

//       {/* SnackBar */}
//       <Snackbar open={toaster} autoHideDuration={5000} onClose={handleClosingToasterState} message={msgToaster} />
//     </Box>
//   );
// };

// export default Facilities;
