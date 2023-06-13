import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const [cPassword, setcPassword] = useState("");
  const handleConfirmPasswordChange = (e) => {
    setcPassword(e.target.value);
  };
  const signup = async () => {
    const url = "http://localhost:5000/api/auth/CreateUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      alert(json.error);
    }
  };
  const open = false;
  return (
    <>
      <Snackbar open={open}>
        <Alert severity="warning">
          This is a warning alert — check it out!
        </Alert>
      </Snackbar>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography p={3} m={3} variant="h4" color={"primary"}>
          SIGN UP
        </Typography>

        <TextField
          sx={{ width: { lg: "40%", md: "60%", xs: "90%" } }}
          variant="outlined"
          required
          name="title"
          id="title"
          onChange={handleNameChange}
          margin="normal"
          label="Enter name"
          value={name}
        ></TextField>
        <TextField
          sx={{ width: { lg: "40%", md: "60%", xs: "90%" } }}
          variant="outlined"
          required
          name="title"
          id="title"
          onChange={handleEmailChange}
          margin="normal"
          label="Enter email"
          value={email}
        ></TextField>
        <TextField
          sx={{ width: { lg: "40%", md: "60%", xs: "90%" } }}
          variant="outlined"
          required
          name="title"
          id="title"
          onChange={handlePasswordChange}
          margin="normal"
          label="Enter Password"
          value={password}
        ></TextField>
        <TextField
          sx={{ width: { lg: "40%", md: "60%", xs: "90%" } }}
          variant="outlined"
          required
          name="title"
          id="title"
          onChange={handleConfirmPasswordChange}
          margin="normal"
          label="Enter Password"
          value={cPassword}
        ></TextField>
        <Button
          disabled={
            cPassword !== password ||
            password.length === 0 ||
            cPassword.length === 0
          }
          variant="contained"
          sx={{ width: "40%", padding: 2, margin: 3 }}
          onClick={signup}
        >
          Login
        </Button>
      </Container>
    </>
  );
};

export default Signup;
