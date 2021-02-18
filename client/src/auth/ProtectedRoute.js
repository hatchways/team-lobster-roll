import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
