import React, { createContext, useState, useMemo } from "react";
import { getBoard } from "../API/board";

export const UserContext = createContext({});

export const UserContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const getAllBoards = async () => {
    const allBoards = {};
    const pending = user.boards.map(async (boardId) => {
      return await getBoard(boardId);
    });
    const resolved = await Promise.all(pending);
    resolved.map((res) => (allBoards[res.data.data._id] = res.data.data));
    const boardList = user.boards.map((boardId) => {
      if (allBoards[boardId]) {
        return allBoards[boardId];
      }
    });
    return boardList;
  };

  const providerValue = useMemo(
    () => ({ user, setUser, loggedIn, setLoggedIn, getAllBoards }),
    [user, setUser, loggedIn, setLoggedIn, getAllBoards]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {props.children}
    </UserContext.Provider>
  );
};
