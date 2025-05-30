import "./Profile.css";
import React from "react";
import { SideBar } from "./SideBar/SideBar";
import { ClothesSection } from "./ClothesSection/ClothesSection";

export const Profile = React.memo((props) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        items={props.items}
        setSeePreview={props.setSeePreview}
        setSeeModal={props.setSeeModal}
      />
    </div>
  );
});
