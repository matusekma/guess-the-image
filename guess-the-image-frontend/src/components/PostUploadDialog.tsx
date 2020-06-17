import React, { useState } from "react";
import ImageUploadInput from "./ImageUploadInput";
import { createPostCall } from "../apiCalls/postApiCalls";
import {
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MAX_MEGABYTES = 3;

interface Props {
  isOpen: boolean;
  close: () => void;
}
const PostUploadDialog = ({ isOpen, close }: Props) => {
  const [image, setImage] = useState<File>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<string>();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const uploadPost = () => {
    if (!image) {
      setError("Nem választottál képet");
    } else if (image.size > MAX_MEGABYTES * 1e6) {
      setError("A választott kép túl nagy méretű!");
    } else if (!image.type.includes("image/")) {
      setError("Képet válassz!");
    } else {
      const formData = new FormData();
      formData.append("file", image);
      setLoading("Feltöltés...");
      createPostCall(formData)
        .then((data) => {
          close();
        })
        .catch((error) => {
          setLoading("");
          setError("A kép feltöltése nem sikerült, próbáld újra!");
        });
    }
  };

  const onImageChange = (image: File) => {
    if (image) {
      if (image.size > MAX_MEGABYTES * 1e6) {
        setError("A választott kép túl nagy méretű!");
      } else {
        setError(undefined);
        setImage(image);
      }
    }
  };

  return (
    <Dialog
      className="post-upload-dialog"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" className="text-center pt-1">
        <div className="row justify-content-end">
          <FontAwesomeIcon
            style={{ fontSize: 30, cursor: "pointer", opacity: 0.25 }}
            icon={faTimes}
            onClick={close}
          />
        </div>
        {"Válassz ki egy fájlt a poszt létrehozásához!"}
      </DialogTitle>
      <DialogContent>
        <div className="container-fluid mb-2">
          <ImageUploadInput
            setImage={onImageChange}
            imageName={image && image.name}
          />

          {image && (
            <div className="preview-wrapper mt-2">
              <img
                className="preview"
                src={URL.createObjectURL(image)}
                alt="Preview of post"
              />
            </div>
          )}
          {(error || loading) && (
            <div
              className={`row justify-content-center ${
                error ? "error" : ""
              } mt-2`}
            >
              <div>
                <b>{loading || error}</b>
              </div>
            </div>
          )}
        </div>

        <DialogContentText>
          Egy képfájlt válassz ki, melynek maximális mérete {MAX_MEGABYTES} MB.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button className="button-danger mr-auto" onClick={close}>
          Mégsem
        </button>
        <button className="button-primary" onClick={(e) => uploadPost()}>
          Feltöltés
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default PostUploadDialog;
