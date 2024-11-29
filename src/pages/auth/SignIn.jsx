import React from "react";
import styles from "./styles.module.css"; // Import CSS module
import { loginUser } from "../../features/auth/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"; // Import icons
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [state, setState] = React.useState({ email: "", password: "" });
  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [formError, setFormError] = React.useState(null);
  const [visibleError, setVisibleError] = React.useState(false); // Controls error visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Using the correct selector
  const { loading, error, isLoggedIn } = useSelector((state) => state.login);

  // Redirect to profile if login is successful
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  // Handler for input field changes
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  };

  // Function to show error messages for a limited time (3 seconds)
  const showErrorForLimitedTime = () => {
    setVisibleError(true);
    setTimeout(() => {
      setVisibleError(false);
      setEmailError(null);
      setPasswordError(null);
      setFormError(null);
    }, 3000); // Hide errors after 3 seconds
  };

  // Handler for form submission with client-side validation
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = state;

    // Client-side validation for email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isFormValid = true; // Flag to check form validity

    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format. Please enter a correct email.");
      isFormValid = false;
    } else {
      setEmailError(null);
    }

    // Client-side validation for password
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty.");
      isFormValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isFormValid = false;
    } else {
      setPasswordError(null);
    }

    // General form error handling
    if (!isFormValid) {
      setFormError("Please fix the highlighted errors and try again.");
      showErrorForLimitedTime(); // Show error messages for 3 seconds
      return;
    } else {
      setFormError(null);
    }

    // Dispatch login request to the server only if the form is valid
    if (isFormValid) {
      dispatch(loginUser({ email, password }));
      setState({ email: "", password: "" }); // Clear form only after successful login
    }
  };

  return (
    <div className={`${styles["form-container"]} ${styles["sign-in-container"]}`}>
      <form onSubmit={handleOnSubmit}>
        <h1>Sign In</h1>

        {/* Social buttons */}
        <div className={styles["social-container-signIn"]}>
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

        <span className={styles.signInPageSpan}>
          ⬇️ You can sign in using one of your social accounts ⬇️
        </span>

        {/* Email input field with error message */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          className={styles.input}
        />
        {visibleError && emailError && <p className={styles.error}>{emailError}</p>}

        {/* Password input field with error message */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className={styles.input}
        />
        {visibleError && passwordError && <p className={styles.error}>{passwordError}</p>}

        {/* Forgot password button */}
        <button
          type="button"
          className={styles["forgot-password-btn"]}
          onClick={() => alert("Password recovery functionality goes here")}
        >
          Forgot your password?
        </button>

        {/* General form error message */}
        {visibleError && formError && <p className={styles.error}>{formError}</p>}

        {/* Display errors from server */}
        {visibleError && error && <p className={styles.error}>{error}</p>}

        {/* Submit login button */}
        <button type="submit" className={styles.signInButton} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Error message displayed at the bottom */}
      <div className={styles.errorMessageWrapper}>
        {visibleError && (emailError || passwordError || formError || error) && (
          <p className={styles.errorMessage}>
            {emailError || passwordError || formError || error}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignInForm;
