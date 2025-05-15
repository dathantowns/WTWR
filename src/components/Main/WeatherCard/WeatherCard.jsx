import "./WeatherCard.css";
import { useFc } from "../../../contexts/FcContext";
import React from "react";

export default function WeatherCard(props) {
  const { isChecked } = useFc();

  return (
    <div className="weather-card">
      {!isChecked ? (
        <p className="weather-card__weather">{props.temp}°F</p>
      ) : (
        <p className="weather-card__weather">{props.tempC}°C</p>
      )}
    </div>
  );
}
