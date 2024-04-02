import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";

const Page = () => {
  const [hosts, setHosts] = useState([
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "7168",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host pertama
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "7169",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    // belum ada bottom koneksi
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "1002",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9901",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "1026",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9801",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9802",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9803",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9804",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "2010",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9501",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9502",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9503",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9504",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
    {
      server: "Linux0-IB",
      ip: "2.0.0.217",
      logAddress: "9505",
      port: "-",
      status: "Disconnected", // Tambahkan properti status untuk host kedua
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertActionUrl, setAlertActionUrl] = useState("");

  const handleLogon = (url) => {
    if (url === "http://172.18.141.41:3131/ssh-logon-au") {
      setAlertActionUrl(url);
      setShowAlert(true);
    } else {
      performLogon(url);
    }
  };

  const handleRemove = (url) => {
    if (url === "http://172.18.141.41:3131/ssh-remove-au") {
      setAlertActionUrl(url);
      setShowAlert(true);
    } else {
      performRemove(url);
    }
  };

  const performAction = async (url) => {
    try {
      const response = await axios.post(url);
      console.log(response.data);
      alert("Action Sukses");
    } catch (error) {
      console.error(`Failed to run action at ${url}:`, error);
      alert(
        `Failed to run action at ${url}. Please check the console for details.`
      );
    }
  };

  const performLogon = async (url) => {
    try {
      const response = await axios.post(url);
      console.log(response.data);
      alert("Logon Sukses");
    } catch (error) {
      console.error(`Failed to run action at ${url}:`, error);
      alert(
        `Failed to run action at ${url}. Please check the console for details.`
      );
    }
  };

  const performRemove = async (url) => {
    try {
      const response = await axios.post(url);
      console.log(response.data);
      alert("Remove Sukses");
    } catch (error) {
      console.error(`Failed to run action at ${url}:`, error);
      alert(
        `Failed to run action at ${url}. Please check the console for details.`
      );
    }
  };

  const handleConfirm = async () => {
    performAction(alertActionUrl);
    setShowAlert(false);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  const filteredHosts = hosts.filter((host) =>
    host.logAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 0,
          py: 0,
        }}
      >
        <Container maxWidth={false}>
          <Grid container>
            <Grid item lg={12} sm={12} xl={10} xs={5}>
              <Typography color="textPrimary" variant="h4">
                On / Off Proswitching
              </Typography>
              <hr />
              <br />
              {/* Text "Automation Koneksi" */}
              <Typography variant="h6">
                Automation Failover Connection
              </Typography>
              <br />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                {/* Buttons */}
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      handleLogon("http://172.18.141.41:3131/ssh-logon-au")
                    }
                    style={{ marginRight: "10px" }}
                  >
                    Logon
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      handleRemove("http://172.18.141.41:3131/ssh-remove-au")
                    }
                  >
                    Remove
                  </Button>
                </div>
                {/* Search */}
                <TextField
                  label="Search by Log Address"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, marginLeft: "60%" }}
                />
              </Box>

              {/* Alert dialog */}
              {showAlert && (
                <>
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(0, 0, 0, 0.5)", // Warna latar belakang dengan opasitas
                      zIndex: 999, // Mengatur urutan tampilan
                      backdropFilter: "blur(5px)", // Efek blur pada latar belakang
                    }}
                    onClick={handleCancel} // Menggunakan onClick untuk menutup alert saat latar belakang di klik
                  />
                  <div
                    style={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "#fff",
                      padding: "20px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      zIndex: 1000,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        marginBottom: "20px",
                        fontWeight: "bold",
                        color: "#ff5722",
                      }}
                    >
                      Perhatian !!!
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "50px" }}
                    >
                      <strong>
                        Untuk Menggunakan Fitur Automation ini Pastikan Tombol
                      </strong>
                      <br />
                      <br />
                      <strong>Logon:</strong> Pastikan Semua Koneksi Dalam
                      Keadaan Tidak Menyala
                      <br />
                      <strong>Remove:</strong> Pastikan Semua Koneksi Dalam
                      Keadaan Menyala
                    </Typography>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleConfirm}
                      style={{ marginRight: "10px" }}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleCancel}
                    >
                      No
                    </Button>
                  </div>
                </>
              )}

              {/* Table content */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Server</TableCell>
                      <TableCell>Log Address</TableCell>
                      <TableCell>Ip</TableCell>
                      <TableCell>Port</TableCell>
                      {/* <TableCell>Status</TableCell>  */}
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredHosts.map((host, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{host.server}</TableCell>
                        <TableCell>{host.logAddress}</TableCell>
                        <TableCell>{host.ip}</TableCell>
                        <TableCell>{host.port}</TableCell>
                        {/* <TableCell>{host.status}</TableCell> */}
                        <TableCell>
                          {host.logAddress === "7168" && (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleLogon(
                                    "http://172.18.141.41:3131/ssh-logon-7168"
                                  )
                                }
                                style={{ marginRight: "10px" }}
                              >
                                Logon
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() =>
                                  handleRemove(
                                    "http://172.18.141.41:3131/ssh-remove-7168"
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </>
                          )}
                          {host.logAddress === "7169" && (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleLogon(
                                    "http://172.18.141.41:3131/ssh-logon-7169"
                                  )
                                }
                                style={{ marginRight: "10px" }}
                              >
                                Logon
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() =>
                                  handleRemove(
                                    "http://172.18.141.41:3131/ssh-remove-7169"
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
