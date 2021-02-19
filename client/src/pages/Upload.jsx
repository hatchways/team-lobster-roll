import React, { useState } from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";
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
  button: {
    color: "white",
    marginTop: 30,
  },
});

function Upload() {
  const classes = useStyles();
  const [pictures, setPictures] = useState([]);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = () => {
    setLoading(true);
    let uploadPromises = pictures.map((picture) => {
      let data = new FormData();
      data.append("image", picture, picture.name);
      return axios.post(`${window.location.origin}/upload/`, data);
    });
    axios
      .all(uploadPromises)
      .then((data) => {
        setLoading(false);
        setImageName("");
        console.log(data[0].data);
      })
      .catch((err) => console.log(err));
    setPictures([]);
  };

  const onDrop = (picture) => {
    setImageName(picture[0].name);
    setPictures(pictures.concat(picture));
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Image Uploader</h1>
      {!loading && (
        <ImageUploader
          withIcon={true}
          withPreview={false}
          buttonText="Choose image"
          buttonStyles={{
            background: "#759CFC",
            borderRadius: "5px",
            height: "35px",
          }}
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png"]}
          maxFileSize={5242880}
          singleImage={true}
        />
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
