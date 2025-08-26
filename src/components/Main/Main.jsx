import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useCTUContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Main(props) {
  const { currentTemperatureUnit } = useCTUContext();
  const { currentUser } = useContext(CurrentUserContext);
  if (!props.weather || !props.temp || !props.tempC) {
    return (
      <div className="main">
        <p>Loading weather data...</p>
      </div>
    );
  }

  function renderCards(cards) {
    let filteredCards;
    if (!currentUser) {
      filteredCards = cards.filter(
        (card) => card.weather === props.weather && card._id === card.owner
      );
    } else {
      filteredCards = cards.filter((card) => {
        return (
          card.weather === props.weather &&
          (card._id === card.owner || card.owner === currentUser._id)
        );
      });
    }
    return filteredCards.map((card) => (
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
