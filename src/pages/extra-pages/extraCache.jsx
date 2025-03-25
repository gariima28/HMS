import { Box, Button, Grid, Icon, Stack, TextField, Typography } from '@mui/material'

import { alignProperty } from '@mui/material/styles/cssUtils'
import { display, textAlign, width } from '@mui/system'
import { color } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { CacheExtraPostApi } from 'api/api'
import { CacheExtra } from 'api/api'
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';

const contentDiv1 = {
    width: '50%',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: 1,
    color: "#5b6e88",
    marginTop: 3,
    backgroundColor: "#fff",
}

const contentDiv2 = {
    display: "flex",
    margin: 1,
}

const hrLine = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.125)'
}

const forDisplay = {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center'
}

const css = {
    color: ''
}

const forHover = {
    '&:hover': {
        color: "#fff",
        backgroundColor: '#4634ff',
    },
}

const extraCache = () => {

    const [rowsData, setRowsData] = React.useState();
    console.log('all data', rowsData)
    
    const [loader, setLoader] = useState(false);

    const [key1, setKey1] = useState();
    const [key2, setKey2] = useState();
    const [key3, setKey3] = useState();
    const [key4, setKey4] = useState();
    const [key5, setKey5] = useState();

    useEffect(() => {
        MyCacheExtraGetAllApi()
    }, [])

    // post Api
    const MyCacheExtraPostApi = async () => {
        setLoader(true)
        try {
            const response = await CacheExtraPostApi();
            console.log('Cache extra data', response)
            if (response?.status === 200) {
                toast.success(response?.data?.message)
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    } 
    // get all api 
    const MyCacheExtraGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await CacheExtra();
            console.log('Cache extra data', response)
            if (response?.status === 200) {
                setRowsData(response?.data?.cacheData)
                setKey1(response?.data?.cacheData?.cache0)
                setKey2(response?.data?.cacheData?.cache1)
                setKey3(response?.data?.cacheData?.cache2)
                setKey4(response?.data?.cacheData?.cache3)
                setKey5(response?.data?.cacheData?.cache4)
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
                <Box>
                    {
                        loader && (
                            <HashLoader />
                        )
                    }
                </Box>
                <Box>
                    <Typography sx={{ fontSize: 20 }}><b>Clear System Cache</b></Typography>
                </Box>
                <Box sx={forDisplay}>
                    <Box sx={contentDiv1}>
                        {/* map below box */}

                        {/* {
                            rowsData?.map((data)=>{

                            })
                        } */}
                        <Box sx={hrLine}>
                            <Box sx={contentDiv2}>
                                <Box sx={{ paddingTop: 0.3 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="38" viewBox="0 0 512 512"><path fill="none" stroke="#14ee48" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="M464 128L240 384l-96-96m0 96l-96-96m320-160L232 284" /></svg>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: 25 }}>{key1}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={hrLine}>
                            <Box sx={contentDiv2}>
                                <Box sx={{ paddingTop: 0.3 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="38" viewBox="0 0 512 512"><path fill="none" stroke="#14ee48" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="M464 128L240 384l-96-96m0 96l-96-96m320-160L232 284" /></svg>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: 25 }}>{key2}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={hrLine}>
                            <Box sx={contentDiv2}>
                                <Box sx={{ paddingTop: 0.3 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="38" viewBox="0 0 512 512"><path fill="none" stroke="#14ee48" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="M464 128L240 384l-96-96m0 96l-96-96m320-160L232 284" /></svg>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: 25 }}>{key3}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={hrLine}>
                            <Box sx={contentDiv2}>
                                <Box sx={{ paddingTop: 0.3 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="38" viewBox="0 0 512 512"><path fill="none" stroke="#14ee48" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="M464 128L240 384l-96-96m0 96l-96-96m320-160L232 284" /></svg>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: 25 }}>{key4}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={hrLine}>
                            <Box sx={contentDiv2}>
                                <Box sx={{ paddingTop: 0.3 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="38" viewBox="0 0 512 512"><path fill="none" stroke="#14ee48" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="M464 128L240 384l-96-96m0 96l-96-96m320-160L232 284" /></svg>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: 25 }}>{key5}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Grid xs={12} sx={{}}>
                            <Button sx={{ ...forHover, width: '100%', backgroundColor: "#4634ff", color: '#fff',borderRadius:0 }} variant="contained" onClick={MyCacheExtraPostApi} >Click to clear</Button>
                            <Toaster />
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default extraCache
