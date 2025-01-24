import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import BookedCards from 'components/BookedCards';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

const ServerIP = 'http://89.116.122.211:5001';
const token = `Bearer ${localStorage.getItem('token')}`;

const fetcher1 = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);
const fetcher2 = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const TodaysBooked = () => {

  const [bookedRows, setBookedRows] = useState([]);
  const [availableRows, setAvailableRows] = useState([]);

  const { data: bookedRoomData, error: errorBookedRoomData } = useSWR(`${ServerIP}/booking/todayBookRoom`, fetcher1);
  const { data: availableRoomData, error: errorAvailableRoomData } = useSWR(`${ServerIP}/booking/getAllAvRoom`, fetcher2);

  console.log(bookedRows, availableRows)

  useEffect(() => {
    if (bookedRoomData) {
      setBookedRows(bookedRoomData);
    }
    if (availableRoomData) {
      setAvailableRows(availableRoomData?.rooms);
    }
  }, [bookedRoomData, availableRoomData]);

  return (
    <Box>
      <Grid2>
        <Grid2 alignContent="center">
          <Typography variant="h5">Today's Booked Rooms</Typography>
        </Grid2>

        {bookedRoomData ? (
          bookedRows.length > 0 ? (
            <Grid2 container spacing={2} sx={{ pt: 2, pb: 2 }}>
              {bookedRows.map((item) => (
                <Grid2 xs={12} sm={6} md={4} lg={3} key={item.roomNo}>
                  <BookedCards roomNo={item.roomNo} roomCategory={item.roomCategory} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Grid2 sx={{ p: 2, backgroundColor: '#f2f6fbe4', mt: 2, mb: 2 }}>
              <Typography variant="h5">No Room Booked Yet</Typography>
            </Grid2>
          )
        ) : (
          <Typography variant="subtitle1">
            Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...
          </Typography>
        )}

        <Grid2 alignContent="center">
          <Typography variant="h5">Available for Booking</Typography>
        </Grid2>

        {availableRoomData ? (
          availableRows.length > 0 ? (
            <Grid2 container spacing={2} sx={{ pt: 2, pb: 2 }}>
              {availableRows.map((item) => (
                <Grid2 xs={12} sm={6} md={4} lg={3} key={item.roomNo}>
                  <BookedCards roomNo={item.roomNo} roomType={item.roomType} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Grid2 sx={{ p: 2, backgroundColor: '#f2f6fbe4', mt: 2, mb: 2 }}>
              <Typography variant="h5">No Room Available for Booking</Typography>
            </Grid2>
          )
        ) : (
          <Typography variant="subtitle1">
            Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...
          </Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default TodaysBooked;




















// import { Box, Typography } from '@mui/material'
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
// import BookedCards from 'components/BookedCards'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import useSWR from 'swr'


// // const LocalGirjesh = 'http://192.168.20.109:5001';
// const ServerIP = 'http://89.116.122.211:5001'
// const token = `Bearer ${localStorage.getItem('token')}`;

// const fetcher1 = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);
// const fetcher2 = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);


// const TodaysBooked = () => {

//   // const bookedRoomData = [

//   // ]

//   // const availableRoomData = [
//   //   {
//   //     roomNo: '201',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '202',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '203',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '204',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '205',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '206',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '207',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '208',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '209',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '210',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '211',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '212',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '213',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '214',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '215',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '216',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '217',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '218',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '219',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '220',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '221',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '222',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '223',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '224',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '225',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '226',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '227',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '228',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '229',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '230',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '231',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '232',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '233',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '234',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '235',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '236',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '237',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '238',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '239',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '240',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '241',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '242',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '243',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '244',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '245',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '246',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '247',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '248',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '249',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   //   {
//   //     roomNo: '250',
//   //     roomCategory: 'Executive Suite',
//   //   },
//   // ]


//   const [bookedRows, setBookedRows] = useState([]);
//   const [availableRows, setAvailableRows] = useState([]);
//   const [toaster, setToaster] = useState(false)
//   const [msgToaster, setMsgToaster] = useState('')

//   // get API
//   const { bookedRoomData, errorBookedRoomData } = useSWR(`${ServerIP}/booking/todayBookRoom`, fetcher1);
//   const { availableRoomData, errorAvailableRoomData } = useSWR(`${ServerIP}/booking/getAllAvRoom`, fetcher2);


//   useEffect(() => {
//     if (bookedRoomData) {
//       setBookedRows(bookedRoomData);
//     }
//     if (availableRoomData) {
//       setAvailableRows(availableRoomData);
//     }
// }, [token, bookedRoomData, availableRoomData]);


  
// // if (!data) return ;


//   return (
//     <Box>
//       <Grid2>
//         <Grid2 alignContent='center'>
//           <Typography variant='h5'>Todays Booked Rooms</Typography>
//         </Grid2>
//         { 
//           if(bookedRoomData) {
//             return (
//               {bookedRows.length > 0 ?
        
//                 <Grid2 container spacing={2} sx={{ pt: 2, pb: 2 }}>
//                   {bookedRows.map((item) => (
//                     <Grid2 xs={12} sm={6} md={4} lg={3} key={item.roomNo} >
//                       <BookedCards roomNo={item.roomNo} roomCategory={item.roomCategory} />
//                     </Grid2>
      
//                   ))}
//                 </Grid2>
//                 :
//                 <Grid2 sx={{ p: 2, backgroundColor: '#f2f6fbe4', mt: 2, mb: 2 }}>
//                   <Typography variant='h5'>No Room Booked Yet</Typography>
//                 </Grid2>
//               }
//             )
//           }
//           else{
//             return (<Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>)
//           }
          
//         }
//         <Grid2 alignContent='center'>
//           <Typography variant='h5'>Available for Booking</Typography>
//         </Grid2>
//         {/* { if(error) { return <Typography variant="subtitle1">- Error loading data</Typography> };} */}
//         { 
//           if(availableRoomData) {
//             return (
//               {availableRoomData.length > 0 ?
        
//                 <Grid2 container spacing={2} sx={{ pt: 2, pb: 2 }}>
//                   {availableRoomData.map((item) => (
//                     <Grid2 xs={12} sm={6} md={4} lg={3} key={item.roomNo} >
//                       <BookedCards roomNo={item.roomNo} roomCategory={item.roomCategory} />
//                     </Grid2>
      
//                   ))}
//                 </Grid2>
//                 :
//                 <Grid2 sx={{ p: 2, backgroundColor: '#f2f6fbe4', mt: 2, mb: 2 }}>
//                   <Typography variant='h5'>No Room Booked Yet</Typography>
//                 </Grid2>
//               }
//             )
//           }
//           else{
//             return (<Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>)
//           }
          
//         }
//       </Grid2>

//     </Box>
//   )
// }

// export default TodaysBooked
