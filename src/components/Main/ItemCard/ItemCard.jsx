import "./ItemCard.css";

export default function ItemCard(props) {
  return (
    <li className="item-card" name={props.name}>
      <div className="item-card__title">{props.name}</div>
      <img src={props.link} alt={props.name} className="item-card__img" />
    </li>
  );
}
