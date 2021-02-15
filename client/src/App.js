import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import List from "./pages/List";
import "./App.css";

import Calendar from './pages/Calendar';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/list" component={List} />
				<Route path="/calendar" component={Calendar} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
export default App;