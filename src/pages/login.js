import Head from "next/head";
import React from 'react';
import logo from '../../public/static/images/logo/MDO_logo_no_bg.png';
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import { userService, alertService, AlertBox } from "../services";
import { useState } from "react";
// import CloseButton from "react-bootstrap/CloseButton";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("error");
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    validationSchema: Yup.object({
      user: Yup.string().max(255).required("User is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      userService
        .login(formik.values.user, formik.values.password)
        .then((user) => {
          if (user.data.status == true) {
            // console.log("ok");
            Router.push("/").catch(console.error);
          } else {
            console.log("not ok");
            setOpen(true);
            setMessageAlert(user.data.message);
            setErrorAlert("error");
            // alertService.error("gagal login");
          }
        })
        .catch(alertService.error);
      setSubmitting(false);
    },
  });

  return (
    <>
      <Head>
        <title>Login | MDO</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          {/* <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink> */}
          {/* <img src={"../../public/static/images/logo/MDO_logo_no_bg.png"} alt="Logo" /> */}
          <AlertBox open={open} setOpen={setOpen} message={messageAlert} errorType={errorAlert} />

          <form onSubmit={formik.handleSubmit}>
            {/* <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography>
            </Box> */}
            {/* <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="error"
                  fullWidth
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  startIcon={<GoogleIcon />}
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid> */}
            {/* <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                or login with email address
              </Typography>
            </Box> */}
            <TextField
              error={Boolean(formik.touched.user && formik.errors.user)}
              fullWidth
              helperText={formik.touched.user && formik.errors.user}
              label="Personal Number / Username"
              margin="normal"
              name="user"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.user}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
            </Box>
            {/* <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography> */}
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
