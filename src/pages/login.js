import Head from "next/head";
import React from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { userService, alertService, AlertBox } from "../services";
import { useState } from "react";

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
      user: Yup.string().max(255).required("Username is required!"),
      password: Yup.string().max(255).required("Password is required!"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      userService
        .login(formik.values.user, formik.values.password)
        .then((data) => {
          if (data.status == true) {
            Router.push("/").catch(console.error);
          } else {
            setOpen(true);
            setMessageAlert(data.message);
            setErrorAlert("error");
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
          <AlertBox
            open={open}
            setOpen={setOpen}
            message={messageAlert}
            errorType={errorAlert}
          />
          <Box
            component="img"
            sx={{
              height: 300,
              width: 600,
            }}
            alt="MDO"
            src={"/static/images/logo/mdo_no_bg.png"}
          />

          <form onSubmit={formik.handleSubmit}>
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
                SIGN IN
              </Button>
            </Box>
          </form>

          <Typography variant="body1" align="center">
            Don't have an account?{" "}
            <Link href="/register" underline="always">
              Register here
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Login;
