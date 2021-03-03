import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { useStyles } from "../../themes/cardInfoStyles";
import { updateCard } from "../../API/card";

function CardInfoDeadline({
  saveDeadline,
  showDeadline,
  deleteDeadline,
  cardId,
}) {
  const [disabled, setDisabled] = useState(true);
  const [deadline, setDeadline] = useState("");
  const classes = useStyles();

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
      saveDeadline(deadline);
      setDisabled(true);
      // todo: update card in board context with res.data
    }
  };

  const handleDeleteSection = () => {
    deleteDeadline();
  };

  return (
    <Box
      className={`${classes.section} ${
        showDeadline ? classes.dBlock : classes.dNone
      }`}>
      <Typography className={classes.subHeader}>
        <AccessTime color="primary" style={{ marginRight: "4px" }} /> Deadline:
      </Typography>
      <TextField
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={deadline}
        className={classes.marginLeft}
        onChange={handleChange}
      />
      <Box className={classes.field}>
        <Button
          disabled={disabled}
          size="large"
          color="primary"
          onClick={confirmSave}>
          Save
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.cancel}
          onClick={handleDeleteSection}>
          &times;
        </Button>
      </Box>
    </Box>
  );
}
export default CardInfoDeadline;
