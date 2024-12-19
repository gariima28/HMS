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
  { id: 'cost', label: 'Cost', minWidth: 120 },
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
  const [toaster, setToaster] = useState(false);
  const [msgToaster, setMsgToaster] = useState('');
  const [toaterErrorSuccessState, setToaterErrorSuccessState] = useState('success');

  // Add Premium Service State Function
  const [formDataa, setFormDataa] = useState({
    preSerName: '',
    cost: ''
  })

  // Update Premium Service State Function
  const [updateFormDataa, setUpdateFormDataa] = useState({
    preSerName: '',
    cost: '',
    PremiumServiceNameOriginal: '',
    CostOriginal: ''
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
      cost: val
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
      cost: val
    });
  }

  const AddInputFields =
    [
      { id: 'preSerName', field: 'textInput', fieldType: 'text', fieldName: 'Service Name *', placeholder: 'Enter Service Name', updateValFunc: handleFormDataaPremiumServiceName },
      { id: 'cost', field: 'textInput', fieldType: 'text', fieldName: 'Cost *', placeholder: 'Enter Cost', updateValFunc: handleFormDataaCost },
    ];

  const UpdateInputFields = [
    { id: 'preSerName', field: 'textInput', fieldType: 'text', fieldName: 'Service Name *', placeholder: 'Enter Service Name', value: updateFormDataa.preSerName || '', updateValFunc: handleUpdateFormDataaPremiumServiceName },
    { id: 'cost', field: 'textInput', fieldType: 'text', fieldName: 'Cost *', placeholder: 'Enter Cost', value: updateFormDataa.cost || '', updateValFunc: handleUpdateFormDataaCost }
  ];


  // get API
  const { data, error } = useSWR(`${ServerIP}/preServ/getAll`, fetcher);

  console.log(data, 'pre data')
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
    setModalOpen(!modalOpen);
  };

  // Dialog Close Handle
  const handleClosingDialogState = () => {
    setModalOpen(!modalOpen);
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
      setMsgToaster(data?.message ? data?.message : 'Success' )
      const transformedRows = data.map((premiumService) => ({
        ...premiumService,
        PremiumService: premiumService.preSerName,
        cost: `$ ${premiumService.price}.00`,
        status: <CustomButton variant="outlined" status={`${premiumService.status ? 'enable' : 'disable'}`}> {premiumService.status ? 'Enabled' : 'Disabled'} </CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New PremiumService', 'Update', premiumService.preServiceId)}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={premiumService.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={`${premiumService.status ? 'error' : 'success'}`} onClick={() => UpdatePremiumServicesStatus(premiumService?.preServiceId, premiumService?.status)}>{`${premiumService.status ? 'Disable' : 'Enable'}`}</Button>
          </Stack>
        ),
      }));
      setRows(transformedRows);
    }
    if (msgToaster) {
      handleOpeningToasterState();
    }
  }, [data]);

  // Add Function
  const AddNewPremiumServices = async () => {
    console.log(formDataa, 'formDataa')
    console.log('start')
    try {
      const data = {
        'preSerName': formDataa.preSerName,
        'cost': formDataa.cost
      }
      console.log(data)
      const response = await addPremiumServicesApi(data);
      console.log(response, 'response')
      if (response.status === 200) {
        if (response?.data?.status === 'success') {
          console.log(response?.data?.message, 'success')
          // navigate('/premiumService');
          setModalOpen(false);
          refreshData();
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
          cost: response?.data?.price,
          PremiumServiceNameOriginal: response?.data?.preSerName,
          CostOriginal: response?.data?.price
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
      const data = {
        'status': PremiumServicesStatus ? false : true
      }
      var response = await updatePremiumServicesApi(id, data);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setMsgToaster(response?.data?.message)
          refreshData();
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

  // Update Status Function
  const UpdatePremiumServicesData = async () => {
    try {
      // Create the data object dynamically
      const data = {};
      if (updateFormDataa.preSerName !== updateFormDataa.PremiumServiceNameOriginal) {
        data.preSerName = updateFormDataa.preSerName;
      }
      if (updateFormDataa.cost !== updateFormDataa.CostOriginal) {
        data.price = updateFormDataa.cost;
      }

      console.log("Data to update:", data);

      var response = await updatePremiumServicesApi(preServiceId, data);
      console.log(response, 'facili');

      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setMsgToaster(response?.data?.message);
          setModalOpen(false);
          refreshData();
        } else {
          setMsgToaster(response?.data?.message);
        }
      } else {
        setMsgToaster(response?.data?.message);
      }
    } catch (error) {
      console.error('Error during update:', error);
      setMsgToaster('Error during update:', error.message || error);
    }
  };

  if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

  return (
    <Box>
      {/* Heading */}
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


      {/* SnackBar */}

      <Snackbar open={toaster} autoHideDuration={5000} onClose={handleClosingToasterState} >
        <Alert onClose={handleClosingToasterState} severity={toaterErrorSuccessState} variant="filled" sx={{ width: '100%', color: '#fff', fontSize: '14px' }} >
          {msgToaster}
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
//   { id: 'cost', label: 'Cost', minWidth: 100, align: 'center' },
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
//       name: 'Braveer', cost:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}  onClick={() => handleDialogState('Update Premium Services', 'Update')}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', cost:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', cost:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', cost:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', cost:' $10.00',
//       status: <CustomButton variant="outlined"> Enabled </CustomButton>,
//       action:
//         <Stack justifyContent='end' spacing={2} direction="row">
//           <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
//           <Button variant="outlined" size="small" startIcon={<EyeInvisibleFilled />} color="error">Disable</Button>
//         </Stack>
//     },
//     {
//       name: 'Braveer', cost:' $10.00',
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
