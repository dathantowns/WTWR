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

      <ul className="clothes">{renderCards(props.items)}</ul>
    </div>
  );
});
