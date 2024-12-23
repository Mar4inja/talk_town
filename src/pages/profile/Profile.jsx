import styles from "./profile.module.css";
import React, { useEffect } from "react";
import logo from "../../images/logo/logotips-removebg-preview.png";

const Profile = () => {
  useEffect(() => {
    document.body.classList.add(styles.blueBackground);
    return () => {
      document.body.classList.remove(styles.blueBackground);
    };
  }, []);

  return (
    <div className={styles.appContainer}>
      {/* Profila Header konteiners */}
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.greyLine}></div>
          <img src={logo} alt="LOGO" className={styles.headerLogo} />
          <input
            type="text"
            className={styles.profileSearchBar}
            placeholder="Search..."
          />
        </div>
        <div className={styles.headerButtons}>
          <a href="#" className={styles.link}>Friends</a>
          <a href="#" className={styles.link}>Messages</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
