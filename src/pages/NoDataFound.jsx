// import React from 'react'
// import { useTheme } from '@mui/material/styles';
// import Typography from 'themes/typography';

// const NoPageFound = () => {

//     const theme = useTheme();

//   return (
//     <Typography variant="h6">Size: 14px</Typography>
//   )
// }

// export default NoPageFound


import React from 'react'
import noData from 'assets/images/nodata.svg'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'

const NoPageFound = () => {
  return (
    <Box>
      <Grid container justifyContent='center' sx={{ width: '100%' }}>
        <img src={noData} />
      </Grid>
    </Box>
  )
}

export default NoPageFound
