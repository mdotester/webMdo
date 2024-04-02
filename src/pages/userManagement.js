import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Menu,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DashboardLayout } from "../components/dashboard-layout";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    pn: "",
    password: "",
    role: "",
  });
  const [selectedPrivilege, setSelectedPrivilege] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);

  const addUser = async () => {
    try {
      const response = await fetch("/userManage/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const data = await response.json();
        setUsers([...users, data]); // Menambahkan pengguna baru ke daftar pengguna
        setNewUser({ name: "", pn: "", password: "", role: "" }); // Mengosongkan formulir setelah berhasil menambahkan pengguna
        setSelectedPrivilege("");
      } else {
        setError("Failed to add user");
      }
    } catch (error) {
      setError("Error adding user");
    }
  };

  const handleMenuItemClick = (privilege) => {
    setNewUser({ ...newUser, role: privilege }); // Menetapkan peran yang dipilih pada pengguna baru
    setSelectedPrivilege(privilege);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        User Management
      </Typography>
      <Box mb={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <AccountCircleIcon />
          </Grid>
          <Grid item>
            <TextField
              label="Name"
              variant="outlined"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Personal Number"
              variant="outlined"
              value={newUser.pn}
              onChange={(e) => setNewUser({ ...newUser, pn: e.target.value })}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={addUser}>
              Add User
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleClick}>
              {selectedPrivilege ? selectedPrivilege : "Role"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuItemClick("Maker")}>
                Maker
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("Checker")}>
                Checker
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("Signer")}>
                Signer
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h6">User List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Personal Number</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.pn}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

UserManagement.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UserManagement;
