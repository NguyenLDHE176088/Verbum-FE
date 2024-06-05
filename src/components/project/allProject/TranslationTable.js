"use client"

import * as React from 'react';
import { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Checkbox, LinearProgress, IconButton,
    TextField, MenuItem, Toolbar, Tooltip, InputAdornment, Typography, Box, Select, FormControl,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Menu, TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import classes from './TranslationTable.module.css';
import Link from 'next/link';

const translations = [
    { id: 1, name: 'EN TO VN', progress: 70, created: '10/08/2024', due: '20/05/2025', status: 'In-progress' },
    { id: 2, name: 'JP TO VN', progress: 100, created: '11/09/2024', due: '21/04/2025', status: 'Finished' },
    { id: 3, name: 'ES TO VN', progress: 80, created: '12/07/2024', due: '22/07/2025', status: 'In-progress' },
    { id: 4, name: 'CN TO VN', progress: 100, created: '13/06/2024', due: '23/02/2025', status: 'Finished' },
    { id: 5, name: 'EN TO VN', progress: 30, created: '10/08/2024', due: '20/05/2025', status: 'In-progress' },
    { id: 6, name: 'JP TO VN', progress: 20, created: '11/09/2024', due: '21/04/2025', status: 'In-progress' },
    { id: 7, name: 'ES TO VN', progress: 10, created: '12/07/2024', due: '22/07/2025', status: 'In-progress' },
    { id: 8, name: 'CN TO VN', progress: 0, created: '13/06/2024', due: '23/02/2025', status: 'In-progress' },

];

export default function TranslationTable() {
    const [translationsBackUp, setTranslationsBackUp] = useState(translations);
    const [sortBy, setSortBy] = useState('All');
    const [open, setOpen] = useState(false);
    const [anchorElfilter, setAnchorElfilter] = useState(null);
    const [anchorElSort, setAnchorElSort] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const CustomLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: '#FF9300',
        },
        [`& .${linearProgressClasses.bar}`]: {
            background: '#00B090',
        },
    }));

    // Xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Xử lý thay đổi số hàng trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Tính toán hàng hiển thị hiện tại
    const rowsToShow = translationsBackUp.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleClickFilter = (event) => {
        setAnchorElfilter(event.currentTarget);
    };

    const handleCloseFilter = (status) => {
        console.log(status === "Finished");
        if (status === "Finished") {
            setTranslationsBackUp(translations.filter(row =>
                row.status.toLowerCase().includes(status.toLowerCase())
            ));
        }
        if (status === "In-progress") {
            setTranslationsBackUp(translations.filter(row =>
                row.status.toLowerCase().includes(status.toLowerCase())
            ));
        }
        setAnchorElfilter(null);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    const handleSortClick = (event) => {
        console.log(event.currentTarget);
        setAnchorElSort(event.currentTarget);
        

    }

    const handleCloseSort = (status) => {
        if (sortBy === 'Created') {
            setTranslationsBackUp(
                [...translations].sort((a, b) => {
                    const dateA = new Date(a.created.split('/').reverse().join('-'));
                    const dateB = new Date(b.created.split('/').reverse().join('-'));
                    return status.toLowerCase() === 'Ascending'.toLowerCase()? dateA - dateB : dateB - dateA;
                }));
        }
        if (sortBy === 'Due') {
            setTranslationsBackUp(
                [...translations].sort((a, b) => {
                    const dateA = new Date(a.due.split('/').reverse().join('-'));
                    const dateB = new Date(b.due.split('/').reverse().join('-'));
                    return status.toLowerCase() === 'Ascending'.toLowerCase()? dateA - dateB : dateB - dateA;
                }));
        }

        if (sortBy === 'Progress') {
            setTranslationsBackUp(
                [...translations].sort((a, b) => {
                    return status.toLowerCase() === 'Ascending'.toLowerCase()?a.progress - b.progress:b.progress-a.progress;
                }));
        }

        if (sortBy === 'All') {
            setTranslationsBackUp([...translations].sort((a, b) => {
                return status.toLowerCase() === 'Ascending'.toLowerCase()?a.id - b.id:b.id-a.id;
            }));
        }
        setAnchorElSort(null);
    };


    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSearchChange = (event) => {
        setTranslationsBackUp(translations.filter(row =>
            row.name.toLowerCase().includes(event.target.value.toLowerCase())
        ));
    };

    return (
        <div className={classes.table_container}>
            <div className={classes.table}>
                <Toolbar className={classes.table_toolbar}>
                    <TextField
                        className={classes.search_input}
                        variant="outlined"
                        placeholder="Search By Name"
                        size="small"
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Select
                            onChange={handleSortChange}
                            className={classes.filter_select}
                            variant="outlined"
                            size="small"
                            defaultValue="All"
                            displayEmpty
                            width="10%"
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Progress">Progress</MenuItem>
                            <MenuItem value="Created">Created</MenuItem>
                            <MenuItem value="Due">Due</MenuItem>

                        </Select>
                    </FormControl>
                    <div className={classes.icon_buttons}>
                        <Tooltip title="Sort">
                            <Box className={classes.option} onClick={handleSortClick} >
                                <SortIcon style={{ marginRight: '15px', }} />
                                <Typography variant="body2">Sort</Typography>
                            </Box>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElSort}
                            open={Boolean(anchorElSort)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={() => handleCloseSort("Descending")} value="Descending">Descending</MenuItem>
                            <MenuItem onClick={() => handleCloseSort("Ascending")} value="Ascending">Ascending</MenuItem>
                        </Menu>
                        <Tooltip title="Filter">
                            <Box className={classes.option} onClick={handleClickFilter} >
                                <FilterListIcon style={{ marginRight: '15px', }} />
                                <Typography variant="body2">Filter</Typography>
                            </Box>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElfilter}
                            open={Boolean(anchorElfilter)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={() => handleCloseFilter("In-progress")} value="In-progress">In-progress</MenuItem>
                            <MenuItem onClick={() => handleCloseFilter("Finished")} value="Finished">Finished</MenuItem>
                        </Menu>
                        <Tooltip title="Delete">
                            <Box className={classes.option} onClick={handleClickOpen} >
                                <DeleteIcon style={{ marginRight: '15px', color: 'red' }} />
                                <Typography variant="body2">Delete</Typography>
                            </Box>
                        </Tooltip>
                        <Tooltip title="Add">
                            <Link href={"/projects/createProject"} >

                                <Box className={classes.optionAdd} >
                                    <Box className={classes.iconAdd}  >
                                        <AddIcon style={{ color: '#FF9300', fontSize: '15px' }} />
                                    </Box>
                                </Box>

                            </Link>
                        </Tooltip>
                    </div>
                </Toolbar>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell className={classes.table_head_cell}>#</TableCell>
                                <TableCell className={classes.table_head_cell}>Name</TableCell>
                                <TableCell className={classes.table_head_cell}>Progress</TableCell>
                                <TableCell className={classes.table_head_cell}>Created</TableCell>
                                <TableCell className={classes.table_head_cell}>Due</TableCell>
                                <TableCell className={classes.table_head_cell}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsToShow.map((row) => (
                                <TableRow key={row.id} className="table-row">
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell className="table-cell-progress">
                                        <CustomLinearProgress variant="determinate" value={row.progress}
                                            className="linear-progress" />
                                    </TableCell>
                                    <TableCell>{row.created}</TableCell>
                                    <TableCell>{row.due}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={translationsBackUp.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            KOR TO VN will be moved to recycle bin and deleted forever after 30 days.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" variant="contained" >
                            OK
                        </Button>
                        <Button onClick={handleClose} color="primary" variant="contained" style={{ backgroundColor: 'black', }}>
                            Cancel
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        </div>

    );
}

