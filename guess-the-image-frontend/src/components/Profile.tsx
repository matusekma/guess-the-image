import React, { useEffect, useState } from "react";
import { getProfileCall } from "../apiCalls/userApiCalls";
import User from "../DTO/user/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [profileData, setProfileData] = useState<User | undefined>();

  useEffect(() => {
    getProfileCall().then((pData) => setProfileData(pData));
  }, []);

  return (
    <div className="container mt-5 align-items-center">
      {profileData && (
        <>
          <div
            style={{ fontSize: 50 }}
            className="row justify-content-center mb-4"
          >
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="row justify-content-center">
                <div className="row col-12 col-md-6 mr-md-2 justify-content-center justify-content-md-end">
                  <b>Felhasználónév: </b>
                </div>
                <div className="row col-12 col-md-6 justify-content-center justify-content-md-start">
                  {profileData.username}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="row col-12 col-md-6 mr-md-2 justify-content-center justify-content-md-end">
                  <b>E-mail: </b>
                </div>
                <div className="row col-12 col-md-6 justify-content-center justify-content-md-start">
                  {profileData.email}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="row col-12 col-md-6 mr-md-2 justify-content-center justify-content-md-end">
                  <b>Vezetéknév: </b>
                </div>
                <div className="row col-12 col-md-6 justify-content-center justify-content-md-start">
                  {profileData.lastName}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="row col-12 col-md-6 mr-md-2 justify-content-center justify-content-md-end">
                  <b>Keresztnév: </b>
                </div>
                <div className="row col-12 col-md-6 justify-content-center justify-content-md-start">
                  {profileData.firstName}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
