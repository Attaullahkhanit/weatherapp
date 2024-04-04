import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignInPage from "./page/Authentication/SignIn/SignInPage";
import SignUpPage from "./page/Authentication/SignUp/SignUpPage";
import Home from "./page/HomePage/Home";
import NotFound from "./page/NotFound";
import MapViewPage from "./page/MapViewPage/MapViewPage";
import TestPage from "./page/TestPage";
import GoogleMap from "./page/GoogleMap/GoogleMap";

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(
    localStorage.getItem("userAuthenticated") === "true"
  );

  useEffect(() => {
    // Update localStorage when userAuthenticated changes
    localStorage.setItem("userAuthenticated", userAuthenticated);
  }, [userAuthenticated]);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/"
            element={<SignInPage setUserAuthenticated={setUserAuthenticated} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          {/* weather app pages */}
          <Route
            path="/home"
            element={
              userAuthenticated ? (
                <Home
                  userAuthenticated={userAuthenticated}
                  setUserAuthenticated={setUserAuthenticated}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/mapview"
            element={
              userAuthenticated ? (
                <MapViewPage userAuthenticated={userAuthenticated} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/googlemap"
            element={
              userAuthenticated ? (
                <GoogleMap userAuthenticated={userAuthenticated} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/testpage"
            element={
              userAuthenticated ? (
                <TestPage userAuthenticated={userAuthenticated} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
