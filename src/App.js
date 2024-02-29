import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SignInPage from './page/Authentication/SignIn/SignInPage';
import SignUpPage from './page/Authentication/SignUp/SignUpPage';
import Home from './page/HomePage/Home';
import NotFound from './page/NotFound';
import MapViewPage from './page/MapViewPage/MapViewPage';
import MapAppPage from './page/MapAppPage/MapAppPage';
import TestPage from './page/TestPage';

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

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
            element={<Home userAuthenticated={userAuthenticated} />}
          />
          <Route
            path="/mapview"
            element={<MapViewPage userAuthenticated={userAuthenticated} />}
          />
          <Route
            path="/map"
            element={<MapAppPage userAuthenticated={userAuthenticated} />}
          />
          <Route
          path="/testpage"
          element={<TestPage userAuthenticated={userAuthenticated}/>}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
