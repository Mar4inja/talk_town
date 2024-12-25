import styles from "./profile.module.css";
import React, { useEffect, useState } from "react";
import logo from "../../images/logo/logotips-removebg-preview.png";
import MyIcon from '../../images/icons/chaty.png'
import MyIconTwo from '../../images/icons/check-regular-24.png'

const Profile = () => {
  const [messageCount, setMessageCount] = useState(5);
  const [city, setCity] = useState("Dortmund");
  const [ranking, setRanking] = useState(8.6); // Initial ranking value

  useEffect(() => {
    document.body.classList.add(styles.blueBackground);
    return () => {
      document.body.classList.remove(styles.blueBackground);
    };
  }, []);

  const handleNewRating = (newRating) => {
    setRanking((prevRanking) => {
      return (prevRanking + newRating) / 2;
    });
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
        <div className={styles.profileContentContainer}>
          <div className={styles.profilePhotoContainer}>
            <div className={styles.onlineIndicator}></div>
            <div className={styles.profileImage}></div>
            <h2 className={styles.fullName}>
              Martins Groza<i className={`fa fa-map-marker-alt ${styles.locationIcon}`}></i>
              <span className={styles.cityText}>{city}</span>
            </h2>
            <div className={styles.ratingContainer}>
              <span className={styles.ratingValue}>{ranking.toFixed(1)}</span>
              <div className={styles.stars}>
                {renderStars(ranking)}
              </div>
              <div className={styles.profileActionLinksContainer}>
              <a href="#" className={styles.sendMessageLink}> <img src={MyIcon} alt="Chat Icon" className={styles.messageIcon} />Send Message</a>
              <a href="#" className={styles.contactLink}> <img src={MyIconTwo} alt="Check Icon" className={styles.contactIcon} />Contact</a>
              <a href="#" className={styles.reportUserLink}>Report User</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
