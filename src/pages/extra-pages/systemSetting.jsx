import { Grid, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { border, Box, display, width } from '@mui/system'
import React from 'react'
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    container1: {
        backgroundColor: '#fff',
        padding: '18px',
        borderRadius: 5
    },
    container2: {
        marginTop: 15
    },
    gridItem: {
        border: '1px solid #0D6A84',
        borderRadius: 4,
        boxShadow: '3px 5px 12px -8px #5b6e88'
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    icon: {
        width: '80px',
        height: '80px',
        border: '1.5px solid #5b6e88',
        padding: 3,
        borderRadius: 4
    },
    content: {
        marginLeft: 18,
        textDecoration: 'none'
    }
});

const systemSetting = () => {
    const classes = useStyles();

    return (
        <Box>
            <Grid sx={{ marginBottom: 2, fontSize: 20, }}>
                <b>System Settings</b>
            </Grid>
            <Box className={classes.container1}>
                <Grid >
                    <TextField
                        sx={{
                            width: "100%",
                        }}
                        label="Search input"
                    />
                </Grid>
            </Box>
            <Box className={classes.container2} >
                <Grid container spacing={''} >
                    <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
                        <Link to="/generalsettingPage" style={{ textDecoration: 'none' }}>
                            <Box sx={{ display: 'flex', padding: 2 }} className={classes.box} >
                                <Box sx={{ marginTop: .8 }}>
                                    <svg className={classes.icon} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                                        <path fill="#0D6A84" d="M11.5 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M6 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M8 16a4 4 0 0 0-4 4h8.05v2H2v-2a6 6 0 0 1 6-6h4v2zm11.5-3.25v1.376c.715.184 1.352.56 1.854 1.072l1.193-.689l1 1.732l-1.192.688a4 4 0 0 1 0 2.142l1.192.688l-1 1.732l-1.193-.689a4 4 0 0 1-1.854 1.072v1.376h-2v-1.376a4 4 0 0 1-1.854-1.072l-1.193.689l-1-1.732l1.192-.688a4 4 0 0 1 0-2.142l-1.192-.688l1-1.732l1.193.688a4 4 0 0 1 1.854-1.071V12.75zm-2.751 4.283a2 2 0 0 0-.25.967c0 .35.091.68.25.967l.036.063a2 2 0 0 0 3.43 0l.036-.063c.159-.287.249-.616.249-.967c0-.35-.09-.68-.249-.967l-.036-.063a2 2 0 0 0-3.43 0z" />
                                    </svg>
                                </Box>
                                <Box>
                                    <Box className={classes.content}>
                                        <Typography variant="h3" sx={{ color: '#34495e', textDecoration: 'none' }}>General Setting</Typography>
                                        <Typography variant="body" sx={{ fontSize: 14, color: '#5b6e88' }}>Configure the fundamentals of the site</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Link>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} className={classes.gridItem} sx={{ marginLeft: 1 }}>
                        <Link to="/systemsettinglogofavicon" style={{ textDecoration: 'none' }}>
                            <Box sx={{ display: 'flex', padding: 2 }} className={classes.box} >
                                <Box sx={{ marginTop: .8 }}>
                                    <svg className={classes.icon} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="#0D6A84"><path d="m24.959 15.301l9.329 5.905l-1.74 1.266l-8.623-5.458l-8.539 5.456l-1.728-1.27l9.227-5.894a1.92 1.92 0 0 1 2.074-.005" /><path fill-rule="evenodd" d="M6.835 20.913c-1.158-.85-1.102-2.649.106-3.42L22.885 7.305a1.92 1.92 0 0
                                    1 2.074-.005l16.093 10.187c1.217.77 1.273 2.58.105 3.43l-16.091 11.71c-.686.5-1.601.497-2.286-.005zm1.183-1.736L23.925 9.014l16.057 10.164l.005.003l.001.003a.1.1 0 0 1 .012.051a.1.1 0 0 1-.01.055l-.002.005l-.007.006l-16.055 11.681L8.019 19.301l-.007-.006l-.003-.006A.1.1 0 0 1 8 19.235a.1.1 0 0 1 .012-.051l.001-.003z" clip-rule="evenodd" />
                                        <path d="m8.237 24.664l1.728 1.27l-1.947 1.243l-.005.004l-.001.003a.1.1 0 0 0-.012.05a.1.1 0 0 0 .011.059l
                                    .001.002l.007.006l15.907 11.681l16.055-11.681l.007-.006l.001-.002l.002-.003a.1.1 0 0 0 .009-.055a.1.1 0 0 0-.012-.051l-.001-.003l-.005-.003l-1.98-1.254l1.74-1.265l1.31.829c1.217.77 1.273 2.58.105 3.43L25.066 40.627c-.686.5-1.601.497-2.286-.005L6.835 28.912c-1.158-.85-1.102-2.648.106-3.42z"/></g>
                                    </svg>
                                </Box>
                                <Box >
                                    <Box className={classes.content}>
                                        <Typography variant="h3" sx={{ color: '#34495e', textDecoration: 'none' }}>Logo and Favicon</Typography>
                                        <Typography variant="body" sx={{ fontSize: 14, color: '#5b6e88' }}>Upload your logo and favicon here</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Link>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}

export default systemSetting
