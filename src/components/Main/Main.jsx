import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useFc } from "../../contexts/FcContext";

export default function Main(props) {
  const { isChecked } = useFc();

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
          link={card.link}
          setCardData={props.setCardData}
          setSeePreview={props.setSeePreview}
        />
      ));
    return renderedCards;
  }

  return (
    <div className="main">
      <WeatherCard temp={props.temp} tempC={props.tempC} />
      {!isChecked ? (
        <p className="main__weather-statement">{`Today is ${props.temp}°F / You may want to wear:`}</p>
      ) : (
        <p className="main__weather-statement">{`Today is ${props.tempC}°C / You may want to wear:`}</p>
      )}
      <ul className="main__cards-list">{renderCards(props.cards)}</ul>
    </div>
  );
}
