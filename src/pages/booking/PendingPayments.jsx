import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, TextField, Stack, Typography, InputAdornment, Menu, MenuItem, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import SearchIcon from "@mui/icons-material/Search";
// Date Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ComputerSharp, MoreVertOutlined } from '@mui/icons-material';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import DynamicDataTable from 'components/DynamicDataTable';
import useSWR from 'swr';
import axios from 'axios';

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'http://89.116.122.211:5001'
const token = `Bearer ${localStorage.getItem('token')}`;

const CustomEnableButton = styled(Button)(() => ({
  borderRadius: '50px',
  backgroundColor: '#ffa34c25',
  borderColor: '#ff9f43',
  color: '#ff9f43',
  padding: '2px 26px',
  fontSize: '12px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#ffa24c38',
    borderColor: '#ff9f43',
    color: '#ff9f43'
  },
}));

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

const CustomButton = styled(Button)(() => ({
  borderRadius: '3.2px',
  backgroundColor: '#4634ff',
  borderColor: '#4634ff',
  color: '#fff',
  fontSize: '0.825rem',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#4634ff',
    borderColor: '#4634ff',
    color: '#fff',
  },
}));

const columns = [
  { id: 'gatewayTransaction', label: 'Gateway | Transaction', minWidth: 170 },
  { id: 'initiated', label: 'Initiated', minWidth: 100, align: 'center' },
  { id: 'user', label: 'User', align: 'center' },
  { id: 'amount', label: 'Amount', minWidth: 100, align: 'center' },
  { id: 'conversion', label: 'Conversion', minWidth: 100, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

const data = [
  {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC1",
    date: "2024-11-26 07:52 PM",
    user: "John Doe",
    username: "@username",
    amount: 3465.0,
    fee: 23.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "Pending",
  },
  {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC88",
    date: "2024-11-26 07:52 PM",
    user: "abhi",
    username: "@abhi",
    amount: 3465.0,
    fee: 7.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "Pending",
  },
  {
    gateway: "BKash",
    transactionId: "3FDJFF8JPTC88",
    date: "2024-11-26 07:52 PM",
    user: "rajat",
    username: "@raj",
    amount: 3465.0,
    fee: 7.43,
    total: 3472.43,
    conversion: 381967.3,
    status: "Pending",
  },
];


const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const PendingPayments = () => {

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [msgToaster, setMsgToaster] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);

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


  // get API
  const { data, error } = useSWR(`${ServerIP}/booking/getAll`, fetcher);

  useEffect(() => {
    if (data) {
      console.log(data, 'data');
      const transformedRows = data.map((payments) => {
        const checkInDate = new Date(payments.checkInDate).toISOString().split('T')[0];
        const checkOutDate = new Date(payments.checkOutDate).toISOString().split('T')[0];

        return {
          ...payments,
          checkInCheckOut: `${checkInDate} | ${checkOutDate}`,
          // image: payments.icon === null ? '-' : payments.icon.split('/').pop(),
          status: <CustomEnableButton variant="outlined"> Pending </CustomEnableButton>,
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <DetailsButton variant="outlined" size="small" startIcon={<ComputerSharp />} href={`bookingDetailsPage/${payments.bookingId}`}>Details</DetailsButton>
            </Stack>
          ),
        }

      });
      setRows(transformedRows);
    }
    if (msgToaster) {
      handleOpeningToasterState();
    }
  }, [token, data, msgToaster]);


  if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;


  return (
    <Box>
      <Grid sx={{ display: 'flex', mb: 4 }}>
        <Grid flexGrow={1}>
          <Typography variant="h4">Pending Payments</Typography>
        </Grid>
        <Grid display='flex'>
          {/**Search Bar */}
          <Stack direction="row">
            <TextField sx={{ flex: 1, borderRadius: "10px", bgcolor: "white", width: { xs: "100%", sm: "auto" }, }} variant="outlined" placeholder="Username / Email" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button sx={{ bgcolor: "blue" }}>
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
              <Stack direction="row" sx={{ width: { xs: "100%", sm: "auto" } }}>
                <TextField
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
                    borderRadius: "10px",
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
                <Button sx={{ bgcolor: "blue" }}>
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
        </Grid>
      </Grid>
      <DynamicDataTable columns={columns} rows={rows} />
    </Box>
  );
}

export default PendingPayments
