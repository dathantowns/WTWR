import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

export default function Main(props) {
  function renderCards(cards) {
    const renderedCards = cards
      .filter(
        (card) =>
          card.weather === props.weather ||
          (card.wearWhenSunny && props.isSunny)
      )
      .map((card, i) => {
        return (
          <ItemCard
            key={i}
            id={card._id}
            name={card.name}
            weather={card.weather}
            link={card.link}
          />
        );
      });
    return renderedCards;
  }

  return (
    <>
      <div className="main">
        <WeatherCard temp={props.temp} />
        <p className="main__weather-statement">{`Today is ${props.temp}°F / You may want to wear:`}</p>
        <ul className="main__cards-list">
          {renderCards(defaultClothingItems)}
        </ul>
      </div>
    </>
  );
}
