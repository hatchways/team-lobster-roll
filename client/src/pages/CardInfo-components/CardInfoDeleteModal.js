import React, { useContext } from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { useStyles } from "../../themes/cardInfoStyles";
import { UserContext } from "../../contexts/UserContext";
import { deleteCard } from "../../API/card";

function CardInfoDeleteModal({ closeDeleteModal, cardId, removeCard }) {
  const classes = useStyles();
  const { currBoardId } = useContext(UserContext);

  const handleDeleteCard = async () => {
    const responseStatus = await deleteCard(currBoardId, cardId);
    if (responseStatus === 200) removeCard(cardId);
  };

  return (
    <Box>
      <Box className={classes.chooseColorModal}>
        <Typography
          align="center"
          variant="h6"
          style={{ marginBottom: "10px" }}
        >
          Are you sure you want to delete this card?
        </Typography>
        <Box className={classes.buttonContainer}>
          <Button onClick={handleDeleteCard}>Yes</Button>
          <Button onClick={() => closeDeleteModal()}>Cancel</Button>
        </Box>
      </Box>

      <Box className={classes.modalBg} onClick={() => closeDeleteModal()} />
    </Box>
  );
}

export default CardInfoDeleteModal;
