import React, { useEffect, useState } from "react";
import "./profile.css";
import profilePic from "../../images/new/WhatsApp Image 2024-10-31 at 15.17.05_1ae7487b.jpg";
import profileIcon from "../../images/new/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
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
    // Update the active tab in the component state or Redux store if needed
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Account</h2>
        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            {" "}
            <img
              src={profileIcon}
              alt="Profile Icon"
              className="icon"
            />{" "}
            Profile
          </li>
          <li
            className={activeTab === "security" ? "active" : ""}
            onClick={() => setActiveTab("security")}
          >
            Security
          </li>
        </ul>
        <footer>Secured by Martins</footer>
      </div>
      {/* Main Content */}
      <div className="content">
        {activeTab === "profile" && (
          <div className="tab-content">
            <h3 className="profile-details-heading">Profile details</h3>
            <div className="section_profile">
              <div className="profile-row">
                <h5>Profile</h5>
                <img
                  src={profilePic.avatar}
                  alt="Profile"
                  className="profile-pic"
                />
                <h4>{profile.name}</h4>
                <button>Edit profile</button>
              </div>
            </div>
            <div className="section_birthDate">
              <div className="birthDate-row">
                <h5>Birth date</h5>
                <p>{profile.birthDate}</p>
                <button>Change Birth-Date</button>
              </div>
            </div>
            <div className="section_email">
              <div className="email-row">
                <h5>Email addresses</h5>
                <p>
                  {profile.email} <span className="tag">Primary</span>
                </p>
                <button>Add email address</button>
              </div>
            </div>
            <div className="section_phone_number">
              <div className="phone-number-row">
                <h5>Phone number</h5>
                <p>
                  {profile.phoneNumber} <span className="tag">Primary</span>
                </p>
                <button>Add phone number</button>
              </div>
            </div>
            <div className="section_connected_accounts">
              <div className="connected-accounts-row">
                <h5>Connected accounts</h5>
                <p>Google • {profile.email}</p>
                <button>Connect account</button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "security" && (
          <div className="tab-content">
            <h3>Security Settings</h3>
            <p>Security settings content goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
