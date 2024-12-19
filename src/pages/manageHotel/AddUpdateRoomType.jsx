import {
    Box,
    Button,
    Card,
    CardMedia,
    Checkbox,
    Divider,
    Grid,
    InputAdornment,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const RoomType = () => {
    const [isFeatured, setIsFeatured] = useState(false);
    const [totalBeds, setTotalBeds] = useState(0);
    const bedOptions = ["Select One", "Single", "Double", "Queen", "Test"];
    const [selectedValues, setSelectedValues] = useState([]);
    const fileInputRef = useRef(null);
    const [imageSrc, setImageSrc] = React.useState(null);

    // const handleImageChange = (e) => {
    //   const file = e.target.files[0];
    //   if (file) {
    //     setImageSrc(URL.createObjectURL(file));
    //   }
    // };

    const toggleFeatured = () => {
        setIsFeatured((prev) => !prev);
    };

    const handleChange = (event) => {
        setSelectedValues(event.target.value);
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };
    const handleTotalBedsChange = (event) => {
        const value = parseInt(event.target.value) || 0;
        setTotalBeds(value);
    };

    const handleRemoveBed = () => {
        setTotalBeds((prevBeds) => Math.max(prevBeds - 1, 0));
    };

    const options = [
        "Unlimited Wifi",
        "AC",
        "Pool",
        "Washing Machine",
        "TV",
        "Freezer",
    ];
    return (
        <Box>
            {/* Heading */}
            <Box item sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    sx={{
                        color: "#34495e",
                        fontWeight: 500,
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.5rem",
                        },
                    }}
                >
                    Add Room Type
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    sx={{
                        color: "#10163a",
                        border: "1px solid #10163a",
                        p: "8px 16px",
                        ":hover": {
                            backgroundColor: "#10163a",
                            color: "white",
                        },
                        transition: "all 0.3s ease",
                    }}
                >
                    Back
                </Button>
            </Box>

            {/* General Information Section */}
            <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2, p: 1 }}>
                <Typography
                    sx={{
                        color: "#34495e",
                        p: 2,
                        fontWeight: 550,
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.5rem",
                        },
                        lineHeight: "1.7",
                    }}
                >
                    General Information
                </Typography>
                <Divider />

                <Grid container spacing={5} sx={{ p: 2 }}>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Name <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField fullWidth />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Slug <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField fullWidth />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Fare/Night <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            type="number"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: "#f3f4f6",
                                                color: "#34495e",
                                                fontWeight: "bold",
                                                boxShadow: "none",
                                                borderRadius: "0 4px 4px 0",
                                                textTransform: "none",
                                                height: "100%",
                                                minWidth: "50px",
                                                "&:hover": {
                                                    bgcolor: "#e0e0e0",
                                                },
                                            }}
                                        >
                                            USD
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Cancellation Fee/Night <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField
                            type="number"
                            defaultValue="0"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: "#f3f4f6",
                                                color: "#34495e",
                                                fontWeight: "bold",
                                                boxShadow: "none",
                                                borderRadius: "0 4px 4px 0",
                                                textTransform: "none",
                                                height: "100%",
                                                minWidth: "50px",
                                                "&:hover": {
                                                    bgcolor: "#e0e0e0",
                                                },
                                            }}
                                        >
                                            USD
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Total Adult <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField fullWidth type="number" />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Total Child <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField fullWidth type="number" />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Amenities
                        </Typography>
                        <Select
                            labelId="multi-select-label"
                            id="multi-select"
                            multiple
                            value={selectedValues}
                            onChange={handleChange}
                            renderValue={(selected) => selected.join(", ")}
                            fullWidth
                        >
                            {options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    <Checkbox checked={selectedValues.includes(option)} />
                                    <ListItemText primary={option} />
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Facilities
                        </Typography>
                        <Select labelId="dropdown-label" id="dropdown" fullWidth>
                            <MenuItem sx={{ bgcolor: "white", color: "gray" }}>
                                No results found
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Keywords
                        </Typography>
                        <Select labelId="dropdown-label" id="dropdown" fullWidth>
                            <MenuItem sx={{ bgcolor: "white", color: "gray" }}>
                                No results Found
                            </MenuItem>
                        </Select>
                        <Typography sx={{ color: "#212529" }}>
                            Separate multiple keywords by ,(comma) or{" "}
                            <span style={{ color: "#d63384" }}>enter</span> key
                        </Typography>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 550,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Featured
                        </Typography>
                        <Button
                            variant="contained"
                            color={isFeatured ? "success" : "error"}
                            onClick={toggleFeatured}
                            sx={{
                                width: "100%",
                                height: "50%",
                                padding: "10px 30px",
                                textTransform: "none",
                            }}
                        >
                            {isFeatured ? "Featured" : "Unfeatured"}
                        </Button>
                        <Typography sx={{ color: "#d63384" }}>
                            Featured room will be displayed in featured rooms section
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Bed Per Room Section */}
            <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2, p: 1 }}>
                <Typography
                    variant="h5"
                    sx={{
                        p: 2,
                        color: "#34495e",
                        fontWeight: 550,
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.5rem",
                        },
                        lineHeight: "1.7",
                    }}
                >
                    Bed Per Room
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#34495e",
                            fontWeight: 550,
                            fontSize: "1.125rem",
                            lineHeight: "1.7",
                        }}
                    >
                        Total Bed
                    </Typography>
                    <TextField
                        type="number"
                        sx={{ width: "30%", mb: 5 }}
                        value={totalBeds}
                        onChange={handleTotalBedsChange}
                    />
                </Box>
                <Grid
                    container
                    spacing={10}
                    sx={{ p: 2, justifyContent: "space-evenly" }}
                >
                    {Array.from({ length: totalBeds }, (_, index) => (
                        <Grid item xs={12} sm={3} key={index}>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                flexDirection={"column"}
                            >
                                <Typography>
                                    {`Bed - ${index + 1}`} <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <Box sx={{ display: "flex", width: "250px" }}>
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        defaultValue={`${bedOptions[0]}`}
                                    >
                                        {bedOptions.map((option, idx) => (
                                            <MenuItem key={idx} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Button
                                        onClick={() => handleRemoveBed(index)}
                                        variant="text"
                                        sx={{
                                            color: "white",
                                            backgroundColor: "#dc3545",
                                            width: "2%",
                                            borderRadius: "0 10px 10px 0",
                                        }}
                                    >
                                        X
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Main Image and Description */}
            <Grid
                container
                spacing={2}
                sx={{
                    bgcolor: "#f3f3f9",
                    borderRadius: 2,
                }}
            >
                {/* Main Image */}
                <Grid
                    item
                    size={{ xs: 12, sm: 6 }}
                    sx={{ mt: 3, bgcolor: "#fff", borderRadius: 2, p: 1 }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            p: 2,
                            color: "#34495e",
                            fontWeight: 550,
                            fontSize: {
                                xs: "1.2rem",
                                sm: "1.5rem",
                            },
                            lineHeight: "1.7",
                        }}
                    >
                        Main Image
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Card
                        sx={{
                            margin: "20px 20px",
                            height: 300,
                            border: "6px solid #ddd",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        {imageSrc ? (
                            <CardMedia
                                component="img"
                                image={imageSrc}
                                alt="Uploaded Image"
                                sx={{ height: "100%", width: "100%", objectFit: "contain" }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    color: "#888",
                                }}
                            >
                                <Typography variant="h1">1000X500</Typography>
                            </Box>
                        )}
                        <CloudUploadIcon
                            variant="contained"
                            color="primary"
                            onClick={handleIconClick}
                            sx={{
                                position: "absolute",
                                bottom: 4,
                                right: 8,
                                borderRadius: "50%",
                                minWidth: "36px",
                                height: "36px",
                                padding: 0,
                            }}
                        />

                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={(e) => console.log(e.target.files)}
                        />
                    </Card>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ display: "block", marginTop: 1, fontSize: 20, px: 2, mb: 2 }}
                    >
                        Supported Files: <strong>.png, .jpg, .jpeg</strong>. Image will be
                        resized into <strong>1000x500px</strong>.
                    </Typography>
                </Grid>

                {/*  Description */}
                <Grid
                    item
                    size={{ xs: 12, sm: 6 }}
                    sx={{ mt: 3, bgcolor: "#fff", borderRadius: 2, p: 1 }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            p: 2,
                            color: "#34495e",
                            fontWeight: 550,
                            fontSize: {
                                xs: "1.2rem",
                                sm: "1.5rem",
                            },
                            lineHeight: "1.7",
                        }}
                    >
                        Description
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box
                        sx={{
                            overflow: "hidden",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    >
                        <ReactQuill
                            theme="snow"
                            style={{
                                height: "300px",
                                boxSizing: "border-box",
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                margin: 0,
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/*  Images section */}
            <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2, p: 1 }}>
                <Typography
                    variant="h5"
                    sx={{
                        p: 2,
                        color: "#34495e",
                        fontWeight: 550,
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.5rem",
                        },
                        lineHeight: "1.7",
                    }}
                >
                    Images
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ p: 2, color: "#1e9ff2", fontSize: 15 }}
                >
                    Each Image will be resized into 1000*500
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Card
                    sx={{
                        p: 2,
                        margin: "20px",
                        height: 250,
                        border: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        cursor: "pointer",
                    }}
                >
                    <CloudUploadIcon
                        fontSize="large"
                        sx={{ color: "#666" }}
                        onClick={handleIconClick}
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(e) => console.log(e.target.files)}
                    />
                    <Typography variant="h6" color="textSecondary">
                        Drag & Drop files here or click to browse
                    </Typography>
                </Card>
            </Box>

            {/* Cancellation Policy Section */}
            <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2, p: 1 }}>
                <Typography
                    variant="h5"
                    sx={{
                        p: 2,
                        color: "#34495e",
                        fontWeight: 550,
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.5rem",
                        },
                        lineHeight: "1.7",
                    }}
                >
                    Cancellation Policy
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box
                    sx={{
                        overflow: "hidden",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                    }}
                >
                    <ReactQuill
                        theme="snow"
                        style={{
                            height: "200px",
                            boxSizing: "border-box",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                            margin: 0,
                        }}
                    />
                </Box>
            </Box>

            {/* Submit Button */}
            <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2, p: 1 }}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: "#4a00e0",
                        color: "#fff",
                        ":hover": { backgroundColor: "#3700b3" },
                        padding: "10px 0",
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default RoomType;



























