import React from "react";
import ItemCard from "../../Main/ItemCard/ItemCard";
import "./ClothesSection.css";

export const ClothesSection = React.memo((props) => {
  function renderCards(cards) {
    const renderedCards = cards.map((card) => (
      <ItemCard
        key={card._id}
        id={card._id}
        name={card.name}
        weather={card.weather}
        link={card.imageUrl}
        setSelectedItem={props.setSelectedItem}
        setSeePreview={props.setSeePreview}
      />
    ));
    return renderedCards;
  }

  function getTimestampFromObjectId(objectId) {
    const hexTimestamp = objectId.toString().substring(0, 8);
    return new Date(parseInt(hexTimestamp, 16) * 1000);
  }

  function sortCardsByNewest(cards) {
    return cards.slice().sort((a, b) => {
      const aTime = getTimestampFromObjectId(a._id);
      const bTime = getTimestampFromObjectId(b._id);
      return bTime - aTime;
    });
  }

  function handleClothesButtonClick() {
    {
      props.setSeeModal(true);
    }
  }

  return (
    <div className="clothes-section">
      <div className="clothes__menu">
        <p className="clothes__title">Your items</p>
        <button
          className="clothes__button"
          type="button"
          onClick={() => handleClothesButtonClick()}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes">{renderCards(sortCardsByNewest(props.items))}</ul>
    </div>
  );
});
