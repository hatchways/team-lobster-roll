import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  CardContent,
  Card,
} from "@material-ui/core";
import { Assignment } from "@material-ui/icons";
import { useStyles } from "../../themes/cardInfoStyles";
import CardInfoDescription from "./CardInfoDescription";
import CardInfoDeadline from "./CardInfoDeadline";
import CardInfoComment from "./CardInfoComment";
import CardInfoColorModal from "./CardInfoColorModal";
import CardInfoDeleteModal from "./CardInfoDeleteModal";

function CardInfo({
  task,
  columnName,
  showCardInfo,
  closeCardInfo,
  updateBoardInfo,
  removeCard,
}) {
  const classes = useStyles();
  const [showDescription, setShowDescription] = useState(true);
  const [showDeadline, setShowDeadline] = useState(true);
  const [showComment, setShowComment] = useState(true);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resetInfo, setResetInfo] = useState(false);

  // description section handlers
  const addDescription = () => {
    setShowDescription(true);
  };
  const handleDeleteDescription = () => {
    setShowDescription(false);
  };

  // deadline section handlers
  const addDeadline = () => {
    setShowDeadline(true);
  };
  const handleDeleteDeadline = () => {
    setShowDeadline(false);
  };

  // comment section handlers
  const addComment = () => {
    setShowComment(true);
  };
  const handleDeleteComment = () => {
    setShowComment(false);
  };

  // close color modal handler
  const handleCloseColorModal = () => {
    setShowColorModal(false);
  };

  // close delete modal handler
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // close card info modal
  const handleCloseCardInfo = async () => {
    // resets all the card info back to its info from the DB
    await setResetInfo(true);
    closeCardInfo();
    await setResetInfo(false);
  };

  return (
    <Container
      maxWidth={false}
      className={showCardInfo ? classes.dBlock : classes.dNone}
    >
      <Box className={classes.bg} onClick={handleCloseCardInfo} />
      <Card className={classes.cardContainer}>
        <CardContent className={classes.header}>
          <Box className={classes.titleContainer}>
            <Assignment color="primary" style={{ marginRight: "3px" }} />
            <Typography className={`${classes.marginRight} ${classes.title}`}>
              {task.name}
            </Typography>
            <Box
              className={`${classes.cardStatus} ${classes.marginRight} 
								${task.color ? classes[task.color] : classes.noColor}`}
            />
          </Box>
          <Typography
            variant="body1"
            style={{ color: "gray" }}
            className={classes.marginLeft}
          >
            In column: {columnName}
          </Typography>
          <Button className={classes.closeCard} onClick={handleCloseCardInfo}>
            &times;
          </Button>
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Box m={0} className={`${classes.cardBody} ${classes.left}`}>
            <CardInfoDescription
              showDescription={showDescription}
              deleteDescription={handleDeleteDescription}
              cardId={task._id}
              cardDescription={task.description}
              updateBoardInfo={updateBoardInfo}
              resetInfo={resetInfo}
            />
            <CardInfoDeadline
              showDeadline={showDeadline}
              deleteDeadline={handleDeleteDeadline}
              cardId={task._id}
              cardDeadline={task.deadline}
              updateBoardInfo={updateBoardInfo}
              resetInfo={resetInfo}
            />
            <CardInfoComment
              showComment={showComment}
              deleteComment={handleDeleteComment}
              cardId={task._id}
              cardComment={task.comment}
              updateBoardInfo={updateBoardInfo}
              resetInfo={resetInfo}
            />
          </Box>
          <Box m={0} className={`${classes.cardBody} ${classes.right}`}>
            <Box mt={1.5}>
              <Typography variant="subtitle2" align="center">
                ADD TO CARD:
              </Typography>
              <Button
                className={`${classes.add} ${
                  !showDescription ? classes.dBlock : classes.dNone
                }`}
                onClick={addDescription}
              >
                Description
              </Button>
              <Button
                className={`${classes.add} ${
                  !showDeadline ? classes.dBlock : classes.dNone
                }`}
                onClick={addDeadline}
              >
                Deadline
              </Button>
              <Button
                className={`${classes.add} ${
                  !showComment ? classes.dBlock : classes.dNone
                }`}
                onClick={addComment}
              >
                Comment
              </Button>
            </Box>
            <Box mt={4}>
              <Typography variant="subtitle2" align="center">
                ACTIONS:
              </Typography>
              <Button
                className={`${classes.add} ${classes.dBlock}`}
                onClick={() => setShowColorModal(true)}
              >
                Choose Color
              </Button>
              <Button
                className={`${classes.add} ${classes.dBlock}`}
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      {showColorModal && (
        <CardInfoColorModal
          closeColorModal={handleCloseColorModal}
          currentColor={task.color}
          cardId={task._id}
          updateBoardInfo={updateBoardInfo}
          resetInfo={resetInfo}
        />
      )}
      {showDeleteModal && (
        <CardInfoDeleteModal
          closeDeleteModal={handleCloseDeleteModal}
          cardId={task._id}
          removeCard={removeCard}
        />
      )}
    </Container>
  );
}

export default CardInfo;
