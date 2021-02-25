import React from "react";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { deleteColumn } from "../API/column";
import { useStyles } from "../themes/columnStyles";

function ColumnOptions({ closeOptions }) {
  const classes = useStyles();

  const handleDeleteColumn = async () => {
    // deleteColumn() is using test ObjectIds right now
    const responseStatus = await deleteColumn(
      "6036d5190e37bad4baa5d691",
      "6036d61d0e37bad4baa5d692"
    );
    await console.log(responseStatus);
    if (responseStatus === 200) {
      // update board context
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

        <Button size="small">Edit column name</Button>
        <Button size="small" onClick={handleDeleteColumn}>
          Delete Column
        </Button>
      </Grid>
    </>
  );
}

export default ColumnOptions;