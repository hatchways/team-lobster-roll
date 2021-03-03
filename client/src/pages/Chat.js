import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  chat: {
    background: "#eee",
    width: "400px",
    minHeight: "400px",
    borderRadius: "8px",
    padding: "1rem",
    margin: "1rem",
  },
}));
function Chat(props) {
  const classes = useStyles();
  const { socketMsg } = props;

  return (
    <>
      <h1>Chat</h1>
      <div className={classes.chat}>
        Welcome to the chat
        <br />
        {socketMsg}
      </div>
    </>
  );
}
export default Chat;
