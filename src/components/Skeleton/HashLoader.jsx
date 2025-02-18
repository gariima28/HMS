import React, { useState, useEffect } from 'react';
import { Box, Backdrop } from '@mui/material';
import hotelLogo from 'assets/images/hotelIcon1.png'
import bedIcon from 'assets/images/bedIcon1.png'
import calenderIcon from 'assets/images/calenderIcon1.png'
import foodIcon from 'assets/images/foodIcon1.png'
import keysIcon from 'assets/images/keysIcon1.png'
import locationIcon from 'assets/images/locationIcon.png'
import wifiIcon from 'assets/images/wifiIcon1.png'
import towelIcon from 'assets/images/towelIcon1.png'

// Array of images
const images = [
    hotelLogo, bedIcon, calenderIcon, locationIcon, keysIcon, wifiIcon, towelIcon, foodIcon,
];

const ImageLoader = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
        }, 900);
        return () => clearInterval(interval);
    }, []);

    return (
        <Backdrop
            open={true}
            sx={{
                color: '#4634ff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    position: 'relative',
                    width: 50,
                    height: 50,
                    overflow: 'hidden',
                    borderRadius: '50%', // Circular appearance
                }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Loading ${index}`}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            opacity: index === currentIndex ? 1 : 0,
                            animation: index === currentIndex ? 'rotate 1.2s linear infinite' : 'none',
                            transition: 'opacity 0.3s ease-in-out',
                        }}
                    />
                ))}
            </Box>
            <style>
                {`
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                `}
            </style>
        </Backdrop>
    );
};

export default ImageLoader;




// import React from 'react';
// import { Box, Backdrop } from '@mui/material';
// import { DotLoader } from 'react-spinners';

// // Hash Loader component
// const HashLoader = () => {
//     return (
//         <Backdrop
//             open={true}
//             sx={{
//                 color: '#4634ff',
//                 zIndex: (theme) => theme.zIndex.drawer + 1,
//                 zIndex: 1520,
//                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
//             }}
//         >
//             <Box display="flex" justifyContent="center" alignItems="center">
//                 <DotLoader color="#4634ff" size={100}  />
//             </Box>
//         </Backdrop>
//     );
// };

// export default HashLoader;
