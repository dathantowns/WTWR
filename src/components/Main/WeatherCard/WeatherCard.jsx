import "./WeatherCard.css";

export default function WeatherCard(props) {
  return (
    <div className="weather-card">
      <p className="weather-card__weather">{props.temp}°F</p>
    </div>
  );
}
