import React from "react";
import "./SideBar.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SideBar(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, avatar } = currentUser || {};

  const handleEditProfileClick = () => {
    props.setSeeEditProfileModal(true);
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
        <p className="sideBar__menu-item" onClick={props.handleLogOut}>
          Log Out
        </p>
      </div>
    </div>
  );
}

export default SideBar;
