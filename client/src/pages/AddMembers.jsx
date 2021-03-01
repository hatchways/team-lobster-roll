import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useStyles } from "../themes/membersTheme";
import { TextField, Container, Avatar, Button } from "@material-ui/core";
import { debounce } from "lodash";
import axios from "axios";

function AddMembers({ boardId }) {
  const classes = useStyles();
  const [members, setMembers] = useState([]);
  const { user } = useContext(UserContext);

  const handleFilter = debounce((e) => {
    const filter = e.target.value;
    filter === "" && setMembers([]);
    axios
      .post(`${window.location.origin}/user/filter/`, {
        emailFilter: filter,
      })
      .then((data) => setMembers(data.data))
      .catch((err) => console.log(err));
  }, 750);

  const handleMemberButton = (e, email) => {
    let item = e.target;
    let data = {
      boardId: boardId,
      email: email,
    };
    axios
      .post(`${window.location.origin}/api/board/share/`, data)
      .then((res) => {
        if (item.className === "MuiButton-label") {
          item.parentElement.style.display = "none";
        } else {
          // To prevent only the Avatar or email disappearing when clicked
          while (item.className !== "MuiButton-label")
            item = item.parentElement;
          item.parentElement.style.display = "none";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.container}>
      <TextField
        className={classes.textField}
        variant="outlined"
        size="small"
        fullWidth={true}
        label="Search for members by email"
        name="memberSearch"
        onChange={(e) => handleFilter(e)}
      />
      {members.length > 0 && <h4 className={classes.select}>Click to add.</h4>}
      <Container className={`${classes.scrollContainer} ${classes.container}`}>
        {members.length > 0 &&
          members.map((member, index) => (
            <Button
              className={classes.memberList}
              fullWidth={true}
              key={index}
              name="button"
              color="primary"
              variant="contained"
              size="small"
              display=""
              onClick={(e) => handleMemberButton(e, member.email)}
            >
              <Avatar src={member.image} alt="member" />
              <p>{member.email}</p>
            </Button>
          ))}
      </Container>
    </Container>
  );
}

export default AddMembers;
