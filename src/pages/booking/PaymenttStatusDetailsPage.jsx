import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormHelperText, Grid, IconButton, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { styled } from "@mui/styles";
// import { getPaymentDetailsByPaymentId, changePaymentStatus } from "api/api";
// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'https://www.auth.edu2all.in/hms'
const token = `Bearer ${localStorage.getItem('token')}`;

// API Call when ever data updates 
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const Details = () => {
    const { paymentId } = useParams();
    console.log(paymentId, 'paymentId');

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [openApprove, setOpenApprove] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [username, setUsername] = useState();
    const [transactionNumber, setTransactionNumber] = useState();
    const [method, setMethod] = useState();
    const [amount, setAmount] = useState();
    const [charge, setCharge] = useState();
    const [date, setDate] = useState();
    const [status, setStatus] = useState();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });


    // get API
    const { data, error } = useSWR(`${ServerIP}/payment/getPaymentDetailsByPaymentId/${paymentId}`, fetcher);

    useEffect(() => {
        if (data) {
            console.log(data, 'data');
            if (data.status === "success")
                setUsername(data?.UserPayment?.userName)
            setTransactionNumber(data?.UserPayment?.transactionNo)
            setMethod(data?.UserPayment?.paymentType)
            setAmount(data?.UserPayment?.totalAmount)
            setCharge(data?.UserPayment?.extraService)
            setDate(data?.UserPayment?.paymentDate.split('T')[0]);
            setStatus(data?.UserPayment?.paymentStatus)
        }
    }, [data]);

    useEffect(() => {

    }, []);





    const handleApproveClick = async () => {
        try {
            const status = "ACCEPTED";
            const refundAmount = null;

            // API Call to update status and refundAmount
            const response = await axios.put(
                `https://www.auth.edu2all.in/hms/payment/${status}/${paymentId}`,
                {
                    refundAmount: refundAmount,
                    status: status,
                    paymentId
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.status === 200)
                if (response?.data?.status === "success") {
                    console.log("Payment Status Updated", response);
                    setSnackbar({ open: true, message: response.data.message });
                    navigate("/payments/all")
                }
                else {
                    setSnackbar({ open: true, message: response.data.message });
                }
        } catch (error) {
            console.error("Error updating payment status:", error);
        }
    };

    const handleRejectClick = () => {
        setOpenReject(true);
    };

    const handleCloseReject = () => {
        setOpenReject(false);
    };

    const handleApprove = () => {
        console.log("Transaction approved");
        setOpenApprove(false);
    };

    const handleReject = () => {
        console.log("Transaction rejected. Reason:", rejectionReason);
        setOpenReject(false);
    };

    const onSubmit = async (data) => {
        try {
            const refundAmount = data.refundAmount;
            const status = "REJECTED";

            // API Call to update status and refundAmount
            const response = await axios.put(
                `https://www.auth.edu2all.in/hms/payment/${status}/${paymentId}`,
                {
                    refundAmount: refundAmount,
                    status: status,
                    paymentId
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (response.status === 200) {
                if (response?.data?.status === "success") {
                    console.log("Payment Status Updated", response.data);
                    setSnackbar({ open: true, message: response.data.message });
                    handleCloseReject();
                    navigate("/payments/all")
                }
                else {
                    console.log("Failed to update payment status");
                }
            }
        } catch (error) {
            setSnackbar({ open: true, message: error.message || 'Error occurred', severity: 'error' });
        }
    };

    return (
        <Box>
            <Box sx={{ padding: "22px 30px 30px 15px" }}>
                <Typography variant="h5" sx={{ color: '#34495e', fontWeight: 600, lineHeight: 1.4 }}>
                    {status} PAYMENTS
                </Typography>
            </Box>
            <Divider fullWidth sx={{ color: "#DDDDEBBF" }} />

            <Grid container spacing={2} sx={{ padding: "0px 10px 20px 15px", borderRadius: "10px" }}>
                {/* Payment Details - Always shown */}
                <Grid item xs={12} lg={6}>
                    <Typography variant="h5" sx={{ color: '#78788C', fontWeight: 600, my: 1 }}>Payment Via {method}</Typography>
                    <Box sx={{
                        backgroundColor: '#F2F3F6BF',
                        borderRadius: '10px',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        {/* Date Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Date</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                {date || '-'}
                            </Typography>
                        </Box>

                        {/* Transaction Number Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Transaction Number</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                {transactionNumber || '-'}
                            </Typography>
                        </Box>

                        {/* Username */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Username</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                {transactionNumber || '-'}
                            </Typography>
                        </Box>


                        {/* Method Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Method</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                {method || '-'}
                            </Typography>
                        </Box>

                        {/* Amount Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Amount</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                {amount || '-'}
                            </Typography>
                        </Box>

                        {/* Charge Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Charge</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                {charge || '-'}
                            </Typography>
                        </Box>

                        {/* After Charge Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>After Charge</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                {charge || '-'}
                            </Typography>
                        </Box>

                        {/* Rate Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Rate</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                {charge || '-'}
                            </Typography>
                        </Box>


                        {/* After Rate conversion Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>After Rate Conversion</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                {charge || '-'}
                            </Typography>
                        </Box>




                        {/* Status Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Status</Typography>
                            </Box>
                            <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                            <CustomEnableButton
                                status={status}
                                variant="outlined"
                            // sx={{
                            //     backgroundColor:
                            //         status === "PENDING" ? "rgba(255, 159, 67, 0.1)" :
                            //             status === "INITIATED" ? "rgba(7, 18, 81, 0.1)" :
                            //                 status === "SUCCESSFUL" ? "rgb(40 199 111 / 10%)" :
                            //                     status === "REJECTED" ? "#eb222278" : "rgba(108, 117, 125, 0.1)",
                            //     border:
                            //         status === "PENDING" ? "1px solid #ff9f43" :
                            //             status === "INITIATED" ? "1px solid #071251" :
                            //                 status === "SUCCESSFUL" ? "1px solid #28c76f" :
                            //                     status === "REJECTED" ? "1px solid rgb(235, 34, 34)" : "1px solid #6c757d",
                            //     color:
                            //         status === "PENDING" ? "#ff9f43" :
                            //             status === "INITIATED" ? "#071251" :
                            //                 status === "SUCCESSFUL" ? "#28c76f" :
                            //                     status === "REJECTED" ? "rgb(235, 34, 34)" : "#6c757d",
                            //     borderRadius: "20px",
                            //     padding: "0px 15px",
                            //     textTransform: "lowercase",
                            // }}
                            >
                                {status}
                            </CustomEnableButton>
                        </Box>
                    </Box>
                </Grid>

                {/* User Payment Info - Only shown when status is PENDING */}
                {status === "PENDING" && (
                    <Grid item xs={12} lg={6}>
                        <Typography variant="h5" sx={{ color: '#78788C', fontWeight: 600, my: 1 }}>User Payment Information</Typography>
                        <Box sx={{
                            backgroundColor: '#F2F3F6BF',
                            borderRadius: '10px',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            {/* Username Row */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Number</Typography>
                                </Box>
                                <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                                <Typography variant='body1' sx={{ color: "#2C2C2C" }}>
                                    {username || '-'}
                                </Typography>
                            </Box>

                            {/* Attachment Row */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Typography variant='body1' sx={{ width: '160px', fontWeight: 'bold', color: "#8F8F8F" }}>Document</Typography>
                                </Box>
                                <Typography variant='body1' sx={{ mx: 1, color: "#8F8F8F" }}>:</Typography>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <IconButton sx={{ color: "#2C2C2C" }}>
                                        <InsertDriveFileOutlinedIcon />
                                    </IconButton>
                                    <Typography variant='body1' sx={{ color: "#2C2C2C" }}>Attachment</Typography>
                                </Box>
                            </Box>

                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button
                                    onClick={handleApproveClick}
                                    variant="outlined"
                                    startIcon={<CheckIcon />}
                                    sx={{
                                        color: "#28c76f",
                                        fontWeight: "550",
                                        borderRadius: "30px",
                                        border: "1px solid #28c76f",
                                        ":hover": {
                                            backgroundColor: "#28c76f",
                                            color: "white",
                                            border: "1px solid #28c76f",
                                        },
                                    }}
                                >
                                    Approve
                                </Button>
                                <Button
                                    onClick={handleRejectClick}
                                    variant="outlined"
                                    startIcon={<BlockIcon />}
                                    sx={{
                                        color: "#eb2222",
                                        fontWeight: "550",
                                        border: "1px solid #eb2222",
                                        borderRadius: "30px",
                                        ":hover": {
                                            backgroundColor: "#eb2222",
                                            color: "white",
                                            border: "1px solid #eb2222",
                                        },
                                    }}
                                >
                                    Reject
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                )}
            </Grid>

            {/* Reject Dialog */}
            <Dialog
                open={openReject}
                onClose={handleCloseReject}
                PaperProps={{
                    sx: { position: "absolute", top: 2, width: "100%" },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <DialogTitle sx={{ color: "#34495e", fontSize: "1.3rem" }}>
                        Enter your Refund Amount
                    </DialogTitle>
                    <Typography
                        onClick={handleCloseReject}
                        sx={{ padding: "20px", cursor: "pointer" }}
                    >
                        X
                    </Typography>
                </Box>
                <Divider />
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="refundAmount" sx={{ color: "#34495e" }}>
                                    Refund Amount
                                </InputLabel>
                                <OutlinedInput
                                    id="refundAmount"
                                    type="text"
                                    placeholder="Enter Refund Amount"
                                    {...register("refundAmount", {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Only numeric values are allowed'
                                        }
                                    })}
                                    error={Boolean(errors.refundAmount)}
                                    fullWidth
                                    size="small"
                                />
                                <FormHelperText error>
                                    {errors.refundAmount?.message}
                                </FormHelperText>
                            </Stack>
                        </Grid>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Details;


const CustomEnableButton = styled(Button)(({ status }) => ({
    borderRadius: "50px",
    padding: "2px 26px",
    fontSize: "12px",
    textTransform: "none",
    minWidth: "130px",

    // Background Color
    backgroundColor:
        status === "PENDING"
            ? "#FFEAC2"
            : status === "INITIATED"
                ? "rgba(7, 18, 81, 0.1)"
                : status === "SUCCESSFUL"
                    ? "#D4F8DB"
                    : status === "REJECTED"
                        ? "#FBD8D1"
                        : "rgba(108, 117, 125, 0.1)", // Default

    // Border Color
    border:
        status === "PENDING"
            ? "1px solid #FFEAC2"
            : status === "INITIATED"
                ? "1px solid #071251"
                : status === "SUCCESSFUL"
                    ? "1px solid #D4F8DB"
                    : status === "REJECTED"
                        ? "1px solid #FBD8D1"
                        : "1px solid #6c757d",

    // Text Color
    color:
        status === "PENDING"
            ? "#FD9808"
            : status === "INITIATED"
                ? "#071251"
                : status === "SUCCESSFUL"
                    ? "#0AAD24"
                    : status === "REJECTED"
                        ? "#943320"
                        : "#6c757d", // Default
}));