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
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const providerValue = useMemo(() => ({ user, setUser, setShow }), [
    user,
    setUser,
    setShow,
  ]);

  return (
    <UserContext.Provider value={providerValue}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          {show ? (
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
