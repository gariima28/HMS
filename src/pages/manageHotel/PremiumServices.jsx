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
import HashLoader from 'components/HashLoader';
import { addPremiumServicesApi, getPremiumServicesDataByIdApi, updatePremiumServicesApi } from 'api/api';
// import { useForm } from 'react-hook-form';

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'http://89.116.122.211:5001'
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

// Table Columns

const columns = [
  { id: 'PremiumService', label: 'Name', minWidth: 120 },
  { id: 'price', label: 'Cost', minWidth: 120 },
  { id: 'status', label: 'Status', minWidth: 120, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 120, align: 'right' },
];


// API Call when ever data updates 
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const PremiumService = () => {

  // All useStates
  const [modalTitle, setModalTitle] = useState('Add New PremiumService');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [preServiceId, setPreServiceId] = useState();

  const [showLoader, setShowLoader] = useState(false);


  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });


  // Add Premium Service State Function
  const [formDataa, setFormDataa] = useState({
    preSerName: '',
    price: ''
  })

  // Update Premium Service State Function
  const [updateFormDataa, setUpdateFormDataa] = useState({
    preSerName: '',
    price: '',
    PremiumServiceNameOriginal: '',
    PriceOriginal: ''
  });

  // Add Premium Service Name
  const handleFormDataaPremiumServiceName = (val) => {
    setFormDataa({
      ...formDataa,
      preSerName: val
    });
  }

  // Add Premium Service Cost
  const handleFormDataaCost = (val) => {
    setFormDataa({
      ...formDataa,
      price: val
    });
  }

  // Update Premium Service Name
  const handleUpdateFormDataaPremiumServiceName = (val) => {
    setUpdateFormDataa({
      ...updateFormDataa,
      preSerName: val
    });
  }

  // Update Premium Service Cost
  const handleUpdateFormDataaCost = (val) => {
    setUpdateFormDataa({
      ...updateFormDataa,
      price: val
    });
  }

  const AddInputFields =
    [
      { id: 'preSerName', field: 'textInput', fieldType: 'text', fieldName: 'Service Name *', placeholder: 'Enter Service Name', updateValFunc: handleFormDataaPremiumServiceName },
      { id: 'price', field: 'textInput', fieldType: 'text', fieldName: 'Cost *', placeholder: 'Enter Cost', updateValFunc: handleFormDataaCost },
    ];

  const UpdateInputFields = [
    { id: 'preSerName', field: 'textInput', fieldType: 'text', fieldName: 'Service Name *', placeholder: 'Enter Service Name', value: updateFormDataa.preSerName || '', updateValFunc: handleUpdateFormDataaPremiumServiceName },
    { id: 'price', field: 'textInput', fieldType: 'text', fieldName: 'Cost *', placeholder: 'Enter Cost', value: updateFormDataa.price || '', updateValFunc: handleUpdateFormDataaCost }
  ];


  // get API
  const { data, error } = useSWR(`${ServerIP}/preServ/getAll`, fetcher, {
    onLoadingSlow: () => setShowLoader(true),
    onSuccess: () => setShowLoader(false),
  });

  // Function to refresh the data
  const refreshData = () => {
    mutate(`${ServerIP}/preServ/getAll`);
  };

  // Dialog Open Handle
  const handleDialogState = (title, button, preServiceId) => {
    setModalTitle(title);
    setButtonName(button);
    if (button === 'Update') {
      getPremiumServicesDataById(preServiceId);
    }
    setModalOpen(true);
  };

  // Dialog Close Handle
  const handleClosingDialogState = () => {
    setModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSnackbarMessage = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // useEffect
  useEffect(() => {
    if (data) {
      setShowLoader(true)
      const transformedRows = data.map((premiumService) => ({
        ...premiumService,
        PremiumService: premiumService.preSerName,
        price: `$ ${premiumService.price}.00`,
        status: <CustomButton variant="outlined" status={`${premiumService.status ? 'enable' : 'disable'}`}> {premiumService.status ? 'Enabled' : 'Disabled'} </CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New PremiumService', 'Update', premiumService.preServiceId)}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={premiumService.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={`${premiumService.status ? 'error' : 'success'}`} onClick={() => UpdatePremiumServicesStatus(premiumService?.preServiceId, premiumService?.status)}>{`${premiumService.status ? 'Disable' : 'Enable'}`}</Button>
          </Stack>
        ),
      }));

      setTimeout(() => {
        setShowLoader(false)
        setRows(transformedRows);
      }, 1000);
    }
  }, [data]);

  // Add Function
  const AddNewPremiumServices = async () => {
    try {
      const data = {
        'preSerName': formDataa.preSerName,
        'price': formDataa.price
      }
      const response = await addPremiumServicesApi(data);
      if (response.status === 200) {
        if (response?.data?.status === 'success') {
          handleSnackbarMessage('Premium Services Added Successfully', 'success');
          setModalOpen(false);
          refreshData();
        }
        else{
          handleSnackbarMessage(response?.data?.message, 'error');
        }
      }
    }
    catch (error) {
      setModalOpen(false);
      console.log('catch')
    }
  };


  // Get PremiumService data by id
  const getPremiumServicesDataById = async (id) => {
    setPreServiceId(id)
    try {
      var response = await getPremiumServicesDataByIdApi(id);
      console.log(response, 'get by id')
      if (response?.status === 200) {
        console.log(response.data, 'hjdnbghjnsbdfhjdmsnbdgfhjdsndbhfj')
        setUpdateFormDataa({
          preSerName: response?.data?.preSerName,
          price: response?.data?.price,
          PremiumServiceNameOriginal: response?.data?.preSerName,
          PriceOriginal: response?.data?.price
        });
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

  // Update Function
  const UpdatePremiumServicesStatus = async (id, PremiumServicesStatus) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('status', PremiumServicesStatus ? false : true);

      var response = await updatePremiumServicesApi(id, formDataToSend);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          handleSnackbarMessage('Premium Services Updated Successfully', 'success');
          setModalOpen(false);
          refreshData();
        }
        else {
          handleSnackbarMessage(response?.data?.message, 'error');
        }
      }
    } catch (error) {
      console.log(error, 'error')
    }
  }

  // Update Status Function
  const UpdatePremiumServicesData = async () => {
    try {
      // Create the data object dynamically
      const formDataToSend = new FormData();
      if (updateFormDataa.preSerName !== updateFormDataa.PremiumServiceNameOriginal) {
        formDataToSend.append('preSerName', updateFormDataa.preSerName);
      }
      if (updateFormDataa.price !== updateFormDataa.PriceOriginal) {
        formDataToSend.append('price', updateFormDataa.price);
      }

      console.log("Data to update:", data);

      var response = await updatePremiumServicesApi(preServiceId, formDataToSend);
      console.log(response, 'facili');

      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          handleSnackbarMessage('Premium Services Updated Successfully', 'success');
          setModalOpen(false);
          refreshData();
        } else {
          handleSnackbarMessage(response?.data?.message, 'error');
        }
      } 
    } catch (error) {
      setModalOpen(false);
      console.error('Error during update:', error);
    }
  };

  if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

  return (
    <Box>
      {showLoader && <HashLoader />}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h5">All PremiumService</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add New PremiumService', 'Create')}>
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* Data Table */}
      <DynamicDataTable columns={columns} rows={rows} />

      {/* Modals for all Add and Update */}
      <DialogModal
        key={preServiceId}
        handleClosingDialogState={handleClosingDialogState}
        modalOpen={modalOpen}
        title={modalTitle}
        buttonName={buttonName}
        InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields}
        onSubmit={buttonName === 'Create' ? AddNewPremiumServices : UpdatePremiumServicesData}
      />


      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default PremiumService;

















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
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'price', label: 'Cost', minWidth: 100, align: 'center' },
//   { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
//   { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
// ];


// const PremiumServices = () => {

//   const [modalTitle, setModalTitle] = useState('');
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
//       name: 'Braveer', price:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}  onClick={() => handleDialogState('Update Premium Services', 'Update')}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', price:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', price:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', price:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', price:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', price:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//   ];

//   const InputFields = [
//     { id:'A1', fieldName : 'Service Name *'},
//     { id:'A2', fieldName : 'Cost *'}
//   ]

//   return (
//     <Box>
//       <Grid sx={{ display: 'flex', mb: 3 }}>
//         <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant="subtitle1">All Premium Services</Typography>
//         </Grid>
//         <Grid>
//           <Stack justifyContent='start' spacing={2} direction="row">
//             <Button variant="outlined" onClick={()=> handleDialogState('Add PremiumServices', 'Create')}>+ Add New</Button>
//           </Stack>
//         </Grid>
//       </Grid>
//       <DynamicDataTable columns={columns} rows={rows} />

//       {/* Modals for all */}
//       <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={InputFields}/>


//     </Box>
//   );
// }

// export default PremiumServices
