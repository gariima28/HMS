import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, Typography, Pagination, InputAdornment, IconButton, Menu, MenuItem, Stack, Chip, Grid2, Card, Divider, Container, CardContent, OutlinedInput } from "@mui/material";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import { Clear as ClearIcon } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";
import { Snackbar, Alert } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';


const PaymentsPage = () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMVkktMDkwMzE0MDkiLCJlbWFpbCI6ImdhcmltYUBzY3JpemEuaW4iLCJyb2xlVHlwZSI6IkFETUlOIiwiaWF0IjoxNzM5ODU0NjcyLCJleHAiOjE3Mzk4OTc4NzJ9.QRNF7S1ddf6UalPWXraoN3oi24nYzH-16R3rqdof43E"
    const { id } = useParams();
    console.log(id);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [search, setSearch] = useState("");
    const [selectedPreset, setSelectedPreset] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [allPayments, setAllPayments] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();

    // Calculate pagination
    const totalPages = Math.ceil(allPayments.length / rowsPerPage);

    // Handle page change
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    // const dateString = "2025-02-17T17:21:49.470049";

    // // Extract date and time parts
    // const datePart = dateString.slice(0, 10); // "2025-02-17"
    // let timePart = dateString.slice(11, 16); // "17:21"

    // // Convert 24-hour time to 12-hour format
    // let [hours, minutes] = timePart.split(':');
    // hours = parseInt(hours);

    // const period = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12 || 12; // Convert '0' to '12' for 12-hour format

    // // Combine everything
    // const formattedDateTime = `${datePart} ${hours}:${minutes} ${period}`;
    // console.log(formattedDateTime); // Output: "2025-02-17 5:21 PM"



    // Apply status and search filters first
    const filteredData = useMemo(() => {
        return allPayments.filter((payment) => {
            if (id === "all") return true; // Show all statuses
            return payment.paymentStatus.toLowerCase() === id; // Filter by status
        }).filter((payment) =>
            payment.userName.toLowerCase().includes(search.toLowerCase())
        );
    }, [allPayments, id, search]);

    // Apply pagination to the filtered data
    const paginatedData = useMemo(() => {
        return filteredData.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
        );
    }, [filteredData, page, rowsPerPage]);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handlePresetSelect = (preset) => {
        const today = dayjs();
        switch (preset) {
            case "Today":
                setDateRange([today, today]);
                break;
            case "Yesterday":
                setDateRange([today.subtract(1, "day"), today.subtract(1, "day")]);
                break;
            case "Last 7 Days":
                setDateRange([today.subtract(7, "day"), today]);
                break;
            case "Last 15 Days":
                setDateRange([today.subtract(15, "day"), today]);
                break;
            case "Last 30 Days":
                setDateRange([today.subtract(30, "day"), today]);
                break;
            case "This Month":
                setDateRange([today.startOf("month"), today]);
                break;
            case "Last Month":
                setDateRange([
                    today.subtract(1, "month").startOf("month"),
                    today.subtract(1, "month").endOf("month"),
                ]);
                break;
            case "Last 6 Months":
                setDateRange([today.subtract(6, "month").startOf("month"), today]);
                break;
            case "This Year":
                setDateRange([today.startOf("year"), today]);
                break;
            case "Custom Range":
                setShowCalendar(true); // Show calendar inline
                break;
            default:
                setDateRange([null, null]);
        }
        setSelectedPreset(preset);
    };

    // Handle clearing the range (reset to placeholder)
    const handleClearRange = () => {
        setDateRange([null, null]);
        setSelectedPreset("");
        setShowCalendar(false);
    };

    const formatDateRange = () => {
        if (dateRange[0] && dateRange[1]) {
            return `${dateRange[0]?.format("YYYY-MM-DD")} - ${dateRange[1]?.format(
                "YYYY-MM-DD"
            )}`;
        } else {
            return "Start Date - End Date";
        }
    };

    const getAllPayments = async () => {
        try {
            const response = await axios.get(
                `https://www.auth.edu2all.in/hms/payment/getAllPayments`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response?.data?.payments)
            setAllPayments(response?.data?.payments)
        } catch (error) {
            setSnackbar({ open: true, message: error.message || 'Error occurred', severity: 'error' });
            console.error(error.response || error);
        }
    }
    useEffect(() => {
        getAllPayments();
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "#f3f3f9",
                paddingBottom: "10px",
                minHeight: "100vh",
            }}
        >
            {/*Heading and Search Bars */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "flex-start", md: "center" },
                    justifyContent: "space-between",
                    padding: { xs: "0px 30px", sm: "10px 30px 25px 20px" },
                    gap: { xs: 2, md: 0 },
                }}
            >
                <Typography sx={{ fontSize: "1.5rem", fontWeight: 500, color: "#34495e" }}>
                    {id === "all" ? "Payment History" : id === "succeed" ? "Successful Payments" : id === "pending" ? "Pending Payments" : id === "initiated" ? "Initiated Payments" : "Payment History"}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 2, sm: 2 },
                        width: { xs: "100%", sm: "auto" },
                    }}
                >
                    {/**Search Bar */}
                    <Stack direction="row">
                        <OutlinedInput
                            sx={{
                                flex: 1,
                                borderRadius: "10px 0px 0px 10px",
                                bgcolor: "white",
                                width: { xs: "100%", sm: "auto" },
                            }}
                            variant="outlined"
                            placeholder="Username / Email"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button sx={{ bgcolor: "blue", borderRadius: "0px 10px 10px 0px" }}>
                            <IconButton>
                                <SearchIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Button>
                    </Stack>

                    {/* Date Range Picker */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                            sx={{
                                display: "flex",
                                flex: 1,
                                gap: { xs: 2, md: 1 },
                                padding: 0,
                                width: "100%",
                            }}
                        >
                            {/* Dropdown Button */}
                            <Stack direction="row" sx={{ width: { xs: "100%", sm: "auto", } }}>
                                <OutlinedInput
                                    value={
                                        selectedPreset === "Custom Range" &&
                                            dateRange[0] &&
                                            dateRange[1]
                                            ? formatDateRange()
                                            : formatDateRange() || "Start Date - End Date"
                                    }
                                    onClick={handleOpenMenu}
                                    placeholder="Start Date - End Date"
                                    sx={{
                                        borderRadius: "10px 0px 0px 10px",
                                        bgcolor: "white",
                                        flex: 1,
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {selectedPreset || (dateRange[0] && dateRange[1]) ? (
                                                    <IconButton onClick={handleClearRange}>
                                                        <ClearIcon sx={{ color: "#1b0404" }} />
                                                    </IconButton>
                                                ) : null}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button sx={{ bgcolor: "blue", borderRadius: "0px 10px 10px 0px" }}>
                                    <IconButton>
                                        <SearchIcon sx={{ color: "white" }} />
                                    </IconButton>
                                </Button>
                            </Stack>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                <Box sx={{ display: "flex" }}>
                                    <Box>
                                        <MenuItem onClick={() => handlePresetSelect("Today")}>
                                            Today
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePresetSelect("Yesterday")}>
                                            Yesterday
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePresetSelect("Last 7 Days")}>
                                            Last 7 Days
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => handlePresetSelect("Last 15 Days")}
                                        >
                                            Last 15 Days
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => handlePresetSelect("Last 30 Days")}
                                        >
                                            Last 30 Days
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePresetSelect("This Month")}>
                                            This Month
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePresetSelect("Last Month")}>
                                            Last Month
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => handlePresetSelect("Last 6 Months")}
                                        >
                                            Last 6 Months
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePresetSelect("This Year")}>
                                            This Year
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => handlePresetSelect("Custom Range")}
                                        >
                                            Custom Range
                                        </MenuItem>
                                    </Box>

                                    {showCalendar && (
                                        <Box sx={{ mt: 2 }}>
                                            <DateRangeCalendar
                                                value={dateRange}
                                                onChange={(newValue) => {
                                                    setDateRange(newValue);
                                                    if (newValue[0] && newValue[1]) {
                                                        setShowCalendar(false); // Hide calendar after selecting
                                                        setSelectedPreset("Custom Range");
                                                    }
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Menu>
                        </Box>
                    </LocalizationProvider>
                </Box>
            </Box>

            {/* Payment type Bars */}
            {id === "all" && <Box sx={{ padding: "0px 30px 0px 15px", mb: 3 }}>
                <Grid2 container spacing={2} sx={{ backgroundColor: '#F8F9FC', borderRadius: 2, padding: "2px 15px 2px 15px" }}>
                    <Grid2 item size={{ xs: 12, sm: 6, md: 3 }}>
                        <Link to="/successful" style={{ textDecoration: "none", width: "100%" }} >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                                    <Box sx={{ backgroundColor: "#8ad3aa", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CheckCircleIcon sx={{ color: "green", }} />
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>$1686</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Successfull Payment</Typography>
                                    </CardContent>
                                </Box>
                                <Box>
                                    <ArrowForwardIosIcon />
                                </Box>
                            </Box>
                        </Link>
                    </Grid2>

                    <Grid2 item size={{ xs: 12, sm: 6, md: 3 }}>
                        <Link to="/pending" style={{ textDecoration: "none", width: "100%" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                                    <Box sx={{ backgroundColor: "#ca9562", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <HourglassEmptyIcon sx={{ color: "#ff9f43" }} />
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>$1686</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Pending Payment</Typography>
                                    </CardContent>
                                </Box>
                                <Box>
                                    <ArrowForwardIosIcon />
                                </Box>
                            </Box>
                        </Link>
                    </Grid2>

                    <Grid2 item size={{ xs: 12, sm: 6, md: 3 }}>
                        <Link to="/rejected" style={{ textDecoration: "none", width: "100%" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                                    <Box sx={{ backgroundColor: "#eb222278", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <BlockIcon sx={{ color: "#eb2222" }} />
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>$1686</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Rejected Payment</Typography>
                                    </CardContent>
                                </Box>
                                <Box>
                                    <ArrowForwardIosIcon />
                                </Box>
                            </Box>
                        </Link>
                    </Grid2>

                    <Grid2 item size={{ xs: 12, sm: 6, md: 3 }}>
                        <Link to="/initiated" style={{ textDecoration: "none", width: "100%" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                                    <Box sx={{ backgroundColor: "#ECEFF1", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ReceiptIcon sx={{ color: "#071251", }} />
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>$1686</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Initiated Payment</Typography>
                                    </CardContent>
                                </Box>
                                <Box>
                                    <ArrowForwardIosIcon />
                                </Box>
                            </Box>
                        </Link>
                    </Grid2>
                </Grid2>
            </Box>}

            {/* Table */}
            <Box sx={{ padding: "0px 15px ", mt: { xs: 2 } }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead
                            sx={{
                                bgcolor: "#4634ff",
                            }}
                        >
                            <TableRow>
                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: ".9rem",
                                        borderRadius: "10px 0px 0px 0px",
                                        paddingLeft: "25px",
                                    }}
                                >
                                    Gateway | Transaction
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: ".9rem",
                                        paddingLeft: "35px",
                                    }}
                                >
                                    Initiated
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: ".9rem",
                                        paddingLeft: "35px",
                                    }}
                                >
                                    User
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: ".9rem",
                                        paddingLeft: "35px",
                                    }}
                                >
                                    Amount
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: ".9rem",
                                        paddingLeft: "35px",
                                    }}
                                >
                                    Conversion
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: ".9rem",
                                        paddingLeft: "35px",
                                    }}
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: ".9rem",
                                        paddingLeft: "35px",
                                        borderRadius: "0px 10px 0px 0px",
                                    }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((payment, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ paddingLeft: "25x" }}>
                                        <Link
                                            style={{
                                                color: "#0d6efd",
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                                marginLeft: "7px",
                                                textDecoration: "none",
                                            }}
                                        >
                                            {payment.paymentType}
                                        </Link>
                                        <br />
                                        <span
                                            style={{
                                                color: "#5b6e88",
                                                fontSize: ".7rem",
                                                fontWeight: 550,
                                                marginLeft: "7px",
                                            }}
                                        >
                                            {payment.transactionNo}
                                        </span>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            color: "#5b6e88",
                                            fontSize: ".9rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {/* Displaying Formatted Date */}
                                        {new Date(payment.paymentDate).toISOString().slice(0, 10)}{" "}
                                        {(() => {
                                            const timeString = payment.paymentDate.slice(11, 16);
                                            let [hours, minutes] = timeString.split(':');
                                            hours = parseInt(hours);
                                            const period = hours >= 12 ? 'PM' : 'AM';
                                            hours = hours % 12 || 12;
                                            return `${hours}:${minutes} ${period}`;
                                        })()}
                                        <br />

                                        {/* Displaying Relative Time */}
                                        <span style={{ fontSize: ".8rem", color: "#5b6e88" }}>
                                            {formatDistanceToNow(new Date(payment.paymentDate), { addSuffix: true })}
                                        </span>
                                    </TableCell>

                                    <TableCell align="center">
                                        <span
                                            style={{
                                                color: "#5b6e88",
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {payment.userName}
                                        </span>
                                        <br />
                                        <Link
                                            style={{
                                                color: "#0d6efd",
                                                fontWeight: 500,
                                                textDecoration: "none",
                                            }}
                                        >
                                            {payment.userName}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <span style={{ color: "#5b6e88" }}>
                                            ₹{payment.totalAmount}
                                            {/* ${row.amount.toFixed(2)} */}
                                        </span>
                                        +
                                        <Tooltip
                                            title="charge"
                                            arrow
                                            placement="top"
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        bgcolor: "#0e0d0de8",
                                                        color: "white",
                                                        fontSize: "0.875rem", // Optional: Adjust font size if needed
                                                    },
                                                },
                                                arrow: {
                                                    sx: {
                                                        color: "#0e0d0de8", // Ensures the arrow has the same background color as the tooltip
                                                    },
                                                },
                                            }}
                                        >
                                            <span style={{ color: "#eb2222" }}>
                                                {/* ${row.fee.toFixed(2)} */}
                                                ₹{payment.extraService}
                                            </span>
                                        </Tooltip>
                                        <br />
                                        <Tooltip
                                            title="Amount with charge"
                                            placement="top"
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        bgcolor: "#0e0d0de8",
                                                        color: "white",
                                                        fontSize: "0.875rem",
                                                    },
                                                },
                                                arrow: {
                                                    sx: {
                                                        color: "#0e0d0de8",
                                                    },
                                                },
                                            }}
                                        >
                                            <span style={{ color: "#5b6e88", fontWeight: 600 }}>
                                                {/* ${(row.amount + row.fee).toFixed(2)} */}
                                                ₹{payment.totalAmount + payment.extraService}
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center">
                                        <span style={{ color: "#5b6e88" }}>
                                            {/* $1.00 = ৳{row.conversion.toFixed(2)} */}
                                        </span>
                                        <br />
                                        <span style={{ color: "#5b6e88", fontWeight: 600 }}>
                                            381,967.30৳
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                backgroundColor:
                                                    payment.paymentStatus === "PENDING" ? "rgba(255, 159, 67, 0.1)" :
                                                        payment.paymentStatus === "INITIATED" ? "rgba(7, 18, 81, 0.1)" :
                                                            payment.paymentStatus === "SUCCESSFUL" ? "rgb(40 199 111 / 10%)" : payment.paymentStatus === "REJECTED" ? "#eb222278" : "rgba(108, 117, 125, 0.1)", // Default
                                                // 
                                                border:
                                                    payment.paymentStatus === "PENDING" ? "1px solid #ff9f43" :
                                                        payment.paymentStatus === "INITIATED" ? "1px solid #071251" :
                                                            payment.paymentStatus === "SUCCESSFUL" || payment.paymentStatus === "SUCCESSFUL" ? "1px solid #28c76f" :
                                                                payment.paymentStatus === "REJECTED" ? "1px solid rgb(235, 34, 34)" : "1px solid #6c757d",

                                                color:
                                                    payment.paymentStatus === "PENDING" ? "#ff9f43" :
                                                        payment.paymentStatus === "INITIATED" ? "#071251" :
                                                            payment.paymentStatus === "SUCCESSFUL" ? "#28c76f" : payment.paymentStatus === "REJECTED" ? "rgb(235, 34, 34)" :
                                                                "#6c757d",

                                                borderRadius: "20px",
                                                padding: "0px 15px",
                                                textTransform: "lowercase",
                                            }}
                                        >
                                            {payment.paymentStatus}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => {
                                                navigate(`/details/${payment.paymentId}`);
                                            }}
                                            variant="outlined"
                                            startIcon={<PersonalVideoIcon />}
                                            sx={{
                                                textTransform: "lowercase",
                                                ":hover": {
                                                    backgroundColor: "#0d6efd",
                                                    color: "white",
                                                },
                                            }}
                                        >
                                            Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={filteredData.length} // Total rows after filtering
                        page={page - 1} // MUI pages are zero-based
                        rowsPerPage={rowsPerPage}
                        onPageChange={(event, newPage) => setPage(newPage + 1)}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(1); // Reset to first page on rowsPerPage change
                        }}
                    />


                </TableContainer>
            </Box>
        </Box >
    );
};

export default PaymentsPage;
