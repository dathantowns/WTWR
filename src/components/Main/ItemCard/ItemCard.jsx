import "./ItemCard.css";

export default function ItemCard(props) {
  function handleCardClick(e) {
    console.log(e.target);
  }

  return (
    <li
      className="item-card"
      name={props.name}
      style={{ backgroundImage: `url(${props.link})` }}
      onClick={handleCardClick}
    >
      <div className="item-card__title">{props.name}</div>
    </li>
  );
}
