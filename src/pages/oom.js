import { styled, alpha } from "@mui/material/styles";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import TableRow from "@mui/material/TableRow";
import MenuItem from '@mui/material/MenuItem';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { visuallyHidden } from "@mui/utils";
import { DashboardLayout } from "../components/dashboard-layout";
import { auditService } from "../services";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import assign from "lodash/assign";
import Head from "next/head";
import { useState } from "react";
import { mwService, AlertBox } from "../services";

const handleChange = (e) => {
  const newValues = assign(values, { [e.target.id]: e.target.value });
  setValues(newValues);
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            HOURLY REPORT MDO
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const headCells = [
  {
    id: "audit-type",
    numeric: false,
    disablePadding: false,
    label: "Service",
  },

  {
    id: "audit-message",
    numeric: true,
    disablePadding: false,
    label: "Changes Log",
  },
  {
    id: "audit-pn",
    numeric: true,
    disablePadding: false,
    label: "PN",
  },
  {
    id: "audit-name",
    numeric: true,
    disablePadding: false,
    label: "Edited By",
  },
  {
    id: "audit-timestamp",
    numeric: true,
    disablePadding: false,
    label: "Updated At",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function Page() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("service-name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [resultArr, setResultArr] = React.useState([]);
  //-----
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [errorAlert, setErrorAlert] = useState("error");
  const [messageAlert, setMessageAlert] = useState("");
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);


  const categories = [
    {
      value: 'BIFAST',
      label: 'BIFAST',
    },
    {
      value: 'ESB MONOLITH',
      label: 'ESB MONOLITH',
    },
    {
      value: 'ESB MSR',
      label: 'ESB MSR',
    },
    {
      value: 'PROSWITCHING',
      label: 'PROSWITCHING',
    },
    {
      value: 'BRIINTERFACE',
      label: 'BRIINTERFACE',
    },
  ];

  const statusReport = [
    {
      value: 'OPEN',
      label: 'OPEN',
    },
    {
      value: 'CLOSED',
      label: 'CLOSED',
    },

  ];

  React.useEffect(() => {
    auditService
      .auditGet()
      .then((resp) => {
        if (resp.status == true) {
          setResultArr(resp.data);
        } else {
        }
      })
      .catch(() => {});
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - resultArr.length) : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSubmit = () => {
    const failResponse = () => {
      setErrorAlert("error");
      setMessageAlert("fail to add alert");
      setOpenAlertBox(true);
      setOpenConfirm(false);
    };

    mwService
      .createAlert(values)
      .then((resp) => {
        if (resp.data.status == true) {
          setErrorAlert("success");
          setMessageAlert("success to add alert");
          setOpenAlertBox(true);
          setOpenConfirm(false);
          setResultArr(resp.data.result);
        } else {
          failResponse();
        }
      })
      .catch(failResponse);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = resultArr.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <SearchAppBar />
      </Paper>

      <Box
        autoComplete="off"
        component="form"
        noValidate
        sx={{
          "& .MuiTextField-root": {
            display: "flex",
            flexGrow: 1,
            minHeight: "75%",
          },
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={10}>
            <TextField
              id="alertName"
              label="Issue"
              maxRows={4}
              multiline
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="groupName"
              label="Start Time"
              multiline
              maxRows={4}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="caption"
              label="End Time"
              multiline
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={10}>
            {/* <TextField
              id="kibanaQuery"
              label="Kategori"
              multiline
              onChange={handleChange}
              rows={6}
            /> */}
            <TextField
              id="outlined-select-currency"
              select
              label="Kategori Aplikasi"
              defaultValue="BIFAST"
            >
            {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          </Grid>

          <Grid item xs={10}>
            {/* <TextField
              id="threshold"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              label="Status"
              multiline
              onChange={handleChange}
              type="number"
            /> */}

            <TextField
              id="outlined-select-currency"
              select
              label="Status Report"
              defaultValue="OPEN"
            >
              {statusReport.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
              ))}
            </TextField>

            
          </Grid>
          <Grid item xs={10}>
            <Button
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              onClick={handleOpen}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={10}>
            <AlertBox
              errorType={errorAlert}
              message={messageAlert}
              open={openAlertBox}
              setOpen={setOpenAlertBox}
            />
          </Grid>
        </Grid>
        <Modal
          open={openConfirm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure ?
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  type="submit"
                  onClick={handleSubmit}
                  color="success"
                >
                  YES
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  NO
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>

      {/* // Modal */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Disable the service?
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button variant="outlined" color="success">
                YES
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleClose()}
              >
                NO
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal> */}
    </Box>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
