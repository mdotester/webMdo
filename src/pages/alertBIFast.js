import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import assign from "lodash/assign";
import Head from "next/head";
import { useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { mwService, AlertBox } from "../services";

function AlertBIFast() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [errorAlert, setErrorAlert] = useState("error");
  const [messageAlert, setMessageAlert] = useState("");
  const [openAlertBox, setOpenAlertBox] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [resultArr, setResultArr] = useState(null);
  const [values, setValues] = useState({});
  
  const handleChange = (e) => {
    const newValues = assign(values, { [e.target.id]: e.target.value })
    setValues(newValues)
  }

  const handleClose = () => setOpenConfirm(false);

  const handleOpen = () => setOpenConfirm(true);

  const handleSubmit = () => {
    const failResponse = () => {
      setErrorAlert("error");
      setMessageAlert("fail to add alert");
      setOpenAlertBox(true);
      setOpenConfirm(false);
    }
    
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
            failResponse()
          }
        })
        .catch(failResponse);
  }

  return (
  <>  
    <Head>
        <title>Form Alert | MDO</title>
    </Head>

    <Box
      autoComplete="off"
      component="form"
      noValidate
      sx={{
        '& .MuiTextField-root': {
          display: "flex",
          flexGrow: 1,
          minHeight: "75%",
        },
      }}
    >
      <Grid container  justifyContent="center" spacing={2}>
        <Grid item xs={10}>
          <TextField
              id="alertName"
              label="Name of Alert"
              maxRows={4}
              multiline
              onChange={handleChange}
            />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="groupName"
            label="Group Whatsapp"
            multiline
            maxRows={4}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="caption"
            label="Caption for Alert"
            multiline
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="kibanaQuery"
            label="KQL Query"
            multiline
            onChange={handleChange}
            rows={6}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="threshold"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
            label="Threshold"
            multiline
            onChange={handleChange}
            type="number"
          />
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
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={6}>
              <Button variant="outlined" type="submit" onClick={handleSubmit} color="success" >
              YES
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="error" onClick={handleClose}>NO</Button>
            </Grid>
          </Grid>
        </Box>

      </Modal>
    </Box>
  </>
  );
}

AlertBIFast.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default AlertBIFast;