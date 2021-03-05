import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import { updateColumnName, deleteColumn } from "../API/column";
import { useStyles } from "../themes/columnStyles";
import { UserContext } from "../contexts/UserContext";

function ColumnOptions({
  closeOptions,
  columnId,
  columnName,
  updateBoardInfo,
  removeColumn,
}) {
  const classes = useStyles();
  const { currBoardId } = useContext(UserContext);
  const [name, setName] = useState("");
  const [showEditName, setShowEditName] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  useEffect(() => {
    setName(columnName);
  }, [columnName]);

  const handleSaveName = async () => {
    const responseStatus = await updateColumnName(columnId, name);
    if (responseStatus === 200) {
      updateBoardInfo("column", columnId, "name", name);
      closeOptions();
    }
  };

  const handleCancelEditName = () => {
    setShowEditName(false);
    setName(columnName);
  };

  const handleDeleteColumn = async () => {
    const responseStatus = await deleteColumn(currBoardId, columnId);
    if (responseStatus === 200) {
      removeColumn(columnId);
      closeOptions();
    }
  };

  // conditional render function for the view
  const renderOptions = () => {
    if (!showEditName && !showDeleteMessage) {
      return (
        <Grid item>
          <Button size="small" fullWidth onClick={() => setShowEditName(true)}>
            Edit column name
          </Button>
          <Button
            size="small"
            fullWidth
            onClick={() => setShowDeleteMessage(true)}
          >
            Delete Column
          </Button>
        </Grid>
      );
    } else if (showEditName) {
      return (
        <Grid item>
          <TextField
            className={classes.editNameInput}
            label="Column Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button size="small" onClick={handleSaveName}>
            Save
          </Button>
          <Button size="small" onClick={handleCancelEditName}>
            Cancel
          </Button>
        </Grid>
      );
    } else {
      return (
        <Grid item>
          <Typography
            variant="body1"
            align="center"
            className={classes.deleteColumnMessage}
          >
            Are you sure you want to delete this column?
          </Typography>
          <Button size="small" onClick={handleDeleteColumn}>
            Yes
          </Button>
          <Button size="small" onClick={() => setShowDeleteMessage(false)}>
            Cancel
          </Button>
        </Grid>
      );
    }
  };

  return (
    <>
      <Grid container direction="column" className={classes.optionsContainer}>
        <IconButton
          className={classes.closeButton}
          onClick={() => closeOptions()}
        >
          <CloseIcon />
        </IconButton>
        {renderOptions()}
      </Grid>
    </>
  );
}

export default ColumnOptions;
