import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { makeStyles, Button } from "@material-ui/core";
import HashLoader from "react-spinners/HashLoader";

const useStyles = makeStyles({
  main: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: "36px",
    color: "#000",
  },
  imageBox: {
    width: 80,
    height: 80,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
  input: {
    display: "none",
  },
  button: {
    color: "white",
    marginTop: 30,
  },
  uploadBtn: {
    color: "white",
  },
});

function Upload() {
  const hiddenFileInput = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();
  const imageLink = "/images/default-profile.jpg";
  const [image, setImage] = useState(imageLink);
  const [pictures, setPictures] = useState([]);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = () => {
    setLoading(true);
    let uploadPromises = pictures.map((picture) => {
      let data = new FormData();
      data.append("image", picture, picture.name);
      setPictures([]);
      return axios.post(`${window.location.origin}/upload/`, data);
    });

    axios
      .all(uploadPromises)
      .then((data) => {
        setLoading(false);
        setImageName("Profile updated.");
        setUser({ ...user, image: data[0].data.imgSrc });
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      setImageName("");
      setImage(imageLink);
      setPictures([]);
    }, 3000);
  };

  const onDrop = (e) => {
    let file = URL.createObjectURL(e.target.files[0]);
    setImage(file);
    setPictures(pictures.concat(e.target.files[0]));
  };
  const chooseFile = (e) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className={classes.main}>
      <div className={classes.imageBox}>
        <img className={classes.image} src={image} alt="profile" />
      </div>
      {!loading && (
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={(e) => chooseFile(e)}
          >
            Choose a file
          </Button>
          <input
            ref={hiddenFileInput}
            type="file"
            className={classes.input}
            multiple={false}
            accept=".jpg, .jpeg, .png, .svg"
            onChange={(e) => onDrop(e)}
          />
        </div>
      )}
      <HashLoader loading={loading} color={"#759CFC"} />
      <p>{imageName}</p>
      <Button
        className={classes.uploadBtn}
        onClick={uploadImage}
        variant="contained"
        color="primary"
      >
        Set
      </Button>
    </div>
  );
}

export default Upload;