// import React, { useEffect, useState } from 'react'
// import { styled } from '@mui/material/styles';
// import { Box, Button, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid/Grid';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// // Date Picker
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { ComputerSharp, MoreVertOutlined } from '@mui/icons-material';
// import { RightOutlined } from '@ant-design/icons';
// import useSWR from 'swr';
// import axios from 'axios';
// import { useParams } from 'react-router';

// // const LocalGirjesh = 'http://192.168.20.109:5001';
// const ServerIP = 'http://89.116.122.211:5001'
// const token = `Bearer ${localStorage.getItem('token')}`;

// const CustomButton = styled(Button)(() => ({
//     borderRadius: '3.2px',
//     backgroundColor: '#4634ff',
//     borderColor: '#4634ff',
//     color: '#fff',
//     fontSize: '0.825rem',
//     textTransform: 'none',

//     '&:hover': {
//         backgroundColor: '#4634ff',
//         borderColor: '#4634ff',
//         color: '#fff',
//     },
// }));

// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

// const AddUpdateRoomType = () => {

//     let { id } = useParams();

//     const [roomName, setRoomName] = useState('')

//     // get By Id API
//     const { data, error } = useSWR(
//         id !== 'add' ? `${ServerIP}/roomTypes/getById/${id}` : null,
//         fetcher
//     );


