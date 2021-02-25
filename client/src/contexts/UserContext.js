import React, { createContext, useState, useMemo, useEffect } from "react";

import { getBoardShallow, getBoard } from "../API/board";

export const UserContext = createContext({});

export const UserContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [boardList, setBoardList] = useState([]);
  const [currBoardId, setCurrBoardId] = useState("");
  const [currBoard, setCurrBoard] = useState(null);

  useEffect(() => {
    const getAllBoards = async () => {
      const allBoards = {};
      if (user && user.boards) {
        const pending = user.boards.map(async (boardId) => {
          return await getBoardShallow(boardId);
        });
        const resolved = await Promise.all(pending);
        resolved.map((res) => (allBoards[res.data._id] = res.data));
        const boardList = user.boards.map((boardId) => {
          if (allBoards[boardId]) {
            return allBoards[boardId];
          }
          return null;
        });
        setBoardList(boardList);
        setCurrBoardId(currBoardId || boardList[0]._id);
      }
    };
    getAllBoards();
  }, [user, currBoardId]);

  useEffect(() => {
    const getCurrBoard = async () => {
      if (currBoardId) {
        setCurrBoardId(currBoardId);

        const loadedData = { columns: {}, columnOrder: [] };
        const res = await getBoard(currBoardId || boardList[0]._id);
        const loadedBoard = res.data;
        const loadedColumns = {};
        const loadedOrder = [];
        loadedBoard.columns.forEach((col) => {
          col.id = col._id;
          col.taskIds = col.cards.map((card) => card._id);
          loadedColumns[col._id] = col;
          loadedOrder.push(col._id);
        });
        loadedData.columns = loadedColumns;
        loadedData.columnOrder = loadedOrder;
        setCurrBoard(loadedData);
      }
    };
    getCurrBoard();
  }, [currBoardId, boardList]);

  const providerValue = useMemo(
    () => ({
      user,
      setUser,
      loggedIn,
      setLoggedIn,
      boardList,
      currBoardId,
      setCurrBoardId,
      currBoard,
      setCurrBoard,
    }),
    [
      user,
      setUser,
      loggedIn,
      setLoggedIn,
      boardList,
      currBoardId,
      setCurrBoardId,
      currBoard,
      setCurrBoard,
    ]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {props.children}
    </UserContext.Provider>
  );
};
