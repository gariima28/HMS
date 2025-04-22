
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
import NoDataFound from '../NoDataFound';
import { useForm } from 'react-hook-form';
import ErrorPage from 'components/ErrorPage';
import PlaceholderTable from 'components/Skeleton/PlaceholderTable';
import { addPremiumServicesApi, getPremiumServicesDataByIdApi, updatePremiumServicesApi } from 'api/api';

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
  { id: 'preSerName', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

// API Call when data updates
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const PremiumServices = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [modalTitle, setModalTitle] = useState('Add New PremiumServices');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [premiumServiceId, setPremiumServiceId] = useState();
  const { reset } = useForm();
  const [showLoader, setShowLoader] = useState(false);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);
  const [showModalLoader, setShowModalLoader] = useState(false);

  const [formDataa, setFormDataa] = useState({
    premiumServiceName: '',
    premiumServiceCost: '',
    status: '',
  });

  const [updateFormDataa, setUpdateFormDataa] = useState({
    premiumServiceName: '',
    premiumServiceCost: '',
    premiumServiceNameOriginal: '',
    premiumServiceCostOriginal: '',
  });

  const handleFormDataaPremiumServicesName = (val) => setFormDataa((prev) => ({ ...prev, premiumServiceName: val }));
  const handleFormDataaPremiumServicesCost = (val) => setFormDataa((prev) => ({ ...prev, premiumServiceCost: val }));
  const handleFormDataaPremiumServicesStatus = (val) => setFormDataa((prev) => ({ ...prev, status: val }));
  const handleUpdateFormDataaPremiumServicesName = (val) => setUpdateFormDataa((prev) => ({ ...prev, premiumServiceName: val }));
  const handleUpdateFormDataaPremiumServicesCost = (val) => setUpdateFormDataa((prev) => ({ ...prev, premiumServiceCost: val }));

  const AddInputFields = [
    { id: 'premiumServiceName', field: 'textInput', fieldType: 'text', validation: { required: true, pattern: /^[A-Z][a-zA-Z\s]*$/, patternMsg: 'This field should start with capital and only contain letters' }, fieldName: 'Premium Service Name ', placeholder: 'Enter Premium Service Name', updateValFunc: handleFormDataaPremiumServicesName, },
    { id: 'status', field: 'select', fieldName: 'Status ', validation: { required: true, }, fieldOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' },], value: formDataa.status, updateValFunc: handleFormDataaPremiumServicesStatus, },
    { id: 'premiumServiceCost', field: 'textInput', fieldType: 'number', validation: { required: true, pattern: /^\d+(\.\d{1,2})?$/, patternMsg: 'Please enter a valid price (e.g., 100 or 100.50)', }, fieldName: 'Price ', placeholder: 'Enter Service Price', updateValFunc: handleFormDataaPremiumServicesCost, },
  ];


  const UpdateInputFields = [
    { id: 'premiumServiceName', field: 'textInput', fieldType: 'text', validation: { required: true, pattern: /^[A-Za-z\s]+$/, patternMsg: 'This field can only contain characters and spaces', }, fieldName: 'Premium Service Name ', placeholder: 'Enter Premium Service Name', value: updateFormDataa.premiumServiceName, updateValFunc: handleUpdateFormDataaPremiumServicesName, },
    { id: 'premiumServiceCost', field: 'textInput', fieldType: 'number', validation: { required: true, pattern: /^\d+(\.\d{1,2})?$/, patternMsg: 'Please enter a valid price (e.g., 100 or 100.50)', }, fieldName: 'Price ', placeholder: 'Enter Service Price', value: updateFormDataa.premiumServiceCost, updateValFunc: handleUpdateFormDataaPremiumServicesCost, },
  ];

  // Get API
  const { data, error } = useSWR(`${ServerIP}/preServ/getAll`, fetcher, {
    onLoadingSlow: () => setShowDataTableLoader(true),
    onSuccess: () => setShowDataTableLoader(false),
  });

  const refreshData = () => {
    mutate(`${ServerIP}/preServ/getAll`);
  };

  useEffect(() => {
    if (!modalOpen) {
      reset({
        premiumServiceName: '',
        status: '',
        premiumServiceCost: ''
      });
      setFormDataa({
        premiumServiceName: '',
        status: '',
        premiumServiceCost: ''
      });
      setUpdateFormDataa({
        premiumServiceName: '',
        premiumServiceCost: '',
        premiumServiceNameOriginal: '',
        premiumServiceCostOriginal: ''
      });
    }
  }, [modalOpen, reset]);


  const handleDialogState = (title, button, premiumServiceId) => {
    setModalTitle(title);
    setButtonName(button);
    reset({
      premiumServiceName: '',
      status: '',
      premiumServiceCost: ''
    });
    setFormDataa({
      premiumServiceName: '',
      status: '',
      premiumServiceCost: ''
    });
    setUpdateFormDataa({
      premiumServiceName: '',
      premiumServiceCost: '',
      premiumServiceNameOriginal: '',
      premiumServiceCostOriginal: ''
    });

    if (button === 'Update') {
      getPremiumServicesDataById(premiumServiceId);
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
      const formatPrice = (price) => {
        if (Number.isInteger(price)) {
          return `₹ ${price}.00`;
        }

        const priceString = price.toString();
        if (priceString.split('.')[1]?.length === 1) {
          return `₹ ${price.toFixed(2)}`;
        }

        return `₹ ${price}`;
      };

      const transformedRows = data.premiumServices.map((premiumService) => ({
        ...premiumService,
        price: formatPrice(premiumService.price),
        status: <CustomButton variant="outlined" status={premiumService.status ? 'enable' : 'disable'}>{premiumService.status ? 'Enabled' : 'Disabled'}</CustomButton>,
        action: (
          <Stack justifyContent="end" spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update Premium Services', 'Update', premiumService.preServiceId)}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={premiumService.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={premiumService.status ? 'error' : 'success'} onClick={() => UpdatePremiumServicesStatus(premiumService.preServiceId, premiumService.status)}>{premiumService.status ? 'Disable' : 'Enable'}</Button>
          </Stack>
        ),
      }));

      setRows(transformedRows);
      setTimeout(() => {
        setShowDataTableLoader(false)
      }, 1800);
    }
  }, [data]);

  const handleSnackbarMessage = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const AddNewPremiumService = async (data) => {
    console.log('start')
    setShowModalLoader(true);

    console.log(data.premiumServiceName, data.premiumServiceCost, data.status);
    if (!data.premiumServiceName || !data.premiumServiceCost || !data.status) {
      setTimeout(() => {
        handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
        setShowModalLoader(false);
      }, 1000);
      return;
    }

    try {
      const jsonData = {
        'preSerName': data.premiumServiceName,
        'price': data.premiumServiceCost,
        'status': data.status
      }


      const response = await addPremiumServicesApi(jsonData);
      if (response.status === 200 && response?.data?.status === 'success') {
        setTimeout(() => {
          setShowModalLoader(false);
          handleSnackbarMessage('Premium Service Added Successfully', 'success');
          setModalOpen(false);
          refreshData();
          reset({
            premiumServiceName: '',
            premiumServiceCost: '',
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setShowModalLoader(false);
          handleSnackbarMessage('Error adding Premium Service', 'error');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowModalLoader(false);
        handleSnackbarMessage(`Error adding Premium Service, ${error}`, 'error');
      }, 1000);
    }
  };

  const getPremiumServicesDataById = async (id) => {
    setShowLoader(true);
    setPremiumServiceId(id);
    try {
      const response = await getPremiumServicesDataByIdApi(id);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setUpdateFormDataa({
            premiumServiceName: response?.data?.premiumService?.preSerName,
            premiumServiceCost: response?.data?.premiumService?.price,
            premiumServiceNameOriginal: response?.data?.premiumService?.preSerName,
            premiumServiceCostOriginal: response?.data?.premiumService?.price,
          });
          // reset();
        }
        // else {
        //   setTimeout(() => {
        //     setShowLoader(false);
        //     handleSnackbarMessage(response?.data?.message, 'error');
        //   }, 1000);
        // }
      }
    } catch (error) {
      console.error('Error fetching premiumService data by id:', error);
    } finally {
      setShowLoader(false);
    }
  };

  const UpdatePremiumServicesStatus = async (id, premiumServiceStatus) => {
    setShowLoader(true)
    try {
      const formData = new FormData();
      formData.append('status', premiumServiceStatus ? false : true);
      const response = await updatePremiumServicesApi(id, formData);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setTimeout(() => {
            handleSnackbarMessage(response?.data?.message, 'success');
            refreshData();
            setShowLoader(false)
          }, 1000);
        }
        else {
          setTimeout(() => {
            handleSnackbarMessage(response?.data?.message, 'error');
            refreshData();
            setShowLoader(false)
          }, 1000);
        }
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

  const UpdatePremiumServicesData = async (data) => {
    setShowModalLoader(true);
    try {
      const formData = new FormData();

      // Only append the updated name if it's different
      if (data.premiumServiceName !== updateFormDataa.premiumServiceNameOriginal) {
        formData.append('preSerName', data.premiumServiceName);
      }

      // Only append the updated price if it's different
      if (data.premiumServiceCost !== updateFormDataa.premiumServiceCostOriginal) {
        formData.append('price', data.premiumServiceCost);
      }

      // If the formData has any changes, make the API call
      if (formData.has('preSerName') || formData.has('price')) {
        const response = await updatePremiumServicesApi(premiumServiceId, formData);
        if (response?.status === 200) {
          setTimeout(() => {
            setShowModalLoader(false);
            refreshData();
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
      setTimeout(() => {
        setShowModalLoader(false);
        handleSnackbarMessage('Error during update', 'error');
      }, 1000);
    } finally {
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  };

  if (error) return (
    <ErrorPage
      errorMessage={`${error}`}
      onReload={() => { window.location.reload() }}
      statusCode={`${error.status}`}
    />
  );

  // if (error) return <Typography variant="subtitle1"><NoDataFound/></Typography>;
  if (!data) return <Typography variant="subtitle1"><HashLoader /></Typography>;

  return (
    <Box>
      {showLoader && <HashLoader />}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h5">All PremiumServices</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add New PremiumServices', 'Create')}>
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Data Table */}
      {showDataTableLoader ? <PlaceholderTable /> : rows.length > 0 && <DynamicDataTable columns={columns} rows={rows} />}

      {/* Modals for all Add and Update */}
      <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewPremiumService : UpdatePremiumServicesData} reset={reset} updateFormDataa={updateFormDataa} showModalLoader={showModalLoader} />

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default PremiumServices;

