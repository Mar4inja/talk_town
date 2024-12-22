import React, { useState, useEffect } from "react";
import styles from "./games.module.css";

const Games = () => {
  const gameFiles = [
    { name: "fireworks.html", image: "/images/games/fireworks.gif" },
    { name: "game2.html", image: "/images/games/quiz.jpg" },
    { name: "game5.html", image: "/images/games/guess.jpg" },
    { name: "minecraft.html", image: "/images/games/minecraft2d.png" },
    { name: "minecraft2.html", image: "/images/games/min3d.jpg" },
    { name: "snake.html", image: "/images/games/snake.png" },
    { name: "piano.html", image: "/images/games/piano.jpg"}
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);

  const openModal = (game) => {
    setActiveGame(game);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveGame(null);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#4caf50";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className={styles.gamesContainer}>
      <div className={styles.gamesGrid}>
        {gameFiles.map((game, index) => (
          <div
            className={styles.card}
            key={index}
            onClick={() => openModal(game.name)}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}${game.image})`, // Izmanto process.env.PUBLIC_URL
              backgroundSize: 'cover', // Nodrošina, ka attēls aizpilda karti
              backgroundPosition: 'center', // Centrs attēla izvietošanai
            }}
          >
            <div className={styles.infoContainer}>
               <h3 className={styles.cardTitle}>Game {index + 1}</h3>
            <p className={styles.cardDescription}>Press to open</p> 
            </div>
            
          </div>
        ))}
      </div>

      {/* Modālais logs */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✖
            </button>
            <iframe
              src={`/gamesHTML/${activeGame}`}
              title={`Spēle`}
              className={styles.gameFrame}
              width="100%"
              height="600px"
              style={{ border: "none", borderRadius: "8px" }}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
