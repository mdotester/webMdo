import Head from "next/head";
import React, { useState } from "react";
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

const Register = () => {
  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("error");
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      pn: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required!"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
      password: Yup.string().max(255).required("Password is required!"),
      pn: Yup.string().max(255).required("Personal Number is required!"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      userService
        .register(values.username, values.email, values.password, values.pn)
        .then((data) => {
          if (data.status === true) {
            Router.push("/login").catch(console.error);
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
        <title>Register | MDO</title>
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
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.pn && formik.errors.pn)}
              fullWidth
              helperText={formik.touched.pn && formik.errors.pn}
              label="Personal Number"
              margin="normal"
              name="pn"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.pn}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
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
                REGISTER
              </Button>
            </Box>
          </form>
          <Typography variant="body1" align="center">
            Already have an account?{" "}
            <Link href="/login" underline="always">
              Login here
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Register;
