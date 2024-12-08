import React from "react";
import styles from "./styles.module.css"; // Import CSS module for SignUpForm
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"; // Import specific icons
import "react-datepicker/dist/react-datepicker.css";

function SignUpForm() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false); // Loading state
  const [error, setError] = React.useState(null); // Error state
  const [success, setSuccess] = React.useState(false); // Success state

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true); // Set loading to true during API call
    setError(null); // Clear previous errors
    setSuccess(false); // Reset success state

    const { firstName, lastName, birthDate, email, password } = state;

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          birthdate: birthDate, // Ensure birthDate matches API field name
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setSuccess(true); // Indicate successful registration
      // Clear input fields
      setState({
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.message); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
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
        <span className={styles.signUpPageSpan}>
          ⬇️ You can sign up using one of your social accounts ⬇️
        </span>

        <input
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          placeholder="First name"
          className={styles.input}
          required
        />
        <input
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          placeholder="Last name"
          className={styles.input}
          required
        />
        <input
          type="date"
          name="birthDate"
          value={state.birthDate}
          onChange={handleChange}
          placeholder="Date of Birth"
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.signUpButton} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Display success or error messages */}
        {success && <p className={styles.successMessage}>Registration successful, please check your e-mail to confirm registration!</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}

export default SignUpForm;
