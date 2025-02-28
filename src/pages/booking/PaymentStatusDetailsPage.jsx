import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormHelperText, Grid, IconButton, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useSWR from "swr";

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'https://www.auth.edu2all.in/hms'
const token = `Bearer ${localStorage.getItem('token')}`;

// API Call when ever data updates 
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const Details = () => {
    const { paymentId } = useParams();
    console.log(paymentId, 'paymentId');


    const navigate = useNavigate()
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
    const { data, error } = useSWR(`${ServerIP}/getPaymentDetailsByPaymentId/${paymentId}`, fetcher);
    console.log(data)

    const handleApproveClick = async () => {
        try {
            const status = "ACCEPTED";
            const refundAmount = null;

            // API Call to update status and refundAmount
            const response = await axios.put(
                `http://89.116.122.211:5001/payment/${status}/${paymentId}`,
                {
                    refundAmount: refundAmount,
                    status: status,
                    paymentId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200)
                if (response?.data?.status === "success") {
                    console.log("Payment Status Updated", response);
                    setSnackbar({ open: true, message: response.data.message });
                    navigate("/all")
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



    // const getPaymentDetails = async () => {
    //     try {
    //         console.log("try")
    //         const response = await axios.get(
    //             `http://89.116.122.211:5001/payment/getPaymentDetailsByPaymentId/${paymentId}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         console.log(response, 'get by id')
    //         if (response?.status === 200) {
    //             console.log("fetched")
    //             console.log(response?.data?.UserPayment)
    //             setUsername(response?.data?.UserPayment?.userName)
    //             setTransactionNumber(response?.data?.UserPayment?.transactionNo)
    //             setMethod(response?.data?.UserPayment?.paymentType)
    //             setAmount(response?.data?.UserPayment?.totalAmount)
    //             setCharge(response?.data?.UserPayment?.extraService)
    //             setDate(response?.data?.UserPayment?.paymentDate)
    //             setStatus(response?.data?.UserPayment?.paymentStatus)
    //         }
    //         else {
    //             console.log(response?.data?.message);
    //         }
    //     }
    //     catch (error) {
    //         console.log('catch')
    //     }
    //     finally {
    //         setTimeout(() => {
    //         }, 1500);
    //         console.log('finally')
    //     }
    // }

    // useEffect(() => {
    //     getPaymentDetails();
    // }, []);
    // // console.log(transactionNumber);


    const onSubmit = async (data) => {
        try {
            const refundAmount = data.refundAmount;
            const status = "REJECTED";

            // API Call to update status and refundAmount
            const response = await axios.put(
                `http://89.116.122.211:5001/payment/${status}/${paymentId}`,
                {
                    refundAmount: refundAmount,
                    status: status,
                    paymentId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                if (response?.data?.status === "success") {
                    console.log("Payment Status Updated", response.data);
                    setSnackbar({ open: true, message: response.data.message });
                    handleCloseReject();
                    navigate("/all")
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
            <Box
                sx={{
                    padding: "22px 30px 30px 15px",
                    color: "#34495e",
                    fontSize: "1rem",
                    fontWeight: 550,
                }}
            >
                <Typography
                    sx={{
                        color: "#34495e",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        lineHeight: 1.4,
                    }}
                >
                    {username} requested $3,465.00
                </Typography>
            </Box>

            <Grid
                container
                spacing={2}
                sx={{
                    padding: "0px 10px 20px 15px ",
                    borderRadius: "10px",
                }}
            >
                {/* Payment Details */}
                {status === "PENDING" ?
                    (<Grid
                        item
                        size={{ xs: 12, sm: 12, md: 6 }}
                        sx={{
                            bgcolor: "white",
                            padding: "10px",
                            borderRadius: "10px",

                        }}
                    >
                        <Typography
                            sx={{
                                padding: "10px 5px",
                                color: "#6c757d",
                                fontWeight: 550,
                                fontSize: "1rem",
                            }}
                        >
                            Payment Via {method}
                        </Typography>
                        <Box sx={{ border: "1px solid #ddd" }}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Date
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    2024-11-26 07:52 PM
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Transaction Number
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {transactionNumber}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    username
                                </Typography>
                                <Typography sx={{ color: "#0d6efd", fontWeight: "700" }}>
                                    {username}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Method
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {method}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Amount
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {amount}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Charge
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {charge}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    After Charge
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {amount + charge}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Rate
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {/* $1.00 = ৳{payment.conversion.toFixed(2)} */}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    After Rate Conversion
                                </Typography>
                                <Typography sx={{ color: "#34495e", fontWeight: 550 }}>
                                    381,967.30৳
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Status
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor:
                                            status === "PENDING" ? "rgba(255, 159, 67, 0.1)" :
                                                status === "initiated" ? "rgba(7, 18, 81, 0.1)" :
                                                    status === "succeed" || status === "Successful" ? "rgb(40 199 111 / 10%)" :
                                                        "rgba(108, 117, 125, 0.1)", // Default

                                        border:
                                            status === "PENDING" ? "1px solid #ff9f43" :
                                                status === "initiated" ? "1px solid #071251" :
                                                    status === "succeed" || status === "Successful" ? "1px solid #28c76f" :
                                                        "1px solid #6c757d",

                                        color:
                                            status === "PENDING" ? "#ff9f43" :
                                                status === "initiated" ? "#071251" :
                                                    status === "succeed" ? "#28c76f" :
                                                        "#6c757d",
                                        borderRadius: "20px",
                                        padding: "0px 15px",
                                        textTransform: "lowercase",
                                    }}
                                >
                                    {status}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>) :
                    (<Grid
                        item
                        size={{ xs: 12, sm: 12, md: 6 }}
                        sx={{
                            bgcolor: "white",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "flex", flexDirection: "column", justifyContent: "center",
                            alignItems: "center",
                            margin: "auto"
                        }}
                    >
                        <Typography
                            sx={{
                                padding: "1px 0px",
                                color: "#6c757d",
                                fontWeight: 550,
                                fontSize: "1.3rem",
                                mb: 2
                            }}
                        >
                            Payment Via
                            {method}
                        </Typography>
                        <Box sx={{ border: "1px solid #ddd" }}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Date
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    2024-11-26 07:52 PM
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Transaction Number
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {transactionNumber}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    username
                                </Typography>
                                <Typography sx={{ color: "#0d6efd", fontWeight: "700" }}>
                                    {username}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Method
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {method}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Amount
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {amount}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Charge
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {charge}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    After Charge
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {amount + charge}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Rate
                                </Typography>
                                <Typography sx={{ fontWeight: 550, color: "#5b6e88" }}>
                                    {1100}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    After Rate Conversion
                                </Typography>
                                <Typography sx={{ color: "#34495e", fontWeight: 550 }}>
                                    381,967.30৳
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={2}
                                sx={{ padding: "10px 10px 0px 10px" }}
                            >
                                <Typography sx={{ color: "#212529", fontSize: "1rem" }}>
                                    Status
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor:
                                            status === "PENDING" ? "rgba(255, 159, 67, 0.1)" :
                                                status === "INITIATED" ? "rgba(7, 18, 81, 0.1)" :
                                                    status === "SUCCESSFUL" ? "rgb(40 199 111 / 10%)" : status === "REJECTED" ? "#eb222278" : "rgba(108, 117, 125, 0.1)", // Default
                                        // 
                                        border:
                                            status === "PENDING" ? "1px solid #ff9f43" :
                                                status === "INITIATED" ? "1px solid #071251" :
                                                    status === "SUCCESSFUL" || status === "SUCCESSFUL" ? "1px solid #28c76f" :
                                                        status === "REJECTED" ? "1px solid rgb(235, 34, 34)" : "1px solid #6c757d",

                                        color:
                                            status === "PENDING" ? "#ff9f43" :
                                                status === "INITIATED" ? "#071251" :
                                                    status === "SUCCESSFUL" ? "#28c76f" : status === "REJECTED" ? "rgb(235, 34, 34)" :
                                                        "#6c757d",

                                        borderRadius: "20px",
                                        padding: "0px 15px",
                                        textTransform: "lowercase",
                                    }}
                                >
                                    {status}
                                </Button>
                                {/* <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor:
                                            status === "PENDING" ? "rgba(255, 159, 67, 0.1)" :
                                                status === "initiated" ? "rgba(7, 18, 81, 0.1)" :
                                                    status === "succeed" || status === "Successful" ? "rgb(40 199 111 / 10%)" :
                                                        "rgba(108, 117, 125, 0.1)", // Default

                                        border:
                                            status === "PENDING" ? "1px solid #ff9f43" :
                                                status === "initiated" ? "1px solid #071251" :
                                                    status === "succeed" || status === "Successful" ? "1px solid #28c76f" :
                                                        "1px solid #6c757d",

                                        color:
                                            status === "PENDING" ? "#ff9f43" :
                                                status === "initiated" ? "#071251" :
                                                    status === "succeed" ? "#28c76f" :
                                                        "#6c757d",

                                        borderRadius: "20px",
                                        padding: "0px 15px",
                                        textTransform: "lowercase",
                                    }}
                                >
                                    {status}
                                </Button> */}
                            </Box>
                        </Box>

                    </Grid>)
                }

                {/* User Payment Info */}
                {status === "PENDING" && <Grid
                    item
                    size={{ xs: 12, sm: 12, md: 8.3 }}
                    sx={{
                        bgcolor: "white",
                        padding: "15px",
                        height: "350px",
                        borderRadius: "10px",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#34495e",
                            fontWeight: 550,
                            lineHeight: 1,
                            fontSize: "1.3rem",
                            mb: 1,
                            padding: "10px 7px",
                        }}
                    >
                        User Payment Information
                    </Typography>
                    <Divider sx={{ mb: 2, mt: 2 }} />
                    <Box sx={{ mt: 4 }}>
                        <Typography
                            sx={{ color: "#34495e", fontSize: "1rem", fontWeight: 550 }}
                        >
                            Number
                        </Typography>
                        <Typography sx={{ color: "#34495e", fontSize: "1rem" }}>
                            122
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <Typography
                            sx={{ color: "#34495e", fontSize: "1rem", fontWeight: 550 }}
                        >
                            test
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <IconButton sx={{ color: "blue" }}>
                                <InsertDriveFileOutlinedIcon />
                            </IconButton>
                            <Typography sx={{ color: "#0d6efd" }}>Attachement</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 4, display: "flex", gap: "5px" }}>
                        <Button
                            onClick={handleApproveClick}
                            variant="outlined"
                            startIcon={<CheckIcon />}
                            sx={{
                                color: "#28c76f",
                                fontWeight: "550",
                                ":hover": {
                                    backgroundColor: "#28c76f",
                                    color: "white",
                                },
                            }}
                        >
                            Approve
                        </Button>
                        <Button
                            onClick={handleRejectClick}
                            variant="outlined"
                            color="error"
                            startIcon={<BlockIcon />}
                            sx={{
                                color: "#eb2222",
                                fontWeight: "550",
                                ":hover": {
                                    backgroundColor: "#eb2222",
                                    color: "white",
                                },
                            }}
                        >
                            Reject
                        </Button>
                    </Box>
                </Grid>}
            </Grid>


            {/*Dialog for Reject button*/}
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
