import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCamera } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import PostUploadDialog from "./PostUploadDialog";

const NewPostModePicker = () => {
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <div className="new-post-mode-wrapper">
        <div className="row h-100 p-0 m-0">
          <div
            onClick={() => setDialogOpen(true)}
            className="col-md-6 p-0 side left-side"
          >
            <div className="left-side-container side-container h-100 w-100 d-flex justify-content-center align-items-center">
              <FontAwesomeIcon className="icon" icon={faCamera} />
            </div>
            <div className="overlay left-overlay">Feltöltés</div>
          </div>
          <div
            onClick={() => history.push("/new/draw")}
            className="col-md-6 p-0 side right-side"
          >
            <div className="right-side-container side-container h-100 w-100 d-flex justify-content-center align-items-center">
              <FontAwesomeIcon className="icon" icon={faPencilAlt} />
            </div>
            <div className="overlay right-overlay">Rajz</div>
          </div>
        </div>
      </div>

      {dialogOpen && (
        <PostUploadDialog
          isOpen={dialogOpen}
          close={() => setDialogOpen(false)}
        />
      )}
    </>
  );
};

export default NewPostModePicker;
