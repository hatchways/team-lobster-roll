import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { useStyles } from "../../themes/cardInfoStyles";

function CardInfoDeadline({ saveDeadline, showDeadline, deleteDeadline }) {
  const [disabled, setDisabled] = useState(true);
  const [deadline, setDeadline] = useState("");
  const [showInput, setShowInput] = useState("");
  const [showDate, setShowDate] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setDeadline(e.target.value);
    setDisabled(false);
  };

  const confirmSave = () => {
    saveDeadline(deadline);
    setDisabled(true);
  };

  const handleDeleteSection = () => {
    deleteDeadline();
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
        defaultValue={deadline}
        className={classes.marginLeft}
        onChange={handleChange}
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
export default CardInfoDeadline;
