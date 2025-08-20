import "./ItemCard.css";
import { useModal } from "../../../contexts/modalContext";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { likeItem, dislikeItem } from "../../../utils/api";

export default function ItemCard(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  if (!props.name || !props.link || !props.id || !props.weather) {
    return (
      <div className="main">
        <p>Loading item...</p>
      </div>
    );
  }

  const { setSelectedItem } = useModal();

  useEffect(() => {
    if (currentUser && props.likes && Array.isArray(props.likes)) {
      setIsLiked(props.likes.includes(currentUser._id));
    } else {
      setIsLiked(false);
    }
  }, [currentUser, props.likes]);

  function handleCardClick() {
    setSelectedItem({
      name: props.name,
      url: props.link,
      id: props.id,
      weather: props.weather,
      likes: props.likes,
      owner: props.owner,
    });
    props.setSeePreview(true);
  }

  function handleCardLike() {
    if (!currentUser) return;
    if (!isLiked) {
      likeItem(props.id)
        .then(() => {
          setIsLiked(true);
        })
        .catch((err) => console.error(err));
    }
    if (isLiked) {
      dislikeItem(props.id)
        .then(() => {
          setIsLiked(false);
        })
        .catch((err) => console.error(err));
    }
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
      {currentUser && (
        <button
          className={`item-card__like-btn${
            isLiked ? " item-card__like-btn_liked" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleCardLike();
          }}
        ></button>
      )}
    </li>
  );
}
