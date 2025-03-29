import React, { useState, useEffect, useCallback } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Edit } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DynamicDataTable from 'components/DynamicDataTable';
import { styled } from '@mui/material/styles';
import DialogModal from 'components/DialogModal';
import useSWR, { mutate } from "swr";
import axios from 'axios';
// import HashLoader from 'components/HashLoader';
import { addAmenitiesApi, getAmenitiesDataByIdApi, updateAmenitiesApi, updateAmenitiesStatus } from 'api/api';
import { useForm } from 'react-hook-form';
import ErrorPage from 'components/ErrorPage';
import PlaceholderTable from 'components/Skeleton/PlaceholderTable';
import HashLoader from 'components/Skeleton/HashLoader';
import NoDataFound from 'pages/NoDataFound';

const ServerIP = 'https://www.auth.edu2all.in/hms';
// const ServerIP = 'http://192.168.20.109:5001'
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
  { id: 'image', label: 'Icon', minWidth: 100, align: 'center' },
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
  const [amenitiesId, setAmenitiesId] = useState();
  const { reset } = useForm();
  const [showLoader, setShowLoader] = useState(false);
  const [showStatusLoader, setShowStatusLoader] = useState(false);
  const [statusLoaderId, setStatusLoaderId] = useState(false);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);
  const [showModalLoader, setShowModalLoader] = useState(false);

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

  // Input handling functions
  const handleFormDataaAmenitiesName = (val) => setFormDataa({ ...formDataa, amenitiesName: val });
  const handleFormDataaAmenitiesStatus = (val) => setFormDataa({ ...formDataa, amenitiesStatus: val });
  const handleFormDataaAmenitiesIcon = (val) => setFormDataa({ ...formDataa, amenitiesIcon: val });
  const handleUpdateFormDataaAmenitiesName = (val) => setUpdateFormDataa({ ...updateFormDataa, amenitiesName: val });
  const handleUpdateFormDataaAmenitiesIcon = (val) => setUpdateFormDataa({ ...updateFormDataa, amenitiesIcon: val });

  const AddInputFields = [
    { id: 'amenitiesName', field: 'textInput', fieldType: 'text', validation: { required: true, pattern: /^[A-Z]/, patternMsg: 'This field can only contain characters' }, fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', updateValFunc: handleFormDataaAmenitiesName },
    { id: 'amenitiesStatus', field: 'select', fieldName: 'Status *', validation: { required: true }, fieldOptions: [{ optionId: 'active', optionName: 'Active', optionValue: 'true' }, { optionId: 'inActive', optionName: 'Inactive', optionValue: 'false' },], value: formDataa.amenitiesStatus, updateValFunc: handleFormDataaAmenitiesStatus, },
    { id: 'amenitiesIcon', field: 'fileType', fieldType: 'file', validation: { required: true }, fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], updateValFunc: handleFormDataaAmenitiesIcon }
  ];

  const UpdateInputFields = [
    { id: 'amenitiesName', field: 'textInput', fieldType: 'text', fieldName: 'Amenities Title *', placeholder: 'Enter Amenities Name', value: updateFormDataa.amenitiesName, updateValFunc: handleUpdateFormDataaAmenitiesName },
    { id: 'amenitiesIcon', field: 'fileType', fieldType: 'file', fieldName: 'Icon *', allowedTypes: ['image/jpeg', 'image/png'], value: updateFormDataa.amenitiesIcon, updateValFunc: handleUpdateFormDataaAmenitiesIcon }
  ];

  // Get API
  const { data, error, mutate, isValidating } = useSWR(`${ServerIP}/amenites/getAll`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    onLoadingSlow: () => setShowDataTableLoader(true),
    onSuccess: () => setShowDataTableLoader(false),
  });

  console.log(isValidating, 'isValidating')


  const refreshData = useCallback(() => {
    mutate(); // This will trigger a revalidation
  }, [mutate]);

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
      setShowDataTableLoader(true)
      const transformedRows = data.Amenities.map((amenity) => ({
        ...amenity,
        image: amenity.icon === null ? '-' : <img src={amenity?.icon} alt="" height={28} />,
        // image: amenity.icon === null ? '-' : amenity.icon.split('/').pop(),
        status: <CustomButton variant="outlined" status={`${amenity.status ? 'enable' : 'disable'}`}> {amenity.status ? 'Enabled' : 'Disabled'} </CustomButton>,
        action: (
          <Stack justifyContent='end' spacing={2} direction="row">
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New Amenities', 'Update', amenity.amenitiesId)}>Edit</Button>
            <Button
              size="small"
              color={amenity.status ? 'error' : 'success'}
              onClick={() => UpdateAmenitiesStatus(amenity?.amenitiesId, amenity.status)}
              loading
              loadingPosition="start"
              startIcon={amenity.status ? <EyeInvisibleFilled /> : <EyeFilled />}
              variant="outlined"
            >
              {showStatusLoader
                ? 'Processing...'
                : `${amenity.status ? 'Disable' : 'Enable'}`}
            </Button>
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

  const AddNewAmenity = async (formData) => {
    setShowModalLoader(true);

    console.log(formData.amenitiesName, formData.amenitiesStatus, formData.amenitiesIcon);
    if (!formData.amenitiesName || !formData.amenitiesStatus || !formData.amenitiesIcon) {
      setTimeout(() => {
        handleSnackbarMessage('Please fill in all fields before submitting.', 'error');
        setShowModalLoader(false);
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
          setShowModalLoader(false);
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
          setShowModalLoader(false);
          handleSnackbarMessage('Error adding amenity', 'error');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowModalLoader(false);
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
    setShowStatusLoader(true)
    setStatusLoaderId(id);
    try {
      const formData = new FormData();
      formData.append('status', amenityStatus ? false : true);
      const response = await updateAmenitiesStatus(id, formData);
      if (response?.status === 200) {
        setTimeout(() => {
          handleSnackbarMessage(response?.data?.message, 'success');
          refreshData();
          setShowStatusLoader(false)
        }, 1000);
      } else {
        setTimeout(() => {
          setShowStatusLoader(false)
          handleSnackbarMessage(response?.data?.message, 'error');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowStatusLoader(false)
        handleSnackbarMessage('Error during update', 'error');
      }, 1000);
    } finally {
      setTimeout(() => {
        setShowStatusLoader(false)
        setStatusLoaderId(null);
      }, 1000);
    }
  };

  const UpdateAmenitiesData = async (data) => {
    setShowLoader(true);

    try {
      const formData = new FormData();

      // Only append the updated name if it's different
      if (data.amenitiesName !== updateFormDataa.amenitiesNameOriginal) {
        formData.append('amenitiesName', data.amenitiesName);
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
            // setModalOpen(false);
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

  if (error) return (
    <ErrorPage
      errorMessage={`${error.message}`}
      onReload={() => window.location.reload()}
      statusCode={error.response?.status || 500}
    />
  );

  if (isValidating) return (
    <ErrorPage
      errorMessage={`The request is taking longer than expected. Please wait or try again.`}
      onReload={() => { window.location.reload(), console.log(error, 'dhbj') }}
      statusCode={`Pending`}
    />
  );

  return (

    <Box>
      {showStatusLoader && <HashLoader />}
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
      {showDataTableLoader ? <PlaceholderTable /> : <DynamicDataTable columns={columns} rows={rows} />}

      {/* {showDataTableLoader ? (
        <PlaceholderTable />
      ) : rows.length === 0 ? (
        <Typography variant="h6" textAlign="center" my={4}>
          <NoDataFound />
        </Typography>
      ) : (
        <DynamicDataTable columns={columns} rows={rows} />
      )} */}


      {/* Modals for all Add and Update */}
      <DialogModal handleClosingDialogState={handleClosingDialogState} modalOpen={modalOpen} title={modalTitle} buttonName={buttonName} InputFields={buttonName === 'Create' ? AddInputFields : UpdateInputFields} onSubmit={buttonName === 'Create' ? AddNewAmenity : UpdateAmenitiesData} reset={reset} updateFormDataa={updateFormDataa} showModalLoader={showModalLoader} />

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
