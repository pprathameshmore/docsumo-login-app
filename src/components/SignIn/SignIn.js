import React from "react";
import { signInHandler } from "../../services";
import styles from "./SignIn.module.css";

export const SignIn = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = React.useState({
    isEmailValid: true,
    isPasswordValid: true,
  });

  const [hasError, setHasError] = React.useState({
    error: false,
    message: "",
  });

  const emailChangeHandler = (e) => {
    setUser({ ...user, email: e.target.value });
    setValidationError({ ...validationError, isEmailValid: true });
  };

  const passwordChangeHandler = (e) => {
    setUser({ ...user, password: e.target.value });
    setValidationError({
      ...validationError,
      isPasswordValid: true,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      setValidationError({
        isEmailValid: user.email ? true : false,
        isPasswordValid: user.password ? true : false,
      });
      setHasError(false);
      return;
    } else {
      if (user.email.includes("@")) {
        setValidationError({
          ...validationError,
          isEmailValid: true,
        });
      } else {
        setValidationError({
          ...validationError,
          isEmailValid: false,
        });
        setHasError(false);
        return;
      }
    }
    signInHandler(user.email, user.password)
      .then((response) => {
        console.log("resolve", response);
        if (response.status_code === 200) {
          setHasError(false);
        } else {
          setHasError({ error: true, message: response.error });
        }
      })
      .catch((error) => {
        setHasError({ error: true, message: error.error });
      });
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.logoContainer}>
        <img src={require("./images/logo.png")} alt="logo" />
      </div>
      <div className={styles.signInFormContainer}>
        <div>
          <h1 className={styles.signInFormContainer__title}>
            Login to your Docsumo account
          </h1>
          {hasError.error ? (
            <span
              style={{
                display: "block",
                color: "#c70011",
                border: "1px solid #c70011",
                borderRadius: "4px",
                background: "#fff2f2",
                textAlign: "left",
                padding: "7px 12px",
                font: "normal normal 12px/1.16 Lato",
                margin: "10px 0",
              }}
            >
              User doesn't exist
            </span>
          ) : (
            <div
              style={{
                height: "20px",
              }}
            ></div>
          )}
          <form id="signInForm" onSubmit={onSubmitHandler}>
            <div className="formContainer">
              <div className={styles.signInFormContainer__input}>
                <label
                  className={styles.signInFormContainer__input__label}
                  htmlFor="email"
                >
                  Work Email
                </label>
                <input
                  className={
                    validationError.isEmailValid
                      ? styles.signInFormContainer__input__input
                      : styles.signInFormContainer__input__input__error
                  }
                  id="email"
                  name="email"
                  placeholder="john@mail.com"
                  onChange={emailChangeHandler}
                />
                <span
                  style={{
                    display: validationError.isEmailValid && "none",
                  }}
                  className={
                    styles.signInFormContainer__input__input__validation
                  }
                >
                  Please enter a valid email address
                </span>
              </div>
              <div className={styles.signInFormContainer__input}>
                <label
                  className={styles.signInFormContainer__input__label}
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={
                    validationError.isPasswordValid
                      ? styles.signInFormContainer__input__input
                      : styles.signInFormContainer__input__input__error
                  }
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password here..."
                  onChange={passwordChangeHandler}
                />
                <span
                  style={{
                    display: validationError.isPasswordValid && "none",
                  }}
                  className={
                    styles.signInFormContainer__input__input__validation
                  }
                >
                  Please enter a password
                </span>
              </div>
              <div className={styles.signInFormContainer__forgotPassword}>
                <p>Forgot Password?</p>
              </div>
              <button
                className={styles.signInFormContainer__submit}
                type="submit"
              >
                Login
              </button>
              <div>
                <p className={styles.signInFormContainer__signUp}>
                  Don't have an account?{" "}
                  <span>
                    <a href="https://app.docsumo.com/signup/">Sign up</a>
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
