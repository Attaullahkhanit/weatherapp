// src/SignUpPage.js
import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import "./styles.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/showToast";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
 
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
      showSuccessToast("Sign Up successfuly");
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error.message);
      showErrorToast("Please Fill the Fields");
    }
  };

  return (
    <Container className="app-container" component="main" maxWidth="xs">
      <Paper elevation={3} className="sign-up-paper">
        <Typography variant="h5" component="h1">
          Sign Up
        </Typography>
        <form className="sign-up-form" onSubmit={handleSignUp}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="sign-up-button"
          >
            Sign Up
          </Button>
          <Typography variant="body2" className="sign-up-link">
            Already have an account? <Link href="/signin">Sign In</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
