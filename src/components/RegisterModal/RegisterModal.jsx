import { useState } from "react";
import "./RegisterModal.css";

const RegisterModal = ({
  closeModal,
  seeModal,
  handleRegisterSubmit,
  openLoginModal,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterSubmit({ name, avatar, email, password });
    // Reset form
    setName("");
    setAvatar("");
    setEmail("");
    setPassword("");
  };

  const handleLoginClick = () => {
    closeModal();
    openLoginModal();
  };

  return (
    <div
      className={
        seeModal ? "register-modal register-modal_opened" : "register-modal"
      }
      onClick={closeModal}
    >
      <div
        className="register-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="register-modal__content">
          <div className="register-modal__header">
            <h3 className="register-modal__title">Sign up</h3>
            <button
              className="register-modal__close-btn"
              type="button"
              onClick={closeModal}
            ></button>
          </div>
          <form onSubmit={handleSubmit} className="register-modal__form">
            <label htmlFor="email-input" className="register-modal__label">
              Email*
              <input
                type="email"
                className="register-modal__input"
                id="email-input"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <span
                className="register-modal__input-error"
                id="email-error"
              ></span>
            </label>
            <label htmlFor="password-input" className="register-modal__label">
              Password*
              <input
                type="password"
                className="register-modal__input"
                id="password-input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
                minLength="6"
              />
              <span
                className="register-modal__input-error"
                id="password-error"
              ></span>
            </label>
            <label htmlFor="name-input" className="register-modal__label">
              Name
              <input
                type="text"
                className="register-modal__input"
                id="register-name-input"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                minLength="2"
                maxLength="30"
              />
              <span
                className="register-modal__input-error"
                id="name-error"
              ></span>
            </label>
            <label htmlFor="avatar-input" className="register-modal__label">
              Avatar URL
              <input
                type="url"
                className="register-modal__input"
                id="avatar-input"
                placeholder="Avatar URL"
                value={avatar}
                onChange={handleAvatarChange}
              />
              <span
                className="register-modal__input-error"
                id="avatar-error"
              ></span>
            </label>
            <div className="register-modal__buttons">
              <button type="submit" className="register-modal__save-btn">
                Next
              </button>
              <button
                type="button"
                className="register-modal__login-btn"
                onClick={handleLoginClick}
              >
                or Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
