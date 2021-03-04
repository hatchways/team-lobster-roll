import React, { useState, useEffect } from "react";
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
  updateTaskInfo,
}) {
  const classes = useStyles();
  const [showDescription, setShowDescription] = useState(true);
  const [showDeadline, setShowDeadline] = useState(true);
  const [showComment, setShowComment] = useState(true);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardInfo, setCardInfo] = useState({});

  useEffect(() => {
    setCardInfo(task);
  }, [task]);

  // description section handlers
  const addDescription = () => {
    setShowDescription(true);
  };
  /* const handleSaveDescription = (description) => {
    setCardInfo({ ...cardInfo, description });
  }; */
  const handleDeleteDescription = () => {
    setShowDescription(false);
  };

  // deadline section handlers
  const addDeadline = () => {
    setShowDeadline(true);
  };
  const handleSaveDeadline = (deadline) => {
    setCardInfo({ ...cardInfo, deadline });
  };
  const handleDeleteDeadline = () => {
    setShowDeadline(false);
  };

  // comment section handlers
  const addComment = () => {
    setShowComment(true);
  };
  const handleSaveComment = (comment) => {
    setCardInfo({ ...cardInfo, comment });
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

  // updating card info handler
  const handleUpdateCardInfo = (property, newInfo) => {
    setCardInfo({
      ...cardInfo,
      [property]: newInfo,
    });
  };

  return (
    <Container
      maxWidth={false}
      className={showCardInfo ? classes.dBlock : classes.dNone}
    >
      <Box className={classes.bg} onClick={() => closeCardInfo()} />
      <Card className={classes.cardContainer}>
        <CardContent className={classes.header}>
          <Box className={classes.titleContainer}>
            <Assignment color="primary" style={{ marginRight: "3px" }} />
            <Typography className={`${classes.marginRight} ${classes.title}`}>
              {cardInfo.name}
            </Typography>
            <Box
              className={`${classes.cardStatus} ${classes.marginRight} 
								${cardInfo.color ? classes[cardInfo.color] : classes.noColor}`}
            />
          </Box>
          <Typography
            variant="body1"
            style={{ color: "gray" }}
            className={classes.marginLeft}
          >
            In column: {columnName}
          </Typography>
          <Button className={classes.closeCard} onClick={() => closeCardInfo()}>
            &times;
          </Button>
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Box m={0} className={`${classes.cardBody} ${classes.left}`}>
            <CardInfoDescription
              showDescription={showDescription}
              deleteDescription={handleDeleteDescription}
              cardId={task._id}
              cardDescription={cardInfo.description}
              updateCardInfo={handleUpdateCardInfo}
            />
            <CardInfoDeadline
              showDeadline={showDeadline}
              deleteDeadline={handleDeleteDeadline}
              cardId={task._id}
              cardDeadline={cardInfo.deadline}
              updateCardInfo={handleUpdateCardInfo}
              updateTaskInfo={updateTaskInfo}
            />
            <CardInfoComment
              showComment={showComment}
              deleteComment={handleDeleteComment}
              cardId={task._id}
              cardComment={cardInfo.comment}
              updateCardInfo={handleUpdateCardInfo}
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
          currentColor={cardInfo.color}
          cardId={task._id}
          updateCardInfo={handleUpdateCardInfo}
          updateTaskInfo={updateTaskInfo}
        />
      )}
      {showDeleteModal && (
        <CardInfoDeleteModal
          closeDeleteModal={handleCloseDeleteModal}
          cardId={task._id}
        />
      )}
    </Container>
  );
}

export default CardInfo;
