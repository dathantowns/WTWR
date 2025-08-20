import React from "react";
import "./SideBar.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SideBar(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { name, avatar } = currentUser || {};
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    props.setSeeEditProfileModal(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="sideBar__container">
      <div className="sideBar__profile">
        {avatar && avatar !== "" ? (
          <img src={avatar} alt="sideBar avatar" className="sideBar__avatar" />
        ) : (
          <div className="sideBar__avatar-circle">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "?"}
          </div>
        )}
        <p className="sideBar__username">{name}</p>
      </div>
      <div className="sideBar__menu">
        <p className="sideBar__menu-item" onClick={handleEditProfileClick}>
          Change profile data
        </p>
        <p className="sideBar__menu-item" onClick={handleLogOut}>
          Log Out
        </p>
      </div>
    </div>
  );
}

export default SideBar;
