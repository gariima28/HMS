import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import AddIcon, { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { border, borderColor, borderRadius, margin, padding, width } from '@mui/system';
import HashLoader from './HashLoaderCom';
import { color } from 'framer-motion';
import { GetAllApi } from 'api/api'
import { makeStyles } from '@mui/styles';
import NoDataFound from '../NoDataFound';

import { AllStaffPostApi } from 'api/api'
import { AllStaffGetAllApi } from 'api/api'
import { AllStaffGetAllByIdApi } from 'api/api'
import { AllStaffUpdateByIdApi } from 'api/api'
import { AllStaffBanApi } from 'api/api'
import { set, truncate } from 'lodash';
import { object } from 'prop-types';

// Style 
const useStyles = makeStyles({
  searchBar: {
    display: 'flex'
  },

  search: {
    borderRadius: '0px'
  },

  searchIcon: {
    height: 39,
    paddingTop: 6,
    padding: '2px 8px',
    border: '1px solid #4634ff',
    backgroundColor: '#4634ff',
    borderLeft: '0px',
    borderRadius: "0px 3px 3px 0px"
  },
  enable: {
    border: '1px solid #ff9f43',
    borderRadius: 10,
    fontSize: 12,
    backgroundColor: 'rgba(255, 159, 67, 0.1)',
    color: '#ff9f43',
  },
  closed: {
    border: '1px solid #000',
    borderRadius: 10,
    fontSize: 12,
    backgroundColor: 'rgba(88, 81, 74, 0.1)',
    color: '#000',
  },
  green: {
    border: '1px solid #28c76f',
    borderRadius: 10,
    fontSize: 13,
    backgroundColor: 'rgba(40, 199, 111, 0.1)',
    color: '#28c76f',
  },
  high: {
    border: '1px solid #eb2222',
    borderRadius: 10,
    fontSize: 12,
    backgroundColor: 'rgba(234, 84, 85, 0.1)',
    color: '#eb2222',
  },

});

// Style 
const enable = {
  border: '1px solid red',
  borderRadius: 5,
  padding: 1,
  backgroundColor: 'green'
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const content = {

}
const inputMargin = {
  marginTop: -10
}
const input = {
  width: '100%',
  marginTop: 2,
  marginBottom: 1
}
const myClass = {
  border: '1px solid red',
  borderRadius: '4px',
  boxShadow: "none"
}
// Style 

const allStaff = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loader, setLoader] = useState(false)

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = useState(false);
  const [show, setShow] = useState(true);
  const [update, setUpdate] = useState(true);
  const [ban, setBan] = useState(true);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [roleId, setRoleId] = useState();
  const [roleName, setRoleName] = useState();
  const [password, setPassword] = useState();

  const [name, setName] = useState('');
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [search, setSearch] = useState('')

  const [nameCheck, setNameCheck] = useState('');
  const [userNameCheck, setUserNameCheck] = useState();
  const [emailCheck, setEmailCheck] = useState();

  const [idForUpdate, setIdForUpdate] = useState();
  const [idForBan, setIdForBan] = useState();
  // console.log('my idddd', idForBan)
  const [allData, setAllData] = useState([]);
  const [row, setRow] = useState([]);

  const [isNameValidRequired, setIsNameValidRequired] = useState(false);
  const [isUserNameValidRequired, setIsUserNameValidRequired] = useState(false);
  const [isEmailValidRequired, setIsEmailValidRequired] = useState(false);
  const [isPasswordValidRequired, setIsPasswordValidRequired] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+ event.target.value);
    setPage(0);
  };

  useEffect(() => {
    MyRoleGetAllApi()
    MyAllStaffGetAllDataApi()
  }, [])

  // Get ll api for id or role in All Staff 
  const MyRoleGetAllApi = async () => {
    // setLoader(true)
    try {
      const response = await GetAllApi();
      console.log('My role get all DATAAAAAA', response)
      if (response?.status === 200) {
        setAllData(response?.data?.roles)
        // toast.success(response?.data?.msg)
      } else {
        // toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const validateFunction = () => {
    let IsValid = true

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || name === "" || !nameRegex.test(name)) {
      IsValid = false
      setLoader(false)
      setIsNameValidRequired(true)
    } else {
      setIsNameValidRequired(false)
    }

    const userNameRegex = /^[A-Za-z\s]+$/;
    if (!userName || userName === "" || !userNameRegex.test(userName)) {
      IsValid = false
      setLoader(false)
      setIsUserNameValidRequired(true)
    } else {
      setIsUserNameValidRequired(false)
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || email === "" || !regexEmail.test(email)) {
      IsValid = false
      setLoader(false)
      setIsEmailValidRequired(true)
    } else {
      setIsEmailValidRequired(false)
    }
    return IsValid
  }

  // Validation 
  const HandleName = (e) => {
    setName(e)
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsNameValidRequired(nameRegex.test(e))
    if (e === '' || !nameRegex.test(e)) {
      setIsNameValidRequired(true)
    } else {
      setIsNameValidRequired(false)
    }
  }
  const HandleUserName = (e) => {
    setUserName(e)
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsUserNameValidRequired(nameRegex.test(e))
    if (e === '' || !nameRegex.test(e)) {
      setIsUserNameValidRequired(true)
    } else {
      setIsUserNameValidRequired(false)
    }
  }
  const HandleEmail = (e) => {
    setEmail(e)
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValidRequired(regexEmail.test(e))
    if (e === '' || !regexEmail.test(e)) {
      setIsEmailValidRequired(true)
    } else {
      setIsEmailValidRequired(false)
    }
  }
  const HandlePassword = (e) => {
    setPassword(e)
    const passwordRegex = /^\d{4}(-\d{4})?(\d+)?$/;
    setIsPasswordValidRequired(passwordRegex.test(e))
    if (e === '' || !passwordRegex.test(e)) {
      setIsPasswordValidRequired(true)
    } else {
      setIsPasswordValidRequired(false)
    }
  }

  // Validation 

  // let bootstrap;
  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);
  const offcanvasRef33 = useRef(null);

  // post api 
  const MyAllStaffPostApi = async () => {
    if (validateFunction()) {
      const formData = {
        "name": name,
        "userName": userName,
        "email": email,
        "password": password,
        "roleId": roleId
      }
      setLoader(true)
      try {
        const response = await AllStaffPostApi(formData);
        console.log('response of add role api', response)
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          MyAllStaffGetAllDataApi()
          setLoader(false)
          setOpen3(false)

        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Get all in staff 
  const MyAllStaffGetAllDataApi = async () => {
    setLoader(true)
    try {
      const response = await AllStaffGetAllApi(search);
      console.log('My All Stafff get all---------------', response)
      if (response?.status === 200) {
        setRow(response?.data?.staffs)
        // toast.success(response?.data?.msg)
        setLoader(false)

        const transformedRows = response?.data?.staffs?.map((allRoles, index) => ({
          ...allRoles,
          index: index + 1,
          email: allRoles?.email,
          role: allRoles?.role?.roleName,
          status: <Button sx={{ marginLeft: 1, padding: 0, height: 30, borderColor: '#eb2222', color: '#eb2222' }} className={`${allRoles?.status === 'ENABLED' ? `${classes.enable}` : `${classes.green}`}`} variant="outlined" onClick={() => { setIdForBan(allRoles.id); handleOpen2(); }} >
            <Typography sx={{ paddingTop: .8, paddingRight: .3 }}>
            </Typography> {allRoles?.status === "ENABLED" ? `${'Enable'}` : `${'Disbale'}`}
          </Button>,
          action:
            <>
              <Button sx={{ marginLeft: 0, padding: 0, height: 30, borderColor: '#4634ff', color: '#4634ff' }} variant="outlined" onClick={() => { MyRoleGetByIdApi(allRoles.id); handleOpen(); }}>
                <Typography sx={{ paddingTop: .8, paddingRight: .3 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                    <g fill="none" stroke="#4634ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                      <path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" />
                      <path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" />
                    </g>
                  </svg>
                </Typography> <Typography >{'Edit'}</Typography>
              </Button>

            </>
        }))
        setRow(transformedRows)
      } else {
        // toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get by id  
  const MyRoleGetByIdApi = async (id) => {
    setIdForUpdate(id)
    // setLoader(true)
    try {
      const response = await AllStaffGetAllByIdApi(id);
      console.log('Data by id in staff', response)
      if (response?.status === 200) {
        setRoleId(response?.data?.staff?.id)
        setRoleName(response?.data?.staff?.role?.roleName)

        setName(response?.data?.staff?.name)
        setUserName(response?.data?.staff?.userName)
        setEmail(response?.data?.staff?.email)

        setNameCheck(response?.data?.staff?.name)
        setUserNameCheck(response?.data?.staff?.userName)
        setEmailCheck(response?.data?.staff?.email)


        setPassword(response?.data?.staff?.password)

        // toast.success(response?.data?.msg)
      } else {
        // toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // update staff 
  const MyRoleUpdateByIdApi = async () => {
    if (validateFunction()) {
      const formData = new FormData()
      if (name !== nameCheck) {
        formData.append('name', name)
      }
      if (userName !== userNameCheck) {
        formData.append('username', userName,)
      }
      if (email !== emailCheck) {
        formData.append('email', email)
      }
      formData.append('roleId', roleId)
      try {
        const response = await AllStaffUpdateByIdApi(idForUpdate, formData);
        console.log('update response in staff', response)
        if (response?.status === 200) {
          toast.success(response?.data?.message)
          MyAllStaffGetAllDataApi()
          setUpdate(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setUpdate(true)
          }, 0.5)

        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        console.log(error)
      }
    }

  }
  // Ban api 
  const MyStaffBanApi = async () => {
    setLoader(true)
    try {
      const response = await AllStaffBanApi(idForBan);
      console.log('Ban api response', response)
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        MyAllStaffGetAllDataApi()
        setOpen2(false)
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const columns = [
    { id: 'index', label: 'S.N.', minWidth: 140 },
    { id: 'userName', label: 'Username', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 140, align: 'center', format: (value) => value.toLocaleString('en-US'), },
    { id: 'email', label: 'Email', minWidth: 140, align: 'center', format: (value) => value.toLocaleString('en-US'), },
    { id: 'role', label: 'Role', minWidth: 140, align: 'right', format: (value) => value.toLocaleString('en-US'), },
    { id: 'status', label: 'Status', minWidth: 140, align: 'center', format: (value) => value.toLocaleString('en-US'), },
    { id: 'action', label: 'Action', minWidth: 140, align: 'center', format: (value) => value.toLocaleString('en-US'), },
  ];

  const rows = [
    {
      name: 'India', code: 'IN', population: 'India',
      action:
        <>
          <Button sx={{ marginLeft: 2, height: 30, borderColor: '#4634ff', color: '#4634ff' }} variant="outlined" onClick={handleOpen}>
            Edit</Button>
          <Button sx={{ marginLeft: 2, height: 30, borderColor: '#eb2222', color: '#eb2222' }} variant="outlined" onClick={handleOpen2}>
            Ban</Button>
          <Button sx={{ marginLeft: 2, height: 30, borderColor: '#10163a', color: '#10163a' }} variant="outlined">
            Login</Button>
        </>
    }
  ];

  const handleChange = (e) => {
    const trimmedValue = e.target.value.trimStart();
    setSearch(trimmedValue);
  };

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
        <Grid container spacing={2}>

          <Grid className={classes.searchBar} item xs={12} sm={3}   >
            <Grid>
              <b>All Staff</b>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={9} sx={{ display: "flex", justifyContent: 'right', flexWrap: 'wrap' }}>
            <Grid className={classes.searchBar}>
              <Grid className={classes.search}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                      height: 39,
                      boxShadow: 'none'
                    },
                  }}
                  value={search}
                  onChange={handleChange}
                  label="Search By Email" />
              </Grid>
              <Grid style={{ cursor: 'pointer' }} onClick={MyAllStaffGetAllDataApi} className={classes.searchIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
                  <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="m5 27l7.5-7.5M28 13a9 9 0 1 1-18 0a9 9 0 0 1 18 0" />
                </svg>
              </Grid>
            </Grid>
            <Button sx={{ marginLeft: 2, height: 39, backgroundColor: '#4634ff', color: '#fff' }} variant="outlined" onClick={handleOpen3}>
              <Typography sx={{ paddingTop: .8, paddingRight: .3 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M6 12h12m-6 6V6" />
                </svg>
              </Typography>
              Add New
            </Button>
          </Grid>

        </Grid>

      </Box>
      <Box sx={{ marginTop: 5 }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  row && row.length > 0 ? (
                    row?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        return (

                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}

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
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}

          />
        </Paper>
      </Box>

      <Box>

        {
          show && (
            <Modal
              open={open3}
              onClose={handleClose3}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              ref={offcanvasRef}
            >
              <Box sx={style}>
                <Box sx={content}>
                  <Typography sx={{ fontSize: 24 }}>
                    Add Staff
                  </Typography>
                  <Box>
                    <TextField
                      sx={{ ...input, ...(isNameValidRequired === true && myClass), }}
                      required id="outlined-required" label="Name" defaultValue="" placeholder='Enter Name' onChange={(e) => HandleName(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                    <Box sx={{ marginTop: '-9px' }}>
                      {
                        isNameValidRequired && (
                          <Typography sx={{ color: 'red', fontSize: 16 }}>*Valid name required</Typography>
                        )
                      }
                    </Box>
                    <TextField sx={{ ...input, marginTop: 3, ...(isUserNameValidRequired === true && myClass), }} required id="outlined-required" label="Username" defaultValue="" onChange={(e) => HandleUserName(e.target.value)} placeholder='Enter UserName' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                    <Box sx={{ marginTop: '-9px' }}>
                      {
                        isUserNameValidRequired && (
                          <Typography sx={{ color: 'red', fontSize: 16 }}>*Valid userName required</Typography>
                        )
                      }
                    </Box>
                    <TextField sx={{ ...input, marginTop: 3, ...(isEmailValidRequired === true && myClass), }} required id="outlined-required" label="Email" defaultValue="" onChange={(e) => HandleEmail(e.target.value)} placeholder='Enter Email' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                    <Box sx={{ marginTop: '-9px' }}>
                      {
                        isEmailValidRequired && (
                          <Typography sx={{ color: 'red', fontSize: 16 }}>*Valid Email required</Typography>
                        )
                      }
                    </Box>
                    <TextField id="outlined-select-currency" sx={{ ...input, color: "#000" }} select label="Role" onChange={(e) => setRoleId(e.target.value)} helperText="" >
                      {
                        allData?.map((item, index) => (
                          <MenuItem Item key={index} value={item.id}>
                            {item.roleName}
                          </MenuItem>
                        ))
                      }
                    </TextField>
                    {/* <TextField sx={{ ...input, marginTop: 3, ...(isPasswordValidRequired === true && myClass), }} required id="outlined-required" label="Password" defaultValue="" onChange={(e) => HandlePassword(e.target.value)} placeholder='Enter Password' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                    <Box sx={{ marginTop: '-9px' }}>
                      {
                        isPasswordValidRequired && (
                          <Typography sx={{ color: 'red', fontSize: 16 }}>*Valid password required</Typography>
                        )
                      }
                    </Box> */}
                    <Box sx={{ textAlign: "center", marginTop: 4, width: '100%' }}>
                      <Button sx={{ width: '100%' }} variant="contained" disableElevation onClick={MyAllStaffPostApi}>
                        Submit
                      </Button>
                    </Box>

                  </Box>
                </Box>
              </Box>
            </Modal>
          )
        }
        {
          update && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              ref={offcanvasRef22}
            >
              <Box sx={style}>
                <Box sx={content}>
                  <Typography sx={{ fontSize: 24, marginBottom: 2 }}>
                    Update Staff
                  </Typography>
                  <Box>
                    <InputLabel sx={{ marginBottom: -1 }}>
                      Name
                    </InputLabel>
                    <TextField sx={input} required id="outlined-required" value={name} placeholder='Enter Name' onChange={(e) => HandleName(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                    <Box sx={{ marginTop: '-1px' }}>
                      {
                        isNameValidRequired && (
                          <Typography sx={{ color: 'red', fontSize: 16 }}>*Valid name required</Typography>
                        )
                      }
                    </Box>
                    <InputLabel sx={{ marginBottom: "-15px" }}>
                      UserName
                    </InputLabel>
                    <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" value={userName} onChange={(e) => HandleUserName(e.target.value)} defaultValue="" placeholder='Enter UserName' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                    <Box sx={{ marginTop: '' }}>
                      {
                        isUserNameValidRequired && (
                          <Typography sx={{ color: 'red', fontSize: 16 }}>*Valid userName required</Typography>
                        )
                      }
                    </Box>
                    <InputLabel sx={{ marginBottom: -2 }}>
                      Email
                    </InputLabel>
                    <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" value={email} defaultValue="" onChange={(e) => HandleEmail(e.target.value)} placeholder='Enter Email' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                    <Box sx={{ marginTop: '-9px' }}>
                      {
                        isEmailValidRequired && (
                          <Typography sx={{ color: 'red', fontSize: 16 }}>*Valid Email required</Typography>
                        )
                      }
                    </Box>
                    {/* <InputLabel sx={{ marginBottom: '-8px', marginTop: 1 }}>
                      Role
                    </InputLabel>
                    <TextField id="outlined-select-currency" sx={{ ...input, color: "#000" }} select value={roleId} onChange={(e) => setRoleId(e.target.value)}  >

                      {
                      allData?.map((item, index) => (
                        <MenuItem Item key={index} value={item.id}>
                          {item.roleName}
                        </MenuItem>
                      ))
                      }
                    </TextField> */}
                    <Box sx={{ minWidth: 120 }}>
                      <InputLabel sx={{ marginBottom: '8px', marginTop: 1 }}>
                        Role
                      </InputLabel>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={roleId}
                          onChange={(e) => setRoleId(e.target.value)}
                          label="Age"

                        >
                          {
                            allData?.map((item, index) => (
                              <MenuItem Item key={index} value={item.id}> {item.roleName}</MenuItem>
                            ))
                          }


                        </Select>
                      </FormControl>
                    </Box>


                    <Box sx={{ textAlign: "center", marginTop: 4, width: '100%' }}>
                      <Button sx={{ width: '100%' }} variant="contained" disableElevation onClick={MyRoleUpdateByIdApi}>
                        Update
                      </Button>
                      <Toaster />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Modal>
          )
        }
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          ref={offcanvasRef33}
        >
          <Box sx={style2}>
            <Typography sx={{ fontSize: 25 }} id="modal-modal-title" variant="h6" component="h2">
              Confirmation Alert!
            </Typography>
            <hr />
            <Typography sx={{ ml: 2, mt: 2 }} id="modal-modal-description" >
              Are you sure to Enable and Disable this staff?
            </Typography>
            <Box sx={{ textAlign: "right", marginTop: 2 }}>
              <Button sx={{ backgroundColor: "#4634ff", color: '#fff' }} variant="contained" href="#contained-buttons" onClick={MyStaffBanApi}>
                Submit
              </Button>
              <Toaster />
            </Box>
          </Box>
        </Modal>

      </Box>

    </>
  )
}

export default allStaff
