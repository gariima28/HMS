import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Stack, FormHelperText, InputLabel, OutlinedInput, Divider, Typography, Select, MenuItem, InputAdornment, Dialog, DialogContent, DialogActions} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate, useParams } from 'react-router';
import { createHotelApi, getHotelByIdApi, updateHotelApi } from 'api/api';
import { useForm } from 'react-hook-form';
import { Snackbar, Alert } from '@mui/material';
import HashLoader from 'components/Skeleton/HashLoader';
import { useState } from 'react';
const CreateHotel = () => {
  const [imageType, setImageType] = useState(true);
  const [hotelImageUrl, setHotelImageUrl] = useState("");


  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const {id}= useParams();
  console.log(id)
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: '' });
  
  const { register, handleSubmit, formState: { errors }, setValue, trigger, watch, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange', 
  });
  
  const hotelStatus = watch('status')
  console.log(hotelStatus, 'hotelStatus 11')
  
  React.useEffect(() => {
    if(id !== 'add'){
    getHotelById();
    }
    if(id === 'add'){
      reset()
    }
  }, [id])
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setValue('status', value);
    trigger('status');
  };

  // Get Amenities data by id
  const getHotelById = async () => {
    try {
      setShowLoader(true)
      var response = await getHotelByIdApi(id);
      console.log(response, 'get by id')
      if (response?.status === 200) {
        setTimeout(() => {
          setValue('hotelName', response?.data?.hotelName);
          setValue('subTitle', response?.data?.subTitle);
          setValue('destination', response?.data?.destination);
          setValue('status', response?.data?.status);
          setValue('hotelClass', response?.data?.hotelClass);
          setValue('phoneNo', response?.data?.phoneNo);
          setValue('address', response?.data?.address);
          setValue('hotelEmail', response?.data?.hotelEmail);
          setValue('description', response?.data?.description);
          setValue('hotelId', response?.data?.stHotelId?.split('-')[0] || '');
          setValue('hotelImage', response?.data?.hotelImageUrl);
          setHotelImageUrl(response?.data?.hotelImageUrl);
          setShowLoader(false)
        }, 1000);
      }
      else {
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      console.log('catch')
    }
    finally {
      setTimeout(() => {
        setShowLoader(false)
      }, 1500);
      console.log('finally')
    }
  }

  
  const onSubmit = async (data) => {
    setShowLoader(true)
    console.log('start')
    try {
      console.log('try')
      const formData = new FormData();
      formData.append('hotelName', data.hotelName)
      formData.append('subTitle', data.subTitle)
      formData.append('destination', data.destination)
      formData.append('status', data.status === 'true')
      

      // formData.append('registerDate', data.registerDate)
      formData.append('hotelClass', data.hotelClass)
      formData.append('phoneNo', data.phoneNo)
      formData.append('address', data.address)
      formData.append('hotelEmail', data.hotelEmail)
      formData.append('description', data.description)
      formData.append('hotelId', data.hotelId)
      formData.append('hotelImage', data.hotelImage[0])
      { id === 'add' && 
        formData.append('adminName', data.adminName)
        formData.append('adminEmail', data.adminEmail)
        formData.append('adminAddress', data.adminAddress)
        formData.append('adminPhone', data.adminPhone)
      }

      const response = id === 'add' ? await createHotelApi(formData) : await updateHotelApi(id, formData) ;
      console.log(response, 'try1')
      if (response.status === 200) {
        if (response?.data?.status === 'success') {
          console.log(response?.data?.message, 'success');
          setSnackbar({ open: true, message: response?.data?.message, severity: 'success' });
          setTimeout(() => {
            navigate('/hotels');
          }, 2500);
        }
        else {
          setSnackbar({ open: true, message: response?.data?.message || 'Error occurred', severity: 'error' });
        }
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message || 'Error occurred', severity: 'error' });
      console.error(error);
    } finally {
      setTimeout(() => {
        setShowLoader(false)
      }, 1500);
      console.log('finally')
    }
  };

  const handleCancelButton = () => {
    if (id === 'add'){
      reset();
    }
    else{
      navigate('/hotels')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {showLoader && <HashLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid  xs={12} sm={6} md={6} lg={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="hotelName">Hotel Name <span style={{ color: 'red' }}> *</span></InputLabel>
              {/* <OutlinedInput id="hotelName" type="text" {...register("hotelName" , {required : 'This Field is required' , validate: { pattern: (value) => /^[A-Z][a-zA-Z\s]+$/.test(value) || `Hotel name must start with an uppercase letter ${<br/>} contain only letters or spaces`}, })} placeholder="Enter Hotel Name" fullWidth error={Boolean(errors.hotelName)} /> */}
              <OutlinedInput id="hotelName" type="text" { ...register("hotelName", { required: 'This Field is required', validate: { startsWithCapital: (value) =>  /^[A-Z]/.test(value) || 'Hotel name must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => /^[A-Z][a-zA-Z\s]+$/.test(value) ||  'Hotel name must contain only letters, and spaces', } }) } placeholder="Enter Hotel Name" fullWidth error={Boolean(errors.hotelName)}/>
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-hotelName">{errors.hotelName?.message}</FormHelperText>
          </Grid>
          <Grid  xs={12} sm={6} md={6} lg={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="subTitle">Sub Title <span style={{ color: 'red' }}> *</span></InputLabel>
              <OutlinedInput id="subTitle" type="text" {...register("subTitle" , { required: 'This Field is required', validate: { startsWithCapital: (value) =>  /^[A-Z]/.test(value) || 'Sub Title must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => /^[A-Z][a-zA-Z\s]+$/.test(value) ||  'Sub Title must contain only letters, and spaces', } })} placeholder="Enter Sub Title" fullWidth error={Boolean(errors.subTitle)} />
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-subTitle">{errors.subTitle?.message}</FormHelperText>
          </Grid>
          <Grid  xs={12} sm={6} md={6} lg={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="destination">Destination <span style={{ color: 'red' }}> *</span></InputLabel>
              <OutlinedInput id="destination" type="text" {...register("destination" , { required: 'This Field is required', validate: { startsWithCapital: (value) =>  /^[A-Z]/.test(value) || 'Destination must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => /^[A-Z][a-zA-Z\s]+$/.test(value) ||  'Destination must contain only letters, and spaces', } })} placeholder="Enter Destination" fullWidth error={Boolean(errors.destination)} />
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-destination">{errors.destination?.message}</FormHelperText>
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="status">Status <span style={{ color: 'red' }}> *</span></InputLabel>
              <Select {...register("status", { required: 'This Field is required',})}
                fullWidth displayEmpty error={Boolean(errors.status)}
                value={hotelStatus !== undefined ? String(hotelStatus) : ''} >
                <MenuItem value='' disabled>Select Status</MenuItem>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
              {/* <Select
                {...register("status", {
                  required: 'This Field is required',
                  valueAsNumber: false // Ensure we get boolean values
                })}
                value={watch("status") ?? ""}
                onChange={(e) => setValue("status", e.target.value === 'true')}
              >
                <MenuItem value='' disabled>Select Status</MenuItem>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select> */}
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-status"> {errors.status?.message} </FormHelperText>
          </Grid>
          <Grid  xs={12} sm={6} md={6} lg={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="hotelClass">Hotel Class <span style={{ color: 'red' }}> *</span></InputLabel>
              <OutlinedInput id="hotelClass" type="text" {...register("hotelClass" , { required: 'This Field is required', validate: { startsWithCapital: (value) =>  /^[A-Z]/.test(value) || 'Hotel Class must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => /^[A-Z][a-zA-Z\s]+$/.test(value) ||  'Hotel Class must contain only letters, and spaces', } })} placeholder="Enter Hotel Class" fullWidth error={Boolean(errors.hotelClass)}/>
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-hotelClass">{errors.hotelClass?.message}</FormHelperText>
          </Grid>
          <Grid  xs={12} sm={6} md={6} lg={4} >
            <Stack spacing={1}>
              <InputLabel htmlFor="phoneNo">Phone No <span style={{ color: 'red' }}> *</span></InputLabel>
              <OutlinedInput id="phoneNo" type="text" {...register("phoneNo", {
                required: 'This field is required',
                validate: {
                  onlyDigits: (value) => /^\d+$/.test(value) || 'Only numbers are allowed',
                  validLength: (value) => value.length === 10 || 'Must be exactly 10 digits',
                  validStart: (value) => /^[6-9]/.test(value) || 'Must start with 6-9'
                },
               // validate: { minLength: (value) => value.length <= 10 || 'Phone number must not be more than 10 digits', maxLength: (value) => value.length === 10 || 'Phone number must be exactly 10 digits', pattern: (value) => /^[6-9]\d{9}$/.test(value) || 'Phone number must be 10 digits starting with 6 - 9', }
              })} placeholder="Enter Phone No" fullWidth error={Boolean(errors.phoneNo)} />
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-phoneNo">{errors.phoneNo?.message}</FormHelperText>
          </Grid>
          <Grid  xs={12} sm={6} md={6} lg={4} >
            <Stack spacing={1}>
              <InputLabel htmlFor="address">Address <span style={{ color: 'red' }}> *</span></InputLabel>
              <OutlinedInput id="address" type="text" {...register("address" , { required: 'This Field is required', validate: { startsWithCapital: (value) =>  /^[A-Z]/.test(value) || 'Hotel Address must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => /^[a-zA-Z0-9\s,.'-]+$/.test(value) ||  'Hotel Address must contain only letters, and spaces', } })} placeholder="Enter Address" fullWidth error={Boolean(errors.address)} />
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-address">{errors.address?.message}</FormHelperText>
          </Grid>
          <Grid  xs={12} sm={6} md={6} lg={4} >
            <Stack spacing={1}>
              <InputLabel htmlFor="hotelEmail">Hotel Email <span style={{ color: 'red' }}> *</span></InputLabel>
              <OutlinedInput id="hotelEmail" type="text" {...register("hotelEmail" , { required: 'This Field is required',  validate: { pattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Not a valid email format' } })} placeholder="Enter Hotel Email" fullWidth error={Boolean(errors.hotelEmail)} />
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-hotelEmail">{errors.hotelEmail?.message}</FormHelperText>
          </Grid>
          <Grid  xs={12} sm={6} md={6} lg={4} >
            <Stack spacing={1}>
              <InputLabel htmlFor="description">Description <span style={{ color: 'red' }}> *</span></InputLabel>
              <OutlinedInput id="description" type="text" {...register("description" , { required: 'This Field is required', validate: { startsWithCapital: (value) =>  /^[A-Z]/.test(value) || 'Hotel Image must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => /^[A-Z][a-zA-Z\s]+$/.test(value) ||  'Hotel name must contain only letters, and spaces', } })} placeholder="Enter Description" fullWidth error={Boolean(errors.description)} />
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-description">{errors.description?.message}</FormHelperText>
          </Grid>
          <Grid  xs={12} sm={6} md={6} lg={4} >
            <Stack spacing={1}>
              <InputLabel htmlFor="hotelId">Hotel Id (Prefix) <span style={{ color: 'red' }}> *</span></InputLabel>
              <OutlinedInput id="hotelId" type="text" {...register("hotelId", { required: 'This Field is required', minLength: { value: 3, message: 'Minimum Length is 3' }, pattern: { value: /^[A-Z]{3,6}$/, message: 'Must be between 3 to 6 uppercase letters', } })} placeholder="Enter Hotel Id" fullWidth error={Boolean(errors.hotelId)} />
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-hotelId">{errors.hotelId?.message}</FormHelperText>
          </Grid>

          {/* <OutlinedInput id="hotelImage" type="file" {...register("hotelImage", { required: 'This Field is required', validate: { fileType: (file) => { if (!file[0]) return 'No file selected'; if (file.size < 10240 || file.size > 204800) return '* File size must be between 10 KB to 200 KB'; const allowedTypes = ['image/jpeg', 'image/png']; return allowedTypes.includes(file[0].type) || 'Only .jpg and .png files are allowed'; }, }, })} placeholder="Enter Hotel Image URL" fullWidth error={Boolean(errors.hotelImage)} /> */}

        


          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="hotelImage">Hotel Image <span style={{ color: 'red' }}> *</span></InputLabel>
              {id === 'add' ? (
                <OutlinedInput
                  id="hotelImage"
                  type="file"
                  {...register("hotelImage", {
                    required: "This Field is required",
                    validate: {
                      fileType: (file) => {
                        if (!file || !file[0]) return "No file selected";
                        if (file[0].size < 10240 || file[0].size > 204800)
                          return "* File size must be between 10 KB to 200 KB";
                        const allowedTypes = ["image/jpeg", "image/png"];
                        return allowedTypes.includes(file[0].type) || "Only .jpg and .png files are allowed";
                      },
                    },
                  })}
                  fullWidth
                  error={Boolean(errors.hotelImage)}
                  sx={{
                    height: '44px',
                    '& input': {
                      padding: '8.5px 14px',
                    }
                  }}
                />
              ) : (
                <Box sx={{ position: 'relative', height: '44px' }}>
                  {imageType && hotelImageUrl ? (
                    <Box sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: '4px',
                      padding: '8.5px 14px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={hotelImageUrl}
                        alt="Hotel Preview"
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                          onClick={() => {
                            setSelectedImage(hotelImageUrl);
                            setOpenImageDialog(true);
                          }}
                      />
                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageType(false);
                        }}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          height: '30px',
                          minWidth: '80px'
                        }}
                      >
                        Edit
                      </Button>
                    </Box>
                  ) : (
                    <OutlinedInput
                      id="hotelImage"
                      type="file"
                      inputProps={{ accept: "image/jpeg, image/png" }}
                      fullWidth
                      {...register("hotelImage", {
                        required: "This Field is required",
                        validate: {
                          fileType: (file) => {
                            if (!file || !file[0]) return "No file selected";
                            if (file[0].size < 10240 || file[0].size > 204800)
                              return "* File size must be between 10 KB to 200 KB";
                            const allowedTypes = ["image/jpeg", "image/png"];
                            return allowedTypes.includes(file[0].type) || "Only .jpg and .png files are allowed";
                          },
                        },
                      })}
                      error={Boolean(errors.hotelImage)}
                      sx={{
                        height: '44px',
                        '& .MuiOutlinedInput-input': {
                          paddingRight: '90px', // Make space for the button
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          paddingRight: '80px', // Adjust border around button
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            variant="outlined"
                            onClick={() => setImageType(true)}
                            disabled={!hotelImageUrl}
                            sx={{
                              height: '30px',
                              minWidth: '80px',
                              marginRight: '-8px' // Adjust positioning
                            }}
                          >
                            View
                          </Button>
                        </InputAdornment>
                      }
                    />
                  )}
                </Box>
              )}
            </Stack>
            <FormHelperText error id="standard-weight-helper-text-hotelImage">
              {errors.hotelImage?.message}
            </FormHelperText>
          </Grid>


        </Grid>
       {id ==='add' &&(
        <>
            <Grid sx={{ mt: 4, mb: 4 }} >
              <Typography variant="h5">Admin Details </Typography>
            </Grid>
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} md={6} lg={4} >
                <Stack spacing={1}>
                  <InputLabel htmlFor="adminName">Admin Name <span style={{ color: 'red' }}> *</span></InputLabel>
                  <OutlinedInput id="adminName" type="text" {...register("adminName", { required: 'This Field is required', validate: { startsWithCapital: (value) => /^[A-Z]/.test(value) || 'Admin name must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => /^[A-Z][a-zA-Z\s]+$/.test(value) || 'Admin name must contain only letters, and spaces', } })} placeholder="Enter Admin Name" fullWidth error={Boolean(errors.adminName)} />
                </Stack>
                <FormHelperText error id="standard-weight-helper-text-adminName">{errors.adminName?.message}</FormHelperText>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4} >
                <Stack spacing={1}>
                  <InputLabel htmlFor="adminEmail">Admin Email <span style={{ color: 'red' }}> *</span></InputLabel>
                  <OutlinedInput id="adminEmail" type="text" {...register("adminEmail", { required: 'This Field is required', validate: { pattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Not a valid email format' } })} placeholder="Enter Admin Email" fullWidth error={Boolean(errors.adminEmail)} />
                </Stack>
                <FormHelperText error id="standard-weight-helper-text-adminEmail">{errors.adminEmail?.message}</FormHelperText>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4} >
                <Stack spacing={1}>
                  <InputLabel htmlFor="adminAddress">Admin Address <span style={{ color: 'red' }}> *</span></InputLabel>
                  <OutlinedInput id="adminAddress" type="text" {...register("adminAddress", { required: 'This Field is required', validate: { startsWithCapital: (value) => /^[A-Z]/.test(value) || 'Admin Address must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => /^[A-Z][a-zA-Z\s]+$/.test(value) || 'Admin Address must contain only letters, and spaces', } })} placeholder="Enter Admin Address" fullWidth error={Boolean(errors.adminAddress)} />
                </Stack>
                <FormHelperText error id="standard-weight-helper-text-adminAddress">{errors.adminAddress?.message}</FormHelperText>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4} >
                <Stack spacing={1}>
                  <InputLabel htmlFor="adminPhone">Admin Phone <span style={{ color: 'red' }}> *</span></InputLabel>
                  <OutlinedInput id="adminPhone" type="text" {...register("adminPhone", { required: 'This Field is required', validate: { minLength: (value) => value.length <= 10 || 'Phone number must not be more than 10 digits', maxLength: (value) => value.length === 10 || 'Phone number must be exactly 10 digits', pattern: (value) => /^[6-9]\d{9}$/.test(value) || 'Phone number must contain only digits. Any characters or special characters are not allowed', } })} placeholder="Enter Admin Phone" fullWidth error={Boolean(errors.adminPhone)} />
                </Stack>
                <FormHelperText error id="standard-weight-helper-text-adminPhone">{errors.adminPhone?.message}</FormHelperText>
              </Grid>
            </Grid>
        </>
       ) }

        <Grid xs={12} gap={2}>
          <Button size="sm" type="submit" variant="contained" color="primary">
            {id === 'add' ? 'Create' : 'Update'}
          </Button>
          <Button size="sm" variant="outlined" sx={{ m: 2 }} onClick={()=> handleCancelButton()}>Cancel</Button>
        </Grid>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color:'#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

     

      <Dialog
        open={openImageDialog}
        onClose={() => setOpenImageDialog(false)}
        maxWidth="sm"
        PaperProps={{
          sx: {
            width: '400px',
            height: 'auto',
            margin: 'auto',
            borderRadius: 2,
          },
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <img
            src={selectedImage}
            alt="Hotel Preview"
            onClick={() => setOpenImageDialog(false)} // ✅ Close on click
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              objectFit: 'contain',
              borderRadius: '8px',
              cursor: 'pointer', // 👈 Makes it clear the image is clickable
            }}
          />
        </DialogContent>
      </Dialog>


    </Box>
  );
}

export default CreateHotel






















// ihugyfxc

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { Button, Stack, FormHelperText, InputLabel, OutlinedInput} from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import { useNavigate } from 'react-router';
// import { createHotelApi } from 'api/api';


// const CreateHotel = () => {

//   const navigate = useNavigate();

//   const CreateNewHotel = async (values, { setErrors, setStatus, setSubmitting }) => {
//     console.log('start')
//     try {
//       console.log('try')

//       const formData = new FormData();
//       formData.append('hotelName', values.hotelName)
//       formData.append('subTitle', values.subTitle)
//       formData.append('destination', values.destination)
//       formData.append('status', values.status)
//       formData.append('registerDate', values.registerDate)
//       formData.append('hotelClass', values.hotelClass)
//       formData.append('phoneNo', values.phoneNo)
//       formData.append('address', values.address)
//       formData.append('hotelEmail', values.hotelEmail)
//       formData.append('description', values.description)
//       formData.append('hotelImage', values.hotelImage)

//       const response = await createHotelApi(formData);
//       console.log(response, 'try1')
//       if (response.status === 200) {
//         if(response?.data?.status === 'success'){
//           localStorage.setItem('token', response.data.token);
//           navigate('/');
//           // console.log(token, 'try2')
//         }
//       }
//     } catch (error) {
//       console.log('catch')
//       setErrors({ submit: error.response ? error.response.data.message : 'An error occurred' });
//       setStatus({ success: false });
//     } finally {
//       console.log('finally')
//       setSubmitting(false);
//       // window.location.reload();
//       navigate('/');
//     }
//   };

  
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Formik
//         initialValues={{
//           hotelName: '',
//           subTitle: '',
//           destination: '',
//           status: '',
//           registerDate: '',
//           hotelClass: '',
//           phoneNo: '',
//           address: '',
//           hotelEmail: '',
//           description: '',
//           hotelImage: ''
//         }}
//         validationSchema={Yup.object().shape({
//           hotelName: Yup.string().max(255).required('Hotel Name is required *'),
//           subTitle: Yup.string().max(255).required('Sub Title is required *'),
//           destination: Yup.string().max(255).required('Destination is required *'),
//           status: Yup.string().max(255).required('Status is required *'),
//           registerDate: Yup.string().max(255).required('RegisterDate is required *'),
//           hotelClass: Yup.string().max(255).required('HotelClass is required *'),
//           phoneNo: Yup.string().max(255).required('Phone No is required *'),
//           address: Yup.string().max(255).required('Address is required *'),
//           hotelEmail: Yup.string().email('Must be a valid email').max(255).required('Hotel Email is required *'),
//           description: Yup.string().max(255).required('Description is required *'),
//           hotelImage: Yup.string().max(255).required('Hotel Image is required *'),
//         })}
//         // onSubmit={CreateNewHotel}
//       >

        
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="hotelName">Hotel Name</InputLabel>
//                   <OutlinedInput id="hotelName" type="text" value={values.hotelName} {...register("hotelName" placeholder="Enter Hotel Name" fullWidth error={Boolean(touched.hotelName && errors.hotelName)} />
//                 </Stack>
//                 {touched.hotelName && errors.hotelName && (
//                   <FormHelperText error id="standard-weight-helper-text-hotelName">{errors.hotelName} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="subTitle">Sub Title</InputLabel>
//                   <OutlinedInput id="subTitle" type="text" value={values.subTitle} {...register("subTitle" placeholder="Enter Sub Title" fullWidth error={Boolean(touched.subTitle && errors.subTitle)} />
//                 </Stack>
//                 {touched.subTitle && errors.subTitle && (
//                   <FormHelperText error id="standard-weight-helper-text-subTitle">{errors.subTitle} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="destination">Destination</InputLabel>
//                   <OutlinedInput id="destination" type="text" value={values.destination} {...register("destination" placeholder="Enter Destination" fullWidth error={Boolean(touched.destination && errors.destination)} />
//                 </Stack>
//                 {touched.destination && errors.destination && (
//                   <FormHelperText error id="standard-weight-helper-text-destination">{errors.destination} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="status">Status</InputLabel>
//                   <OutlinedInput id="status" type="text" value={values.status} {...register("status" placeholder="Enter Status" fullWidth error={Boolean(touched.status && errors.status)} />
//                 </Stack>
//                 {touched.status && errors.status && (
//                   <FormHelperText error id="standard-weight-helper-text-status">{errors.status} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="registerDate">Hotel Date</InputLabel>
//                   <OutlinedInput id="registerDate" type="date" value={values.registerDate} {...register("registerDate" placeholder="Enter Hotel Date" fullWidth error={Boolean(touched.registerDate && errors.registerDate)} />
//                 </Stack>
//                 {touched.registerDate && errors.registerDate && (
//                   <FormHelperText error id="standard-weight-helper-text-destination">{errors.registerDate} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="hotelClass">Hotel Class</InputLabel>
//                   <OutlinedInput id="hotelClass" type="text" value={values.hotelClass} {...register("hotelClass" placeholder="Enter Hotel Class" fullWidth error={Boolean(touched.hotelClass && errors.hotelClass)} />
//                 </Stack>
//                 {touched.hotelClass && errors.hotelClass && (
//                   <FormHelperText error id="standard-weight-helper-text-destination">{errors.hotelClass} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="phoneNo">Phone No</InputLabel>
//                   <OutlinedInput id="phoneNo" type="tel" value={values.phoneNo} {...register("phoneNo" placeholder="Enter Phone No" fullWidth error={Boolean(touched.phoneNo && errors.phoneNo)} />
//                 </Stack>
//                 {touched.phoneNo && errors.phoneNo && (
//                   <FormHelperText error id="standard-weight-helper-text-phoneNo">{errors.phoneNo} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="address">Address</InputLabel>
//                   <OutlinedInput id="address" type="text" value={values.address} {...register("address" placeholder="Enter Address" fullWidth error={Boolean(touched.address && errors.address)} />
//                 </Stack>
//                 {touched.address && errors.address && (
//                   <FormHelperText error id="standard-weight-helper-text-address">{errors.address} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="hotelEmail">Hotel Email</InputLabel>
//                   <OutlinedInput id="hotelEmail" type="email" value={values.hotelEmail} {...register("hotelEmail" placeholder="Enter Hotel Email" fullWidth error={Boolean(touched.hotelEmail && errors.hotelEmail)} />
//                 </Stack>
//                 {touched.hotelEmail && errors.hotelEmail && (
//                   <FormHelperText error id="standard-weight-helper-text-hotelEmail">{errors.hotelEmail} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="hotelImage">Hotel Image URL</InputLabel>
//                   <OutlinedInput id="hotelImage" type="file" value={values.hotelImage} {...register("hotelImage" placeholder="Enter Hotel Image URL" fullWidth error={Boolean(touched.hotelImage && errors.hotelImage)} />
//                 </Stack>
//                 {touched.hotelImage && errors.hotelImage && (
//                   <FormHelperText error id="standard-weight-helper-text-hotelImage">{errors.hotelImage} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} gap={2}>
//                 <Button disabled={isSubmitting} size="sm" type="submit" variant="contained" color="primary" onClick={CreateNewHotel}>
//                   Create
//                 </Button>
//                 <Button size="sm" variant="outlined" sx={{ m:2 }}>Cancel</Button>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// }

// export default CreateHotel











      {/* <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Hotel Name</Typography>
          <TextField type='text' required id="outlined-required" value="" fullWidth />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Sub Title</Typography>
          <TextField type='text' required id="outlined-required" value="" fullWidth />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Destination</Typography>
          <TextField type='text' required id="outlined-required" label="" value="" fullWidth />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Status</Typography>
          <TextField type='text' required id="outlined-required" label="" value="" fullWidth />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Hotel Date</Typography>
          <TextField type='text' required id="outlined-required" label="" value="" fullWidth />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Hotel Class</Typography>
          <TextField type='text' required id="outlined-required" label="" value="" fullWidth />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Phone No</Typography>
          <TextField type='text' required id="outlined-required" label="" value="" fullWidth />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Address</Typography>
          <TextField type='text' required id="outlined-required" label="" value="" fullWidth />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Hotel Email</Typography>
          <TextField type='text' required id="outlined-required" label="" value="" fullWidth />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Hotel Image URL</Typography>
          <TextField type='file' required id="outlined-required" label="" fullWidth />
        </Grid>
      </Grid>
      <Stack justifyContent='start' spacing={2} direction="row" sx={{ pt: 3 }}>
        <Button variant="contained">Create</Button>
        <Button variant="outlined">Cancel</Button>
      </Stack> */}
























//import * as React from 'react';
// import Box from '@mui/material/Box';
// import { Button, Stack, TextField, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import FormHelperText from '@mui/material/FormHelperText';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import { useNavigate } from 'react-router';
// import { createHotelApi } from 'api/api';


// const CreateHotel = () => {

//   const navigate = useNavigate();



//   const valuesss = useFormik({
//     initialValues: {
//       hotelName: '',
//       subTitle: '',
//       destination: '',
//       status: '',
//       registerDate: '',
//       hotelClass: '',
//       phoneNo: '',
//       address: '',
//       hotelEmail: '',
//       description: '',
//       hotelImage: ''
//     }
//   })

// console.log(valuesss, 'formik')


  
//   const CreateNewHotel = async (values, { setErrors, setStatus, setSubmitting }) => {
//     console.log('start')
//     try {
//       console.log('try')

//       const formData = new FormData();
//       formData.append('hotelName', values.hotelName)
//       formData.append('subTitle', values.subTitle)
//       formData.append('destination', values.destination)
//       formData.append('status', values.status)
//       formData.append('registerDate', values.registerDate)
//       formData.append('hotelClass', values.hotelClass)
//       formData.append('phoneNo', values.phoneNo)
//       formData.append('address', values.address)
//       formData.append('hotelEmail', values.hotelEmail)
//       formData.append('description', values.description)
//       formData.append('hotelImage', values.hotelImage)

//       const response = await createHotelApi(formData);
//       console.log(response, 'try1')
//       if (response.status === 200) {
//         if(response?.data?.status === 'success'){
//           localStorage.setItem('token', response.data.token);
//           navigate('/');
//           // console.log(token, 'try2')
//         }
//       }
//     } catch (error) {
//       console.log('catch')
//       setErrors({ submit: error.response ? error.response.data.message : 'An error occurred' });
//       setStatus({ success: false });
//     } finally {
//       console.log('finally')
//       setSubmitting(false);
//       window.location.reload();
//       navigate('/')
//     }
//   };

  
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Formik
//         initialValues={{
//           hotelName: '',
//           subTitle: '',
//           destination: '',
//           status: '',
//           registerDate: '',
//           hotelClass: '',
//           phoneNo: '',
//           address: '',
//           hotelEmail: '',
//           description: '',
//           hotelImage: ''
//         }}
//         validationSchema={Yup.object().shape({
//           hotelName: Yup.string().required('Hotel Name is required *'),
//           subTitle: Yup.string().required('Sub Title is required *'),
//           destination: Yup.string().required('Destination is required *'),
//           status: Yup.string().required('Status is required *'),
//           registerDate: Yup.string().required('RegisterDate is required *'),
//           hotelClass: Yup.string().required('HotelClass is required *'),
//           phoneNo: Yup.string().required('Phone No is required *'),
//           address: Yup.string().required('Address is required *'),
//           hotelEmail: Yup.string().email('Must be a valid email').required('Hotel Email is required *'),
//           description: Yup.string().required('Description is required *'),
//           hotelImage: Yup.string().required('Hotel Image is required *'),
//         })}

//         onSubmit={()=> CreateNewHotel}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="hotelName">Hotel Name</InputLabel>
//                   <OutlinedInput id="hotelName" type="text" value={values.hotelName} {...register("hotelName" placeholder="Enter Hotel Name" fullWidth error={Boolean(touched.hotelName && errors.hotelName)} />
//                 </Stack>
//                 {touched.hotelName && errors.hotelName && (
//                   <FormHelperText error id="standard-weight-helper-text-hotelName">{errors.hotelName} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="subTitle">Sub Title</InputLabel>
//                   <OutlinedInput id="subTitle" type="text" value={values.subTitle} {...register("subTitle" placeholder="Enter Sub Title" fullWidth error={Boolean(touched.subTitle && errors.subTitle)} />
//                 </Stack>
//                 {touched.subTitle && errors.subTitle && (
//                   <FormHelperText error id="standard-weight-helper-text-subTitle">{errors.subTitle} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="destination">Destination</InputLabel>
//                   <OutlinedInput id="destination" type="text" value={values.destination} {...register("destination" placeholder="Enter Destination" fullWidth error={Boolean(touched.destination && errors.destination)} />
//                 </Stack>
//                 {touched.destination && errors.destination && (
//                   <FormHelperText error id="standard-weight-helper-text-destination">{errors.destination} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="status">Status</InputLabel>
//                   <OutlinedInput id="status" type="text" value={values.status} {...register("status" placeholder="Enter Status" fullWidth error={Boolean(touched.status && errors.status)} />
//                 </Stack>
//                 {touched.status && errors.status && (
//                   <FormHelperText error id="standard-weight-helper-text-status">{errors.status} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="registerDate">Hotel Date</InputLabel>
//                   <OutlinedInput id="registerDate" type="date" value={values.registerDate} {...register("registerDate" placeholder="Enter Hotel Date" fullWidth error={Boolean(touched.registerDate && errors.registerDate)} />
//                 </Stack>
//                 {touched.registerDate && errors.registerDate && (
//                   <FormHelperText error id="standard-weight-helper-text-destination">{errors.registerDate} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="hotelClass">Hotel Class</InputLabel>
//                   <OutlinedInput id="hotelClass" type="text" value={values.hotelClass} {...register("hotelClass" placeholder="Enter Hotel Class" fullWidth error={Boolean(touched.hotelClass && errors.hotelClass)} />
//                 </Stack>
//                 {touched.hotelClass && errors.hotelClass && (
//                   <FormHelperText error id="standard-weight-helper-text-destination">{errors.hotelClass} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="phoneNo">Phone No</InputLabel>
//                   <OutlinedInput id="phoneNo" type="tel" value={values.phoneNo} {...register("phoneNo" placeholder="Enter Phone No" fullWidth error={Boolean(touched.phoneNo && errors.phoneNo)} />
//                 </Stack>
//                 {touched.phoneNo && errors.phoneNo && (
//                   <FormHelperText error id="standard-weight-helper-text-phoneNo">{errors.phoneNo} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="address">Address</InputLabel>
//                   <OutlinedInput id="address" type="text" value={values.address} {...register("address" placeholder="Enter Address" fullWidth error={Boolean(touched.address && errors.address)} />
//                 </Stack>
//                 {touched.address && errors.address && (
//                   <FormHelperText error id="standard-weight-helper-text-address">{errors.address} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="hotelEmail">Hotel Email</InputLabel>
//                   <OutlinedInput id="hotelEmail" type="email" value={values.hotelEmail} {...register("hotelEmail" placeholder="Enter Hotel Email" fullWidth error={Boolean(touched.hotelEmail && errors.hotelEmail)} />
//                 </Stack>
//                 {touched.hotelEmail && errors.hotelEmail && (
//                   <FormHelperText error id="standard-weight-helper-text-hotelEmail">{errors.hotelEmail} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} sm={6} md={6} lg={4} >
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="hotelImage">Hotel Image URL</InputLabel>
//                   <OutlinedInput id="hotelImage" type="file" {...register("hotelImage" onBlur={handleBlur} onChange={e => { setFieldValue("hotelImage", e.target.files[0]) }} placeholder="Enter Hotel Image URL" fullWidth error={Boolean(touched.hotelImage && errors.hotelImage)} />
//                 </Stack>
//                 {touched.hotelImage && errors.hotelImage && (
//                   <FormHelperText error id="standard-weight-helper-text-hotelImage">{errors.hotelImage} </FormHelperText>
//                 )}
//               </Grid>
//               <Grid  xs={12} gap={2}>
//                 <Button disableElevation disabled={isSubmitting} size="sm" type="submit" variant="contained" color="primary">
//                   Create
//                 </Button>
//                 <Button size="sm" variant="outlined" sx={{ m:2 }}>Cancel</Button>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// }

// export default CreateHotel




