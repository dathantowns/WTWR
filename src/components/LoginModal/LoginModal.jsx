import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";

const LoginModal = ({
  closeModal,
  seeModal,
  handleLoginSubmit,
  openRegisterModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit({ email, password });
    // Reset form
    setEmail("");
    setPassword("");
  };

  const handleRegisterClick = () => {
    closeModal();
    openRegisterModal();
  };

  return (
    <div
      className={seeModal ? "login-modal login-modal_opened" : "login-modal"}
      id="login-modal"
      onClick={closeModal}
    >
      <div
        className="login-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="login-modal__header">
          <h2 className="login-modal__title">Log in</h2>
          <button
            className="login-modal__close-btn"
            type="button"
            onClick={closeModal}
          ></button>
        </div>
        <form
          className="login-form"
          name="login-form"
          id="login-form"
          onSubmit={handleSubmit}
        >
          <fieldset className="login-modal__fieldset">
            <label htmlFor="login-email-input" className="login-modal__label">
              Email
              <input
                type="email"
                className="login-modal__input"
                id="login-email-input"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <span
                className="login-modal__input-error"
                id="login-email-error"
              ></span>
            </label>
            <label
              htmlFor="login-password-input"
              className="login-modal__label"
            >
              Password
              <input
                type="password"
                className="login-modal__input"
                id="login-password-input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
                minLength="6"
              />
              <span
                className="login-modal__input-error"
                id="login-password-error"
              ></span>
            </label>
            <div className="login-modal__button-container">
              <button type="submit" className="login-modal__save-btn">
                Log in
              </button>
              <button
                type="button"
                className="login-modal__register-btn"
                onClick={handleRegisterClick}
              >
                or Register
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
