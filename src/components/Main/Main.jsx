import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useCTUContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function Main(props) {
  const { currentTemperatureUnit } = useCTUContext();
  if (!props.weather || !props.temp || !props.tempC) {
    return (
      <div className="main">
        <p>Loading weather data...</p>
      </div>
    );
  }

  function renderCards(cards) {
    const renderedCards = cards
      .filter((card) => card.weather === props.weather)
      .map((card) => (
        <ItemCard
          key={card._id}
          id={card._id}
          name={card.name}
          weather={card.weather}
          link={card.imageUrl}
          likes={card.likes}
          owner={card.owner}
          setSeePreview={props.setSeePreview}
          onCardLike={props.onCardLike}
        />
      ));

    return renderedCards;
  }

  return (
    <div className="main">
      <WeatherCard temp={props.temp} tempC={props.tempC} />
      <p className="main__weather-statement">
        {currentTemperatureUnit === "F"
          ? `Today is ${props.temp}°F / You may want to wear:`
          : `Today is ${props.tempC}°C / You may want to wear:`}
      </p>

      <ul className="main__cards-list">{renderCards(props.items)}</ul>
    </div>
  );
}
