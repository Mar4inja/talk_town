import React, { useState, useEffect } from "react";
import styles from "./countdown.module.css"; // Importē CSS moduļa failu

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const nextYear = new Date(`January 1, ${now.getFullYear() + 1} 00:00:00`);
    const difference = nextYear - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <StarryBackground />
      <div className={styles.countdownContainer}>
        <h1 className={styles.heading}>Time Left Until New Year</h1>
        <div className={styles.timer}>
          <div className={styles.timerBlock}>
            <span className={styles.number}>{timeLeft.days}</span>
            <span className={styles.label}>Days</span>
            <span className={styles.colon}>:</span> {/* Kolons aiz Days */}
          </div>
          <div className={styles.timerBlock}>
            <span className={styles.number}>{timeLeft.hours}</span>
            <span className={styles.label}>Hours</span>
            <span className={styles.colon}>:</span> {/* Kolons aiz Hours */}
          </div>
          <div className={styles.timerBlock}>
            <span className={styles.number}>{timeLeft.minutes}</span>
            <span className={styles.label}>Minutes</span>
            <span className={styles.colon}>:</span> {/* Kolons aiz Minutes */}
          </div>
          <div className={styles.timerBlock}>
            <span className={styles.number}>{timeLeft.seconds}</span>
            <span className={styles.label}>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StarryBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("starryCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array(200)
      .fill()
      .map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: Math.random(), // Random opacity for each star
        opacityDirection: Math.random() > 0.5 ? 1 : -1, // Random direction for fading in or out
      }));

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      }
    }

    function animateStars() {
      for (const star of stars) {
        // Change opacity to create flickering effect
        star.opacity += Math.random() * 0.02 * star.opacityDirection; 
        if (star.opacity <= 0 || star.opacity >= 1) {
          // Reverse direction when opacity is too low or too high
          star.opacityDirection *= -1;
        }
      }
      drawStars();
      requestAnimationFrame(animateStars); // Continue the animation
    }

    animateStars();
  }, []);

  return <canvas id="starryCanvas" className={styles.starryCanvas}></canvas>;
};

export default Countdown;
