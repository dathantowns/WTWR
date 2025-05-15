import React from "react";
import { useFc } from "../../../contexts/FcContext";
import "./ToggleSwitch.css";

const ToggleSwitch = React.memo(() => {
  const { toggleUnit, unit, isChecked, setIsChecked } = useFc();

  const handleChange = (e) => {
    setIsChecked(!isChecked);
    toggleUnit(); // Optional: if this should run as well
  };

  return (
    <label className="toggle-switch" htmlFor="unit-toggle">
      <input
        id="unit-toggle"
        type="checkbox"
        name="header__fc-button"
        checked={isChecked}
        onChange={handleChange}
        className="visually-hidden"
      />

      <div
        className={
          isChecked
            ? "toggle-switch__circle toggle-switch__circle_c"
            : "toggle-switch__circle"
        }
      ></div>
      <p
        className={
          !isChecked
            ? "toggle-switch__letter_f selected"
            : "toggle-switch__letter_f"
        }
      >
        F
      </p>
      <p
        className={
          isChecked
            ? "toggle-switch__letter_c selected"
            : "toggle-switch__letter_c"
        }
      >
        C
      </p>
    </label>
  );
});

export default ToggleSwitch;
