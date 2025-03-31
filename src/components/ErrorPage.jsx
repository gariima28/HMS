import React, { useState } from "react";
import PropTypes from "prop-types";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";

const ErrorPage = ({ errorMessage, onReload, statusCode }) => {
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(true)

    if (statusCode === '500') {
        setTimeout(() => {
            setDialogOpen(false)
            navigate('/error-500');
        }, 3000);
    }

    const handleReload = () => {
        if (statusCode === '403') {
            localStorage.removeItem('token');
            navigate('/');
            onReload();
        }
        if (onReload) {
            onReload();
        }
    };

    return (
        <Backdrop open={dialogOpen} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', }} >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center", padding: 2, }} >
                <FadeLoader color="#b3b3b3" size={100} />
                <Typography variant="subtitle1" sx={{ margin: 2, color: '#b3b3b3' }} >
                    {statusCode === '500' ? 'Server error! we are working to fix this. Please try again later.' : "Something went wrong. Please try again."}
                </Typography>
                {statusCode !== 'Pending' &&
                    <Button variant="contained" color="secondary" startIcon={<RefreshIcon />} onClick={handleReload} >
                        Reload
                    </Button>
                }
            </Box>
        </Backdrop>
    );
};

// Prop validation
ErrorPage.propTypes = {
    errorMessage: PropTypes.string,
    onReload: PropTypes.func,
    statusCode: PropTypes.number,
};

export default ErrorPage;
