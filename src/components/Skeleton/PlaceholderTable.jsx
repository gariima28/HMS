import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Paper, TablePagination } from '@mui/material';

const PlaceholderTable = () => {
    const [page, setPage] = useState(0); // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

    // Dummy row count for placeholder (replace with actual data count when data is loaded)
    const totalRows = 10;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Skeleton variant="text" width="40%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="30%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="20%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="10%" /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...Array(rowsPerPage)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton variant="text" width="40%" /></TableCell>
                                <TableCell><Skeleton variant="text" width="30%" /></TableCell>
                                <TableCell><Skeleton variant="text" width="20%" /></TableCell>
                                <TableCell><Skeleton variant="text" width="10%" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PlaceholderTable;
