import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { ChatBubbleOutlineRounded } from "@material-ui/icons";
import { useStyles } from "../../themes/cardInfoStyles";

function CardInfoComment({ saveComment, showComment, deleteComment }) {
  const [disabled, setDisabled] = useState(true);
  const [comment, setComment] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setComment(e.target.value);
    setDisabled(false);
  };

  const confirmSave = () => {
    saveComment(comment);
    setDisabled(true);
  };

  const handleDeleteSection = () => {
    deleteComment();
  };

  return (
    <Box
      className={`${classes.section} ${
        showComment ? classes.dBlock : classes.dNone
      }`}
    >
      <Typography className={classes.subHeader}>
        <ChatBubbleOutlineRounded
          color="primary"
          style={{ marginRight: "4px" }}
        />{" "}
        Add Comment:
      </Typography>
      <TextField
        id="outlined-textarea"
        multiline
        rows={2}
        variant="outlined"
        color="primary"
        placeholder="Write a comment..."
        onChange={handleChange}
        className={classes.field}
      />
      <Box className={classes.field}>
        <Button
          disabled={disabled}
          style={{ color: "white" }}
          variant="contained"
          size="medium"
          color="primary"
          onClick={confirmSave}
        >
          Save
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.cancel}
          onClick={handleDeleteSection}
        >
          &times;
        </Button>
      </Box>
    </Box>
  );
}
export default CardInfoComment;
