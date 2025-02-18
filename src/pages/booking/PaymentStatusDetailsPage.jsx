import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { data } from "./Payments";


const PaymentStatusDetailsPage = () => {
    const [openApprove, setOpenApprove] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    const { transactionId } = useParams();
    const payment = data.find((p) => p.transactionId === transactionId);
    console.log(transactionId)
    console.log(payment)
    const handleApproveClick = () => {
        setOpenApprove(true);
    };

    const handleRejectClick = () => {
        setOpenReject(true);
    };

    const handleCloseApprove = () => {
        setOpenApprove(false);
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

    return (
        <Box>
            <Box
                sx={{
                    // padding: "42px 30px 30px 30px",
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
                    {/* {payment.username} requested $3,465.00 */}
                </Typography>
            </Box>

            <Grid
                container
                // spacing={2}
                // sx={{
                //     // margin: "0px 20px 20px 20px",
                //     // padding: "0px 10px 20px 10px ",
                //     borderRadius: "10px",
                // }}
            >

                {/* Payment Details */}

                {/* {payment.status === "pending" ? */}
                    <Grid
                        item
                        size={{ xs: 12, sm: 12, md: 5 }}
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
                            {/* Payment Via {payment.gateway} */}
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
                                    {/* {payment.transactionId} */}
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
                                    {/* {payment.username} */}
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
                                    {/* {payment.gateway} */}
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
                                    {/* {payment.amount} */}
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
                                    {/* {payment.fee} */}
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
                                    {/* {payment.total} */}
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
                                {/* <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor:
                                            payment.status === "pending" ? "rgba(255, 159, 67, 0.1)" :
                                                payment.status === "initiated" ? "rgba(7, 18, 81, 0.1)" :
                                                    payment.status === "succeed" || row.status === "Successful" ? "rgb(40 199 111 / 10%)" :
                                                        "rgba(108, 117, 125, 0.1)", // Default

                                        border:
                                            payment.status === "pending" ? "1px solid #ff9f43" :
                                                payment.status === "initiated" ? "1px solid #071251" :
                                                    payment.status === "succeed" || row.status === "Successful" ? "1px solid #28c76f" :
                                                        "1px solid #6c757d",

                                        color:
                                            payment.status === "pending" ? "#ff9f43" :
                                                payment.status === "initiated" ? "#071251" :
                                                    payment.status === "succeed" ? "#28c76f" :
                                                        "#6c757d",

                                        borderRadius: "20px",
                                        padding: "0px 15px",
                                        textTransform: "lowercase",
                                    }}
                                >
                                    {payment.status}
                                </Button> */}
                            </Box>
                        </Box>

                    </Grid> 
                    
                {/* } */}

                {/* User Payment Info */}
                {/* {payment.status === "pending" &&  */}
                <Grid
                    item
                    size={{ xs: 12, sm: 12, md: 7 }}
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
                </Grid>
                {/* } */}

            </Grid>

            {/*Dialog for approve button*/}
            <Dialog
                open={openApprove}
                onClose={handleCloseApprove}
                PaperProps={{
                    sx: { position: "absolute", top: 2, width: "100%" },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <DialogTitle sx={{ color: "#34495e", fontSize: "1.3rem" }}>
                        Confirmation Alert!
                    </DialogTitle>
                    <Typography
                        onClick={handleCloseApprove}
                        sx={{ padding: "20px", cursor: "pointer" }}
                    >
                        X
                    </Typography>
                </Box>
                <Divider />
                <DialogContent>
                    <Typography sx={{ color: "#34495e" }}>
                        Are you sure you want to approve this transaction?
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        onClick={handleCloseApprove}
                        variant="outlined"
                        sx={{ bgcolor: "black", color: "white" }}
                    >
                        No
                    </Button>
                    <Button onClick={handleApprove} variant="contained" color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/*Dialog for Reject button*/}

            <Dialog
                open={openReject}
                onClose={handleCloseReject}
                PaperProps={{
                    sx: { position: "absolute", top: 20, width: "100%" },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <DialogTitle
                        sx={{ color: "#34495e", fontSize: "1.3rem", fontWeight: 550 }}
                    >
                        Reject Deposit Confirmation
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
                    <Typography gutterBottom>
                        <span style={{ color: "#5b6e88" }}>
                            Are you sure to
                            <span style={{ fontWeight: 550 }}> reject </span>
                        </span>
                        <span style={{ color: "#28c76f", fontWeight: 600 }}>
                            $3,465.00{" "}
                        </span>
                        <span style={{ color: "#5b6e88" }}>deposit of</span>
                        <span style={{ fontWeight: 550, color: "#5b6e88" }}> username</span>
                        ?
                    </Typography>
                    <Typography sx={{ fontWeight: "550", mt: 2 }}>
                        Reason for Rejection <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        margin="normal"
                        multiline
                        rows={3}
                    />
                </DialogContent>
                <Divider sx={{ mb: 1 }} />
                <DialogActions>
                    <Button
                        fullWidth
                        onClick={handleReject}
                        variant="contained"
                        color="primary"
                        sx={{ margin: "5px 5px 10px 5px", padding: "10px" }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PaymentStatusDetailsPage;
