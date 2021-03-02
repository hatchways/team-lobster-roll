import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Paper,
  IconButton,
  Box,
  Avatar,
  Button,
  Container,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import PersonIcon from "@material-ui/icons/Person";
import { useStyles } from "../themes/membersTheme";
import CloseIcon from "@material-ui/icons/Close";
import AddMembers from "../pages/AddMembers";
import axios from "axios";

function Members({ setShowMembers }) {
  const classes = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const [members, setMembers] = useState([]);
  // Static boardId for testing purposes
  const boardId = "6038ecca4d73560f74a88ea3";

  useEffect(() => {
    axios
      .get(`${window.location.origin}/api/board/${boardId}`)
      .then((data) => {
        const ids = data.data.data.members;
        axios
          .get(`${window.location.origin}/user/board-members/${ids}`)
          .then((data) => setMembers(data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.backdrop}
    >
      <Paper className={classes.modal}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Container className={`${classes.head} ${classes.container}`}>
            <Typography variant="h3">Members</Typography>
            <Grid item className={classes.close}>
              <IconButton
                className={classes.closeBtn}
                onClick={() => setShowMembers(false)}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Container>
          <Container
            className={`${classes.memberProfiles} ${classes.container}`}
          >
            <AvatarGroup max={8}>
              {members.map((member, index) => (
                <Avatar
                  className={classes.avatar}
                  alt={member.email}
                  src={member.image}
                  key={index}
                />
              ))}
            </AvatarGroup>
          </Container>

          <Button
            className={classes.addBtn}
            color="primary"
            variant="contained"
            startIcon={<PersonIcon />}
            onClick={() => setShowSearch(!showSearch)}
          >
            <Typography>Add members ...</Typography>
          </Button>
          <hr className={classes.hr} />
          {showSearch && <AddMembers boardId={boardId} />}
        </Grid>
      </Paper>
    </Box>
  );
}

export default Members;
