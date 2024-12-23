import React, { useState, useEffect } from "react";
import styles from "./styles.module.css"; // Importing CSS module
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

export default function App() {
  const [type, setType] = useState("signIn"); // Default state is "signIn"

  useEffect(() => {
    document.body.classList.add(styles.greenBackground);

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove(styles.greenBackground);
    };
  }, []);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = `${styles.container} ${type === "signUp" ? styles["right-panel-active"] : ""}`;

  return (
    <div className="App">
      <div className={containerClass} id="container">
        {type === "signUp" && <SignUpForm />}
        {type === "signIn" && <SignInForm />}

        <div className={styles["overlay-container"]}>
          <div className={styles.overlay}>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us, please login with your personal info</p>
              <button
                className={styles.ghost}
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button
                className={styles.ghost}
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