//     // useEffect
//     useEffect(() => {
//         if (data) {
//             setMsgToaster(data?.message)
//             console.log(data?.roomTypes, 'data');
//             setRoomName(data?.roomTypes?.roomName)
//             setRoomFare(data?.roomTypes?.roomFare)
//             setCancelationFee(data?.roomTypes?.cancelFee)
//             setRoomName(data?.roomTypes?.adult)
//             setRoomName(data?.roomTypes?.children)
//             setRoomName(data?.roomTypes?.roomName)
//             setRoomName(data?.roomTypes?.roomName)
//             setRoomName(data?.roomTypes?.roomName)
//             setRoomName(data?.roomTypes?.roomName)
//         }
//     }, [data]);

//     //   // Add Function
//     //   const AddNewAmenity = async () => {
//     //     console.log('start')
//     //     try {
//     //       console.log('try')
//     //       const formData = new FormData();
//     //       formData.append('roomTypesName', formDataa.roomTypesName)
//     //       formData.append('status', formDataa.roomTypesStatus)
//     //       formData.append('icon', formDataa.roomTypesIcon)

//     //       const response = await addRoomTypesApi(formData);
//     //       console.log(response, 'response')
//     //       if (response.status === 200) {
//     //         if (response?.data?.status === 'success') {
//     //           console.log(response?.data?.message, 'success')
//     //           navigate('/roomTypes');
//     //         }
//     //       }
//     //     }
//     //     catch (error) {
//     //       console.log('catch')
//     //     }
//     //     finally {
//     //       console.log('finally')
//     //     }
//     //   };

