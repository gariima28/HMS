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
import useSWR from "swr";
import axios from "axios";


export const data = [
  {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC1",
    date: "2024-11-26 07:52 PM",
    user: "John Doe",
    username: "@johnDoe",
    amount: 3465.0,
    fee: 23.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "pending",
  },
  {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC82",
    date: "2024-11-26 07:52 PM",
    user: "abhi",
    username: "@abhi",
    amount: 3465.0,
    fee: 7.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "initiated",
  },
  {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC83",
    date: "2024-11-26 07:52 PM",
    user: "rajat",
    username: "@raj",
    amount: 3465.0,
    fee: 7.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "succeed",
  },
  {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC4",
    date: "2024-11-26 07:52 PM",
    user: "aadi",
    username: "@aadi",
    amount: 3465.0,
    fee: 23.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "pending",
  }, {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC5",
    date: "2024-11-26 07:52 PM",
    user: "rahul",
    username: "@rahul",
    amount: 3465.0,
    fee: 23.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "initiated",
  }, {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC6",
    date: "2024-11-26 07:52 PM",
    user: "rituraj",
    username: "@rituraj",
    amount: 3465.0,
    fee: 23.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "succeed",
  },
  {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC7",
    date: "2024-11-26 07:52 PM",
    user: "rituraj",
    username: "@rituraj",
    amount: 3465.0,
    fee: 23.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "succeed",
  },
];


const DetailsButton = styled(Button)(() => ({
  borderRadius: '3.2px',
  backgroundColor: '#fff',
  borderColor: '#4634ff',
  color: '#4634ff',
  fontSize: '0.825rem',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#4634ff',
    borderColor: '#4634ff',
    color: '#fff',
  },
}));

const CustomEnableButton = styled(Button)(({ status }) => ({
  borderRadius: '50px',
  backgroundColor: status === 'running' ? '#E6F4EA' : '#ffa34c25',
  borderColor: status === 'running' ? '#57C168' : '#ff9f43',
  color: status === 'running' ? '#57C168' : '#ff9f43',
  padding: '2px 26px',
  fontSize: '12px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: status === 'running' ? '#D4ECD9' : '#ffa24c38',
    borderColor: status === 'running' ? '#57C168' : '#ff9f43',
    color: status === 'running' ? '#57C168' : '#ff9f43'
  },
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
  console.log(id)
  const [search, setSearch] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [rows, setRows] = useState([])
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);

  // get API
  const { data, error } = useSWR(`${ServerIP}/payment/getAllPayments`, fetcher);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [allPayments, setAllPayments] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();


  useEffect(() => {
    if (data) {
      // setShowDataTableLoader(true)
      console.log(data, 'data');
      const transformedRows = data?.payments.map((payment) => {

        return {
          ...payment,
          date:
            <>
              <Typography variant="h6">{payment?.paymentDate.split('T')[0]}</Typography>
              <Typography variant="h6">{getTimeElapsed(payment?.paymentDate)}</Typography>
            </>,
          gateway:
            <>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#0d6efd' }}>{payment?.paymentType}</Typography>
              <Typography variant="h6">{payment?.transactionNo}</Typography>
            </>,
          user:
            <>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>{payment?.userName}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#0d6efd' }}>{payment?.userEmail}</Typography>
            </>,
          amount:
            <>
              <Grid display='flex' justifyContent='center'>
                <Typography variant="h6" sx={{ color: '#6c6c6c' }}>{payment?.totalAmount}</Typography> + <Typography variant="h6" sx={{ fontWeight: 900, color: 'red' }}>{payment?.extraService}</Typography>
              </Grid>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#6c6c6c' }}>₹{payment.totalAmount + payment.extraService}</Typography>
            </>,
          status: <CustomEnableButton variant="outlined" status={`${payment.status ? 'running' : 'upcoming'}`}> {payment.status ? 'Running' : 'Upcoming'} </CustomEnableButton>,
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <DetailsButton variant="outlined" size="small" startIcon={<ComputerSharp />} component={Link} to={`/detailspayments/${payment.paymentId}`}>Details</DetailsButton>
            </Stack>
          ),
        }

      });
      setRows(transformedRows);
      // setTimeout(() => {
      //   setShowDataTableLoader(false)
      // }, 1800);
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
      )}`;
    } else {
      return "Start Date - End Date";
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", gap: { xs: 2, md: 0 }, }} >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 500, color: "#34495e" }}>
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
                <SearchIcon sx={{ color: "white", }} />
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

                  {/* <Box>
                    {selectedPreset === "Custom Range" && (
                      <Box sx={{ p: 2 }}>
                        <DateRangeCalendar
                          calendars={2}
                          value={dateRange}
                          onChange={(newValue) => {
                            setDateRange(newValue);
                            if (newValue[0] && newValue[1]) {
                              handleCloseMenu();
                            }
                          }}
                          renderInput={(startProps, endProps) => (
                            <Box display="flex" alignItems="center" gap={1}>
                              <TextField
                                {...startProps}
                                placeholder="Start Date"
                                sx={{
                                  flex: 1,
                                  backgroundColor: "#fff",
                                  borderRadius: "5px",
                                }}
                              />
                              <Box sx={{ mx: 1 }}> - </Box>
                              <TextField
                                {...endProps}
                                placeholder="End Date"
                                sx={{
                                  flex: 1,
                                  backgroundColor: "#fff",
                                  borderRadius: "5px",
                                }}
                              />
                            </Box>
                          )}
                        />
                      </Box>
                    )}
                  </Box> */}
                </Box>
              </Menu>
            </Box>
          </LocalizationProvider>
        </Box>
      </Box>

      {id === "all" &&
        <Box sx={{ mt: 3 }}>
          <Grid container sx={{ backgroundColor: '#ffffff', borderRadius: 2, justifyContent: {md:'space-between', sm:'start' } }}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Link to="/succeed" style={{ textDecoration: "none", width: "100%" }} >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                    <Box sx={{ backgroundColor: "#8ad3aa", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      < CheckCircleIcon sx={{ color: "green", }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>$1686</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Successfull Payment</Typography>
                    </CardContent>
                  </Box>
                  <Box>
                    <ArrowForwardIosIcon sx={{ color: "#000", fontSize: '18px' }} />
                  </Box>

                </Box>
              </Link>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Link to="/pending" style={{ textDecoration: "none", width: "100%" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", borderRadius: 2, padding: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: 2, padding: 1 }}>
                    <Box sx={{ backgroundColor: "#ca9562", borderRadius: '10%', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      < HourglassEmptyIcon sx={{ color: "#ff9f43" }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ textDecoration: "none", color: "black", fontWeight: "400" }}>$1686</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "none" }}>Pending Payment</Typography>
                    </CardContent>
                  </Box>
                  <Box>
                    <ArrowForwardIosIcon sx={{ color: "#000", fontSize: '18px' }} />
                  </Box>

                </Box>
              </Link>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
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
                    <ArrowForwardIosIcon sx={{ color: "#000", fontSize: '18px' }} />
                  </Box>

                </Box>
              </Link>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
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
                    <ArrowForwardIosIcon sx={{ color: "#000", fontSize: '18px' }} />
                  </Box>

                </Box>
              </Link>
            </Grid>
          </Grid>
        </Box>
      }

      <Box sx={{ pt: 4 }}>
        <DynamicDataTable columns={columns} rows={rows} />
      </Box>

    </Box >
  );
};

export default PaymentsPage;
