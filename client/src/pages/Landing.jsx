import React from "react";
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  '@keyframes titleMove':{
    from: {
      transform: "translate(50px,-20px)"
    }
  },
  '@keyframes sloganMove':{
    from: {
      transform: "translate(-50px, 20px)"
    }
  },
  main:{
    width: "100%",
    height: "100vh",
    fontFamily: "Roboto",
    color: "rgb(41, 140, 238)",
    display: "grid",
    placeItems:"center",
    textAlign:"center"
  },
  title:{
    fontSize: "72px",
    marginBottom: "-30px",
    animation: "$titleMove 2s ease"
    
  },
  slogan:{
    animation: "$sloganMove 2s ease"
  },
  link:{
    marginRight: "20px",
    textDecoration: "none",
    color: "rgb(41, 140, 238)"
  }
})

function LandingPage (){
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div>
        <h1 className={classes.title}>Kanban</h1>
        <h3 className={classes.slogan}>Your school life organized.</h3>
        <Link to="/login" className={classes.link}>Login</Link>
        <Link to="/signup" className={classes.link}>Sign up</Link>
      </div>
      
    </div>
  );
}
export default LandingPage;