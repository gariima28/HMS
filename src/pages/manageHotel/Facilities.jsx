
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
import { addAmenitiesApi, addFacilitiesApi, getAmenitiesDataByIdApi, getFacilitiesDataByIdApi, updateAmenitiesApi, updateAmenitiesStatus, updateFacilitiesApi } from 'api/api';
import { useForm } from 'react-hook-form';
import ErrorPage from 'components/ErrorPage';
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
  { id: 'facilityName', label: 'Title', minWidth: 170 },
  { id: 'image', label: 'Icon', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

// API Call when data updates
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const Facilities = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [modalTitle, setModalTitle] = useState('Add New Facilities');
  const [buttonName, setButtonName] = useState('Save Changes');
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [facilityId, setFacilityId] = useState();
  const { reset } = useForm();
  const [showLoader, setShowLoader] = useState(false);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);
  const [showModalLoader, setShowModalLoader] = useState(false);

  const [formDataa, setFormDataa] = useState({
    facilityName: '',
    facilityStatus: '',
    facilityImage: ''
  });

  const [updateFormDataa, setUpdateFormDataa] = useState({
    facilityName: '',
    facilityImage: '',
    facilityNameOriginal: '',
    facilityImageOriginal: ''
  });

  console.log(updateFormDataa, 'updateFormDataa')

  // Input handling functions
  const handleFormDataaFacilitiesName = (val) => setFormDataa({ ...formDataa, facilityName: val });
  const handleFormDataaFacilitiesStatus = (val) => setFormDataa({ ...formDataa, facilityStatus: val });
  const handleFormDataaFacilitiesIcon = (val) => setFormDataa({ ...formDataa, facilityImage: val });
  const handleUpdateFormDataaFacilitiesName = (val) => setUpdateFormDataa({ ...updateFormDataa, facilityName: val });
  const handleUpdateFormDataaFacilitiesIcon = (val) => setUpdateFormDataa({ ...updateFormDataa, facilityImage: val });

  const AddInputFields = [
    { id: 'facilityName', field: 'textInput', fieldType: 'text', validation: { required: true, pattern: /^[A-Z]/, patternMsg: 'This field can only contain characters' }, fieldName: 'Facilities Title *', placeholder: 'Enter Facilities Name', updateValFunc: handleFormDataaFacilitiesName },
    { id: 'facilityStatus', field: 'select', fieldName: 'Status *', validation: { required: true }, fieldOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' },], value: formDataa.facilityStatus, updateValFunc: handleFormDataaFacilitiesStatus, },
    { id: 'facilityImage', field: 'fileType', fieldType: 'file', validation: { required: true }, fieldName: 'Facilities Image *', allowedTypes: ['image/jpeg', 'image/png'], updateValFunc: handleFormDataaFacilitiesIcon }
  ];

  const UpdateInputFields = [
    { id: 'facilityName', field: 'textInput', fieldType: 'text', fieldName: 'Facilities Title *', placeholder: 'Enter Facilities Name', value: updateFormDataa.facilityName, updateValFunc: handleUpdateFormDataaFacilitiesName },
    { id: 'facilityImage', field: 'fileType', fieldType: 'file', fieldName: 'Facilities Image *', allowedTypes: ['image/jpeg', 'image/png'], value: updateFormDataa.facilityImage, updateValFunc: handleUpdateFormDataaFacilitiesIcon }
  ];

  // Get API
  const { data, error } = useSWR(`${ServerIP}/facilities/getAll`, fetcher, {
    onLoadingSlow: () => setShowDataTableLoader(true),
    onSuccess: () => setShowDataTableLoader(false),
  });

  const refreshData = () => {
    mutate(`${ServerIP}/facilities/getAll`);
  };

  const handleDialogState = (title, button, facilityId) => {
    setModalTitle(title);
    setButtonName(button);
    if (button === 'Update') {
      getFacilitiesDataById(facilityId);
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
      const transformedRows = data.Facilities.map((facility) => ({
        ...facility,
        image: facility.facilityImage === null ? '-' : <img src={facility?.facilityImage} alt="" height={28} />,
        status: <CustomButton variant="outlined" status={facility.status ? 'enable' : 'disable'}>{facility.status ? 'Enabled' : 'Disabled'}</CustomButton>,
        action: (
          <Stack justifyContent="end" spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Facilities', 'Update', facility.facilityId)}>Edit</Button>
            <Button variant="outlined" size="small" startIcon={facility.status ? <EyeInvisibleFilled /> : <EyeFilled />} color={facility.status ? 'error' : 'success'} onClick={() => UpdateFacilitiesStatus(facility.facilityId, facility.status)}>{facility.status ? 'Disable' : 'Enable'}</Button>
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

  const AddNewFacility = async (formData) => {
    setShowModalLoader(true);

    console.log(formData.facilityName, formData.facilityStatus, formData.facilityImage);
    if (!formData.facilityName || !formData.facilityStatus || !formData.facilityImage) {
      setTimeout(() => {
        handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
        setShowModalLoader(false);
      }, 1000);
      return;
    }

    try {
      const formDataPayload = new FormData();
      formDataPayload.append('facilityName', formData.facilityName);
      formDataPayload.append('status', formData.facilityStatus);
      formDataPayload.append('icon', formData.facilityImage[0]);

      const response = await addFacilitiesApi(formDataPayload);
      if (response.status === 200 && response?.data?.status === 'success') {
        setTimeout(() => {
          setShowModalLoader(false);
          handleSnackbarMessage('Facility Added Successfully', 'success');
          setModalOpen(false);
          refreshData();

          reset({
            facilityName: '',
            facilityStatus: '',
            facilityImage: null,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setShowModalLoader(false);
          handleSnackbarMessage('Error adding facility', 'error');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowModalLoader(false);
        handleSnackbarMessage(`Error adding facility, ${error}`, 'error');
      }, 1000);
    }
  };


  const getFacilitiesDataById = async (id) => {
    setShowLoader(true);
    setFacilityId(id);

    try {
      const response = await getFacilitiesDataByIdApi(id);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          console.log(response)
          setUpdateFormDataa({
            facilityName: response?.data?.Facility?.facilityName,
            facilityImage: response?.data?.Facility?.facilityImage,
            facilityNameOriginal: response?.data?.Facility?.facilityName,
            facilityImageOriginal: response?.data?.Facility?.facilityImage,
          });
          // reset();
        }
      }
    } catch (error) {
      console.error('Error fetching facility data by id:', error);
    } finally {
      setShowLoader(false);
    }
  };


  const UpdateFacilitiesStatus = async (id, facilityStatus) => {
    setShowLoader(true)
    try {
      const formData = new FormData();
      formData.append('status', facilityStatus ? false : true);
      const response = await updateFacilitiesApi(id, formData);
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
    setShowModalLoader(true);

    try {
      const formData = new FormData();

      // Only append the updated name if it's different
      if (data.facilityName !== updateFormDataa.facilityNameOriginal) {
        formData.append('facilityName', data.facilityName);
      }

      // Only append the updated icon if it's different
      if (data.facilityImage !== updateFormDataa.facilityImageOriginal) {
        // Ensure the icon is the selected file (check if it's an actual file object)
        if (data.facilityImage && data.facilityImage[0]) {
          formData.append('icon', data.facilityImage[0]);
        }
      }

      // If the formData has any changes, make the API call
      if (formData.has('facilityName') || formData.has('icon')) {
        const response = await updateFacilitiesApi(facilityId, formData);
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


  if (error) return (
    <ErrorPage
      errorMessage={`${error}`}
      onReload={() => { window.location.reload()}}
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
          <Typography variant="h5">All Facilities</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add New Facilities', 'Create')}>
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* Data Table */}
      {showDataTableLoader ? <PlaceholderTable /> : rows.length > 0 && <DynamicDataTable columns={columns} rows={rows} />}

      {/* Modals for all Add and Update */}
      <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewFacility : UpdateAmenitiesData} reset={reset} updateFormDataa={updateFormDataa} showModalLoader={showModalLoader} />

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Facilities;

