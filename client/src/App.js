import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing.jsx";
import Board from "./pages/Board";
import Navbar from "./pages/Navbar";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/board" component={Board} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
export default App;
