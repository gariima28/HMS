import React from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { borderRadius, margin, padding } from '@mui/system';
import { color } from 'framer-motion';
import { AllActiveEamilUnverifiedapi } from 'api/api'



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    marginTop: 20,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const mainDiv = {
    backgroundColor: "#fff",
    marginTop: 2,
}
const contentDiv = {
    borderRadius: 2,
    padding: 1,

}
const contentDiv2 = {
    borderRadius: 2,
    padding: 2,
    margin: 1,
}
const input = {
    width: '100%',
    marginTop: 2,
}
const forHover = {
'&:hover': {
       color: "#fff",
       backgroundColor:'#28c76f',
    },
}

const emailVerDetails = () => {


    
 return (
        <>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid >
                        <Typography sx={{ fontSize: 20 }}>
                            <b>Guest Detail - obinnaelviso</b>
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button sx={{ marginLeft: 2, height: 30, borderColor: '#4634ff', color: '#4634ff' }} variant="outlined" >
                            {/* <AddIcon /> */} Login as user</Button>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <Item style={{ backgroundColor: '#f2f6fbe4' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1.5, }}>
                                    <Box sx={{ textAlign: 'justify' }}>
                                        <Typography sx={{ fontSize: 15 }}><b>Total Bookings</b></Typography>
                                        <Typography sx={{ fontSize: 18 }}><b>0</b></Typography>
                                    </Box >
                                    <Box sx={{ margin: 'auto', paddingLeft: 12 }}><Typography>Icon</Typography></Box>
                                </Box>

                            </Item>
                        </Grid>
                        <Grid item xs={3} >
                            <Item style={{ backgroundColor: '#f2f6fbe4' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1.5, }}>
                                    <Box sx={{ textAlign: 'justify' }}>
                                        <Typography sx={{ fontSize: 15 }}><b>Rinning Bookings</b></Typography>
                                        <Typography sx={{ fontSize: 18 }}><b>0</b></Typography>
                                    </Box >
                                    <Box sx={{ margin: 'auto', paddingLeft: 8 }}><Typography>Icon</Typography></Box>
                                </Box>

                            </Item>
                        </Grid>
                        <Grid item xs={3} >
                            <Item style={{ backgroundColor: '#f2f6fbe4' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1.5, }}>
                                    <Box sx={{ textAlign: 'justify' }}>
                                        <Typography sx={{ fontSize: 15 }}><b>Booking request</b></Typography>
                                        <Typography sx={{ fontSize: 18 }}><b>0</b></Typography>
                                    </Box >
                                    <Box sx={{ margin: 'auto', paddingLeft: 8 }}><Typography>Icon</Typography></Box>
                                </Box>

                            </Item>
                        </Grid>
                        <Grid item xs={3} >
                            <Item style={{ backgroundColor: '#f2f6fbe4' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1.5, }}>
                                    <Box sx={{ textAlign: 'justify' }}>
                                        <Typography sx={{ fontSize: 15 }}><b>Total Payment</b></Typography>
                                        <Typography sx={{ fontSize: 18 }}><b>0</b></Typography>
                                    </Box >
                                    <Box sx={{ margin: 'auto', paddingLeft: 12 }}><Typography>Icon</Typography></Box>
                                </Box>

                            </Item>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4} >
                            <Item >
                                <Box sx={{ alignItems: 'center' }}>
                                    <Button sx={{...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" >Notification</Button>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} >
                            <Item >
                                <Box sx={{ alignItems: 'center' }}>
                                    <Button sx={{...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" >Logins</Button>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} >
                            <Item >
                                <Box sx={{ alignItems: 'center' }}>
                                    <Button sx={{...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" >Ban User</Button>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={mainDiv}>
                    <Box sx={contentDiv} >
                        <Typography sx={{ fontSize: 20 }}><b>Information of Obinna Elvis</b></Typography>
                    </Box>
                    <hr />
                    <Box sx={contentDiv2} >
                        <Grid container spacing={1} >
                            <Grid xs={6} >
                                <TextField sx={input} required id="outlined-required" label="First Name" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={6} >
                                <TextField sx={{ ...input, marginLeft: 1 }} required id="outlined-required" label=" Last Name" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                            <Grid xs={6} >
                                <TextField sx={input} required id="outlined-required" label="Email" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={6} >
                                <TextField sx={{ ...input, marginLeft: 1 }} required id="outlined-required" label="Mobile Number" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                            <Grid xs={12} >
                                <TextField sx={input} required id="outlined-required" label="Address" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                            <Grid xs={3} >
                                <TextField sx={{ ...input, width: '95%' }} required id="outlined-required" label="City" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={3} >
                                <TextField sx={{ ...input, width: '95%', marginLeft: 1 }} required id="outlined-required" label="State" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={3} >
                                <TextField sx={{ ...input, width: '95%', marginLeft: 2 }} required id="outlined-required" label="Zip/Postal" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={3} >
                                <TextField sx={{ ...input, width: '95%', marginLeft: 3 }} required id="outlined-required" label="Country" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>

                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 2 }} >
                            <Grid xs={6} sx={forHover}>
                            <Button sx={{...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" >Verified</Button>
                            </Grid>
                            <Grid xs={6} >
                            <Button sx={{...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000',marginLeft:1 }} variant="contained" >Verified</Button>
                            </Grid>
                          

                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 2 }} >
                            <Grid xs={12} sx={forHover}>
                            <Button sx={{...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" >Submit</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default emailVerDetails
