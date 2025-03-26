import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ApplicationExtra } from 'api/api'
import toast, { Toaster } from 'react-hot-toast';

import HashLoader from './HashLoaderCom';
import NoDataFound from 'pages/NoDataFound';

const contentDiv1 = {
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: 1,
    // padding: 1.5,
    color: "#5b6e88",
    marginTop: 3,
    backgroundColor: "#fff",
}
const contentDiv2 = {
    display: "flex",
    justifyContent: "space-between",
    margin: 1.5,
}
const hrLine = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.125)'
}

const extraApplication = () => {

    const [rowsData, setRowsData] = React.useState([]);
    const [loader, setLoader] = useState(false);
    const [adminVersion, setAdminVersion] = useState();
    const [hotelVersion, setHotelVersion] = useState();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        MyApplicationExtraGetAllApi()
    }, [])

    const MyApplicationExtraGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await ApplicationExtra();
            console.log('Appliccation extra data', response)
            if (response?.status === 200) {
                setAdminVersion(response?.data?.application?.ViserAdmin_Version)
                setHotelVersion(response?.data?.application?.ViserHotel_Version)
                setStatus(true)
                // toast.success(response?.data?.message)
                setLoader(false)

            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box>
                {
                    loader && (
                        <HashLoader />
                    )
                }
            </Box>
            <Box>
                <Box>
                    <Typography sx={{ fontSize: 20 }}><b>Application Information</b></Typography>
                </Box>
                {
                    status ? (
                        <Box sx={contentDiv1}>
                            {/* map below box */}
                            <Box sx={hrLine}>
                                <Box sx={contentDiv2}>
                                    <Box>
                                        <Typography sx={{ fontSize: 25 }}>ViserHotel Version</Typography>
                                    </Box>
                                    <Box >
                                        <Typography sx={{ fontSize: 22 }}><b>{hotelVersion}</b></Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={hrLine}>
                                <Box sx={contentDiv2}>
                                    <Box>
                                        <Typography sx={{ fontSize: 25 }}>ViserAdmin Version</Typography>
                                    </Box>
                                    <Box >
                                        <Typography sx={{ fontSize: 22 }}><b>{adminVersion}</b></Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )
                    :
                    (
                        <Grid>
                         <NoDataFound />
                      </Grid>
                    )
                }


            </Box>
        </>
    )
}

export default extraApplication
