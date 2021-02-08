import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import List from "./pages/List";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/list" component={List} />
        {/* <Route path="/" component={LandingPage} /> */}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
