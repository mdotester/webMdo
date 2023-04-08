import Head from "next/head";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { mwService, AlertBox } from "../services";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const varToString = (varObj) => Object.keys(varObj)[0];

const Page = () => {
  const [svcName, setSvcName] = useState("");
  const [isGW, setIsGW] = useState(false);
  const [isISOGW, setIsISOGW] = useState(false);
  const [isBLMON, setIsBLMON] = useState(false);
  const [isBLNONMON, setIsBLNONMON] = useState(false);
  const [isPLCORE, setIsPLCORE] = useState(false);
  const [isPLCARD, setIsPLCARD] = useState(false);
  const [isDC, setIsDC] = useState(false);
  const [isDRC, setIsDRC] = useState(false);
  const [isODC, setIsODC] = useState(false);

  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("error");
  const [resultArr, setResultArr] = useState(null);

  const handleSubmit = () => {
    let varReq = {};
    let checkNodeTypeSelected = isGW || isISOGW || isBLMON || isBLNONMON || isPLCORE || isPLCARD;
    let checkSiteTypeSelected = isDC || isDRC || isODC;
    // console.log("submited");
    // console.log("svcName:", svcName);
    // console.log("set node:", isGW || isISOGW || isBLMON || isBLNONMON || isPLCORE || isPLCARD);
    // console.log("set site:", isDC || isDRC || isODC);

    varReq[varToString({ isGW }).toString()] = isGW;
    varReq[varToString({ isISOGW }).toString()] = isISOGW;
    varReq[varToString({ isBLMON }).toString()] = isBLMON;
    varReq[varToString({ isBLNONMON }).toString()] = isBLNONMON;
    varReq[varToString({ isPLCORE }).toString()] = isPLCORE;
    varReq[varToString({ isPLCARD }).toString()] = isPLCARD;
    varReq[varToString({ isDC }).toString()] = isDC;
    varReq[varToString({ isDRC }).toString()] = isDRC;
    varReq[varToString({ isODC }).toString()] = isODC;
    varReq["svcName"] = svcName;
    console.log(varReq);

    if (!checkNodeTypeSelected) {
      setOpen(true);
      setMessageAlert("must select at least one node type");
      setErrorAlert("error");
    } else if (!checkSiteTypeSelected) {
      setOpen(true);
      setMessageAlert("must select at least one site type");
      setErrorAlert("error");
    } else {
      mwService
        .updateCacheEsb(varReq)
        .then((resp) => {
          if (resp.data.status) {
            setResultArr(resp.data.data);
            setOpen(true);
            setMessageAlert("success to update cache");
            setErrorAlert("success");
          } else {
            setOpen(true);
            setMessageAlert("fail to update cache");
            setErrorAlert("error");
          }
        })
        .catch(() => {
          setOpen(true);
          setMessageAlert("fail to update cache");
          setErrorAlert("error");
        });
    }
  };
  return (
    <>
      <Head>
        <title>Update Cache | MDO</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          {/* <form onSubmit={handleSubmit}> */}
          <TextField
            //   error={Boolean(formik.touched.user && formik.errors.user)}
            fullWidth
            //   helperText={formik.touched.user && formik.errors.user}
            label="Service Name to Invoke"
            margin="normal"
            name="svcName"
            //   onBlur={formik.handleBlur}
            onChange={(e) => {
              setSvcName(e.target.value);
            }}
            //   onChange={formik.handleChange}
            type="text"
            //   value={formik.values.user}
            value={svcName}
            variant="outlined"
          />
          <br />
          <hr />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={isGW}
                onChange={() => {
                  setIsGW(!isGW);
                }}
                name="GW"
              />
            }
            label="GW"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isISOGW}
                onChange={() => {
                  setIsISOGW(!isISOGW);
                }}
                name="ISOGW"
              />
            }
            label="ISOGW"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isBLMON}
                onChange={() => {
                  setIsBLMON(!isBLMON);
                }}
                name="BLMON"
              />
            }
            label="BLMON"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isBLNONMON}
                onChange={() => {
                  setIsBLNONMON(!isBLNONMON);
                }}
                name="BLNONMON"
              />
            }
            label="BLNONMON"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isPLCORE}
                onChange={() => {
                  setIsPLCORE(!isPLCORE);
                }}
                name="PLCORE"
              />
            }
            label="PLCORE"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isPLCARD}
                onChange={() => {
                  setIsPLCARD(!isPLCARD);
                }}
                name="PLCARD"
              />
            }
            label="PLCARD"
          />
          <br />
          <hr />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={isDC}
                onChange={() => {
                  setIsDC(!isDC);
                }}
                name="DC"
              />
            }
            label="DC"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isDRC}
                onChange={() => {
                  setIsDRC(!isDRC);
                }}
                name="DRC"
                disabled
              />
            }
            label="DRC"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isODC}
                onChange={() => {
                  setIsODC(!isODC);
                }}
                name="ODC"
                disabled
              />
            }
            label="ODC"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              // disabled={formik.isSubmitting}
              fullWidth
              size="large"
              onClick={handleSubmit}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
          <AlertBox open={open} setOpen={setOpen} message={messageAlert} errorType={errorAlert} />
          {/* </form> */}

          {resultArr && open == true && (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>IP</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultArr.map((row) => (
                    <TableRow
                      key={row.IP}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.IP}
                      </TableCell>
                      <TableCell align="right">{row.Status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
