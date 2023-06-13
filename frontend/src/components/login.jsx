import { Button, Container, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const login = async () => {
    const url = "http://localhost:5000/api/auth/AuthUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      alert("invalid credentials");
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography p={3} m={3} variant="h4" color={"primary"}>
        LOGIN
      </Typography>
      <TextField
        sx={{ width: "40%" }}
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
        sx={{ width: "40%" }}
        variant="outlined"
        required
        name="title"
        id="title"
        onChange={handlePasswordChange}
        margin="normal"
        label="Enter Password"
        value={password}
      ></TextField>
      <Button
        disabled={email.length === 0 || password.length === 0}
        variant="contained"
        sx={{ width: "40%", padding: 2, margin: 3 }}
        onClick={login}
      >
        Login
      </Button>
      <Typography>
        Dont already have an account ?{" "}
        <Link component={RouterLink} to={"/signup"}>
          sign up here
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
