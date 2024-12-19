import React from 'react'
import { DeleteOutline, Edit } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DynamicDataTable from 'components/DynamicDataTable';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import DialogModal from 'components/DialogModal';
import useSWR, { mutate } from "swr";
import axios from 'axios';
import { addBedTypesApi, deleteBedTypesApi, getBedTypesDataByIdApi, updateBedTypesApi } from 'api/api';
import DeleteConfirmation from 'components/DeleteConfirmation';
// import { useForm } from 'react-hook-form';

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'http://89.116.122.211:5001'
const token = `Bearer ${localStorage.getItem('token')}`;

// Table Columns
const columns = [
  { id: 'SNo', label: 'S.No', minWidth: 170 },
  { id: 'bedName', label: 'Title', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

// API Call when ever data updates 
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const BedTypes = () => {

  // All useStates
  const [modalTitle, setModalTitle] = useState('Add Bed Types');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [BedTypesId, setBedTypesId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [toaster, setToaster] = useState(false);
  const [msgToaster, setMsgToaster] = useState('');
  const [toaterErrorSuccessState, setToaterErrorSuccessState] = useState('success');

  // Add BedTypes State Function
  const [formDataa, setFormDataa] = useState({
    bedName:'',
    status:'',
    bedImage:''
  })

  // Update BedTypes State Function
  const [updateFormDataa, setUpdateFormDataa] = useState({
    bedName:'',
    status:'',
    bedImage:'',
    bedNameOriginal:'',
    statusOriginal:'',
    bedImageOriginal:''
  })

  // get API
  const { data, error } = useSWR(`${ServerIP}/bedTypes/getAll`, fetcher);

  // Function to refresh the data
  const refreshData = () => {
    mutate(`${ServerIP}/BedTypes/getAll`);
  };


  // Add BedTypes Name
  const handleFormDataaBedTypesName = (val) => {
    setFormDataa({
      ...formDataa,
      bedName: val
    });
  }

  // Add BedTypes Status
  const handleFormDataaBedTypesStatus = (val) => {
    setFormDataa({
      ...formDataa,
      status: val
    });
  }

  // Add BedTypes Icon
  const handleFormDataaBedTypesIcon = (val) => {
    setFormDataa({
      ...formDataa,
      bedImage: val
    });
  }

  // Update BedTypes Name
  const handleUpdateFormDataaBedTypesName = (val) => {
    setUpdateFormDataa({
      ...updateFormDataa,
      bedName: val
    });
  }

  // Update BedTypes Status
  const handleUpdateFormDataaBedTypesStatus = () => {
    setUpdateFormDataa({
      ...updateFormDataa,
      bedName: !(updateFormDataa.status)
    });
  }

  // Update BedTypes Icon
  const handleUpdateFormDataaBedTypesIcon = (val) => {
    setUpdateFormDataa({
      ...updateFormDataa,
      bedImage: val
    });
  }

  const AddInputFields = 
  [
    { id: 'bedName', field:'textInput', fieldType: 'text', fieldName: 'BedTypes Title *', placeholder: 'Enter Bed Type Name',  updateValFunc: handleFormDataaBedTypesName },
    { id: 'status', field:'select', feildOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'InActive', optionValue: 'false' }], fieldName: 'Status *',  updateValFunc: handleFormDataaBedTypesStatus  },
    { id: 'bedImage', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'],  updateValFunc: handleFormDataaBedTypesIcon }
  ];

  const UpdateInputFields =
  [
    { id: 'bedName', field:'textInput', fieldType: 'text', fieldName: 'BedTypes Title *', placeholder: 'Enter Bed Type Name', value:updateFormDataa.bedName, updateValFunc: handleUpdateFormDataaBedTypesName },
    { id: 'status', field:'select', feildOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'InActive', optionValue: 'false' }], fieldName: 'Status *', value:updateFormDataa.status, updateValFunc: handleUpdateFormDataaBedTypesStatus  },
    { id: 'bedImage', field:'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], value:updateFormDataa.bedImage, updateValFunc: handleUpdateFormDataaBedTypesIcon }
  ];

  // Dialog Open Handle
  const handleDialogState = (title, button, BedTypeId) => {
    setModalTitle(title);
    setButtonName(button);
    if(button==='Update'){
      getBedTypesDataById(BedTypeId);
    }
    setModalOpen(!modalOpen);
  };

  // Dialog Close Handle
  const handleClosingDialogState = () => {
    setModalOpen(!modalOpen);
  };

  // Modale Close Handle
  const handleClosingModal = () => {
    setDeleteModal(false);
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

  // delete handle
  const handleDeleteButton = (id) => { 
    setDeleteId(id)
    setDeleteModal(true)
  }

  // useEffect
  useEffect(() => {
    if (data) {
      setMsgToaster(data?.message)
      console.log(data, 'data');
      const transformedRows = data.bedTypes.map((BedType, index) => ({
        ...BedType,
        SNo:index+1,
        // image: BedType.icon === null ? '-' : BedType.bedImage.split('/').pop(),
        // status: <CustomButton variant="outlined" status={`${BedType.status? 'enable' : 'disable'}`}> {BedType.status ? 'Enabled' : 'Disabled'} </CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState( 'Update New BedTypes', 'Update', BedType.bedTypeId )}>Edit</Button>
            <Button variant="outlined" size="small" startIcon= {<DeleteOutline/>} color="error" onClick={()=> handleDeleteButton(BedType?.bedTypeId)}>Delete</Button>
          </Stack>
        ),
      }));
      setRows(transformedRows);
    }
    if(msgToaster){
      handleOpeningToasterState();
    }
  }, [data]);

  // Add Function
  const AddNewBedType = async () => {
    console.log('start')
    try {
      console.log('try')
      const formData = new FormData();
      formData.append('bedName', formDataa.bedName)
      formData.append('status', formDataa.status)
      formData.append('icon', formDataa.bedImage)
      const response = await addBedTypesApi(formData);
      console.log(response, 'response')
      if (response.status === 200) {
        if(response?.data?.status === 'success'){
          console.log(response?.data?.message, 'success')
          navigate('/BedTypes');
        }
      }
    } 
    catch (error) {
      console.log('catch')
    } 
    finally {
      console.log('finally')
    }
  };

  
  // Get BedTypes data by id
  const getBedTypesDataById = async (id) => {
    setBedTypesId(id)
    try {
        var response = await getBedTypesDataByIdApi(id);
        console.log(response, 'get by id')
        if (response?.status === 200) {
            if (response?.data?.status === 'success') {
              setUpdateFormDataa({ 
                bedName: response?.data?.BedType?.bedName,
                bedImage: response?.data?.BedType?.bedImage,
                bedNameOriginal: response?.data?.BedType?.bedName,
                bedImageOriginal: response?.data?.BedType?.bedImage
                });
            }
        }
        else {
            console.log(response?.data?.message);
        }
    }
    catch (error) {
      console.log('catch')
    } 
    finally {
      console.log('finally')
    }
  }

  // Update Status Function
  const UpdateBedTypesData = async () => {
    try {
      const formData = new FormData();
      if(updateFormDataa.bedName !== updateFormDataa.bedNameOriginal){
        formData.append('bedName', updateFormDataa.bedName)
      }
      if(updateFormDataa.bedImage !== updateFormDataa.bedImageOriginal){
        formData.append('icon', updateFormDataa.bedImage)
      }
      var response = await updateBedTypesApi(BedTypesId, formData);
      console.log(response, 'BedTypes')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setMsgToaster(response?.data?.message)
        }
        else {
          setMsgToaster(response?.data?.message)
        }
      } else {
        setMsgToaster(response?.data?.message)
      }
    } catch (error) {
      console.error('Error during update:', error);
      setMsgToaster('Error during update:', error)
    }
  }

  // Delete Bed Type
  const DeleteBedType = async () => {
    try {
      console.log(deleteId)
      const deleteIdd = parseInt(deleteId)
      var response = await deleteBedTypesApi(deleteIdd);
      console.log(response)
      if (response?.status === 200) {
        if (response.data.status === 'success') {
          setDeleteModal(false);
        }
      }
      else {
        // toast.error(response?.error);
      }
    }
    catch (error) {
      console.error('Error during login:', error);
    }
  }

  if (error) {<Typography variant="subtitle1">- Error loading data</Typography> };
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

  return (
    <Box>
      {/* Heading */}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h5">All BedTypes</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add Bed Types', 'Create')}>
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* Data Table */}
      <DynamicDataTable columns={columns} rows={rows} />

      {/* Modals for all Add and Update */}
      <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewBedType : UpdateBedTypesData} />

      {/* SnackBar */}
      <Snackbar open={toaster} autoHideDuration={5000} onClose={handleClosingToasterState}>
        <Alert onClose={handleClosingToasterState} severity={toaterErrorSuccessState} variant="filled" sx={{ width: '100%', color: '#fff', fontSize: '14px' }}>
          {msgToaster}
        </Alert>
      </Snackbar>

      {/* Delete Modal */}
      <DeleteConfirmation deleteModal={deleteModal} handleClosingModal={handleClosingModal} DeleteBedType={DeleteBedType}/>

    </Box>
  );
};

export default BedTypes;




















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
