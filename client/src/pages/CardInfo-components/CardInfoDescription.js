import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { ImportContactsTwoTone } from "@material-ui/icons";
import { useStyles } from "../../themes/cardInfoStyles";
import { updateCard } from "../../API/card";

function CardInfoDescription({
  showDescription,
  deleteDescription,
  cardId,
  cardDescription,
  updateCardInfo,
}) {
  const [disabled, setDisabled] = useState(true);
  const [description, setDescription] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (cardDescription) setDescription(cardDescription);
  }, [cardDescription]);

  const handleChange = (e) => {
    setDescription(e.target.value);
    setDisabled(false);
  };

  const confirmSave = async () => {
    const data = {
      cardId: cardId,
      property: "description",
      newData: description,
    };
    const res = await updateCard(data);
    if (res.status === 200) {
      updateCardInfo("description", description);
      setDisabled(true);
    }
  };

  const handleDeleteSection = () => {
    deleteDescription();
  };

  return (
    <Box
      className={`${classes.section} ${
        showDescription ? classes.dBlock : classes.dNone
      }`}
    >
      <Typography className={classes.subHeader}>
        <ImportContactsTwoTone color="primary" style={{ marginRight: "4px" }} />
        Description:
      </Typography>
      <TextField
        multiline
        rows={3}
        variant="outlined"
        color="primary"
        placeholder="Write a description..."
        onChange={handleChange}
        className={classes.field}
        value={description}
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
export default CardInfoDescription;
