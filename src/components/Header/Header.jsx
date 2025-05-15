import headerLogo from "../../images/Logo.png";
import headerAvatar from "../../images/headerTerrenceAvatar.png";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userName = "Terrence Wiggins";

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
          <ToggleSwitch />
          <button
            className="header__button"
            type="button"
            onClick={() => handleHeaderButtonClick()}
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <p className="header__username">{userName}</p>
            <img
              src={headerAvatar}
              alt="header avatar"
              className="header__avatar"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
