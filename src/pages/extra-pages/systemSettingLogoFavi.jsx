import { Button, Grid, TextField, Typography, Paper, Box, styled } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { border, display, height, width } from '@mui/system'
import React, { useEffect, useState } from 'react'
// import Typography from 'themes/typography';
import { SettingOutlined } from '@ant-design/icons';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
import { Link } from 'react-router-dom';
import { LogoPostApi } from 'api/api'
import { LogoGetByIdApi } from 'api/api'


const useStyles = makeStyles({
    container1: {
        backgroundColor: '#fff',
        padding: '12px',
        borderRadius: 5,
        borderLeft: '3px solid #5b6e88',
        boxShadow: '3px 2px 10px -7px #5b6e88'
    },

    container2: {
        marginTop: 15
    },

    gridItem: {
        border: '1px solid #5b6e88',
        borderRadius: 4,
        boxShadow: '3px 2px 10px -7px #5b6e88'
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },

    icon: {
        width: '80px',
        height: '80px',
        border: '1.5px solid #5b6e88',
        padding: 3,
        borderRadius: 4
    },
    content: {

    },
    input: {
        width: '100%',
        marginTop: 2,
        marginBottom: 1
    },
    input2: {
        width: '100%',
        marginTop: 2,
        marginBottom: 1,
        color: "#000"
    },

    ContentImageDiv: {
        width: '350px',
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
    },
    imageDiv: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        backgroundPosition: 'top'
    },

    forHover: {
        '&:hover': {
            color: "#fff",
            backgroundColor: '#4634ff',
        },
    }
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const systemSettingLogoFavi = () => {

    const classes = useStyles();
    const [loader, setLoader] = useState(false)

    const [file1, setFile1] = useState()
    const [file2, setFile2] = useState()
    const [file3, setFile3] = useState()

    const [showImage1, setShowImage1] = useState()
    const [showImage2, setShowImage2] = useState()
    const [showImage3, setShowImage3] = useState()

    useEffect(() => {
        MyLogoSettingGetByIdApi()
    }, [])

    // post api 
    const MyLogoPostApi = async () => {

        const formData = new FormData()
        formData.append('logoWhite', file1);
        formData.append('logoBlack', file2);
        formData.append('favicon', file3);

        setLoader(true)
        try {
            const response = await LogoPostApi(formData);
            console.log('LOGO post api response -----', response)
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message);
                setLoader(false)
                MyLogoSettingGetByIdApi()
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // get by id in logo setting
    const MyLogoSettingGetByIdApi = async (id) => {
        setLoader(true)
        try {
            const response = await LogoGetByIdApi();
            console.log('Get by id in logo setting', response)
            if (response?.status === 200) {
                setShowImage1(response?.data?.logo?.logoWhite)
                setShowImage2(response?.data?.logo?.logoBlack)
                setShowImage3(response?.data?.logo?.favicon)
                // toast.success(response?.data?.msg)
                setLoader(false)
            } else {
                toast.error(response?.data?.msg);
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
                <Grid sx={{ marginBottom: 2, fontSize: 20, }}>
                    <b>Logo & Favicon </b>
                </Grid>

                <Box className={classes.container1}>
                    <Box>
                        <Typography>
                            If the logo and favicon are not changed after you update from this page, please
                            clear the cache from your browser. As we keep the filename the same after the
                            update, it may show the old image for the cache. usually, it works after clear
                            the cache but if you still see the old logo or favicon, it may be caused by
                            server level or network level caching. Please clear them too.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ marginTop: 4 }}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography><b>Logo For White Background</b></Typography>
                            <Item >
                                <Box className={classes.ContentImageDiv}>
                                    <img className={classes.imageDiv} src={showImage1} alt="image" />
                                </Box>
                            </Item>
                            <TextField
                                type="file"
                                onChange={(e) => setFile1(e.target.files[0])}
                                fullWidth
                                variant="outlined"
                                inputProps={{ accept: "image/*" }}
                                sx={{ marginTop: 2 }}
                                accept='png, jpg, jpeg, svg'
                            />
                            <Typography>Supported Files: <b>.png, .jpg, .jpeg.</b></Typography>

                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography><b>Logo For Dark Background</b></Typography>
                            <Item>
                                <Box className={classes.ContentImageDiv}>
                                    <img className={classes.imageDiv} src={showImage2} alt="image" />
                                </Box>
                            </Item>
                            <TextField
                                type="file"
                                onChange={(e) => setFile2(e.target.files[0])}
                                fullWidth
                                variant="outlined"
                                inputProps={{ accept: "image/*" }}
                                sx={{ marginTop: 2 }}
                                accept='png, jpg, jpeg, svg'
                            />
                            <Typography>Supported Files: <b>.png, .jpg, .jpeg.</b></Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography><b>Favicon</b></Typography>
                            <Item sx={{}}>
                                <Box className={classes.ContentImageDiv}>
                                    <img className={classes.imageDiv} src={showImage3} alt="image" />
                                </Box>
                            </Item>
                            <TextField
                                type="file"
                                onChange={(e) => setFile3(e.target.files[0])}
                                fullWidth
                                variant="outlined"

                                inputProps={{ accept: "image/*" }}
                                sx={{ marginTop: 2 }}
                                accept='png, jpg, jpeg, svg'
                            />
                            <Typography>Supported Files: <b>.png, .jpg, .jpeg.</b></Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 4, marginBottom: 2 }}>
                            <Button className={classes.forHover} sx={{ width: '100%', backgroundColor: "#4634ff", color: '#fff' }} variant="contained" onClick={MyLogoPostApi} >Submit</Button>
                        </Grid>
                    </Grid>
                    
                </Box>


            </Box>
        </>
    )
}

export default systemSettingLogoFavi
