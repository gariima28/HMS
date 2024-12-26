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
    Typography, IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";



const RoomType = () => {
    const [submitted, setSubmitted] = useState(false);



    const [formData, setFormData] = useState({
        roomName: "",
        roomFare: 0,
        noOfRooms: 0,
        adult: 0,
        children: 0,
        cancelFee: 0,
        keywords: [],
        facilities: [],
        roomTypeImage: [],
        roomTypeStatus: true,
        featureStatus: false,
        roomDescription: "",
        cancelDescription: "",
        totalBed: 0,
        amenitiesID: [],
        bedTypesID: [],
    });

    const [imageSrc, setImageSrc] = useState(null); // For displaying the main image
    const [multipleImagesSrc, setMultipleImagesSrc] = useState([]);
    const fileInputRef = useRef(null);
    const multipleFileInputRef = useRef(null);


    const [error, setError] = useState("");
    const [amenitiesList, setAmenitiesList] = useState([]);
    const [facilitiesList, setFacilitiesList] = useState([]);
    const [bedTypeList, setBedTypeList] = useState([]);

    const [errors, setErrors] = useState({
        roomName: "",
        roomFare: "",
        cancelFee: "",
        adult: "",
        children: "",
        amenitiesID: "",
        facilities: "",
        keywords: "",
    });




    const removeImage = (index) => {
        // Remove the image from both the preview and the form data
        setMultipleImagesSrc((prevSrc) => prevSrc.filter((_, i) => i !== index));

        setFormData((prevState) => ({
            ...prevState,
            roomTypeImage: prevState.roomTypeImage.filter((_, i) => i !== index), // Remove the file from the state
        }));
    };


    const removeMainImage = () => {
        // Set the imageSrc to null or an empty string to remove the image
        setImageSrc(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset the file input value
        }
    };
    const handleIconClick = () => {
        fileInputRef.current.click();
    };


    const handleRemoveBed = (index) => {
        const updatedBedTypes = [...formData.bedTypesID];
        updatedBedTypes.splice(index, 1); // Remove the bed at the given index
        setFormData({
            ...formData,
            totalBed: formData.totalBed - 1, // Decrease total bed count
            bedTypesID: updatedBedTypes, // Update bedTypesID accordingly
        });
    };

    const handleBedTypeChange = (e, index) => {
        const selectedBedTypeId = e.target.value; // Get the selected bed type ID

        setFormData((prevFormData) => {
            const updatedBedTypesID = [...prevFormData.bedTypesID];
            updatedBedTypesID[index] = selectedBedTypeId; // Update the specific index
            return {
                ...prevFormData,
                bedTypesID: updatedBedTypesID, // Update the bedTypesID array
            };
        });
    };

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMVkktMDkwMzE0MDkiLCJlbWFpbCI6ImdhcmltYUBzY3JpemEuaW4iLCJyb2xlVHlwZSI6IkFETUlOIiwiaWF0IjoxNzM0OTI5NDA4LCJleHAiOjE3MzQ5NzI2MDh9.c1Jje06szSc3UsYnO1H5qDSkMbBLy0lJAZZyupqUVcE"

    const fetchBedTypes = async () => {
        try {
            if (!token) {
                console.error("Token is missing or invalid!");
                return;
            }

            const response = await axios.get(`http://89.116.122.211:5001/bedTypes/getAll`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBedTypeList(response.data.bedTypes);
            console.log(response.data.bedTypes);
        } catch (err) {
            setError("Error fetching Bed Types");
            console.error(err.response || err);
        }
    };

    const fetchAmenities = async () => {
        try {
            if (!token) {
                console.error("Token is missing or invalid!");
                return;
            }

            const response = await axios.get(`http://89.116.122.211:5001/amenites/getAll`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAmenitiesList(response.data.Amenities);
        } catch (err) {
            setError("Error fetching amenities");
            console.error(err.response || err);
        }
    };
    const fetchFacilities = async () => {
        try {
            if (!token) {
                console.error("Token is missing or invalid!");
                return;
            }

            const response = await axios.get(`http://89.116.122.211:5001/facilities/getAll`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.Facilities)
            setFacilitiesList(response.data.Facilities);
        } catch (err) {
            setError("Error fetching Facilities");
            console.error(err.response || err);
        }
    };

    useEffect(() => {
        fetchAmenities();
        fetchBedTypes();
        fetchFacilities();
    }, []);

    const validate = () => {
        const newErrors = {};

        if (submitted) { // Only validate if the form is submitted
            // Validate required fields
            if (!formData.roomName) newErrors.roomName = "Name is required.";
            if (!formData.roomFare || formData.roomFare <= 0) newErrors.roomFare = "Fare per night must be a positive number.";
            if (!formData.cancelFee || formData.cancelFee <= 0) newErrors.cancelFee = "Cancellation fee must be a positive number.";
            if (!formData.adult || formData.adult <= 0) newErrors.adult = "Total adults must be a positive number.";
            if (!formData.children || formData.children < 0) newErrors.children = "Total children must be zero or a positive number.";
            if (!formData.amenitiesID.length) newErrors.amenitiesID = "At least one amenity must be selected.";
            if (!formData.facilities.length) newErrors.facilities = "At least one facility must be selected.";
            if (!formData.keywords.length) newErrors.keywords = "Keywords are required.";

            const plainText = formData.cancelDescription.replace(/<[^>]*>/g, '').trim();
            if (!plainText) {
                newErrors.cancelDescription = "Cancellation policy description is required.";
            }
            if (!formData.totalBed || formData.totalBed <= 0) {
                newErrors.totalBed = "Total bed count must be a positive number.";
            }
            // Validate bed types for each bed
            if (formData.totalBed > 0) {
                formData.bedTypesID.forEach((bedType, index) => {
                    if (!bedType) {
                        newErrors[`bedTypesID-${index}`] = `Bed ${index + 1} must have a selected type.`;
                    }
                });
            }

            if (!imageSrc) {
                newErrors.mainImage = "Main image is required.";
            }

            if (multipleImagesSrc.length === 0) {
                newErrors.multipleImages = "At least one image is required.";
            }

            const roomDescriptionText = formData.roomDescription.replace(/<[^>]*>/g, '').trim();
            if (!roomDescriptionText) {
                newErrors.roomDescription = "Room description is required.";
            }
        }

        // Set errors state
        setErrors(newErrors);

        // Return true if no errors, otherwise false
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e, index = null, fieldName = null) => {
        const { name, value } = e.target || e; // To handle ReactQuill's change event

        if (index !== null && fieldName === "bedTypesID") {
            // Handle changes for bedTypesID with index
            setFormData((prevFormData) => {
                const updatedBedTypes = [...prevFormData.bedTypesID];
                updatedBedTypes[index] = value; // Update the specific index
                return {
                    ...prevFormData,
                    bedTypesID: updatedBedTypes,
                };
            });
        } else if (name === "totalBed") {
            const updatedBedTypes = Array(Number(value)).fill("");
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: Number(value),
                bedTypesID: updatedBedTypes,
            }));
        } else if (name === "amenitiesID") {
            // Handle multiple select for amenitiesID
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value, // Directly set the selected values for amenitiesID
            }));
        } else if (name === "keywords") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value.split(",").map((keyword) => keyword.trim()),
            }));
        } else if (name === "facilities") {
            // Handle multiple selections for facilities
            const selectedValues = typeof value === 'string' ? value.split(',') : value;
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: selectedValues,
            }));
        }
        else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
        validate();
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a URL for the image preview
            const imageUrl = URL.createObjectURL(file);

            // Update the state with the uploaded file
            setFormData((prev) => ({
                ...prev,
                roomTypeImage: [file, ...prev.roomTypeImage.slice(1)], // Store the main image as a File object
            }));

            setImageSrc(imageUrl);
        }
    };

    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        const newImages = [];

        // Validate each file
        files.forEach((file) => {
            if (validTypes.includes(file.type)) {
                newImages.push(file);
            } else {
                alert("Please upload a valid image (PNG, JPG, JPEG).");
            }
        });

        // Check the number of files
        if (multipleImagesSrc.length + newImages.length > 5) {
            alert("You can upload a maximum of 5 images.");
        } else {
            // Update state with the new images
            setFormData((prevState) => ({
                ...prevState,
                roomTypeImage: [...prevState.roomTypeImage, ...newImages], // Append new images as File objects
            }));

            // Update image preview URLs
            const newImageSrcs = newImages.map((file) => URL.createObjectURL(file));
            setMultipleImagesSrc((prev) => [
                ...prev,
                ...newImageSrcs,
            ]);
        }
    };


    const handleSubmit = async () => {
        setSubmitted(true);

        if (!validate()) {
            return;
        }

        try {
            const formDataToSubmit = new FormData();

            // Sanitize roomDescription and cancelDescription
            const sanitizedRoomDescription = formData.roomDescription.replace(/<[^>]*>/g, '').trim();
            const sanitizedCancelDescription = formData.cancelDescription.replace(/<[^>]*>/g, '').trim();

            // Append sanitized data
            Object.keys(formData).forEach((key) => {
                if (key !== "roomTypeImage" && key !== "roomDescription" && key !== "cancelDescription") {
                    formDataToSubmit.append(key, formData[key]);
                }
            });

            // Append sanitized roomDescription and cancelDescription
            formDataToSubmit.append("roomDescription", sanitizedRoomDescription);
            formDataToSubmit.append("cancelDescription", sanitizedCancelDescription);

            // Append images to the formData for submission
            formData.roomTypeImage.forEach((file, index) => {
                if (file instanceof File) {
                    formDataToSubmit.append(`roomTypeImage[${index}]`, file); // Append each image file to FormData
                }
            });

            // Send the data to the API
            const response = await axios.post(
                "http://89.116.122.211:5001/roomTypes/add",
                formDataToSubmit,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Room Type Added Successfully", response.data);
            setError(""); // Clear any previous errors

            // Reset form data to initial state
            setFormData({
                roomName: "",
                roomFare: 0,
                noOfRooms: 0,
                adult: 0,
                children: 0,
                cancelFee: 0,
                keywords: [],
                facilities: [],
                roomTypeImage: [],
                roomTypeStatus: true,
                featureStatus: false,
                roomDescription: "",
                cancelDescription: "",
                totalBed: 0,
                amenitiesID: [],
                bedTypesID: [],
            });

        } catch (err) {
            console.error("Error Adding Room Type:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Something went wrong.");
        }
    };

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
            <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2 }}>

                <Typography
                    sx={{
                        color: "#34495e",
                        p: "12px",
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

                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Name <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField fullWidth name="roomName"
                            value={formData.roomName}
                            onChange={handleInputChange} required
                            error={!!errors.roomName}
                            helperText={errors.roomName} />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Slug <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField fullWidth />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Fare/Night <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="roomFare"
                            value={formData.roomFare}
                            onChange={handleInputChange}
                            required
                            error={!!errors.roomFare}
                            helperText={errors.roomFare}
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
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Cancellation Fee/Night <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField
                            type="number"
                            name="cancelFee"
                            value={formData.cancelFee}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            error={!!errors.cancelFee}
                            helperText={errors.cancelFee}
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
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Total Adult <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField fullWidth type="number" name="adult"
                            value={formData.adult}
                            onChange={handleInputChange} required
                            error={!!errors.adult}
                            helperText={errors.adult} />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Total Child <span style={{ color: "#dc3545" }}>*</span>
                        </Typography>
                        <TextField fullWidth type="number" name="children"
                            value={formData.children}
                            onChange={handleInputChange} required
                            error={!!errors.children}
                            helperText={errors.children} />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
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
                            name="amenitiesID"
                            value={formData.amenitiesID}
                            onChange={handleInputChange}
                            required
                            error={submitted && formData.amenitiesID.length === 0}
                            renderValue={(selected) =>
                                selected
                                    .map((id) => {
                                        const amenity = amenitiesList.find((item) => item.amenitiesId === id);
                                        return amenity?.amenitiesName || id; // Display the name or ID if name is not found
                                    })
                                    .join(", ")
                            }

                            fullWidth
                        >
                            {amenitiesList.map((option) => (
                                <MenuItem key={option.amenitiesId} value={option.amenitiesId}>
                                    <Checkbox checked={formData.amenitiesID.includes(option.amenitiesId)} />
                                    <ListItemText primary={option.amenitiesName} />
                                </MenuItem>
                            ))}
                        </Select>
                        {submitted && formData.amenitiesID.length === 0 && (
                            <Typography sx={{ color: "red", fontSize: "0.75rem", mt: 1 }}>
                                Please select at least one amenity.
                            </Typography>
                        )}
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Facilities
                        </Typography>
                        <Select
                            fullWidth
                            multiple
                            required
                            value={formData.facilities}
                            onChange={(e) => handleInputChange({ target: { name: "facilities", value: e.target.value } })}
                            renderValue={(selected) => selected.join(', ')} // Display selected values as comma-separated string
                            error={submitted && formData.facilities.length === 0}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200,
                                    },
                                },
                            }}
                            sx={{
                                "& .MuiInputBase-input": {
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                },
                            }}
                        >
                            {facilitiesList.map((facility, index) => (
                                <MenuItem key={facility.facilityId} value={facility.facilityName}>
                                    {facility.facilityName}
                                </MenuItem>
                            ))}
                        </Select>
                        {submitted && formData.facilities.length === 0 && (
                            <Typography sx={{ color: "red", fontSize: "0.75rem", mt: 1 }}>
                                Please select at least one facility.
                            </Typography>
                        )}
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Keywords
                        </Typography>
                        <TextField
                            name="keywords"
                            fullWidth
                            value={formData.keywords.join(", ")}
                            onChange={handleInputChange}
                            required
                            error={submitted && formData.keywords.length === 0}
                            helperText={
                                submitted && formData.keywords.length === 0
                                    ? "Please enter at least one keyword."
                                    : ""
                            }
                            sx={{
                                "& .MuiInputBase-input": {
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                },
                            }}
                        />
                        <Typography sx={{ color: "#212529" }}>
                            Separate multiple keywords by ,(comma) or{" "}
                            <span style={{ color: "#d63384" }}>enter</span> key
                        </Typography>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".75rem",
                                    sm: "1rem",
                                },
                                fontWeight: 500,
                                mb: "8px",
                                color: "#34495e",
                            }}
                        >
                            Featured
                        </Typography>
                        <Button
                            variant="contained"
                            color={formData.featureStatus ? "success" : "error"} // Reflect featureStatus in color
                            onClick={() =>
                                setFormData((prev) => ({
                                    ...prev,
                                    featureStatus: !prev.featureStatus, // Toggle featureStatus
                                }))
                            }
                            sx={{
                                width: "100%",
                                height: "50%",
                                padding: "10px 30px",
                                textTransform: "none",
                            }}
                        >
                            {formData.featureStatus ? "Featured" : "Unfeatured"}
                        </Button>
                        <Typography sx={{ color: "#d63384" }}>
                            Featured room will be displayed in featured rooms section
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Bed Per Room Section */}

            <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                        p: "12px",
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
                <Divider sx={{ mb: 2 }} />
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
                        name="totalBed"
                        type="number"
                        sx={{ width: "30%", mb: 2 }}
                        value={formData.totalBed}
                        onChange={handleInputChange}
                        required
                        error={Boolean(errors.totalBed)} // Add error styling if there is an error
                        helperText={errors.totalBed}
                    />

                </Box>
                {formData.totalBed > 0 ? <Divider /> : ""}

                <Grid
                    container
                    spacing={2}
                    sx={{ p: 2, justifyContent: "flex-start" }}
                >
                    {Array.from({ length: formData.totalBed }, (_, index) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                flexDirection={"column"}
                            >
                                <Typography>
                                    {`Bed - ${index + 1}`} <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        width: "100%",
                                        maxWidth: "  300px",
                                    }}
                                >
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        value={formData.bedTypesID[index] || ""}
                                        onChange={(e) => handleInputChange(e, index, "bedTypesID")}
                                        error={!!errors[`bedTypesID-${index}`]} // Show error for this bed type field
                                        helperText={errors[`bedTypesID-${index}`]} // Display the error message
                                    >
                                        {bedTypeList.map((bedType) => (
                                            <MenuItem key={bedType.bedTypeId} value={bedType.bedTypeId}>
                                                {bedType.bedName}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <Button
                                        onClick={() => handleRemoveBed(index)}
                                        variant="text"
                                        sx={{
                                            color: "white",
                                            backgroundColor: "#dc3545",
                                            minWidth: "40px",
                                            borderRadius: "0 10px 10px 0",
                                            height: "55px"
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
                    size={{ xs: 12, sm: 4 }}
                    sx={{ mt: 3, bgcolor: "#fff", borderRadius: 2 }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            p: "12px",
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
                    <Card sx={{ margin: "20px 20px", height: 300, border: "6px solid #ddd", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                        {imageSrc ? (
                            <>
                                <CardMedia component="img" image={imageSrc} alt="Uploaded Image" sx={{ height: "100%", width: "100%", objectFit: "contain" }} />
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                                    }}
                                    onClick={() => {
                                        removeMainImage();
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </>
                        ) : (
                            <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                                <Typography variant="h1" sx={{ fontSize: { xs: "4rem", sm: "2rem", md: "4rem", lg: "5rem", xl: "6rem" }, textAlign: "center" }}>
                                    1000X500
                                </Typography>
                                <CloudUploadIcon
                                    variant="contained"
                                    color="primary"
                                    onClick={() => fileInputRef.current.click()}
                                    sx={{ position: "absolute", bottom: 4, right: 8, borderRadius: "50%", minWidth: "36px", height: "36px", padding: 0 }}
                                />
                                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleMainImageChange} />
                            </Box>
                        )}

                    </Card>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ display: "block", marginTop: 1, fontSize: 20, px: 2, mb: 2 }}
                    >
                        Supported Files: <strong>.png, .jpg, .jpeg</strong>. Image will be
                        resized into <strong>1000x500px</strong>.
                    </Typography>
                    {errors.mainImage && (
                        <Typography sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                            {errors.mainImage}
                        </Typography>
                    )}

                </Grid>

                {/*  Description */}
                <Grid
                    item
                    size={{ xs: 12, sm: 8 }}
                    sx={{ mt: 3, bgcolor: "#fff", borderRadius: 2, pb: 2 }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            p: "12px",
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
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            mx: "10px",
                        }}
                    >
                        <ReactQuill
                            theme="snow"
                            value={formData.roomDescription} // Bind directly to the stored HTML
                            onChange={(value) => handleInputChange({ target: { name: "roomDescription", value } })}
                            style={{
                                height: "350px",
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                            }}
                        />

                    </Box>
                    {errors.roomDescription && (
                        <Typography sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                            {errors.roomDescription}
                        </Typography>
                    )}

                </Grid>
            </Grid>

            {/*  Images section */}
            <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2, pb: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                        p: "12px 0 0 12px",
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
                    sx={{ px: "12px", color: "#1e9ff2", fontSize: 15 }}
                >
                    Each Image will be resized into 1000*500
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Card
                    sx={{
                        margin: "20px",
                        minHeight: "150px",
                        border: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "10px",
                        flexWrap: "wrap"
                    }}
                    onClick={() => {
                        if (multipleImagesSrc.length > 0) {
                            multipleFileInputRef.current.click();
                        }
                    }}
                >

                    {multipleImagesSrc.length > 0 ? (
                        multipleImagesSrc.map((src, index) => (
                            <Box key={index} sx={{
                                position: "relative", width: { xs: "45%", sm: "22%" },
                                height: "auto", margin: "10px"
                            }}>
                                <CardMedia
                                    component="img"
                                    image={src}
                                    alt={`Uploaded Image ${index + 1}`}
                                    sx={{
                                        height: "auto",
                                        width: "100%",
                                        objectFit: "cover",
                                        borderRadius: "8px",

                                    }}
                                />
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering file upload
                                        removeImage(index);
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                        ))
                    ) : (
                        <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#888" }}>
                            <CloudUploadIcon
                                fontSize="large"
                                sx={{ color: "#666" }}
                                onClick={() => multipleFileInputRef.current.click()}
                            />
                            <Typography variant="h1" sx={{ fontSize: { xs: "4rem", sm: "2rem" }, textAlign: "center" }}>
                                Drag and Drop files here or click to browse
                            </Typography>

                        </Box>
                    )}




                    <input
                        type="file"
                        ref={multipleFileInputRef}
                        style={{ display: "none" }}
                        onChange={handleMultipleImagesChange}
                    />

                </Card>
                {errors.multipleImages && (
                    <Typography sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                        {errors.multipleImages}
                    </Typography>
                )}
            </Box>



            {/* Cancellation Policy Section */}
            <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2, pb: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                        p: "12px",
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
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        mx: "10px",
                    }}
                >
                    <ReactQuill
                        theme="snow"
                        value={formData.cancelDescription} // Raw HTML content
                        onChange={(value) => handleInputChange({ target: { name: "cancelDescription", value } })}
                        style={{
                            height: "200px",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                        }}
                    />



                </Box>
                {errors.cancelDescription && (
                    <Typography sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                        {errors.cancelDescription}
                    </Typography>
                )}
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
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>

        </Box >
    );
};

export default RoomType;
