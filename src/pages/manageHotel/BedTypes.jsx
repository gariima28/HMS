import React, { useEffect, useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DynamicDataTable from 'components/DynamicDataTable';
import { styled } from '@mui/material/styles';
import DialogModal from 'components/DialogModal';
import useSWR, { mutate } from "swr";
import axios from 'axios';
import { addBedTypesApi, deleteBedTypesApi, getBedTypesDataByIdApi, updateBedTypesApi } from 'api/api';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


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
  { id: 'SNo', label: 'S.No', minWidth: 170 },
  { id: 'bedName', label: 'Title', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const BedTypes = () => {
  const [modalTitle, setModalTitle] = useState('Add New BedTypes');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationAlertOpen, setConfirmationAlertOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [bedTypesId, setBedTypesId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const [formData, setFormData] = useState({
    bedTypeName: '',
    status: '',
    bedTypeImage: ''
  });

  const [updateFormData, setUpdateFormData] = useState({
    bedTypeName: '',
    status: '',
    bedTypeImage: '',
    bedTypeNameOriginal: '',
    statusOriginal: '',
    bedTypeImageOriginal: ''
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSnackbarMessage = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const AddInputFields = [
    { id: 'bedTypeName', field: 'textInput', fieldType: 'text', fieldName: 'BedTypes Title *', placeholder: 'Enter BedTypes Name', updateValFunc: (val) => setFormData({ ...formData, bedTypeName: val }) },
    { id: 'status', field: 'select', fieldName: 'Status *', fieldOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' },], value: formData.status, updateValFunc: (val) => setFormData({ ...formData, status: val }), },
    { id: 'bedTypeImage', field: 'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], updateValFunc: (val) => setFormData({ ...formData, bedTypeImage: val }) },
  ];

  const UpdateInputFields = [
    { id: 'bedTypeName', field: 'textInput', fieldType: 'text', fieldName: 'BedTypes Title *', value: updateFormData.bedTypeName, updateValFunc: (val) => setUpdateFormData({ ...updateFormData, bedTypeName: val }) },
    { id: 'status', field: 'select', fieldName: 'Status *', fieldOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' },], value: updateFormData.status, updateValFunc: (val) => setUpdateFormData({ ...updateFormData, status: val }), },
    { id: 'bedTypeImage', field: 'fileType', fieldType: 'file', fieldName: 'Icon *', value: updateFormData.bedTypeImage, updateValFunc: (val) => setUpdateFormData({ ...updateFormData, bedTypeImage: val }) },
  ];

  const { data, error } = useSWR(`${ServerIP}/bedTypes/getAll`, fetcher);

  const refreshData = () => {
    mutate(`${ServerIP}/bedTypes/getAll`);
  };

  const handleDialogState = (title, button, bedTypeId) => {
    setModalTitle(title);
    setButtonName(button);
    if (button === 'Update') {
      getBedTypesDataById(bedTypeId);
    }
    setModalOpen(true);
  };

  const handleClosingDialogState = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (data) {
      const transformedRows = data.bedTypes.map((bedType, index) => ({
        ...bedType,
        SNo: index+1,
        status: <CustomButton variant="outlined" status={bedType.status ? 'enable' : 'disable'}>{bedType.status ? 'Enabled' : 'Disabled'}</CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New BedTypes', 'Update', bedType.bedTypeId)}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={<DeleteOutline />} color="error" onClick={() => handleDeleteId(bedType?.bedTypeId)}>Delete</Button>
          </Stack>
        ),
      }));
      setRows(transformedRows);
    }
  }, [data]);

  const handleDeleteId = (id) => {
    console.log(id, 'jhuygfvhb')
    setDeleteId(id)
    setConfirmationAlertOpen(true);
  }

  const handleClose = () => {
    setDeleteId(null);
    setConfirmationAlertOpen(false)
  };

  const handleDeleteBedType = async() => {
    console.log(deleteId)
    try {
      const response = await deleteBedTypesApi(deleteId);
      console.log(response, 'beddd dltt')
      if (response?.status === 200 && response?.data?.status === 'success') {
        handleSnackbarMessage('Bed Type Deleted Successfully', 'success');
        setConfirmationAlertOpen(false);
        refreshData();
      }
    } catch (error) {
      console.log('Error fetching bedType data:', error);
    }
  }

  const AddNewBedType = async () => {
    // Validate that all fields are correctly populated
    if (!formData.bedTypeName || !formData.status || !formData.bedTypeImage) {
      handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('bedName', formData.bedTypeName);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('bedImage', formData.bedTypeImage);

      const response = await addBedTypesApi(formDataToSend);

      if (response.status === 200 && response?.data?.status === 'success') {
        handleSnackbarMessage('Bed Type Added Successfully', 'success');
        setModalOpen(false);
        refreshData();
      } else {
        handleSnackbarMessage(response?.data?.message || 'Error adding bedType', 'error');
      }
    } catch (error) {
      console.error('Error adding bedType:', error);
      handleSnackbarMessage('Error adding bedType', 'error');
    }
  };

  const getBedTypesDataById = async (id) => {
    setBedTypesId(id);
    try {
      const response = await getBedTypesDataByIdApi(id);
      console.log(response, 'neddd')
      if (response?.status === 200 && response?.data?.status === 'success') {
        setUpdateFormData({
          bedTypeName: response?.data?.bedType?.bedName,
          status: response?.data?.bedType?.status,
          bedTypeImage: response?.data?.bedType?.bedImage,
          bedTypeNameOriginal: response?.data?.bedType?.bedName,
          statusOriginal: response?.data?.bedType?.status,
          bedTypeImageOriginal: response?.data?.bedType?.bedImage
        });
      }
    } catch (error) {
      console.log('Error fetching bedType data:', error);
    }
  };

  const UpdateBedTypesData = async () => {
    try {
      const formData = new FormData();
      if (updateFormData.bedTypeName !== updateFormData.bedTypeNameOriginal) {
        formData.append('bedName', updateFormData.bedTypeName);
      }
      if (updateFormData.status !== updateFormData.statusOriginal) {
        formData.append('status', updateFormData.status);
      }
      if (updateFormData.bedTypeImage !== updateFormData.bedTypeImageOriginal) {
        formData.append('bedImage', updateFormData.bedTypeImage);
      }
      const response = await updateBedTypesApi(bedTypesId, formData);
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
          <Typography variant="h5">All BedTypes</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent="start" spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add New BedTypes', 'Create')}>+ Add New</Button>
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
        onSubmit={buttonName === 'Create' ? AddNewBedType : UpdateBedTypesData}
      />
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>







      {/* Merge Dialog */}
      <Dialog
        open={confirmationAlertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        PaperProps={{
          sx: { position: "absolute", top: 20, margin: 0, width: '100%' },
        }}
      >
        {/* Dialog Title */}
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: "bold" }}
          id="customized-dialog-title"
        >
          <Typography variant='h5'>Confirmation Alert!</Typography>
        </DialogTitle>

        {/* Close Icon */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        {/* Dialog Content */}
        <DialogContent dividers sx={{p:2}}>
          <Typography variant='h6'>Are you sure, you want to delete this bed type?</Typography>
        </DialogContent>

        {/* Submit Button */}
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#000" },
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteBedType}
            sx={{
              backgroundColor: "#5a32ea",
              color: "#fff",
              "&:hover": { backgroundColor: "#482bc8" },
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

export default BedTypes;
























// import React from 'react'
// import { DeleteOutline, Edit } from '@mui/icons-material';
// import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import DynamicDataTable from 'components/DynamicDataTable';
// import { styled } from '@mui/material/styles';
// import { useEffect, useState } from 'react';
// import DialogModal from 'components/DialogModal';
// import useSWR, { mutate } from "swr";
// import axios from 'axios';
// import { addBedTypesApi, deleteBedTypesApi, getBedTypesDataByIdApi, updateBedTypesApi } from 'api/api';
// import DeleteConfirmation from 'components/DeleteConfirmation';
// // import { useForm } from 'react-hook-form';

// // const LocalGirjesh = 'http://192.168.20.109:5001';
// const ServerIP = 'http://89.116.122.211:5001'
// const token = `Bearer ${localStorage.getItem('token')}`;

// // Table Columns
// const columns = [
//   { id: 'SNo', label: 'S.No', minWidth: 170 },
//   { id: 'bedName', label: 'Title', minWidth: 170 },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];

// // API Call when ever data updates 
// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

// const BedTypes = () => {

//   // All useStates
//   const [modalTitle, setModalTitle] = useState('Add Bed Types');
//   const [buttonName, setButtonName] = useState('Save Changes');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [BedTypesId, setBedTypesId] = useState();
//   const [deleteId, setDeleteId] = useState();
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [toaster, setToaster] = useState(false);
//   const [msgToaster, setMsgToaster] = useState('');
//   const [toaterErrorSuccessState, setToaterErrorSuccessState] = useState('success');

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

//   // Add BedTypes State Function
//   const [formDataa, setFormDataa] = useState({
//     bedName:'',
//     status:'',
//     bedImage:''
//   })

//   // Update BedTypes State Function
//   const [updateFormDataa, setUpdateFormDataa] = useState({
//     bedName:'',
//     status:'',
//     bedImage:'',
//     bedNameOriginal:'',
//     statusOriginal:'',
//     bedImageOriginal:''
//   })

//   // get API
//   const { data, error } = useSWR(`${ServerIP}/bedTypes/getAll`, fetcher);

//   // Function to refresh the data
//   const refreshData = () => {
//     mutate(`${ServerIP}/BedTypes/getAll`);
//   };


//   // Add BedTypes Name
//   const handleFormDataaBedTypesName = (val) => {
//     setFormDataa({
//       ...formDataa,
//       bedName: val
//     });
//   }

//   // Add BedTypes Status
//   const handleFormDataaBedTypesStatus = (val) => {
//     setFormDataa({
//       ...formDataa,
//       status: val
//     });
//   }

//   // Add BedTypes Icon
//   const handleFormDataaBedTypesIcon = (val) => {
//     setFormDataa({
//       ...formDataa,
//       bedImage: val
//     });
//   }

//   // Update BedTypes Name
//   const handleUpdateFormDataaBedTypesName = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       bedName: val
//     });
//   }

//   // Update BedTypes Status
//   const handleUpdateFormDataaBedTypesStatus = () => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       bedName: !(updateFormDataa.status)
//     });
//   }

//   // Update BedTypes Icon
//   const handleUpdateFormDataaBedTypesIcon = (val) => {
//     setUpdateFormDataa({
//       ...updateFormDataa,
//       bedImage: val
//     });
//   }

//   const AddInputFields = 
//   [
//     { id: 'bedName', field:'textInput', fieldType: 'text', fieldName: 'BedTypes Title *', placeholder: 'Enter Bed Type Name',  updateValFunc: handleFormDataaBedTypesName },
//     { id: 'status', field:'select', feildOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'InActive', optionValue: 'false' }], fieldName: 'Status *',  updateValFunc: handleFormDataaBedTypesStatus  },
//     { id: 'bedImage', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'],  updateValFunc: handleFormDataaBedTypesIcon }
//   ];

//   const UpdateInputFields =
//   [
//     { id: 'bedName', field:'textInput', fieldType: 'text', fieldName: 'BedTypes Title *', placeholder: 'Enter Bed Type Name', value:updateFormDataa.bedName, updateValFunc: handleUpdateFormDataaBedTypesName },
//     { id: 'status', field:'select', feildOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'InActive', optionValue: 'false' }], fieldName: 'Status *', value:updateFormDataa.status, updateValFunc: handleUpdateFormDataaBedTypesStatus  },
//     { id: 'bedImage', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], value:updateFormDataa.bedImage, updateValFunc: handleUpdateFormDataaBedTypesIcon }
//   ];

//   // Dialog Open Handle
//   const handleDialogState = (title, button, BedTypeId) => {
//     setModalTitle(title);
//     setButtonName(button);
//     if(button==='Update'){
//       getBedTypesDataById(BedTypeId);
//     }
//     setModalOpen(!modalOpen);
//   };

//   // Dialog Close Handle
//   const handleClosingDialogState = () => {
//     setModalOpen(!modalOpen);
//   };

//   // Modale Close Handle
//   const handleClosingModal = () => {
//     setDeleteModal(false);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   const handleSnackbarMessage = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };


//   // delete handle
//   const handleDeleteButton = (id) => { 
//     setDeleteId(id)
//     setDeleteModal(true)
//   }

//   // useEffect
//   useEffect(() => {
//     if (data) {
//       setMsgToaster(data?.message)
//       console.log(data, 'data');
//       const transformedRows = data.bedTypes.map((BedType, index) => ({
//         ...BedType,
//         SNo:index+1,
//         // image: BedType.icon === null ? '-' : BedType.bedImage.split('/').pop(),
//         // status: <CustomButton variant="outlined" status={`${BedType.status? 'enable' : 'disable'}`}> {BedType.status ? 'Enabled' : 'Disabled'} </CustomButton>,
//         action: (
//           <Stack justifyContent='end' spacing={2} direction="row">
//             <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState( 'Update New BedTypes', 'Update', BedType.bedTypeId )}>Edit</Button>
//             <Button variant="outlined" size="small" startIcon= {<DeleteOutline/>} color="error" onClick={()=> handleDeleteButton(BedType?.bedTypeId)}>Delete</Button>
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
//   const AddNewBedType = async () => {
//     console.log('start')
//     try {
//       console.log('try')
//       const formData = new FormData();
//       formData.append('bedName', formDataa.bedName)
//       formData.append('status', formDataa.status)
//       formData.append('icon', formDataa.bedImage)
//       const response = await addBedTypesApi(formData);
//       console.log(response, 'response')
//       if (response.status === 200) {
//         if(response?.data?.status === 'success'){
//           console.log(response?.data?.message, 'success')
//           navigate('/BedTypes');
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

  
//   // Get BedTypes data by id
//   const getBedTypesDataById = async (id) => {
//     setBedTypesId(id)
//     try {
//         var response = await getBedTypesDataByIdApi(id);
//         console.log(response, 'get by id')
//         if (response?.status === 200) {
//             if (response?.data?.status === 'success') {
//               setUpdateFormDataa({ 
//                 bedName: response?.data?.BedType?.bedName,
//                 bedImage: response?.data?.BedType?.bedImage,
//                 bedNameOriginal: response?.data?.BedType?.bedName,
//                 bedImageOriginal: response?.data?.BedType?.bedImage
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

//   // Update Status Function
//   const UpdateBedTypesData = async () => {
//     try {
//       const formData = new FormData();
//       if(updateFormDataa.bedName !== updateFormDataa.bedNameOriginal){
//         formData.append('bedName', updateFormDataa.bedName)
//       }
//       if(updateFormDataa.bedImage !== updateFormDataa.bedImageOriginal){
//         formData.append('icon', updateFormDataa.bedImage)
//       }
//       var response = await updateBedTypesApi(BedTypesId, formData);
//       console.log(response, 'BedTypes')
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

//   // Delete Bed Type
//   const DeleteBedType = async () => {
//     try {
//       console.log(deleteId)
//       const deleteIdd = parseInt(deleteId)
//       var response = await deleteBedTypesApi(deleteIdd);
//       console.log(response)
//       if (response?.status === 200) {
//         if (response.data.status === 'success') {
//           setDeleteModal(false);
//         }
//       }
//       else {
//         // toast.error(response?.error);
//       }
//     }
//     catch (error) {
//       console.error('Error during login:', error);
//     }
//   }

//   if (error) {<Typography variant="subtitle1">- Error loading data</Typography> };
//   if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

//   return (
//     <Box>
//       {/* Heading */}
//       <Grid sx={{ display: 'flex', mb: 3 }}>
//         <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant="h5">All BedTypes</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={() => handleDialogState('Add Bed Types', 'Create')}>
//               + Add New
//             </Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       {/* Data Table */}
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all Add and Update */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewBedType : UpdateBedTypesData} />

//       {/* Snackbar for Notifications */}
//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//         <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       {/* Delete Modal */}
//       <DeleteConfirmation deleteModal={deleteModal} handleClosingModal={handleClosingModal} DeleteBedType={DeleteBedType}/>

//     </Box>
//   );
// };

// export default BedTypes;




















// import { EyeInvisibleFilled } from '@ant-design/icons';
// import { Edit } from '@mui/icons-material';
// import { Box, Button, Stack, Typography } from '@mui/material';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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
//   },
// }));


// const columns = [
//   { id: 'SNo', label: 'S.No', minWidth: 170 },
//   { id: 'BedType', label: 'Bed Type', minWidth: 100, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];

// const BedTypes = () => {
  
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
//       SNo: 1,
//       BedType: 'Test',
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />} onClick={()=> handleDialogState('Update Bed Type', 'Update')}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       SNo: 2,
//       BedType: 'Single',
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       SNo: 3,
//       BedType: 'Qeen',
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       SNo: 4,
//       BedType: 'Double',
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//   ];
  
//   const InputFields = [
//     { id:'BT1', fieldName : 'Bed Type *'},
//     // { id:'BT1', fieldName : 'Bed Type *'}
//   ]

  
//   return (
//     <Box>
//       <Grid2 sx={{ display: 'flex', mb: 3 }}>
//         <Grid2 alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant='h4'>All Bed Types</Typography>
//         </Grid2>
//         <Grid2>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={()=> handleDialogState('Add New Bed Type', 'Create')}>+ Add New</Button>
//           </Stack>
//         </Grid2>
//       </Grid2>
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={InputFields} />


//     </Box>
//   );
// }

// export default BedTypes
