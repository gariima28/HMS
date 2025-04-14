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
    Typography,
    IconButton,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';

const RoomType = () => {
    const [originalData, setOriginalData] = useState(null);
    const { id } = useParams();
    console.log(id)

    const navigate = useNavigate()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        getValues,
        reset,
    } = useForm({
        defaultValues: {
            roomName: "",
            roomFare: "",
            noOfRooms: 0,
            adult: "",
            children: "",
            cancelFee: "",
            facilities: [],
            roomTypeImage: [],
            roomTypeStatus: true,
            featureStatus: false,
            roomDescription: "",
            cancelDescription: "",
            totalBed: "",
            amenitiesID: [],
            bedTypesID: [],
        },
    });

    const [error, setError] = useState("");
    const token = localStorage.getItem('token')
    // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMRVhVUlktMDMxOTQ4NjEiLCJlbWFpbCI6InJhamF0Lmt1bWFyQHNjcml6YS5pbiIsInJvbGVUeXBlIjoiQURNSU4iLCJpYXQiOjE3NDMwNzQxODAsImV4cCI6MTc0MzExNzM4MH0.yM5hGK2V2yiiyYWMPQnwS1M5XpNJSlut1qemFRzw2h0";


    { /*  Bed Per room */ }

    const { fields, append, remove } = useFieldArray({
        control,
        name: "bedTypes",
    });
    const totalBed = watch("totalBed");

    useEffect(() => {
        const currentBedCount = fields.length;
        if (totalBed > currentBedCount) {
            // Add new bed fields to match `totalBed`
            for (let i = currentBedCount; i < totalBed; i++) {
                append({ bedTypeId: "" });
            }
        } else if (totalBed < currentBedCount) {
            // Remove extra bed fields to match `totalBed`
            for (let i = currentBedCount - 1; i >= totalBed; i--) {
                remove(i);
            }
        }
    }, [totalBed, fields.length, append, remove]);

    const handleRemoveBed = (index) => {
        remove(index);
        setValue("totalBed", totalBed - 1);
    };


    {/*  Images section */ }

    const [imageSrc, setImageSrc] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [multipleImagesSrc, setMultipleImagesSrc] = useState([]);
    const [multipleImagesPreviews, setMultipleImagesPreviews] = useState([]);
    const [roomTypeImage, setRoomTypeImage] = useState([]);
    const fileInputRef = useRef(null);
    const multipleFileInputRef = useRef(null);

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageSrc(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeMainImage = () => {
        setImageSrc(null);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview(null);
        }
    };

    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));

        setMultipleImagesSrc((prev) => [...prev, ...files]);
        setMultipleImagesPreviews((prev) => [...prev, ...previews]);
    };

    const removeImage = (index) => {
        setMultipleImagesSrc((prev) => prev.filter((_, i) => i !== index));
        setMultipleImagesPreviews((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    useEffect(() => {
        setValue("roomTypeImage", [imageSrc, ...multipleImagesSrc].filter(Boolean));
    }, [imageSrc, multipleImagesSrc, setValue]);


    {  /*  Fetching Api */ }

    const [amenitiesList, setAmenitiesList] = useState([]);
    const [facilitiesList, setFacilitiesList] = useState([]);
    const [bedTypeList, setBedTypeList] = useState([]);

    const fetchBedTypes = async () => {
        try {
            if (!token) {
                console.error("Token is missing or invalid!");
                return;
            }

            const response = await axios.get(
                `https://www.auth.edu2all.in/hms/bedTypes/getAll`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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

            const response = await axios.get(
                `https://www.auth.edu2all.in/hms/amenites/getAll`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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

            const response = await axios.get(
                `https://www.auth.edu2all.in/hms/facilities/getAll`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.Facilities);
            setFacilitiesList(response.data.Facilities);
        } catch (err) {
            setError("Error fetching Facilities");
            console.error(err.response || err);
        }
    };

    const fetchRoomData = async () => {
        if (id !== "add") {
            try {
                const response = await axios.get(
                    `https://www.auth.edu2all.in/hms/roomTypes/getById/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = response.data.roomTypes;

                setOriginalData(data)
                console.log(data)

                setValue("roomName", data.roomName || "");
                setValue("roomFare", data.roomFare || 0);
                setValue("noOfRooms", data.noOfRooms || 0);
                setValue("adult", data.adult || 0);
                setValue("children", data.children || 0);
                setValue("cancelFee", data.cancelFee || 0);
                setValue("facilities", data.facilities || []);
                setValue("roomTypeImage", data.roomTypeImage || []);
                setValue("roomTypeStatus", data.roomTypeStatus || true);
                setValue("featureStatus", data.featureStatus || false);
                setValue("roomDescription", data.roomDescription || "");
                setValue("cancelDescription", data.cancelDescription || "");
                setValue("totalBed", data.totalBed || 0);


                if (data.roomTypeImage && data.roomTypeImage.length > 0) {
                    // Set first image as main image
                    setImagePreview(data.roomTypeImage[0]);
                    setImageSrc(data.roomTypeImage[0]);

                    // Set remaining images as additional images
                    const additionalImages = data.roomTypeImage.slice(1);
                    setMultipleImagesPreviews(additionalImages);
                    setMultipleImagesSrc(additionalImages);
                }

                // Map amenities names and set their values
                setValue(
                    "amenitiesID",
                    data.amenities.map((amenity) => amenity.amenitiesId)
                );


                const mappedBedTypes = data.bedTypes.map((bed) => bed.bedTypeId);
                setValue("bedTypesID", mappedBedTypes);

            } catch (err) {
                setError("Error fetching Room Types By Id");
                console.error(err.response || err);
            }
        }


    };


    useEffect(() => {
        fetchAmenities();
        fetchBedTypes();
        fetchFacilities();
        fetchRoomData()
    }, []);



    {  /*  On Submit & handleInput */ }

    const handleInputChange = (e, index = null, fieldName = null) => {
        const { name, value } = e.target || e;
        if (name === "bedTypesID") {
            const updatedBedTypes = Array(Number(value)).fill("");
            setValue("bedTypesID", updatedBedTypes, { shouldDirty: true, shouldValidate: true });
        } else if (name === "amenitiesID") {
            const selectedIds = Array.isArray(value)
                ? value.map((id) => parseInt(id, 10))
                : value.split(",").map((id) => parseInt(id, 10));
            setValue(name, selectedIds, { shouldDirty: true, shouldValidate: true })
        } else if (name === "facilities") {
            const selectedValues = typeof value === "string" ? value.split(",") : value;
            setValue(name, selectedValues, { shouldDirty: true, shouldValidate: true });
        }
        else {
            setValue(name, value, { shouldDirty: true, shouldValidate: true });
        }
    };

    const onSubmit = async (data) => {
        if (id === "add") {
            // data.roomDescription = 
            const sanitizedRoomDescription = String((data.roomDescription || "").replace(/<[^>]*>/g, "").trim());
            const sanitizedCancelDescription = String((data.cancelDescription || "").replace(/<[^>]*>/g, "").trim());

            const cleanedBedTypes = data.bedTypesID.filter((bedType) => bedType !== null && bedType !== undefined);
            data.bedTypesID = cleanedBedTypes;

            try {
                const formDataToSubmit = new FormData();
                formDataToSubmit.append("cancelDescription", sanitizedCancelDescription)
                formDataToSubmit.append("roomDescription", sanitizedRoomDescription)


                if (imageSrc) {
                    formDataToSubmit.append("roomTypeImage", imageSrc);
                }
                multipleImagesSrc.forEach((file) => {
                    formDataToSubmit.append("roomTypeImage", file);
                });

                data.amenitiesID.forEach((amenityId) => {
                    formDataToSubmit.append("amenitiesID", parseInt(amenityId, 10));
                });

                data.facilities.forEach((facilityName) => {
                    formDataToSubmit.append("facilities", facilityName);
                });

                data.bedTypesID.forEach((bedTypeId) => {
                    formDataToSubmit.append("bedTypesID", parseInt(bedTypeId, 10));
                });

                Object.keys(data).forEach((key) => {
                    if (!["roomTypeImage", "roomDescription", "cancelDescription", "amenitiesID", "facilities", "bedTypesID", "bedTypes", "keywords"].includes(key)) {

                        formDataToSubmit.append(key, data[key]);

                    }
                });

                console.log(formDataToSubmit, data)

                // Send data to API
                const response = await axios.post(
                    "https://www.auth.edu2all.in/hms/roomTypes/add",
                    formDataToSubmit,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Room Type Added Successfully", response.data);
                if (response.status === 200) {
                    if (response?.data?.status === "success") {
                        toast.success(`${response?.data?.message}`);
                        setTimeout(() => {
                            navigate('/roomTypes');
                        }, 5000);
                        reset();
                        setImageSrc(null);
                        setMultipleImagesSrc([]);
                        setImagePreview(null);
                        setMultipleImagesPreviews([]);
                    } else {
                        toast.error(`${response?.data?.message}`);
                    }
                }
            } catch (err) {
                console.error("Error Adding Room Type:", err.response?.data || err.message);
                toast.error(err.response?.data?.message || "Something went wrong.");
                setError(err.response?.data?.message || "Something went wrong.");
            }
        } else {
            const sanitizedRoomDescription = String((data.roomDescription || "").replace(/<[^>]*>/g, "").trim());
            const sanitizedCancelDescription = String((data.cancelDescription || "").replace(/<[^>]*>/g, "").trim());

            const cleanedBedTypes = data.bedTypesID.filter((bedType) => bedType !== null && bedType !== undefined);
            data.bedTypesID = cleanedBedTypes;

            const formDataToSubmit = new FormData();
            const changedData = {};

            const arraysEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
            const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

            Object.keys(data).forEach((key) => {
                if (
                    key === "roomDescription" ||
                    key === "cancelDescription" ||
                    key === "bedTypesID" ||
                    key === "amenitiesID" ||
                    key === "roomTypeImage"
                ) {
                    if (key === "roomDescription" && sanitizedRoomDescription !== originalData.roomDescription) {
                        changedData[key] = sanitizedRoomDescription;
                    } else if (key === "cancelDescription" && sanitizedCancelDescription !== originalData.cancelDescription) {
                        changedData[key] = sanitizedCancelDescription;
                    } else if (key === "amenitiesID") {
                        const originalAmenitiesIds = (originalData.amenities || []).map((amenity) => amenity.amenitiesId);
                        const currentAmenitiesIds = data[key] || [];
                        if (!arraysEqual(originalAmenitiesIds, currentAmenitiesIds)) {
                            changedData[key] = currentAmenitiesIds;
                        }
                    } else if (key === "bedTypesID") {
                        const originalBedTypesIds = (originalData.bedTypes || []).map((bed) => bed.bedTypeId);
                        const currentBedTypesIds = data[key] || [];
                        if (!arraysEqual(originalBedTypesIds, currentBedTypesIds)) {
                            changedData[key] = currentBedTypesIds;
                        }
                    } else if (key === "roomTypeImage" && (imageSrc || multipleImagesSrc.length > 0)) {
                        changedData[key] = true; // Mark as changed if any images are present
                    }
                } else if (!deepEqual(data[key], originalData[key])) {
                    changedData[key] = data[key];
                }
            });

            if (changedData.roomTypeImage) {
                if (imageSrc) {
                    formDataToSubmit.append("roomTypeImage[]", imageSrc);
                }
                if (Array.isArray(multipleImagesSrc) && multipleImagesSrc.length > 0) {
                    multipleImagesSrc.forEach((file) => {
                        formDataToSubmit.append("roomTypeImage[]", file);
                    });
                }
            }

            // Append other fields as necessary
            Object.keys(changedData).forEach((key) => {
                if (!["roomTypeImage", "noOfRooms", "keywords", "bedTypes"].includes(key)) {
                    if (Array.isArray(changedData[key])) {
                        changedData[key].forEach((value) => {
                            formDataToSubmit.append(`${key}[]`, value);
                        });
                    } else {
                        formDataToSubmit.append(key, changedData[key]);
                    }
                }
            });

            console.log(formDataToSubmit, data);

            try {
                const response = await axios.put(
                    `https://www.auth.edu2all.in/hms/roomTypes/update/${id}`,
                    formDataToSubmit,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Room Type Updated Successfully", response.data);
                if (response.status === 200) {
                    if (response?.data?.status === "success") {
                        toast.success(`${response?.data?.message}`);
                        setTimeout(() => {
                            navigate('/roomtypes');
                        }, 5000);
                        reset();
                        setImageSrc(null);
                        setMultipleImagesSrc([]);
                        setImagePreview(null);
                        setMultipleImagesPreviews([])
                    } else {
                        toast.error(`${response?.data?.message}`);
                    }
                }
            } catch (err) {
                console.error("Error Updating Room Type:", err.response?.data || err.message);
                toast.error("Error Updating Room Type:", err.response?.data || err.message)
                setError(err.response?.data?.message || "Something went wrong.");
            }
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                {/* Heading */}
                <Box item sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        sx={{
                            color: "#34495e",
                            fontWeight: 500,
                            fontSize: {
                                xs: "1rem",
                                sm: "1.3rem",
                            },
                        }}
                    >
                        {id === 'add' ? 'Add Room Type' : `Update Room Type - ${originalData?.roomName}`}
                    </Typography>
                    <Link to="/">
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
                    </Link>
                </Box>

                {/* General Information Section */}
                <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2 }}>
                    <Typography
                        sx={{
                            color: "#34495e",
                            p: "12px",
                            fontWeight: 550,
                            fontSize: { xs: "1rem", sm: "1.3rem" },
                            lineHeight: "1.7",
                        }}
                    >
                        General Information
                    </Typography>

                    <Divider />

                    <Grid container spacing={2} sx={{ p: 2 }}>
                        {/* Name */}
                        <Grid item xs={12} sm={6} md={4}>
                            <InputLabel
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                                htmlFor="roomName"
                            >
                                Name <span style={{ color: "#dc3545" }}>*</span>
                            </InputLabel>
                            <OutlinedInput
                                id="roomName"
                                {...register("roomName", { required: "Room name is required" })}
                                className="form-input"
                                fullWidth
                            />
                            {errors.roomName && (
                                <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                    {errors.roomName.message}
                                </Typography>
                            )}
                        </Grid>

                        {/* Slug */}
                        <Grid item xs={12} sm={6} md={4}>
                            <InputLabel
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                                htmlFor="slug"
                            >
                                Slug <span style={{ color: "#dc3545" }}>*</span>
                            </InputLabel>
                            <OutlinedInput
                                id="slug"
                                // {...register("slug", { required: "Slug is required" })}
                                className="form-input"
                                fullWidth
                            />
                            {errors.slug && (
                                <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                    {errors.slug.message}
                                </Typography>
                            )}
                        </Grid>

                        {/* Room Fare */}
                        <Grid item xs={12} sm={6} md={4}>
                            <InputLabel
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                                htmlFor="roomFare"
                            >
                                Fare/Night <span style={{ color: "#dc3545" }}>*</span>
                            </InputLabel>

                            <OutlinedInput
                                id="roomFare"
                                type="number"
                                step="0.01"
                                placeholder="0"
                                {...register("roomFare", {
                                    required: "Room fare is required",
                                    min: { value: 0.01, message: "Fare must be greater than 0" },
                                    setValueAs: (value) => parseFloat(value),
                                })}
                                className="form-input"
                                fullWidth
                                endAdornment={
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
                                                px: 2,
                                                py: 2.5,
                                                "&:hover": {
                                                    bgcolor: "#e0e0e0",
                                                },
                                            }}
                                        >
                                            USD
                                        </Button>
                                    </InputAdornment>
                                }
                            />
                            {errors.roomFare && (
                                <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                    {errors.roomFare.message}
                                </Typography>
                            )}
                        </Grid>

                        {/* Cancellation Fee */}
                        <Grid item xs={12} sm={6} md={4}>
                            <InputLabel
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                                htmlFor="cancelFee"
                            >
                                Cancellation Fee/Night{" "}
                                <span style={{ color: "#dc3545" }}>*</span>
                            </InputLabel>
                            <OutlinedInput
                                id="cancelFee"
                                type="number"
                                placeholder="0"
                                {...register("cancelFee", {
                                    required: "Cancellation fee is required",
                                    min: { value: 0, message: "Fee cannot be negative" },
                                    validate: (value) =>
                                        value <= parseFloat(getValues("roomFare")) ||
                                        "Cancellation fee cannot exceed the room fare",
                                    setValueAs: (value) => parseFloat(value),
                                })}
                                className="form-input"
                                fullWidth
                                endAdornment={
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
                                                px: 2,
                                                py: 2.5,
                                                "&:hover": {
                                                    bgcolor: "#e0e0e0",
                                                },
                                            }}
                                        >
                                            USD
                                        </Button>
                                    </InputAdornment>
                                }
                            />
                            {errors.cancelFee && (
                                <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                    {errors.cancelFee.message}
                                </Typography>
                            )}
                        </Grid>

                        {/* Total Adult */}
                        <Grid item xs={12} sm={6} md={4}>
                            <InputLabel
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                                htmlFor="adult"
                            >
                                Total Adult <span style={{ color: "#dc3545" }}>*</span>
                            </InputLabel>

                            <OutlinedInput
                                id="adult"
                                type="number"
                                placeholder="0"
                                {...register("adult", {
                                    required: "Field is required",
                                    min: {
                                        value: 1,
                                        message: "Number of Adults should be at least 1",
                                    },
                                    setValueAs: (value) => parseInt(value, 10),
                                })}
                                className="form-input"
                                fullWidth
                            />

                            {errors.adult && (
                                <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                    {errors.adult.message}
                                </Typography>
                            )}
                        </Grid>

                        {/* Total Child */}
                        <Grid item xs={12} sm={6} md={4}>
                            <InputLabel
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                                htmlFor="children"
                            >
                                Total Child <span style={{ color: "#dc3545" }}>*</span>
                            </InputLabel>

                            <OutlinedInput
                                id="children"
                                type="number"
                                placeholder="0"
                                {...register("children", {
                                    required: "Field is required",
                                    min: { value: 0, message: "Cannot be negative" },
                                    setValueAs: (value) => parseInt(value, 10),
                                })}
                                className="form-input"
                                fullWidth
                            />
                            {errors.children && (
                                <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                    {errors.children.message}
                                </Typography>
                            )}
                        </Grid>

                        {/* Amenities */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                                htmlFor="amenitiesID"
                            >
                                Amenities
                            </InputLabel>
                            <Controller
                                name="amenitiesID"
                                control={control}
                                rules={{ required: "Select at least one amenity" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        id="amenitiesID"
                                        multiple
                                        fullWidth
                                        onChange={(e) => handleInputChange(e)}
                                        renderValue={(selected) =>
                                            selected
                                                .map((id) => {
                                                    const amenity = amenitiesList.find(
                                                        (item) => item.amenitiesId === id
                                                    );
                                                    return amenity?.amenitiesName || id;
                                                })
                                                .join(", ")
                                        }
                                    >
                                        {amenitiesList.map((option) => (
                                            <MenuItem
                                                key={option.amenitiesId}
                                                value={option.amenitiesId}
                                            >
                                                <Checkbox
                                                    checked={field.value.includes(option.amenitiesId)}
                                                />
                                                <ListItemText primary={option.amenitiesName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.amenitiesID && (
                                <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                    {errors.amenitiesID.message}
                                </Typography>
                            )}
                        </Grid>

                        {/* Facilities */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                                htmlFor="facilities"
                            >
                                Facilities
                            </InputLabel>
                            <Controller
                                name="facilities"
                                control={control}
                                rules={{ required: "Select at least one facility" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        id="facilities"
                                        multiple
                                        fullWidth
                                        onChange={(e) => handleInputChange(e)}
                                        renderValue={(selected) => selected.join(", ")}
                                        MenuProps={{
                                            PaperProps: {
                                                style: { maxHeight: 200 },
                                            },
                                        }}
                                    >
                                        {facilitiesList.map((facility) => (
                                            <MenuItem key={facility.facilityId} value={facility.facilityName}>
                                                <Checkbox checked={field.value.includes(facility.facilityName)} />
                                                <ListItemText primary={facility.facilityName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />

                            {errors.facilities && (
                                <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                    {errors.facilities.message}
                                </Typography>
                            )}
                        </Grid>

                        {/* Keywords */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="keywords"
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                            >
                                Keywords
                            </InputLabel>
                            <OutlinedInput
                                id="keywords"
                                {...register("keywords")}
                                className="form-input"
                                fullWidth
                                onChange={(e) => handleInputChange(e)}
                            />
                            {errors.keywords && (
                                <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                    {errors.keywords.message}
                                </Typography>
                            )}
                            <Typography sx={{ color: "#212529" }}>
                                Separate multiple keywords by ,(comma) or{" "}
                                <span style={{ color: "#d63384" }}>enter</span> key
                            </Typography>
                        </Grid>

                        {/* Featured */}
                        <Grid item xs={12} sm={6}>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: ".75rem",
                                        sm: "1rem",
                                    },
                                    fontWeight: 500,
                                    mb: "8px",
                                    color: "#000",
                                }}
                            >
                                Featured
                            </Typography>
                            <Controller
                                name="featureStatus"
                                control={control}
                                render={({ field }) => (
                                    <Button
                                        variant="contained"
                                        color={field.value ? "success" : "error"}
                                        onClick={() => setValue("featureStatus", !field.value)}
                                        sx={{
                                            width: "100%",
                                            height: {
                                                xs: "50%",
                                                sm: "40%",
                                                md: "45%",
                                            },
                                            padding: "10px 30px",
                                            textTransform: "none",
                                        }}
                                    >
                                        {field.value ? "Featured" : "Unfeatured"}
                                    </Button>
                                )}
                            />
                            <Typography sx={{ color: "#d63384" }}>
                                Featured room will be displayed in the featured rooms section
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                {/* Bed Per Room Section */}
                <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#34495e",
                            p: "12px",
                            fontWeight: 550,
                            fontSize: { xs: "1rem", sm: "1.3rem" },
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
                        <InputLabel
                            sx={{
                                color: "#34495e",
                                p: "12px",
                                fontWeight: 550,
                                fontSize: { xs: "1rem", sm: "1.3rem" },
                                lineHeight: "1.7",
                            }}
                            htmlFor="totalBed"
                        >
                            Total Bed <span style={{ color: "#dc3545" }}>*</span>
                        </InputLabel>

                        <OutlinedInput
                            id="totalBed"
                            placeholder="0"
                            {...register("totalBed", {
                                required: "Total bed is required",
                                valueAsNumber: true,
                                min: { value: 1, message: "Total bed must be at least 1" },
                                setValueAs: (value) => parseInt(value, 10),
                            })}
                            type="number"
                            sx={{
                                width: "30%",
                                mb: 2,
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                        {errors.totalBed && (
                            <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                {errors.totalBed.message}
                            </Typography>
                        )}
                    </Box>

                    {fields.length > 0 && <Divider />}
                    <Grid
                        container
                        spacing={3}
                        sx={{ p: 2, justifyContent: "flex-start", alignItems: "center" }}
                    >
                        {fields.map((field, index) => {

                            return index < totalBed ? (
                                <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={field.id}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                        flexDirection="column"
                                    >
                                        <Typography>
                                            {`Bed - ${index + 1}`}
                                            <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <Box sx={{ display: "flex", width: "100%", }}>
                                            <Controller
                                                name={`bedTypesID[${index}]`}
                                                control={control}
                                                defaultValue="selectOne"
                                                rules={{
                                                    required: "Please select a bed type",
                                                    validate: (value) => value !== "selectOne" || "Please select a valid bed type", // Add 
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <Select
                                                            {...field}
                                                            id={`bedTypesID-${index}`}
                                                            fullWidth
                                                            multiple={false}
                                                            onChange={(e) => handleInputChange(e, index)}
                                                            renderValue={(selected) => {
                                                                if (selected === "selectOne" || !selected) {
                                                                    return "Select One"; // Display "Select One" if no bed type is selected
                                                                }
                                                                const selectedBedType = bedTypeList.find(
                                                                    (bed) => bed.bedTypeId === selected
                                                                );
                                                                return selectedBedType ? selectedBedType.bedName : "";
                                                            }}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    style: { maxHeight: 200 },
                                                                },
                                                            }}
                                                            error={Boolean(
                                                                errors?.bedTypesID?.[index]?.bedTypeId
                                                            )}
                                                            sx={{
                                                                border: "1px solid #ccc",
                                                                borderRadius: "4px",
                                                                minWidth: "200px",
                                                            }}
                                                        >
                                                            <MenuItem value="selectOne">
                                                                <em>Select One</em>
                                                            </MenuItem>
                                                            {bedTypeList.map((bedType) => (
                                                                <MenuItem
                                                                    key={bedType.bedTypeId}
                                                                    value={bedType.bedTypeId}
                                                                >
                                                                    {bedType.bedName}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>

                                                    </>
                                                )}
                                            />
                                            <Button
                                                onClick={() => handleRemoveBed(index)}
                                                variant="text"
                                                sx={{
                                                    color: "white",
                                                    backgroundColor: "#dc3545",
                                                    minWidth: "40px",
                                                    borderRadius: "0 10px 10px 0",
                                                    height: "60px",
                                                }}
                                            >
                                                X
                                            </Button>
                                        </Box>
                                        {errors?.bedTypesID?.[index] && (
                                            <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                                                {errors?.bedTypesID?.[index]?.message}
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>
                            ) : null;
                        })}
                    </Grid>
                </Box>

                {/* Main Image and Description */}
                <Grid
                    container
                    spacing={0}
                    sx={{
                        borderRadius: 2,
                    }}
                >

                    {/* Main Image */}

                    <Grid
                        item
                        xs={12} md={4}
                        sx={{ mt: 3, bgcolor: "#fff", borderRadius: 2 }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: "#34495e",
                                p: "12px",
                                fontWeight: 550,
                                fontSize: { xs: "1rem", sm: "1.3rem" },
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
                            {imagePreview ? (
                                <>
                                    <CardMedia
                                        component="img"
                                        image={imagePreview}
                                        alt="Uploaded Image"
                                        sx={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    />
                                    <IconButton
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                                        }}
                                        onClick={removeMainImage}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </>
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
                                    <Typography
                                        variant="h1"
                                        sx={{

                                            textAlign: "center",
                                            fontSize: "3 rem"
                                        }}
                                    >
                                        1000X500
                                    </Typography>
                                    <CloudUploadIcon
                                        variant="contained"
                                        color="primary"
                                        onClick={() => fileInputRef.current.click()}
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
                                        onChange={(e) => {
                                            handleMainImageChange(e);
                                        }}
                                    />
                                </Box>
                            )}
                        </Card>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{
                                display: "block",
                                marginTop: 1,
                                fontSize: 20,
                                px: 2,
                                mb: 2,
                            }}
                        >
                            Supported Files: <strong>.png, .jpg, .jpeg</strong>. Image will be
                            resized into <strong>1000x500px</strong>.
                        </Typography>
                        {/* <Controller
              name="mainImage"
              control={control}
              rules={{
                required: "Main image is required.",
                validate: {
                  fileType: (file) => {
                    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                    if (file && !allowedTypes.includes(file.type)) {
                      return "Invalid file type. Only .jpg, .jpeg, .png files are allowed.";
                    }
                    return true;
                  },
                },
              }}
              render={({ field }) => (
                <input
                  type="file"
                  {...field}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    field.onChange(e);
                    handleMainImageChange(e);

                  }}
                />
              )}
            /> */}
                        {errors.mainImage && (
                            <Typography sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                                {errors.mainImage.message}
                            </Typography>
                        )}
                    </Grid>

                    {/*  Description */}
                    <Grid
                        item
                        xs={12} md={8}
                        sx={{ mt: 3, bgcolor: "#fff", borderRadius: 2, pb: 2 }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: "#34495e",
                                p: "12px",
                                fontWeight: 550,
                                fontSize: { xs: "1rem", sm: "1.3rem" },
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
                            <Controller
                                name="roomDescription"
                                control={control}
                                rules={{
                                    required: "Description is required",
                                }}
                                render={({ field }) => (
                                    <ReactQuill
                                        {...field} // Spread react-hook-form's field props to ReactQuill
                                        theme="snow"
                                        value={field.value || ""} // Initialize with empty string if undefined
                                        onChange={(value) => {
                                            // Guard clause to avoid unnecessary updates
                                            if (value !== field.value) {
                                                field.onChange(value);
                                            }
                                        }}
                                        style={{
                                            height: "400px",
                                            backgroundColor: "#fff",
                                            borderRadius: "4px",
                                        }}
                                    />
                                )}
                            />
                        </Box>

                        {errors.roomDescription && (
                            <Typography sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                                {errors.roomDescription.message}
                            </Typography>
                        )}
                    </Grid>
                </Grid>

                {/*  Images section */}
                <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2, pb: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#34495e",
                            p: "12px",
                            fontWeight: 550,
                            fontSize: { xs: "1rem", sm: "1.3rem" },
                            lineHeight: "1.7",
                        }}
                    >
                        Images
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ px: "12px", color: "#1e9ff2", fontSize: 15 }}
                    >
                        Each image will be resized into 1000*500
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
                            flexWrap: "wrap",
                        }}
                        onClick={() => multipleFileInputRef.current.click()}
                    >
                        {multipleImagesPreviews.length > 0 ? (
                            multipleImagesPreviews.map((src, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: "relative",
                                        width: { xs: "45%", sm: "22%" },
                                        height: "auto",
                                        margin: "10px",
                                    }}
                                >
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
                                            e.stopPropagation();
                                            removeImage(index);
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            ))
                        ) : (
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#888",
                                }}
                            >
                                <CloudUploadIcon
                                    fontSize="large"
                                    sx={{ color: "#666" }}
                                    onClick={() => multipleFileInputRef.current.click()}
                                />
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: "4rem", sm: "2rem" },
                                        textAlign: "center",
                                    }}
                                >
                                    Drag and Drop files here or click to browse
                                </Typography>
                            </Box>
                        )}

                        <Controller
                            name="roomTypeImage"
                            control={control}
                            rules={{
                                validate: (files) => {
                                    if (!files.length) {
                                        return "Please upload at least one image.";
                                    }
                                    return true;
                                },
                            }}
                            render={() => (
                                <input
                                    type="file"
                                    ref={multipleFileInputRef}
                                    style={{ display: "none" }}
                                    multiple
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={handleMultipleImagesChange}
                                />
                            )}
                        />
                    </Card>

                    {errors.roomTypeImage && (
                        <Typography sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                            {errors.roomTypeImage.message}
                        </Typography>
                    )}
                </Box>

                {/* Cancellation Policy Section */}
                <Box sx={{ bgcolor: "#ffffff", mt: 3, borderRadius: 2, pb: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#34495e",
                            p: "12px",
                            fontWeight: 550,
                            fontSize: { xs: "1rem", sm: "1.3rem" },
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
                        <Controller
                            name="cancelDescription"
                            control={control}
                            rules={{
                                required: "Cancellation policy is required", // Validation rule
                            }}
                            render={({ field }) => (
                                <ReactQuill
                                    {...field} // Spread react-hook-form's field props to ReactQuill
                                    theme="snow"
                                    value={field.value || ""} // Initialize with empty string if undefined
                                    onChange={(value) => {
                                        // Guard clause to avoid unnecessary updates
                                        if (value !== field.value) {
                                            field.onChange(value);
                                        }
                                    }}
                                    style={{
                                        height: "200px",
                                        backgroundColor: "#fff",
                                        borderRadius: "4px",
                                    }}
                                />
                            )}
                        />
                    </Box>

                    {errors.cancelDescription && (
                        <Typography sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                            {errors.cancelDescription.message}
                        </Typography>
                    )}
                </Box>

                {/* Submit Button */}
                <Box sx={{ bgcolor: "#fff", mt: 3, borderRadius: 2, p: 1 }}>
                    <Button
                        type="submit"
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
                        {id === 'add' ? 'Create' : 'Update'}
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default RoomType;
