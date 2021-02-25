import React, {useState} from "react";
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from '@material-ui/icons/Edit';
import {deleteColumn} from '../API/column';
import { useStyles } from "../themes/columnStyles";

function ColumnOptions({selectedColumn, closeColumnOptions}) {
	const classes = useStyles();
	const [showConfirm, setShowConfirm] = useState(false);
	
  return (
		<>
				<Grid container direction='column' className={classes.optionsContainer}>
					<Typography align='center' variant='h4'>Column Options</Typography>
					
					<Grid container direction='row'>
						<Typography>Column: {selectedColumn.name}</Typography>
						<EditIcon />
					</Grid>
					
					<Grid item>
						{showConfirm ? (
							<div>
								<Button color='primary' size='large' onClick={() => deleteColumn('6036d5190e37bad4baa5d691','6036d61d0e37bad4baa5d692')}>Confirm</Button>
								<Button color='primary' size='large' onClick={() => setShowConfirm(false)}>Cancel</Button>
							</div>
							) : (
								<Button color='primary' size='large' onClick={() => setShowConfirm(true)}>Delete Column</Button>
							)
						}
						</Grid>
					
					<IconButton className={classes.closeButton} onClick={() => closeColumnOptions()}>
            <CloseIcon />
          </IconButton>
				</Grid>
			<Box className={classes.bg} />
		</>
  );
}

export default ColumnOptions;
