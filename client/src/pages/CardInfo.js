import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid, Box, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles({
	marginRight: {
		marginRight: '10px'
	},
	marginLeft: {
		marginLeft: '25px'
	},
  bg: {
		position: 'fixed',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		zIndex: '3'
	},
	cardContainer: {
		position: 'fixed',
		top: '0',
		bottom: '0',
		left: '0',
		right: '0',
		margin: 'auto',
		width: '45%',
		height: '600px',
		backgroundColor: 'white',
		borderRadius: '10px',
		zIndex: '4'
	},
	header: {
		position: 'relative',
		boxSizing: 'border-box',
		width: '100%',
		height: '90px',
		borderRadius: '10px 10px 0 0',
		borderBottom: '2px solid gainsboro',
		padding: '20px'
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '300px',
	},
	cardStatus: {
    height: "0px",
    width: "40px",
    borderRadius: "8px",
    padding: "4px",
    margin: "0.5rem 0",
		backgroundColor: 'red'
  },
	section: {
		width: '100%',
		padding: '10px 20px 5px 20px'
	},
	subHeader: {
		fontSize: '16px',
		fontWeight: 'bold'
	},
	field: {
		margin: '5px 5px 0px 25px',
		width: '90%'
	},
	cancel: {
		fontSize: '24px',
	},
	deadline: {
		textDecoration: 'underline'
	},
	add: {
		width: '100px',
		margin: '3px'
	}
});

function CardInfo() {
	const classes = useStyles();
	
  return(
		<Container maxWidth={false} className={classes.bg}>
			<Grid container direction='column' className={classes.cardContainer}>
				<Grid item className={classes.header}>
					<Box className={classes.titleContainer}>
						<Typography className={classes.marginRight}>&#128203;</Typography>
						<Typography variant='h6' className={classes.marginRight}>Midterm Exam</Typography>
						<Box className={`${classes.cardStatus} ${classes.marginRight}`}></Box>
					</Box>
					<Typography variant='body1' className={classes.marginLeft}>In List "Math"</Typography>
				</Grid>
				<Grid container>
					<Grid item direction='column' xs={10}>
						<Box className={classes.section}>
							<Typography className={classes.subHeader}>&#128214; Description:</Typography>
							<TextField
								id="outlined-textarea"
								multiline
								rows={3}
								variant="outlined"
								color="primary"
								placeholder='Write a description...'
								className={classes.field}
							/>
							<Box className={classes.field}>
								<Button variant="contained" size="medium" color="primary">
									Save
								</Button>
								<Button size="large" color="primary" className={classes.cancel}>
									&times;
								</Button>
							</Box>
						</Box>
						<Box className={classes.section}>
							<Typography className={classes.subHeader}>&#9202; Deadline:</Typography>
							<Typography className={`${classes.deadline} ${classes.marginLeft}`}>March 10, 2021</Typography>
							<Box className={classes.field}>
								<Button variant="contained" size="medium" color="primary">
									Save
								</Button>
								<Button size="large" color="primary" className={classes.cancel}>
									&times;
								</Button>
							</Box>
						</Box>
						
						<Box className={classes.section}>
							<Typography className={classes.subHeader}>&#128489; Add Comment:</Typography>
							<TextField
								id="outlined-textarea"
								multiline
								rows={2}
								variant="outlined"
								color="primary"
								placeholder='Write a comment...'
								className={classes.field}
							/>
							<Box className={classes.field}>
								<Button variant="contained" size="medium" color="primary">
									Save
								</Button>
								<Button size="large" color="primary" className={classes.cancel}>
									&times;
								</Button>
							</Box>
						</Box>
						
					</Grid>
					
					<Grid item direction='column' xs>
						<Box mt={1.5}>
							<Typography variant='subtitle2'>ADD TO CARD:</Typography>
							<Button variant="contained" color="primary" className={classes.add}>Tags</Button>
							<Button variant="contained" color="primary" className={classes.add}>Checklist</Button>
							<Button variant="contained" color="primary" className={classes.add}>Deadline</Button>
							<Button variant="contained" color="primary" className={classes.add}>Attachment</Button>
							<Button variant="contained" color="primary" className={classes.add}>Cover</Button>
						</Box>
						<Box mt={2}>
							<Typography variant='subtitle2'>ACTIONS:</Typography>
							<Button variant="contained" color="primary" className={classes.add}>Move</Button>
							<Button variant="contained" color="primary" className={classes.add}>Copy</Button>
							<Button variant="contained" color="primary" className={classes.add}>Share</Button>
							<Button variant="contained" color="primary" className={classes.add}>Delete</Button>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Container>
  );
}

export default CardInfo;
