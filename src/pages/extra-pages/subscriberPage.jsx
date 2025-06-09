import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import HashLoader from './HashLoaderCom';
// import AddIcon from '@mui/icons-material/Add';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import toast, { Toaster } from 'react-hot-toast';
import { SubscriberGetAllApi } from 'api/api'
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { padding } from '@mui/system';
import NoDataFound from 'pages/NoDataFound';

const columns = [
    { id: 'roleName', label: 'Email', minWidth: 170 },
    { id: 'createdAt', label: 'Subscribe At', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170, align: 'right' }
];

const subscriberPage = () => {

    const token = localStorage.getItem('token')
    const [loader, setLoader] = useState(false)

    const [rows, setRows] = React.useState([]);
    const [rowsData, setRowsData] = React.useState([]);

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        const newSize = +event.target.value;
        setRowsPerPage(newSize);
        setPageSize(newSize);
        setPage(1);
    };

    useEffect(() => {
        MySubscriberGetAllApi()
    }, [page, rowsPerPage])


    const MySubscriberGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await SubscriberGetAllApi(page, rowsPerPage);
            console.log('My Subscriber get all DATAAAAAA', response)
            if (response?.status === 200) {
                const { currentPage, totalPages, pageSize, reports, notifications } = response.data;

                setCurrentPage(currentPage);
                setTotalPages(totalPages);
                setPageSize(pageSize);

                const transformedRows = response?.data?.roles.map((allRoles) => ({
                    ...allRoles,
                    createdAt: allRoles?.createdAt?.dateTime,
                    action: (
                        <Stack justifyContent='end' spacing={2} direction="row">
                            <Button variant="outlined" size="small" href={`/editrolespage/${allRoles.id}`}>
                                <Typography sx={{ paddingTop: .4, paddingRight: .3 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                        <g fill="none" stroke="#1677ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                            <path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" />
                                            <path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" />
                                        </g>
                                    </svg>
                                </Typography>
                                Edit</Button>
                        </Stack>
                    )
                }))
                setRows(transformedRows)
            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <>
            <Box>
                {
                    loader && (
                        <HashLoader />
                    )
                }
            </Box>
            <Box sx={{ margin: 0, fontSize: 20, display: "flex", justifyContent: "space-between" }}>
                <Grid>
                    <b>Subscriber</b>
                </Grid>
                <Grid>
                    <Link to='/subscriber'>
                        <Button sx={{ marginLeft: 2, height: 39, backgroundColor: '#0D6A84', color: '#fff' }} variant="outlined" onClick={''}>
                            <Typography sx={{ paddingTop: .8, paddingRight: .3 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M5.694 12L2.299 3.272a.75.75 0 0 1 .942-.982l.093.039l18 9a.75.75 0 0 1 .097 1.284l-.097.058l-18 9c-.583.291-1.217-.245-1.065-.848l.03-.095zL2.299 3.272zM4.402 4.54l2.61 6.71h6.627a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.649.743l-.101.007H7.01l-2.609 6.71L19.322 12z" />
                                </svg>
                            </Typography>
                            Send Email
                        </Button>
                    </Link>
                </Grid>
            </Box>
            <Box sx={{ marginTop: 5 }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns?.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            sx={{ backgroundColor: "#0D6A8426" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows && rows.length > 0 ? (
                                        rows?.map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}
                                                    sx={{
                                                        backgroundColor: index % 2 === 0 ? 'transparent' : '#F2F3F6BF',
                                                        '&:hover': {
                                                            backgroundColor: '#ffffff' // Keep the same color on hover or adjust as needed
                                                        }
                                                    }}
                                                >
                                                    {
                                                        columns?.map((column) => {
                                                            const value = row[column.id];

                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {
                                                                        column?.format && typeof value === 'number'
                                                                            ? column.format(value)
                                                                            : value
                                                                    }
                                                                </TableCell>
                                                            );
                                                        })}
                                                </TableRow>
                                            );
                                        })
                                    )
                                        :
                                        (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} align="center">
                                                    <NoDataFound />
                                                </TableCell>
                                            </TableRow>
                                        )
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        // rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={totalPages * rowsPerPage}
                        rowsPerPage={rowsPerPage}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>

        </>
    )
}

export default subscriberPage
