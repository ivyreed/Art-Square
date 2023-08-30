import React from "react";
import "./probar.css";

const ProfileBar = ({
  username,
  avatarUrl,
  firstName,
  lastName,
  numberOfImages,
}) => {
  return (
    <div className="profile-section">
      <div className="profileContentHeader">
        <img className="user-image" src={avatarUrl} alt="profile image" />
<div class="textInfo">
        <div className="name-follow">
          <span className="username">{username}</span>
          <button className="follow-btn">Follow</button>
        </div><br></br>
      
    <div className="imageTotal">{numberOfImages} squares shared </div> 
      
    </div>
    
    </div>
    </div>
  );
};

export default ProfileBar;
