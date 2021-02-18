import React, { createContext, useState, useMemo } from "react";

export const UserContext = createContext({});

export const UserContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const providerValue = useMemo(
    () => ({ user, setUser, loggedIn, setLoggedIn }),
    [user, setUser, loggedIn, setLoggedIn]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {props.children}
    </UserContext.Provider>
  );
};
