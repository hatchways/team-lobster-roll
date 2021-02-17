import React, { useState, useMemo } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing.jsx";
import Board from "./pages/Board";
import { UserContext } from "./contexts/UserContext";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const providerValue = useMemo(
    () => ({ user, setUser, loggedIn, setLoggedIn }),
    [user, setUser, loggedIn, setLoggedIn]
  );

  return (
    <UserContext.Provider value={providerValue}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          {loggedIn ? (
            <Route path="/board" component={Board} />
          ) : (
            <>
              <Route path="/" exact component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
            </>
          )}
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
