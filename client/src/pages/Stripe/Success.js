import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Typography,
  Button,
  Paper,
  Grid,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getSuccess } from "../../API/stripe";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: "2rem",
  },
}));

function Success(props) {
  const classes = useStyles();

  const [data, setData] = useState(null);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  useEffect(() => {
    const id = query.get("id");
    async function getData() {
      const res = await getSuccess({ id });
      console.log("res", res);
      setData(res.data);
    }
    getData();
  }, []);
  return (
    <div>
      <AppBar position="static" className={classes.header}>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Typography variant="h1">Successful transaction!</Typography>
          </Grid>
        </Grid>
      </AppBar>
      <Container>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    </div>
  );
}

export default Success;
