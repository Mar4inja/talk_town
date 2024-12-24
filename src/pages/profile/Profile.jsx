import styles from "./profile.module.css";
import React, { useEffect, useState } from "react";
import logo from "../../images/logo/logotips-removebg-preview.png";

const Profile = () => {
  const [messageCount, setMessageCount] = useState(5);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    document.body.classList.add(styles.blueBackground);
    return () => {
      document.body.classList.remove(styles.blueBackground);
    };
  }, []);

  return (
    <div className={styles.appContainer}>
      {/* Profile Header Container */}
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <img src={logo} alt="LOGO" className={styles.headerLogo} />
          <input
            type="text"
            className={styles.profileSearchBar}
            placeholder="Search..."
          />
          <div className={styles.headerButtons}>
            <a href="#" className={styles.link}>Friends</a>
            <a href="#" className={styles.link}>Messages</a>
            <div className={styles.messageCountContainer}>{messageCount}</div>
          </div>
          <div className={styles.profileCircle}></div>
        </div>
        {/* Profile Content Container */}
        <div className={styles.profileContentContainer}>
          <div className={styles.profilePhotoContainer}>
            {/* Profile Image inside profilePhotoContainer */}
            <div className={styles.profileImage}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