//     //   // Update Function
//     //   const UpdateRoomTypesStatus = async (id, roomTypeStatus) => {
//     //     try {
//     //       // const formData = new FormData();
//     //       // formData.append('status', roomTypeStatus ? false : true)
//     //       // var response = await updateRoomTypesStatus(id, formData);
//     //       // if (response?.status === 200) {
//     //       //   if (response?.data?.status === 'success') {
//     //       //     setMsgToaster(response?.data?.message)
//     //       //   }
//     //       //   else {
//     //       //     setMsgToaster(response?.data?.message)
//     //       //   }
//     //       // } else {
//     //       //   setMsgToaster(response?.data?.message)
//     //       // }
//     //     } catch (error) {
//     //       console.error('Error during update:', error);
//     //       setMsgToaster('Error during update:', error)
//     //     }
//     //   }


//     // if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
//     // if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

//     // console.log(getByIdData, 'getByIdData')

//     return (
//         <Box>
//             <Grid sx={{ display: 'flex', mb: 4 }}>
//                 <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//                     <Typography variant="h4">Active Bookings</Typography>
//                 </Grid>
//                 <Grid>
//                     <Stack justifyContent='start' spacing={2} direction="row">
//                         <CustomButton variant="outlined" href="bookRoom">
//                             <RightOutlined />  Book New
//                         </CustomButton>
//                     </Stack>
//                 </Grid>
//             </Grid>
//             <Grid container spacing={1} sx={{ backgroundColor: '#ffffff', p: 1, mb: 4 }}>
//                 <Grid xs={12} sm={6} md={6} lg={3} >
//                     <Stack spacing={1}>
//                         <InputLabel htmlFor="Keywords">Keywords</InputLabel>
//                         <OutlinedInput id="Keywords" type="text" name="roomType" placeholder="" fullWidth />
//                     </Stack>
//                 </Grid>
//                 <Grid xs={12} sm={6} md={6} lg={3} >
//                     <Stack spacing={1}>
//                         <InputLabel htmlFor="subTitle">Check In </InputLabel>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker />
//                         </LocalizationProvider>
//                     </Stack>
//                 </Grid>
//                 <Grid xs={12} sm={6} md={6} lg={3} >
//                     <Stack spacing={1}>
//                         <InputLabel htmlFor="subTitle">Checkout </InputLabel>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker />
//                         </LocalizationProvider>
//                     </Stack>
//                 </Grid>
//                 <Grid alignContent='end' xs={12} sm={6} md={6} lg={3} >
//                     <CustomButton variant="outlined" fullWidth sx={{ p: 1 }}>
//                         <FilterAltIcon sx={{ color: '#fff' }} /> &nbsp; Search
//                     </CustomButton>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }

// export default AddUpdateRoomType
