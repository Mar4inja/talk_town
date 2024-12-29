import styles from "./profile.module.css";
import React, { useEffect, useState } from "react";
import logo from "../../images/logo/logotips-removebg-preview.png";
import MyIcon from "../../images/icons/chaty.png";

const Profile = () => {
  const [messageCount, setMessageCount] = useState(5);
  const [city, setCity] = useState("Dortmund");
  const [ranking, setRanking] = useState(8.6); // Initial ranking value
  const [activeTab, setActiveTab] = useState(null); // Active tab state for Timeline/About

  const userData = {
    phone: "+4912666433",
    address: "123 Main St, Dortmund",
    email: "example@example.com",
    birthday: "January 1, 1990",
    gender: "Male"
  };

  useEffect(() => {
    document.body.classList.add(styles.blueBackground);
    return () => {
      document.body.classList.remove(styles.blueBackground);
    };
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab((prevTab) => (prevTab === tabName ? null : tabName)); // Toggle the clicked tab
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 10 - fullStars - halfStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fa fa-star"></i>);
    }
    if (halfStars) {
      stars.push(<i key="half" className="fa fa-star-half-alt"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa fa-star-o"></i>);
    }
    return stars;
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h3 className={styles.logoLetters}>Talk-Town</h3>
          <input
            type="text"
            className={styles.profileSearchBar}
            placeholder="Search..."
          />
          <div className={styles.headerButtons}>
            <a href="#" className={styles.link}>
              Friends
            </a>
            <a href="#" className={styles.link}>
              Messages
            </a>
            <div className={styles.messageCountContainer}>{messageCount}</div>
          </div>
          <div className={styles.profileCircle}></div>
        </div>
        <div className={styles.profileContentContainer}>
          <div className={styles.profilePhotoContainer}>
            <div className={styles.onlineIndicator}></div>
            <div className={styles.profileImage}></div>
            <h2 className={styles.fullName}>
              Martins Groza
              <i className={`fa fa-map-marker-alt ${styles.locationIcon}`}></i>
              <span className={styles.cityText}>{city}</span>
            </h2>
            <div className={styles.ratingContainer}>
              <span className={styles.ratingValue}>{ranking.toFixed(1)}</span>
              <div className={styles.stars}>{renderStars(ranking)}</div>
              <div className={styles.profileActionLinksContainer}>
                <a href="#" className={styles.sendMessageLink}>
                  <img
                    src={MyIcon}
                    alt="Chat Icon"
                    className={styles.messageIcon}
                  />
                  Send Message
                </a>
                <a href="#" className={styles.reportUserLink}>
                  Report User
                </a>
              </div>
            </div>

            {/* Links for Timeline and About */}
            <div className={styles.additionalLinksContainer}>
              <a
                href="#"
                className={`${styles.additionalLink} ${
                  activeTab === "timeline" ? styles.selectedTab : ""
                }`}
                onClick={() => handleTabClick("timeline")}
              >
                <i className="fa fa-clock"></i> Timeline
              </a>
              <a
                href="#"
                className={`${styles.additionalLink} ${
                  activeTab === "about" ? styles.selectedTab : ""
                }`}
                onClick={() => handleTabClick("about")}
              >
                <i className="fa fa-info-circle"></i> About
              </a>
            </div>

            {/* Silver line */}
            <div className={styles.silverLine}></div>
          </div>
        </div>

        {/* Main container for Timeline and About */}
        <div className={styles.mainTabContainer}>
          {activeTab === "about" && (
            <div className={styles.tabContent}>
              <h3>User Data</h3>
              <div className={styles.userInfo}>
                <div className={styles.userInfoItem}>
                  <strong>Phone:</strong> {userData.phone}
                </div>
                <div className={styles.userInfoItem}>
                  <strong>Address:</strong> {userData.address}
                </div>
                <div className={styles.userInfoItem}>
                  <strong>Email:</strong> {userData.email}
                </div>
                <h3>Basic information</h3>
                <div className={styles.userInfoItem}>
                  <strong>Birthday:</strong> {userData.birthday}
                </div>
                <div className={styles.userInfoItem}>
                  <strong>Gender:</strong> {userData.gender}
                </div>
              </div>
            </div>
          )}
          {activeTab === "timeline" && (
            <div className={styles.tabContent}>
              <h3>Timeline</h3>
              <p>This is where the timeline of activities can be displayed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
