import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { ServerExtra } from 'api/api'
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

const extraServer = () => {

    const [rowsData, setRowsData] = React.useState([]);
    const [loader, setLoader] = useState(false);

    const [javaVersion, setJavaVersion] = useState();
    const [serverSoftware, setServerSoftware] = useState();
    const [serverIP, setServerIP] = useState();
    const [serverProtocol, setServerProtocol] = useState();
    const [http, setHttp] = useState();
    const [serverPort, setServerPort] = useState();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        MyServerExtraGetAllApi()
    }, [])

    const MyServerExtraGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await ServerExtra();
            console.log('Server extra data', response)
            if (response?.status === 200) {

                setHttp(response?.data?.serverDetail?.HTTP_Host)
                setJavaVersion(response?.data?.serverDetail?.JAVA_Version)
                setServerIP(response?.data?.serverDetail?.Server_IP_Address)
                setServerPort(response?.data?.serverDetail?.Server_Port)
                setServerProtocol(response?.data?.serverDetail?.Server_Protocol_Version)
                setServerSoftware(response?.data?.serverDetail?.Server_Software)
                // toast.success(response?.data?.message)
                setLoader(false)
                setStatus(true)


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
                    <Typography sx={{ fontSize: 20 }}><b>Server Information</b></Typography>
                </Box>
                {
                    status ? (
                        <Box sx={contentDiv1}>
                            {/* map below box */}
                            <Box sx={hrLine}>
                                <Box sx={contentDiv2}>
                                    <Box>
                                        <Typography sx={{ fontSize: 25 }}>JAVA Version</Typography>
                                    </Box>
                                    <Box >
                                        <Typography sx={{ fontSize: 22 }}><b>{javaVersion}</b></Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={hrLine}>
                                <Box sx={contentDiv2}>
                                    <Box>
                                        <Typography sx={{ fontSize: 25 }}>Server Software</Typography>
                                    </Box>
                                    <Box >
                                        <Typography sx={{ fontSize: 22 }}><b>{serverSoftware}</b></Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={hrLine}>
                                <Box sx={contentDiv2}>
                                    <Box>
                                        <Typography sx={{ fontSize: 25 }}>Server IP Address</Typography>
                                    </Box>
                                    <Box >
                                        <Typography sx={{ fontSize: 22 }}><b>{serverIP}</b></Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={hrLine}>
                                <Box sx={contentDiv2}>
                                    <Box>
                                        <Typography sx={{ fontSize: 25 }}>Server Protocol</Typography>
                                    </Box>
                                    <Box >
                                        <Typography sx={{ fontSize: 22 }}><b>{serverProtocol}</b></Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={hrLine}>
                                <Box sx={contentDiv2}>
                                    <Box>
                                        <Typography sx={{ fontSize: 25 }}>HTTP Host</Typography>
                                    </Box>
                                    <Box >
                                        <Typography sx={{ fontSize: 22 }}><b>{http}</b></Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={hrLine}>
                                <Box sx={contentDiv2}>
                                    <Box>
                                        <Typography sx={{ fontSize: 25 }}>Server Port</Typography>
                                    </Box>
                                    <Box >
                                        <Typography sx={{ fontSize: 22 }}><b>{serverPort}</b></Typography>
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

export default extraServer
