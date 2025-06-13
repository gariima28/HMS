import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, Typography, Pagination, InputAdornment, IconButton, Menu, MenuItem, Stack, Chip, Grid, Card, Divider, Container, CardContent, OutlinedInput } from "@mui/material";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import { Clear as ClearIcon, ComputerSharp } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TablePagination from '@mui/material/TablePagination';
import DynamicDataTable from "components/DynamicDataTable";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import axios from "axios";
import NoDataFound from "pages/NoDataFound";
// import { getPaymentByStatus, getPaymentBySearch } from "api/api";


const DetailsButton = styled(Button)(() => ({
  borderRadius: '20px',
  backgroundColor: 'transparent',
  borderColor: '#0D6A84',
  color: '#0D6A84',
  fontSize: '0.825rem',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#0D6A84',
    borderColor: '#0D6A84',
    color: '#fff',
  },
}));

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


const columns = [
  { id: 'gateway', label: 'Gateway | Transaction', minWidth: 170 },
  { id: 'date', label: 'Initiated', minWidth: 100, align: 'center' },
  { id: 'user', label: 'User', align: 'center' },
  { id: 'amount', label: 'Amount', minWidth: 100, align: 'center' },
  { id: 'conversion', label: 'Conversion', minWidth: 100, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'https://www.auth.edu2all.in/hms'
const token = `Bearer ${localStorage.getItem('token')}`;

// API Call when ever data updates 
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const PaymentsPage = () => {
  const { id } = useParams();
  console.log(id);
  const [searchKey, setSearchKey] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  const [totalSuccessfulAmount, setTotalSuccessfulAmount] = useState(0);
  const [totalRejectedAmount, setTotalRejectedAmount] = useState(0);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);

  const fromDate = dateRange[0]?.format("YYYY-MM-DD") || "";
  const toDate = dateRange[1]?.format("YYYY-MM-DD") || "";

  // get API

  // const { data, error } = useSWR(
  //   `${ServerIP}/payment/getAllPayments?${searchKey ? `search=${searchKey}&` : ''}${id !== 'all' ? `status=${id}&` : ''}${fromDate ? `fromDate=${fromDate}&` : ''}${toDate ? `toDate=${toDate}` : ''}`,
  //   fetcher
  // );

  const queryParams = [
    searchKey ? `search=${searchKey}` : '',
    id !== 'all' ? `status=${id}` : '',
    fromDate ? `fromDate=${fromDate}` : '',
    toDate ? `toDate=${toDate}` : ''
  ].filter(Boolean).join('&');

  const { data, error } = useSWR(
    `${ServerIP}/payment/getAllPayments${queryParams ? `?${queryParams}` : ''}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log(data, 'data');

      if (!data.payments || data.payments.length === 0) {
        setRows([]); // Set empty rows
        setTotalPendingAmount(0);
        setTotalSuccessfulAmount(0);
        setTotalRejectedAmount(0);
        return;
      }



      const totalPending = data?.payments?.filter(payment => payment.paymentStatus === "PENDING").reduce((sum, payment) => sum + payment.totalAmount, 0);
      const totalSuccessful = data?.payments?.filter(payment => payment.paymentStatus === "SUCCESSFUL").reduce((sum, payment) => sum + payment.totalAmount, 0);
      const totalRejected = data?.payments?.filter(payment => payment.paymentStatus === "REJECTED").reduce((sum, payment) => sum + payment.totalAmount, 0);

      // Update state
      setTotalPendingAmount(totalPending);
      setTotalSuccessfulAmount(totalSuccessful);
      setTotalRejectedAmount(totalRejected);

      const transformedRows = data?.payments?.map((payment) => ({
        ...payment,
        date: (
          <>
            <Typography variant="h6">{payment?.paymentDate.split('T')[0]}</Typography>
            <Typography variant="h6">{getTimeElapsed(payment?.paymentDate)}</Typography>
          </>
        ),
        gateway: (
          <>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#3797D3' }}>
              {payment?.paymentType}
            </Typography>
            <Typography variant="h6">{payment?.transactionNo}</Typography>
          </>
        ),
        user: (
          <>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>{payment?.userName}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#3797D3' }}>{payment?.userEmail}</Typography>
          </>
        ),
        amount: (
          <>
            <Grid display="flex" justifyContent="center">
              <Typography variant="h6" sx={{ color: '#6c6c6c' }}>{payment?.totalAmount}</Typography> +
              <Typography variant="h6" sx={{ fontWeight: 900, color: 'red' }}>{payment?.extraService}</Typography>
            </Grid>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#6c6c6c' }}>
              ₹{payment.totalAmount + payment.extraService}
            </Typography>
          </>
        ),
        status: <CustomEnableButton variant="outlined" status={payment.paymentStatus}>{payment.paymentStatus}</CustomEnableButton>,
        action: (
          <Stack justifyContent="end" spacing={2} direction="row">
            <DetailsButton variant="outlined" size="small" startIcon={<ComputerSharp />} component={Link} to={`/detailspayments/${payment.paymentId}`}>
              Details
            </DetailsButton>
          </Stack>
        ),
      }));
      setRows(transformedRows);
    }
  }, [data]);

  const getTimeElapsed = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate - givenDate;
    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInWeeks = diffInDays / 7;
    const diffInMonths = diffInDays / 30.44; // Approximate months
    const diffInYears = diffInDays / 365;

    if (diffInYears >= 1) {
      return `${Math.floor(diffInYears)} year${Math.floor(diffInYears) > 1 ? 's' : ''} ago`;
    } else if (diffInMonths >= 1) {
      return `${Math.floor(diffInMonths)} month${Math.floor(diffInMonths) > 1 ? 's' : ''} ago`;
    } else if (diffInWeeks >= 1) {
      return `${Math.floor(diffInWeeks)} week${Math.floor(diffInWeeks) > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${Math.floor(diffInDays)} day${Math.floor(diffInDays) > 1 ? 's' : ''} ago`;
    } else {
      return "Today";
    }
  }

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
      )
        }`;
    } else {
      return "Start Date - End Date";
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", gap: { xs: 2, md: 0 }, }}>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 500, color: "#34495e" }}>
          {id === "all" ? "Payment History" : id === "SUCCESSFUL" ? "Successful Payments" : id === "PENDING" ? "Pending Payments" : id === "REJECTED" ? "Rejected Payments" : id === "FAILED" ? "Initiated Payments" : id === "APPROVED" ? "Approved Payments" : "Payment History"}
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
          {rows.length !== 0 &&
            <>
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
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <Button sx={{ bgcolor: "#0D6A84", borderRadius: "0px 10px 10px 0px" }} onClick={''}>
                  <IconButton>
                    <SearchIcon sx={{ color: "white" }} />
                  </IconButton>
                </Button>
              </Stack>


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
                        pr: 2,
                      }}
                      endAdornment={
                        (selectedPreset !== "" || (dateRange[0] && dateRange[1])) && (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClearRange}>
                              <ClearIcon sx={{ color: "black" }} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    />

                    <Button sx={{ bgcolor: "#0D6A84", borderRadius: "0px 10px 10px 0px" }}>
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
            </>
          }

        </Box>
      </Box>

      {id === "all" &&
        <Box sx={{ mt: 3 }}>
          <Grid container sx={{ backgroundColor: '#ffffff', borderRadius: 2, justifyContent: { md: 'space-between', sm: 'start' } }}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Link to='/payments/SUCCESSFUL' style={{ textDecoration: "none", width: "100%" }} >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                    <Box sx={{ backgroundColor: "#8ad3aa", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircleIcon sx={{ color: "green", }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>₹{totalSuccessfulAmount}</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Successful Payment</Typography>
                    </CardContent>
                  </Box>
                  <Box>
                    <ArrowForwardIosIcon sx={{ color: "#000", fontSize: '18px' }} />
                  </Box>
                </Box>
              </Link>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Link to='/payments/PENDING' style={{ textDecoration: "none", width: "100%" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                    <Box sx={{ backgroundColor: "#ca9562", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <HourglassEmptyIcon sx={{ color: "#ff9f43" }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>₹{totalPendingAmount}</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Pending Payments</Typography>
                    </CardContent>
                  </Box>
                  <Box>
                    <ArrowForwardIosIcon sx={{ color: "#000", fontSize: '18px' }} />
                  </Box>
                </Box>
              </Link>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Link to='/payments/REJECTED' style={{ textDecoration: "none", width: "100%" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                    <Box sx={{ backgroundColor: "#eb222278", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BlockIcon sx={{ color: "#eb2222" }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>₹{totalRejectedAmount}</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Rejected Payment</Typography>
                    </CardContent>
                  </Box>
                  <Box>
                    <ArrowForwardIosIcon sx={{ color: "#000", fontSize: '18px' }} />
                  </Box>
                </Box>
              </Link>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Link to='/payments/FAILED' style={{ textDecoration: "none", width: "100%" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                    <Box sx={{ backgroundColor: "#ECEFF1", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ReceiptIcon sx={{ color: "#071251", }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>-</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Initiated Payment</Typography>
                    </CardContent>
                  </Box>
                  <Box>
                    <ArrowForwardIosIcon sx={{ color: "#000", fontSize: '18px' }} />
                  </Box>
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Box>
      }

      {/* <Box sx={{ pt: 4 }}>
        <DynamicDataTable columns={columns} rows={rows} />
      </Box> */}

      <Box sx={{ pt: 4 }}>
        {rows && rows.length > 0 ? (
          <DynamicDataTable columns={columns} rows={rows} />
        ) : (
          <NoDataFound />
        )}
      </Box>


    </Box >
  );
};

export default PaymentsPage;
