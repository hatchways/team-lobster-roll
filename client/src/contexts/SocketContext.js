import React, { createContext, useState, useMemo } from "react";

export const SocketContext = createContext({});

export const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState({});

  const providerValue = useMemo(() => ({ socket, setSocket }), [
    socket,
    setSocket,
  ]);

  return (
    <SocketContext.Provider value={providerValue}>
      {props.children}
    </SocketContext.Provider>
  );
};
