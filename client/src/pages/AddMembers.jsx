import React, { useState } from "react";
import { useStyles } from "../themes/membersTheme";
import { TextField, Container, Avatar, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { debounce } from "lodash";
import axios from "axios";

function AddMembers({ boardId }) {
  const classes = useStyles();
  const [members, setMembers] = useState([]);

  const handleFilter = debounce((e) => {
    const email = e.target.value;
    email === "" && setMembers([]);
    axios
      .get(`${window.location.origin}/user/filter-by-email/${email}`)
      .then((data) => setMembers(data.data))
      .catch((err) => console.log(err));
  }, 750);

  const handleMemberButton = (e, id) => {
    let item = e.target;
    let data = {
      boardId: boardId,
      id: id,
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
              onClick={(e) => handleMemberButton(e, member._id)}
            >
              <Avatar src={member.image} alt="member" />
              <p>{member.email}</p>
              <AddCircleOutlineIcon />
            </Button>
          ))}
      </Container>
    </Container>
  );
}

export default AddMembers;
