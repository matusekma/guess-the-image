import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCamera } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const NewPostModePicker = () => {
  const history = useHistory();
  return (
    <div className="new-post-mode-wrapper">
      <div className="row h-100 p-0 m-0">
        <div
          onClick={() => history.push("/new/upload")}
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
  );
};

export default NewPostModePicker;
