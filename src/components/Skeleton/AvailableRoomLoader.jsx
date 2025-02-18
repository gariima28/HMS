import { Divider, Grid, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const AvailableRoomLoader = () => {
    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={8} sx={{ mb: 4 }}>
                <Grid sx={{ backgroundColor: '#fff', p: 2 }}>
                    <Grid sx={{ display: 'flex' }}>
                        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
                            <Skeleton variant="text" width='40%' sx={{ mb: 1 }} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ p: 1 }}>
                        <Grid alignContent='center' sx={{ m: 1 }}>
                            <Skeleton variant="text" width={100} sx={{ mb: 1 }} />
                        </Grid>
                        <Grid alignContent='center' sx={{ m: 1 }}>
                            <Skeleton variant="text" width={100} sx={{ mb: 1 }} />
                        </Grid>
                        <Grid alignContent='center' sx={{ m: 1 }}>
                            <Skeleton variant="text" width={100} sx={{ mb: 1 }} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ p: 2 }}>
                        <Skeleton variant="text" sx={{ mb: 1 }} width='30%' />
                    </Grid>
                    <Grid>
                        <TableContainer >
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'><Skeleton variant="text" sx={{ mb: 1 }} /></TableCell>
                                        <TableCell align='center'><Skeleton variant="text" sx={{ mb: 1 }} /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='center'><Skeleton variant="text" width='50%' sx={{ mb: 1 }} /></TableCell>
                                        <TableCell align='center'>
                                            <Grid display='flex'justifyContent='space-evenly'>
                                                <Skeleton variant="rectangular" width="20%" height={40} />
                                                <Skeleton variant="rectangular" width="20%" height={40} />
                                                <Skeleton variant="rectangular" width="20%" height={40} />
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} md={4} sx={{ mb: 4 }}>
                <Grid sx={{ backgroundColor: '#fff', p: 2 }}>
                    <Grid sx={{ display: 'flex' }}>
                        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
                            <Skeleton variant="text" sx={{ mb: 1 }} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid>
                        <form>
                            <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                <Stack spacing={2}>
                                    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                                    <Skeleton variant="rectangular" width="100%" height={30} sx={{ mb: 1 }} />
                                </Stack>
                            </Grid>
                            <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                <Stack spacing={2}>
                                    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                                    <Skeleton variant="rectangular" width="100%" height={30} sx={{ mb: 1 }} />
                                </Stack>
                            </Grid>
                            <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                <Stack spacing={2}>
                                    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                                    <Skeleton variant="rectangular" width="100%" height={30} sx={{ mb: 1 }} />
                                </Stack>
                            </Grid>
                            <Grid xs={12} sx={{ p: 0.7 }}>
                                <TableContainer>
                                    <Table aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'><Skeleton variant="text" sx={{ mb: 1 }} /></TableCell>
                                                <TableCell align='center'><Skeleton variant="text" sx={{ mb: 1 }} /></TableCell>
                                                <TableCell align='center'><Skeleton variant="text" sx={{ mb: 1 }} /></TableCell>
                                                <TableCell align='center'><Skeleton variant="text" sx={{ mb: 1 }} /></TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                <Stack spacing={2}>
                                    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                                    <Skeleton variant="rectangular" width="100%" height={30} sx={{ mb: 1 }} />
                                </Stack>
                            </Grid>
                            <Grid alignContent='end' xs={12} sx={{ p: 0.7, mt: 2 }} >
                                <Skeleton variant="text" width="100%" height={80} sx={{ mb: 1 }} />
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AvailableRoomLoader
