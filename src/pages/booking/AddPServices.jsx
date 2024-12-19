import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Button, Box, InputLabel, OutlinedInput, Paper, Stack, Typography, MenuItem, Select } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import useSWR from 'swr';
import { addPServiceApi } from 'api/api';

const CustomButton = styled(Button)(() => ({
  borderRadius: '3.2px',
  backgroundColor: '#4634ff',
  borderColor: '#4634ff',
  color: '#fff',
  fontSize: '0.925rem',
  textTransform: 'none',

  '&:hover': {
      backgroundColor: '#4634ff',
      borderColor: '#4634ff',
      color: '#fff',
  },
}));

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'http://89.116.122.211:5001';
const token = `Bearer ${localStorage.getItem('token')}`;
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const AddPServices = () => {
  const [rows, setRows] = useState([]);
  const { data, error } = useSWR(`${ServerIP}/preServ/getAll`, fetcher);
  const [formInputs, setFormInputs] = useState([{ premiumServiceName: '', quantity: 0 }]);
  const [serviceDate, setServiceDate] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  // Adding multiple permissions at once 
  const handleChange = (i, e) => {
    const { name, value } = e.target;
    const newFormValues = [...formInputs];
    newFormValues[i][name] = value;
    setFormInputs(newFormValues);
  };

  const addFormFields = () => {
    setFormInputs([...formInputs, { name: '', quantity: '' }]);
  };

  const removeFormFields = (i) => {
    if (formInputs.length > 1) {
      const newFormValues = [...formInputs];
      newFormValues.splice(i, 1);
      setFormInputs(newFormValues);
    }
  };

  
  const addPServices = async () => {
    try {
      console.log('try')
      const data = formInputs;
      console.log(data, serviceDate, roomNumber, 'try1')
      const room = parseInt(roomNumber)
      var response = await addPServiceApi(serviceDate, room, data);
      console.log(response, 'service')
      if (response?.status === 200) {
        f
      }
      else {
          console.log(response?.data?.message);
      }
    }
    catch (error) {
        console.log(error, 'catch')
    }
    finally {
        console.log('finally')
    }
  }


  console.log(formInputs, 'formInputs values')

  if (error) return <Typography variant="subtitle1">Error loading data</Typography>;
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

  return (
    <Box>
      {/* Heading */}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent="center" sx={{ flexGrow: 1 }}>
          <Typography variant="h5">Add Premium Service</Typography>
        </Grid>
      </Grid>
<Grid container justifyContent="center" sx={{ mb: 3 }}>
  <Grid item xs={12} md={8} lg={6} sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: 1 }}>
    {/* Service Date & Room Number */}
    <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={6}>
        <InputLabel htmlFor="serviceDate" sx={{ fontWeight: 'bold', mb: 1 }}>
          Service Date <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <OutlinedInput
          id="serviceDate"
          type="date"
          name="serviceDate"
          placeholder="Service Date"
          fullWidth
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <InputLabel htmlFor="roomNumber" sx={{ fontWeight: 'bold', mb: 1 }}>
          Room Number <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <OutlinedInput
          id="roomNumber"
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          fullWidth
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
      </Grid>
    </Stack>

    {/* Services Section */}
    <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Services <span style={{ color: 'red' }}>*</span>
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#28c76f',
          color: '#fff',
          '&:hover': { backgroundColor: '#1f9d57' },
        }}
        onClick={addFormFields}
      >
        + Add More
      </Button>
    </Grid>

    {/* Dynamic Form Fields */}
    {formInputs.map((element, index) => (
      <Grid spacing={2} key={index} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <Grid item xs={6} sx={{width: '100%'}}>
          <Select
          fullWidth
            id={`service-${index}`}
            displayEmpty
            name="premiumServiceName"
            value={element.premiumServiceName || ''}
            onChange={(e) => handleChange(index, e)}
          >
            <MenuItem value="" disabled>Select One</MenuItem>
            {rows.map((items) => (
              <MenuItem key={items?.preServiceId} value={items?.preServiceId}>
                {items?.preSerName} - {items?.price}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6} sx={{ position: 'relative', width: '100%' }}>
          <OutlinedInput
            id={`quantity-${index}`}
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={element.quantity || ''}
            onChange={(e) => handleChange(index, e)}
            sx={{ width: '100%' }}
          />
          {index > 0 && (
            <CancelIcon
              sx={{
                position: 'absolute',
                right: -10,
                top: '6%',
                transform: 'translateY(-50%)',
                color: '#eb2222',
                cursor: 'pointer',
              }}
              onClick={() => removeFormFields(index)}
            />
          )}
        </Grid>
      </Grid>
    ))}

    {/* Submit Button */}
    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: '#5a32ea',
        color: '#fff',
        '&:hover': { backgroundColor: '#482bc8' },
      }}
      onClick={addPServices}
    >
      Submit
    </Button>
  </Grid>
