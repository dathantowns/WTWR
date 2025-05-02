import headerLogo from "../../images/Logo.png";
import headerAvatar from "../../images/headerTerrenceAvatar.png";
import "./Header.css";

export default function Header(props) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userName = "Terrence Wiggins";

  function handleHeaderButtonClick() {
    // NEEDS CODING!!!
    console.log("open modalWithForm");
  }

  return (
    <>
      <div className="header">
        <div className="header__date-logo">
          <img src={headerLogo} alt="headerlogo" className="header__logo" />
          {`${currentDate}, ${props.location}`}
        </div>

        <div className="header__menu">
          <button
            className="header__button"
            type="button"
            onClick={handleHeaderButtonClick}
          >
            + Add clothes
          </button>
          {userName}
          <img
            src={headerAvatar}
            alt="header avatar"
            className="header__avatar"
          />
        </div>
      </div>
    </>
  );
}
