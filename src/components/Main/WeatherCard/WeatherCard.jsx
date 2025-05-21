import "./WeatherCard.css";
import { useCTUContext } from "../../../contexts/CurrentTemperatureUnitContext";
import React from "react";

export default function WeatherCard(props) {
  const { currentTemperatureUnit } = useCTUContext();
  return (
    <div className="weather-card">
      {currentTemperatureUnit === "F" ? (
        <p className="weather-card__weather">{props.temp}°F</p>
      ) : (
        <p className="weather-card__weather">{props.tempC}°C</p>
      )}
    </div>
  );
}
