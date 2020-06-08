import React, { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    getProfile();
  }, []);
  return <div>Profile</div>;
};

export default Profile;
