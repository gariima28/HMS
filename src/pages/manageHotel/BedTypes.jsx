import React, { useState, useEffect } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DynamicDataTable from 'components/DynamicDataTable';
import { styled } from '@mui/material/styles';
import DialogModal from 'components/DialogModal';
import useSWR, { mutate } from "swr";
import axios from 'axios';
import HashLoader from 'components/Skeleton/HashLoader';
import NoDataFound from '../NoDataFound';
import { addBedTypesApi, deleteBedTypesApi, getBedTypesDataByIdApi, updateBedTypesApi } from 'api/api';
import { useForm } from 'react-hook-form';
import ErrorPage from 'components/ErrorPage';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlaceholderTable from 'components/Skeleton/PlaceholderTable';

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
  { id: 'SNo', label: 'S.No', minWidth: 170 },
  { id: 'bedName', label: 'Title', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

// API Call when data updates
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const BedTypes = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [modalTitle, setModalTitle] = useState('Add New BedTypes');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [bedTypeId, setBedTypeId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [confirmationAlertOpen, setConfirmationAlertOpen] = useState(false);
  const { reset } = useForm();
  const [showLoader, setShowLoader] = useState(false);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);
  const [showModalLoader, setShowModalLoader] = useState(false);

  const [formDataa, setFormDataa] = useState({
    bedTypeName: '',
    status: '',
    bedTypeImage: ''
  });

  const [updateFormDataa, setUpdateFormDataa] = useState({
    bedTypeName: '',
    // status: '',
    bedTypeImage: '',
    bedTypeNameOriginal: '',
    // statusOriginal: '',
    bedTypeImageOriginal: ''
  });

  // Input handling functions
  const handleFormDataaBedTypesName = (val) => setFormDataa({ ...formDataa, bedTypeName: val });
  const handleFormDataaBedTypesStatus = (val) => setFormDataa({ ...formDataa, status: val });
  const handleFormDataaBedTypesIcon = (val) => setFormDataa({ ...formDataa, bedTypeImage: val });
  const handleUpdateFormDataaBedTypesName = (val) => setUpdateFormDataa({ ...updateFormDataa, bedTypeName: val });
  // const handleUpdateFormDataaBedTypesStatus = (val) => setUpdateFormDataa({ ...formDataa, status: val });
  const handleUpdateFormDataaBedTypesIcon = (val) => setUpdateFormDataa({ ...updateFormDataa, bedTypeImage: val });

  const AddInputFields = [
    { id: 'bedTypeName', field: 'textInput', fieldType: 'text', validation: { required: true, pattern: /^[A-Z]/, patternMsg: 'This field can only contain characters' }, fieldName: 'BedTypes Title *', placeholder: 'Enter BedTypes Name', updateValFunc: handleFormDataaBedTypesName },
    { id: 'status', field: 'select', fieldName: 'Status *', validation: { required: true }, fieldOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' },], value: formDataa.status, updateValFunc: handleFormDataaBedTypesStatus, },
    { id: 'bedTypeImage', field: 'fileType', fieldType: 'file', validation: { required: true }, fieldName: 'BedTypes Image *', allowedTypes: ['image/jpeg', 'image/png'], updateValFunc: handleFormDataaBedTypesIcon }
  ];

  const UpdateInputFields = [
    { id: 'bedTypeName', field: 'textInput', fieldType: 'text', fieldName: 'BedTypes Title *', placeholder: 'Enter BedTypes Name', value: updateFormDataa.bedTypeName, updateValFunc: handleUpdateFormDataaBedTypesName },
    { id: 'bedTypeImage', field: 'fileType', fieldType: 'file', fieldName: 'BedTypes Image *', allowedTypes: ['image/jpeg', 'image/png'], value: updateFormDataa.bedTypeImage, updateValFunc: handleUpdateFormDataaBedTypesIcon }
  ];

  // Get API
  const { data, error } = useSWR(`${ServerIP}/bedTypes/getAll`, fetcher, {
    onLoadingSlow: () => setShowDataTableLoader(true),
    onSuccess: () => setShowDataTableLoader(false),
  });

  const refreshData = () => {
    mutate(`${ServerIP}/bedTypes/getAll`);
  };

  const handleDialogState = (title, button, bedTypeId) => {
    console.log(bedTypeId)
    setModalTitle(title);
    setButtonName(button);
    if (button === 'Update') {
      getBedTypeDataById(bedTypeId);
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
      const transformedRows = data.bedTypes.map((bedType, index) => ({
        ...bedType,
        SNo: index + 1,
        status:
          // <CustomButton variant="outlined" status={bedType.status ? 'enable' : 'disable'}>{bedType.status ? 'Enabled' : 'Disabled'}</CustomButton>,
          <CustomButton variant="outlined" size="small" status={bedType.status ? 'enable' : 'disable'} onClick={() => UpdateBedTypesStatus(bedType.bedTypeId, bedType.status)}>{bedType.status ? 'Active' : 'Inactive'}</CustomButton>,
        // <CustomButton variant="outlined" size="small" status={bedType.status ? 'enable' : 'disable'} startIcon={bedType.status ? <EyeFilled /> : <EyeInvisibleFilled />} onClick={() => UpdateBedTypesStatus(bedType.bedTypeId, bedType.status)}>{bedType.status ? 'Enable' : 'Disable'}</CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New BedTypes', 'Update', bedType.bedTypeId)}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={<DeleteOutline />} color="error" onClick={() => handleDeleteId(bedType?.bedTypeId)}>Delete</Button>
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

  const AddNewBedType = async (formData) => {
    setShowModalLoader(true);

    console.log(formData.bedTypeName, formData.status, formData.bedTypeImage);
    if (!formData.bedTypeName || !formData.status || !formData.bedTypeImage) {
      setTimeout(() => {
        handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
        setShowModalLoader(false);
      }, 1000);
      return;
    }

    try {
      const formDataPayload = new FormData();
      formDataPayload.append('bedName', formData.bedTypeName);
      formDataPayload.append('status', formData.status);
      formDataPayload.append('bedImage', formData.bedTypeImage[0]);

      const response = await addBedTypesApi(formDataPayload);
      if (response.status === 200 && response?.data?.status === 'success') {
        setTimeout(() => {
          setShowModalLoader(false);
          handleSnackbarMessage('Bed Type Added Successfully', 'success');
          setModalOpen(false);
          refreshData();

          reset({
            bedTypeName: '',
            status: '',
            bedTypeImage: null,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setShowModalLoader(false);
          handleSnackbarMessage('Error adding bed type', 'error');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowModalLoader(false);
        handleSnackbarMessage(`Error adding bed type, ${error}`, 'error');
      }, 1000);
    }
  };


  const getBedTypeDataById = async (id) => {
    setShowLoader(true);
    setBedTypeId(id);

    try {
      const response = await getBedTypesDataByIdApi(id);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          console.log(response)
          setUpdateFormDataa({
            bedTypeName: response?.data?.bedType?.bedName,
            // status: response?.data?.bedType?.status,
            bedTypeImage: response?.data?.bedType?.bedImage,
            bedTypeNameOriginal: response?.data?.bedType?.bedName,
            // statusOriginal: response?.data?.bedType?.status,
            bedTypeImageOriginal: response?.data?.bedType?.bedImage,
          });
          // reset();
        }
      }
    } catch (error) {
      console.error('Error fetching bed type data by id:', error);
    } finally {
      setShowLoader(false);
    }
  };


  const UpdateBedTypesStatus = async (id, bedTypeStatus) => {
    setShowLoader(true)
    try {
      const formData = new FormData();
      formData.append('status', bedTypeStatus ? false : true);
      const response = await updateBedTypesApi(id, formData);
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

  const UpdateBedTypesData = async (data) => {
    setShowModalLoader(true);
    console.log(data)
    try {
      const formData = new FormData();

      // Only append the updated name if it's different
      if (data.bedTypeName !== updateFormDataa.bedTypeNameOriginal) {
        formData.append('bedName', data.bedTypeName);
      }

      // Only append the updated icon if it's different
      if (data.bedTypeImage !== updateFormDataa.bedTypeImageOriginal) {
        // Ensure the icon is the selected file (check if it's an actual file object)
        if (data.bedTypeImage && data.bedTypeImage[0]) {
          formData.append('bedImage', data.bedTypeImage[0]);
        }
      }

      // If the formData has any changes, make the API call
      if (formData.has('bedName') || formData.has('bedImage')) {
        const response = await updateBedTypesApi(bedTypeId, formData);
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
        setShowModalLoader(false);
      }, 1000);
    }
  };

  const handleDeleteId = (id) => {
    console.log(id, 'jhuygfvhb')
    setDeleteId(id)
    setConfirmationAlertOpen(true);
  }

  const handleClose = () => {
    setDeleteId(null);
    setConfirmationAlertOpen(false)
  };

  const handleDeleteBedType = async () => {
    setShowLoader(true)
    console.log(deleteId)
    try {
      const response = await deleteBedTypesApi(deleteId);
      console.log(response, 'beddd dltt')
      if (response?.status === 200 && response?.data?.status === 'success') {
        setTimeout(() => {
          setShowLoader(false)
          handleSnackbarMessage('Bed Type Deleted Successfully', 'success');
          setConfirmationAlertOpen(false);
          refreshData();
        }, 1000);
      }
      else {
        setTimeout(() => {
          setShowLoader(false)
          handleSnackbarMessage(response?.data?.message || 'Error during deletion', 'error');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowLoader(false)
        handleSnackbarMessage(`Error occur during deletion: ${error.response.data.error} `, 'error');
      }, 1000);
      console.log('Error during deletion of bedType data:', error);
    } finally {
      setTimeout(() => {
        setShowLoader(false)
      }, 1000);
    }
  }

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
          <Typography variant="h5">All BedTypes</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add New BedTypes', 'Create')}>
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* Data Table */}

      {/* {showDataTableLoader ? <PlaceholderTable /> : rows.length > 0 && <DynamicDataTable columns={columns} rows={rows} />} */}

      {showDataTableLoader ? (
        <PlaceholderTable />
      ) : rows.length > 0 ? (
        <DynamicDataTable columns={columns} rows={rows} />
      ) : (
        <NoDataFound />
      )}


      {/* Modals for all Add and Update */}
      <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewBedType : UpdateBedTypesData} reset={reset} updateFormDataa={updateFormDataa} showModalLoader={showModalLoader} />

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>


      {/* Confirm Delete Dialog */}
      <Dialog open={confirmationAlertOpen} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth="xs" PaperProps={{ sx: { position: "absolute", top: 20, margin: 0, width: '100%' }, }} >
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }} id="customized-dialog-title" >
          {/* <Typography variant='h5'> */}
          Confirmation Alert!
          {/* </Typography> */}
        </DialogTitle>

        <IconButton aria-label="close" onClick={handleClose} sx={(theme) => ({ position: "absolute", right: 8, top: 8, color: theme.palette.grey[500], })} >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers sx={{ p: 2 }}>
          <Typography variant='h6'>Are you sure, you want to delete this bed type?</Typography>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#000" }, }} >
            No
          </Button>
          <Button variant="contained" onClick={handleDeleteBedType} sx={{ backgroundColor: "#5a32ea", color: "#fff", "&:hover": { backgroundColor: "#482bc8" }, }} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default BedTypes;
