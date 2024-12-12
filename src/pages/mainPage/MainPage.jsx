import React from "react";
import styles from "./mainPage.module.css";
import phone from "../../images/phone.png";


function MainPage() {
  return (
    <div className={styles.App}>

      <main>
        <section className={styles.mainSection}>
          <h1>AWESOME APNEW MOBILE APP</h1>
          <div className={styles.buttons}>
            <button className={styles.downloadBtn}>DOWNLOAD</button>
            <button className={styles.learnMoreBtn}>LEARN MORE</button>
          </div>
          <img src={phone} alt="APNEW Mobile App" className={styles.phoneImage} />
        </section>
        <section className={styles.featuresSection}>
          <div className={styles.feature}>
            <img src="ios-icon.png" alt="iOS" />
            <p>iOS 102K</p>
          </div>
          <div className={styles.feature}>
            <img src="android-icon.png" alt="Android" />
            <p>Android 102K</p>
          </div>
        </section>
        <section className={styles.aboutSection}>
          <h2>ABOUT APNEW</h2>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p>
        </section>
        <section className={styles.bestAppSection}>
          <h2>BEST MOBILE APP</h2>
          <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.</p>
          <div className={styles.buttons}>
            <button className={styles.downloadBtn}>DOWNLOAD</button>
            <button className={styles.learnMoreBtn}>LEARN MORE</button>
          </div>
          <img src="phones-image.png" alt="APNEW Mobile App" className={styles.phonesImage} />
        </section>
        <section className={styles.additionalFeaturesSection}>
          <div className={styles.additionalFeature}>
            <img src="customize-icon.png" alt="Easy To Customize" />
            <h3>Easy To Customize</h3>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p>
          </div>
          <div className={styles.additionalFeature}>
            <img src="user-friendly-icon.png" alt="User Friendly" />
            <h3>User Friendly</h3>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainPage;
