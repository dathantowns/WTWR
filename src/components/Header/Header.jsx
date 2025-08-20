import headerLogo from "../../images/Logo.png";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./Header.css";

export default function Header(props) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;
  const userAvatar = currentUser?.avatar;
  function handleHeaderButtonClick() {
    {
      props.setSeeModal(true);
    }
  }

  return (
    <>
      <div className="header">
        <div className="header__date-logo">
          <Link to="/" className="header__link">
            <img src={headerLogo} alt="headerlogo" className="header__logo" />
          </Link>
          {`${currentDate}, ${props.location}`}
        </div>
        <div className="header__menu">
          {isLoggedIn ? (
            <>
              <button
                className="header__button"
                type="button"
                onClick={() => handleHeaderButtonClick()}
              >
                + Add clothes
              </button>

              <Link to="/profile" className="header__link">
                <p className="header__username">{currentUser?.name || ""}</p>
                {userAvatar && userAvatar !== "" ? (
                  <img
                    src={userAvatar}
                    alt="header avatar"
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-circle">
                    {currentUser?.name
                      ? currentUser.name.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                )}
              </Link>
            </>
          ) : (
            <>
              <button
                className="header__button"
                type="button"
                onClick={props.openRegisterModal}
              >
                Sign up
              </button>
              <button
                className="header__button"
                type="button"
                onClick={props.openLoginModal}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
