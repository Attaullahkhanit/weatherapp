// src/SignInPage.js
import React, { useState } from "react";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import "./styles.scss";
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../utils/showToast";

const SignInPage = ({ setUserAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Check if the user is signed in
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User signed in successfully!");
          showSuccessToast("log in successful");
          setUserAuthenticated(true);
          navigate("/home");
        } else {
          console.error("Error signing in: User not found");
        }
      });
    } catch (error) {
      console.error("Error signing in:", error.message);
      showWarningToast("Invalid Email or Password");
    }
  };

  return (
    <Container className="app-container" component="main" maxWidth="xs">
      <Paper elevation={3} className="sign-in-paper">
        <Typography variant="h5" component="h1">
          Sign In
        </Typography>
        <form className="sign-in-form" onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="sign-in-button"
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignInPage;
