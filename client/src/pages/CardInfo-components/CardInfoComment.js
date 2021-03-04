import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { ChatBubbleOutlineRounded } from "@material-ui/icons";
import { useStyles } from "../../themes/cardInfoStyles";
import { updateCard } from "../../API/card";

function CardInfoComment({
  showComment,
  deleteComment,
  cardId,
  cardComment,
  updateCardInfo,
  resetInfo,
}) {
  const [disabled, setDisabled] = useState(true);
  const [comment, setComment] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (cardComment) setComment(cardComment);
  }, [cardComment]);

  useEffect(() => {
    if (resetInfo) setComment(cardComment);
  }, [resetInfo]);

  const handleChange = (e) => {
    setComment(e.target.value);
    setDisabled(false);
  };

  const confirmSave = async () => {
    const data = {
      cardId: cardId,
      property: "comment",
      newData: comment,
    };
    const res = await updateCard(data);
    if (res.status === 200) {
      updateCardInfo("comment", comment);
      setDisabled(true);
    }
  };

  const handleDeleteSection = async () => {
    // if the comment exists in DB then update it with an empty string in DB
    if (cardComment) {
      const data = {
        cardId: cardId,
        property: "comment",
        newData: "",
      };
      const res = await updateCard(data);
      if (res.status === 200) {
        setComment("");
        setDisabled(true);
        updateCardInfo("comment", "");
        deleteComment();
      }
    } else {
      setComment("");
      setDisabled(true);
      updateCardInfo("comment", "");
      deleteComment();
    }
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
        />
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
        value={comment}
      />
      <Box className={classes.field}>
        <Button
          disabled={disabled}
          size="large"
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
