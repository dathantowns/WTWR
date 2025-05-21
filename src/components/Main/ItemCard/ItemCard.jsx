import "./ItemCard.css";
import { useModal } from "../../../contexts/modalContext";

export default function ItemCard(props) {
  if (!props.name || !props.link || !props.id) {
    return (
      <div className="main">
        <p>Loading item...</p>
      </div>
    );
  }

  const { setSelectedItem } = useModal();
  function handleCardClick() {
    setSelectedItem([props.name, props.link, props.id]);
    props.setSeePreview(true);
  }

  return (
    <li
      className="item-card"
      name={props.name}
      id={props.id}
      style={{ backgroundImage: `url(${props.link})` }}
      onClick={handleCardClick}
    >
      <div className="item-card__title">{props.name}</div>
    </li>
  );
}
