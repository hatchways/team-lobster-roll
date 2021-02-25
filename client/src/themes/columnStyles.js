import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  column: {
    margin: "1rem 0.75rem",
    padding: 0,
    backgroundColor: "#F4F6FF",
    borderRadius: "8px",
    width: "320px",
    "&:hover": {
      boxShadow: "0px 0px 10px 1px rgba(208,213,223,0.8)",
    },
  },
  placeholder: {
    listStyle: "none",
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: ".75rem 1.5rem",
    marginBottom: "0.25rem",
  },
  columnTitle: {
    fontSize: "1.3rem",
    fontWeight: "500",
  },
  lightGray: {
    color: "#D5DBF7",
  },
  addButton: {
    backgroundColor: "#759CFC",
    color: "#FFFFFF",
    width: "120px",
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    margin: "1.5rem",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#759CFC",
    },
    "&:active": {
      backgroundColor: "#759CFC",
    },
  },
	
	bg: {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "3",
  },
	optionsContainer: {
		position: 'fixed',
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
		margin: 'auto',
		width: '400px',
		height: '200px',
		zIndex: '4',
		borderRadius: '10px',
		backgroundColor: 'white',
	},
	closeButton: {
		position: 'absolute',
		top: '0',
		right: '0'
	}
	
});
