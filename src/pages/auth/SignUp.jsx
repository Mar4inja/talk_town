import React from "react";
import styles from "./styles.module.css"; // Import CSS module for SignUpForm
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"; // Import specific icons

function SignUpForm() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    const { firstName, lastName, birthDate, email, password } = state;
    alert(`You are signing up with name: ${firstName} ${lastName}, email: ${email}, and password: ${password}`);

    // Clear input fields after submit
    setState({
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      password: ""
    });
  };

  return (
    <div className={`${styles["form-container"]} ${styles["sign-up-container"]}`}>
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className={styles["social-container-signUp"]}>
          <a href="#" className={styles.social}>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className={styles.social}>
            <FontAwesomeIcon icon={faGooglePlusG} />
          </a>
          <a href="#" className={styles.social}>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
        <span className={styles.signUpPageSpan}>⬇️ You can sign up using one of your social accounts ⬇️</span>

        <input
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          placeholder="First name"
          className={styles.input}
        />
        <input
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          placeholder="Last name"
          className={styles.input}
        />
        <input
          type="text"
          name="birthDate"
          value={state.birthDate}
          onChange={handleChange}
          placeholder="Date of Birth"
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className={styles.input}
        />
        <button type="submit" className={styles.signUpButton}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
