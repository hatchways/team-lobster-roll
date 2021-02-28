import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing.jsx";
import Board from "./pages/Board";
import Navbar from "./pages/Navbar";
import Upload from "./pages/Upload";
import Calendar from "./pages/Calendar";
import Stripe from "./pages/Stripe";
import { UserContextProvider } from "./contexts/UserContext";
import { SocketContextProvider } from "./contexts/SocketContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <SocketContextProvider>
        <MuiThemeProvider theme={theme}>
          <Navbar />
          <BrowserRouter>
            <Switch>
              <Route path="/stripe/payment" exact component={Stripe} />
              <ProtectedRoute path="/board/:id" component={Board} />
              <Route path="/" exact component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/calendar" component={Calendar} />
              <Route path="*" component={() => "404 Not Found"} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </SocketContextProvider>
    </UserContextProvider>
  );
}
export default App;