</Grid>

    </Box>
  );
};

export default AddPServices;

















// import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import { Button, Box, InputLabel, OutlinedInput, Paper, Stack, Typography, MenuItem, Select } from '@mui/material';
// import CancelIcon from '@mui/icons-material/Cancel';
// import axios from 'axios';
// import useSWR from 'swr';

// // const LocalGirjesh = 'http://192.168.20.109:5001';
// const ServerIP = 'http://89.116.122.211:5001'
// const token = `Bearer ${localStorage.getItem('token')}`;
// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

// const AddPServices = () => {

//   const [rows, setRows] = useState([]);
//   // get API
//   const { data, error } = useSWR(`${ServerIP}/preServ/getAll`, fetcher);
//   const [formInputs, setFormInputs] = useState([{ name: '', quantity: '' }]);

//   useEffect(() => {
//     if (data) {
//       setRows(data);
//     }
//   }, [token, data]);

//   // Adding multiple permissions at once 

//   const handleChange = (i, e) => {
//     const { name, value } = e.target;
//     let newFormValues = [...formInputs];
//     newFormValues[i][name] = value;
//     setFormInputs(newFormValues);
//   };

//   const addFormFields = () => {
//     setFormInputs([...formInputs, { name: '' }]);
//   };

//   const removeFormFields = () => {
//     if (formInputs.length > 1) {
//       let newFormValues = [...formInputs];
//       // newFormValues.splice(i, 1);
//       newFormValues.pop();
//       setFormInputs(newFormValues);
//     }
//   };


//   if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
//   if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;


//   return (
//     <Box>
//       {/* Heading */}
//       <Grid sx={{ display: 'flex', mb: 3 }}>
//         <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//           <Typography variant="h5">Add Premium Service</Typography>
//         </Grid>
//       </Grid>
//       <Grid sx={{ display: 'flex', mb: 3, justifyContent: 'center' }}>
//         <Grid sx={{ backgroundColor: '#fff', p: 3 }}>
//           <Stack direction="row" spacing={5} sx={{ mb: 2 }}>
//             <Paper xs={12} md={6} sx={{ boxShadow: 'none' }}>
//               <InputLabel htmlFor="room">Service Date</InputLabel>
//               <OutlinedInput id="room" type="text" name="room" placeholder="How many room?" fullWidth />
//             </Paper>
//             <Paper xs={12} md={6} sx={{ boxShadow: 'none' }}>
//               <InputLabel htmlFor="room">Room Number</InputLabel>
//               <OutlinedInput id="room" type="text" name="room" placeholder="How many room?" fullWidth />
//             </Paper>
//           </Stack>
//           <Grid sx={{ display: 'flex', mb: 2 }}>
//             <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//               <Typography>Services</Typography>
//             </Grid>
//             <Button variant="contained" color="success" sx={{ backgroundColor: '#28c76f', '&:active': { backgroundColor: '#1f9d57' } }} onClick={addFormFields}>
//               + Add More
//             </Button>
//           </Grid>
//           {formInputs.map((element, index) => (
//             <Stack key={index} direction="row" spacing={5} onClick={() => removeFormFields()}
//               sx={{
//                 mb: 2,
//                 position: 'relative'
//               }}>
//               <Paper xs={12} md={6} sx={{ boxShadow: 'none' }} >
//                 <Select id='service' displayEmpty onChange={(e) => handleChange(index, e)} >
//                   <MenuItem value="" disabled>Select One</MenuItem>
//                   {rows.map((items) => (
//                     <MenuItem key={items?.preServiceId} value={items?.preServiceId}>{items?.preSerName}</MenuItem>
//                   ))}
//                 </Select>
//               </Paper>
//               <Paper xs={12} md={6} sx={{ boxShadow: 'none' }}>
//                 <OutlinedInput id="room" type="text" name="room" placeholder="How many room?" fullWidth onChange={(e) => handleChange(index, e)} />
//                 {index === 0 ? '' :
//                   <CancelIcon
//                     sx={{
//                       position: 'absolute',
//                       right: -10,
//                       top: -10,
//                       fill: '#eb2222'
//                     }}
//                   />
//                 }
//               </Paper>
//             </Stack>
//           ))}
//         </Grid>
//       </Grid>

//     </Box>
//   );
// };

// export default AddPServices
