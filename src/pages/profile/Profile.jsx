import React, { useEffect, useState } from "react";
import styles from "./profile.module.css"; // Importējam CSS moduļus
import profilePic from "../../images/new/WhatsApp Image 2024-10-31 at 15.17.05_1ae7487b.jpg";
import profileIcon from "../../images/new/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../features/profile/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleTabClick = (tab) => {
    // Atjauninām aktīvo cilni
    setActiveTab(tab);
  };

  return (
    <div className={styles.profileContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2>Account</h2>
        <ul>
          <li
            className={activeTab === "profile" ? styles.active : ""}
            onClick={() => handleTabClick("profile")}
          >
            <img
              src={profileIcon}
              alt="Profile Icon"
              className={styles.profileIcon}
            />
            Profile
          </li>
          <li
            className={activeTab === "security" ? styles.active : ""}
            onClick={() => handleTabClick("security")}
          >
            Security
          </li>
        </ul>
        <footer>Secured by Martins</footer>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {activeTab === "profile" && (
          <div className={styles.tabContent}>
            <h3 className={styles.profileDetailsHeading}>Profile details</h3>
            <div className={styles.sectionProfile}>
              <div className={styles.profileRow}>
                <h5>Profile</h5>
                <img
                  src={styles.profilePic} // Izmantojiet profila attēlu
                  alt="Profile"
                  className={styles.profilePic}
                />
                <h4>{profile.name}</h4>
                <button>Edit profile</button>
              </div>
            </div>
            <div className={styles.sectionBirthDate}>
              <div className={styles.birthDateRow}>
                <h5>Birth date</h5>
                <p>{profile.birthDate}</p>
                <button>Change Birth-Date</button>
              </div>
            </div>
            <div className={styles.sectionEmail}>
              <div className={styles.emailRow}>
                <h5>Email addresses</h5>
                <p>
                  {profile.email} <span className={styles.tag}>Primary</span>
                </p>
                <button>Add email address</button>
              </div>
            </div>
            <div className={styles.sectionPhoneNumber}>
              <div className={styles.phoneNumberRow}>
                <h5>Phone number</h5>
                <p>
                  {profile.phoneNumber} <span className={styles.tag}>Primary</span>
                </p>
                <button>Add phone number</button>
              </div>
            </div>
            <div className={styles.sectionConnectedAccounts}>
              <div className={styles.connectedAccountsRow}>
                <h5>Connected accounts</h5>
                <p>Google • {profile.email}</p>
                <button>Connect account</button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "security" && (
          <div className={styles.tabContent}>
            <h3>Security Settings</h3>
            <p>Security settings content goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
