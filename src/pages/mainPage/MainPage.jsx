import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Importē Redux hookus
import styles from "../mainPage/mainPage.module.css"; // Importē stilu failu
import slide1 from "../../images/chatIdeas/robotic-arm-motion-futuristic-technology-innovation-generated-by-ai.jpg";
import slide2 from "../../images/chatIdeas/education-day-scene-fantasy-style-aesthetic.jpg";
import slide3 from "../../images/chatIdeas/futuristic.jpg";


import {
  setTitle,
  setDescription,
} from "../../features/mainPage/mainPageSlice"; // Importē Redux darbības nosaukuma un apraksta iestatīšanai

// Masīvs ar slīdu attēliem
const slides = [slide1, slide2, slide3];

const MainPage = () => {
  const dispatch = useDispatch(); // Izveido dispečeri darbību veikšanai
  const title = useSelector((state) => state.mainPage.title); // Izmanto Redux, lai saņemtu nosaukumu no stāvokļa
  const description = useSelector((state) => state.mainPage.description); // Izmanto Redux, lai saņemtu aprakstu no stāvokļa
  const [slideIndex, setSlideIndex] = useState(0); // Stāvoklis pašreizējā slīda indeksam

  useEffect(() => {
    // Montāžas laikā iestata sākotnējo nosaukumu un aprakstu
    dispatch(
      setTitle("Discover New Connections: Your Gateway to Global Friendships!")
    ); // Maina nosaukumu
    dispatch(
      setDescription(
        "TalkTown is a social communication platform designed to provide a simple and secure way to meet new people and initiate conversations with individuals from around the world..."
      )
    ); // Maina aprakstu

    // Slīdņu animācijas intervāls (4 sekundes)
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length); // Cikli slīdu pārslēgšanai
    }, 4000);

    return () => clearInterval(interval); // Atceļ intervālu, kad komponents tiek noņemts no DOM
  }, [dispatch]); // Reaģē uz dispečeri kā atkarību

  return (
    <div className={styles.heroWrapper}>
     
      <div className={styles.heroSection}>
        <div className={styles.hero}>
          <h2>{title}</h2> {/* Nosaukums no Redux */}
          <p>{description}</p> {/* Apraksts no Redux */}
          <div className={styles.buttons}>
            <a href="/join" className={`${styles.join} ${styles.button}`}>
              Join Us
            </a>
            <a href="/learn" className={styles.learn}>
              Learn More
            </a>
          </div>
        </div>

        {/* Attēlu slīdnis */}
        <div className={styles.imgSlider}>
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className={`${styles.slide} ${
                index === slideIndex ? styles.active : ""
              }`} // Aktīvajam slīdam pievieno "active" klasi
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
