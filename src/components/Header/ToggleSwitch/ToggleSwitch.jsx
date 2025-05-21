import React from "react";
import { useCTUContext } from "../../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

const ToggleSwitch = React.memo(() => {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useCTUContext();

  return (
    <label className="toggle-switch" htmlFor="unit-toggle">
      <input
        id="unit-toggle"
        type="checkbox"
        name="header__fc-button"
        onChange={handleToggleSwitchChange}
        className="visually-hidden"
      />

      <div
        className={`toggle-switch__circle ${
          currentTemperatureUnit === "C" ? "toggle-switch__circle_c" : ""
        }`}
      ></div>
      <p
        className={` toggle-switch__letter_f ${
          currentTemperatureUnit === "F" ? "selected" : ""
        }`}
      >
        F
      </p>
      <p
        className={`toggle-switch__letter_c ${
          currentTemperatureUnit === "C" ? "selected" : ""
        }`}
      >
        C
      </p>
    </label>
  );
});

export default ToggleSwitch;
