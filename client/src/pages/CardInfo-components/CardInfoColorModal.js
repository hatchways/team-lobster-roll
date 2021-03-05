import React, { useState, useEffect } from "react";
import { Typography, Box, Button, NativeSelect } from "@material-ui/core";
import { useStyles } from "../../themes/cardInfoStyles";
import { updateCard } from "../../API/card";

function CardInfoColorModal({
  closeColorModal,
  currentColor,
  cardId,
  updateBoardInfo,
}) {
  const classes = useStyles();
  const [color, setColor] = useState("");

  useEffect(() => {
    if (currentColor) setColor(currentColor);
  }, [currentColor]);

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  const handleSaveColor = async () => {
    const res = await updateCard({
      cardId,
      property: "color",
      newData: color,
    });
    if (res.status === 200) {
      updateBoardInfo("color", color);
      closeColorModal();
    } else setColor(currentColor);
  };

  const handleCloseModal = () => {
    setColor(currentColor);
    closeColorModal();
  };

  return (
    <Box>
      <Box className={classes.chooseColorModal}>
        <Typography
          align="center"
          variant="h6"
          style={{ marginBottom: "10px" }}
        >
          Choose a color
        </Typography>

        <NativeSelect
          className={classes.colorInput}
          value={color}
          name="color"
          onChange={handleChange}
          inputProps={{ "aria-label": "color" }}
        >
          <option value={"red"}>Red</option>
          <option value={"green"}>Green</option>
          <option value={"blue"}>Blue</option>
          <option value={"yellow"}>Yellow</option>
          <option value={"purple"}>Purple</option>
          <option value={""}>No Color</option>
        </NativeSelect>

        <Button
          style={{ margin: "auto", display: "block" }}
          onClick={handleSaveColor}
        >
          Save
        </Button>

        <Button className={classes.closeCard} onClick={handleCloseModal}>
          &times;
        </Button>
      </Box>

      <Box className={classes.modalBg} onClick={handleCloseModal} />
    </Box>
  );
}

export default CardInfoColorModal;
