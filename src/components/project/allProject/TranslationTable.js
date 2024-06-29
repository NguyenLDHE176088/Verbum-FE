"use client";

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
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

import Link from 'next/link';
import { format } from 'date-fns';
import { getAllProjects, deleteProjectsFromAPI } from '@/data/projects';

export default function TranslationTable() {
    const [translations, setTranslations] = useState([]);
    const [translationsBackUp, setTranslationsBackUp] = useState([]);
    const [sortBy, setSortBy] = useState('All');
    const [open, setOpen] = useState(false);
    const [anchorElfilter, setAnchorElfilter] = useState(null);
    const [anchorElSort, setAnchorElSort] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [names, setNames] = useState([]);
    const [ids, setIds] = useState([]);
    const dropdownRefSort = useRef(null);
    const dropdownRefFilter = useRef(null);

    const fetchProjects = async () => {
        const result = await getAllProjects();
        if (result.success) {
            setTranslationsBackUp(result.success.data);
            setTranslations(result.success.data);
        } else {
            console.error('Error fetching projects:', result.error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

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

    const deleteProject = async () => {
        const result = await deleteProjectsFromAPI(ids);
        if (result.success) {
            fetchProjects();
            setIds([]);
        } else {
            console.error('Error deleting projects:', result.error);
        }
    };

    

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

    const handleClickDelete = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        deleteProject();
        setOpen(false);
    };

    const handleSortClick = (event) => {
        setAnchorElSort(event.currentTarget);
    }

    const handleCloseSort = (status) => {
        if (sortBy === 'Created') {
            setTranslationsBackUp(
                [...translations].sort((a, b) => {
                    const dateA = new Date(a.createdAt.split('/').reverse().join('-'));
                    const dateB = new Date(b.createdAt.split('/').reverse().join('-'));
                    return status.toLowerCase() === 'Ascending'.toLowerCase() ? dateA - dateB : dateB - dateA;
                }));
        }
        if (sortBy === 'Due') {
            setTranslationsBackUp(
                [...translations].sort((a, b) => {
                    const dateA = new Date(a.dueDate.split('/').reverse().join('-'));
                    const dateB = new Date(b.dueDate.split('/').reverse().join('-'));
                    return status.toLowerCase() === 'Ascending'.toLowerCase() ? dateA - dateB : dateB - dateA;
                }));
        }

        if (sortBy === 'Progress') {
            setTranslationsBackUp(
                [...translations].sort((a, b) => {
                    return status.toLowerCase() === 'Ascending'.toLowerCase() ? a.progress - b.progress : b.progress - a.progress;
                }));
        }

        if (sortBy === 'All') {
            setTranslationsBackUp([...translations].sort((a, b) => {
                return status.toLowerCase() === 'Ascending'.toLowerCase() ? a.id - b.id : b.id - a.id;
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

    const handleChange = (name, id) => {
        setIds(
            ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]
        );
        setNames(
            names.includes(name) ? names.filter(n => n !== name) : [...names, name]
        );
    }

    const handleClickOutside = (event) => {
        if (dropdownRefSort.current && !dropdownRefSort.current.contains(event.target)) {
            setAnchorElSort(null);
        }

        if (dropdownRefFilter.current && !dropdownRefFilter.current.contains(event.target)) {
            setAnchorElfilter(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-center">
            <div className="w-[95%] rounded-[10px] border border-[#7C7C7C]">
                <Toolbar className="flex justify-between">
                    <TextField
                        className="rounded-[10px] border border-[#737373]"
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
                            className="rounded-[10px] border border-[#737373]"
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
                    <div className="w-1/2 flex justify-between">
                        <Tooltip title="Sort">
                            <Box ref={dropdownRefSort} className="cursor-pointer flex items-center px-[20px] py-[5px] bg-[#F3F3F3] rounded-[50px]" onClick={handleSortClick} >
                                <SortIcon className="mr-[15px]" />
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
                            <Box ref={dropdownRefFilter} className="cursor-pointer flex items-center px-[20px] py-[5px] bg-[#F3F3F3] rounded-[50px]" onClick={handleClickFilter} >
                                <FilterListIcon className="mr-[15px]" />
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
                            <Box className="cursor-pointer flex items-center px-[20px] py-[5px] bg-[#F3F3F3] rounded-[50px]" onClick={handleClickDelete} >
                                <DeleteIcon className="mr-[15px] text-[red]" />
                                <Typography variant="body2">Delete</Typography>
                            </Box>
                        </Tooltip>
                        <Tooltip title="Add">
                            <Link href={"/projects/create"} >
                                <Box className="cursor-pointer flex bg-[#FF9300] justify-center items-center rounded-tr-[10px]" >
                                    <Box className="m-[5px] flex items-center p-[5px] bg-[#F3F3F3] rounded-full"  >
                                        <AddIcon className="text-[#FF9300] text-[15px]" />
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
                                <TableCell className="font-bold">#</TableCell>
                                <TableCell className="font-bold">Name</TableCell>
                                <TableCell className="font-bold">Progress</TableCell>
                                <TableCell className="font-bold">Created</TableCell>
                                <TableCell className="font-bold">Due</TableCell>
                                <TableCell className="font-bold">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsToShow.map((row, index) => (
                                <TableRow key={row.id} className="table-row">
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            onChange={() => handleChange(row.name, row.id)}
                                            checked={ids.includes(row.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell className="underline"><Link href={`/projects/${row.id}`}>{row.name}</Link></TableCell>
                                    <TableCell className="table-cell-progress">
                                        <CustomLinearProgress variant="determinate" value={row.progress}
                                            className="linear-progress" />
                                    </TableCell>
                                    <TableCell> {row.createdAt ? format(new Date(row.createdAt), 'dd/MM/yyyy') : 'Invalid Date'}</TableCell>
                                    <TableCell> {row.dueDate ? format(new Date(row.dueDate), 'dd/MM/yyyy') : 'Invalid Date'}</TableCell>
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
                            {ids.join(", ")} will be moved to recycle bin and deleted forever after 30 days.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDelete} color="primary" variant="contained" >
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
