import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { useStyles } from "../../themes/cardInfoStyles";
import { updateCard } from "../../API/card";

function CardInfoDeadline({
  showDeadline,
  deleteDeadline,
  cardId,
  cardDeadline,
  updateCardInfo,
  updateTaskInfo,
  resetInfo,
}) {
  const [disabled, setDisabled] = useState(true);
  const [deadline, setDeadline] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (cardDeadline) setDeadline(cardDeadline);
  }, [cardDeadline]);

  useEffect(() => {
    if (resetInfo) setDeadline(cardDeadline);
  }, [resetInfo]);

  const handleChange = (e) => {
    setDeadline(e.target.value);
    setDisabled(false);
  };

  const confirmSave = async () => {
    const data = {
      cardId: cardId,
      property: "deadline",
      newData: deadline,
    };
    const res = await updateCard(data);
    if (res.status === 200) {
      updateCardInfo("deadline", deadline);
      updateTaskInfo("deadline", deadline);
      setDisabled(true);
    }
  };

  const handleDeleteSection = async () => {
    // if the deadline exists in DB then update it with an empty string in DB
    if (cardDeadline) {
      const data = {
        cardId: cardId,
        property: "deadline",
        newData: "",
      };
      const res = await updateCard(data);
      if (res.status === 200) {
        setDeadline("");
        setDisabled(true);
        updateCardInfo("deadline", "");
        updateTaskInfo("deadline", "");
        deleteDeadline();
      }
    } else {
      setDeadline("");
      setDisabled(true);
      updateCardInfo("deadline", "");
      updateTaskInfo("deadline", "");
      deleteDeadline();
    }
  };

  return (
    <Box
      className={`${classes.section} ${
        showDeadline ? classes.dBlock : classes.dNone
      }`}
    >
      <Typography className={classes.subHeader}>
        <AccessTime color="primary" style={{ marginRight: "4px" }} /> Deadline:
      </Typography>
      <TextField
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.marginLeft}
        onChange={handleChange}
        value={deadline}
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
export default CardInfoDeadline;
