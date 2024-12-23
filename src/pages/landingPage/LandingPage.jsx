import React from "react";
import styles from "./landingPage.module.css";
import image1Laptop from "../../images/landingPage/laptop.png";
import image2Phones from "../../images/landingPage/rb_2150213520.png";
import Navbar from '../../components/navbar/Navbar';

const LandingPage = () => {
  return (
    <div className={styles.mainContainer}>
      <Navbar/>
      <div className={styles.upperSquareContainer}>
        <div className={styles.upperSquare}></div>
      </div>
      <div className={styles.bottomSquareContainer}>
        <div className={styles.bottomSquare}></div>
      </div>
      <div className={styles.landingPageImageContainer}>
        <img
          src={image1Laptop}
          alt="Images"
          className={styles.landingPageImage}
        />
      </div>
      <div className={styles.textContainer}>
        <h2>
          <span className={styles.welcome}>Welcome</span>{" "}
          <span className={styles.talkTown}>Talk Town</span>
        </h2>
        <p>
          Talk Town is the revolutionary social network that's reshaping the way
          we connect. Unlike any other platform, Talk Town is designed to put
          genuine interaction at the heart of our community. Here, your voice
          truly matters, and your stories will be heard.
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Screenshots</button>
        </div>
      </div>
      <div className={styles.circleContainer}>
        <div className={styles.circleOne}></div>
        <div className={styles.circleTwo}></div>
        <div className={styles.circleThree}></div>
      </div>
      <div className={styles.secondTextContainer}>
        <h2>
          <span className={styles.about}>About</span>{" "}
          <span className={styles.our}>OUR</span>{" "}
          <span className={styles.future}>future plans</span>
        </h2>
        <p>
          We plan to introduce new and improved features that will provide our
          users with a richer and more engaging experience. This includes
          advanced customization options, enhanced user interface designs, and
          more interactive elements to keep our community actively engaged.
        </p>
      </div>
      <div className={styles.secondLandingPageImage}>
        <img src={image2Phones} alt="Phones" className={styles.phonesImage} />
        <div className={styles.secondButtonContainer}>
          <button className={styles.turnOnButton}>Turn-on</button>
          <button className={styles.turnOnButton}>Turn-on</button>
        </div>
      </div>
      <div className={styles.thirdTextContainer}>
        <h2>
          <span className={styles.this}>IT</span>{" "}
          <span className={styles.will}>WILL</span>{" "}
          <span className={styles.look}>look like this</span>
        </h2>
        <p>
          In the future, the Talk Town app will revolutionize social media with
          its intuitive design and meaningful interactions. You'll effortlessly
          connect, share, and engage with your community like never before. Stay
          tuned for a digital town where your voice truly matters!
        </p>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.deformedSquaresContainer}>
          <div className={`${styles.square} ${styles.square1}`}></div>
          <div className={`${styles.square} ${styles.square2}`}></div>
          <div className={`${styles.square} ${styles.square3}`}></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
