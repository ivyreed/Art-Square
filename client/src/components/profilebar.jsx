import "../assets/styles/Probanner.css";
import profileImage from "../assets/images/profile.jpg";

const ProfileBar = ({ username, avatarUrl, numberOfImages }) => {
  return (
    <div className="profile-banner">
      <div className="profile-container">
        <img
          className="profile-banner-image"
          src={profileImage}
          alt="profile image"
        />
        <div className="text-info">
          <div className="banner-username">
            <div className="username">{username}</div>
            <button className="follow-btn">
              <span className="follow">Follow</span>
              <span className="mobile-follow">+</span>
            </button>
          </div>
          <div className="banner-account-info">
            <p className="general-info">
              Following 10K blockheads <span className="pipe1"> | </span>
              <br className="break1"></br>
              {numberOfImages} squares shared
              <span className="pipe2"> | </span>
              <br className="break2"></br>
              5/5 Square Rating
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
