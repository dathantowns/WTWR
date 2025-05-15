import React from "react";
import headerAvatar from "../../../images/headerTerrenceAvatar.png";
import "./SideBar.css";

export const SideBar = React.memo((props) => {
  const userName = "Terrence Wiggins";

  return (
    <>
      <div className="sideBar">
        <img
          src={headerAvatar}
          alt="sidebar avatar"
          className="sideBar__avatar"
        />
        <p className="sideBar__username">{userName}</p>
      </div>
    </>
  );
});
