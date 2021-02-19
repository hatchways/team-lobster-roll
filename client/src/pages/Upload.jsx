import React, { useState, useRef } from "react";
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
    color: "#759CFC",
  },
  input: {
    display: "none",
  },
  button: {
    color: "white",
    marginTop: 30,
  },
});

function Upload() {
  const hiddenFileInput = useRef(null);
  const classes = useStyles();
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
        setImageName("Uploaded completed.");
        console.log(data[0].data);
      })
      .catch((err) => console.log(err));
    setPictures([]);
  };

  const onDrop = (e) => {
    setImageName(e.target.files[0].name);
    setPictures(pictures.concat(e.target.files[0]));
  };
  const chooseFile = e =>{
    hiddenFileInput.current.click();
  }

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Image Uploader</h1>
      {!loading && (
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={(e)=> chooseFile(e)}
          >
            Choose a file
          </Button>
          <input
            ref={hiddenFileInput}
            type="file"
            className={classes.input}
            multiple={true}
            accept=".json,.csv,.txt,.png,.text,application/json,text/csv,text/plain"
            onChange={(e) => onDrop(e)}
          />
        </div>
      )}
      {loading && <HashLoader color={"#759CFC"} />}
      <p>{imageName}</p>
      <Button
        className={classes.button}
        onClick={uploadImage}
        variant="contained"
        color="primary"
      >
        Upload
      </Button>
    </div>
  );
}

export default Upload;