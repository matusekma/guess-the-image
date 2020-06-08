import React, { useEffect, useState } from "react";
import { getProfileCall } from "../apiCalls/userApiCalls";
import ProfileData from "../DTO/user/ProfileData";

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData | undefined>();

  useEffect(() => {
    getProfileCall().then((pData) => setProfileData(pData));
  }, []);

  return <div>{profileData && profileData.email}</div>;
};

export default Profile;
