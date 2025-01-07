import { Box, Button, Grid, Icon, Stack, TextField, Typography } from '@mui/material'
import { alignProperty } from '@mui/material/styles/cssUtils'
import { boxSizing, display, fontSize, fontWeight, padding, textAlign, width } from '@mui/system'
import { color } from 'framer-motion'
import React, { useEffect } from 'react'

const contentDiv1 = {
    width: '70%',
    borderRadius: 1,
    // padding: 1.5,
    color: "#5b6e88",
    marginTop: 3,
    backgroundColor: "#fff",
    border: '3px solid #28c76f',
    boxSizing: 'borderBox'
}
const contentDiv2 = {
    display: "flex",
    marginBttom: -41,
    justifyContent: 'center',
    fontSize: 100,
    fontWeight: 800,
    color: '#ff9f43'
}

const contentDiv3 = {
    display: "flex",
    margin: -2,
    justifyContent: 'center',
    fontSize: 40,
    fontWeight: 500,
    color: '#ff9f43'
}
const contentDiv4 = {
    margin: -2,
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    padding: 5,
}

const hrLine = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.125)'
}

const forDisplay = {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
}

const css = {
    color: ''
}

const forHover = {
    '&:hover': {
        color: "#fff",
        backgroundColor: '#28c76f',
    },
}


const extraUpdate = () => {


    return (
        <>
            <Box>
                <Box>
                    <Typography sx={{ fontSize: 20 }}><b>System Updates</b></Typography>
                </Box>

                <Box sx={forDisplay}>
                    <Box sx={contentDiv1}>
                        <Typography sx={contentDiv2}>
                            1.0
                        </Typography>
                        <Typography sx={contentDiv3}>
                            Your Version
                        </Typography>
                        <Typography sx={contentDiv4}>
                          <span >
                          <svg sx={{paddingTop:10}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#10163a" fill-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-1.2a8.8 8.8 0 1 0 0-17.6a8.8 8.8 0 0 0 0 17.6M11.4 10h1.2v7h-1.2zm.6-1a1 1 0 1 1 0-2a1 1 0 0 1 0 2" />
                            </svg>
                          </span>
                            <span><b >You are currently using the latest version of the system.</b></span>  We are committed to continuous improvement and are actively developing the next version. Stay tuned for exciting new features and enhancements to be released soon!
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default extraUpdate
