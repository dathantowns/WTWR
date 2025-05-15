import "./Profile.css";
import React from "react";
import { SideBar } from "./SideBar/SideBar";
import { ClothesSection } from "./ClothesSection/ClothesSection";

export const Profile = React.memo(() => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection />
    </div>
  );
});
