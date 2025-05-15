import { useState } from "react";
import "./ModalWithForm.css";
import ItemCard from "../Main/ItemCard/ItemCard";

export default function ModalWithForm(props) {
  function handleFormSubmit(e) {
    e.preventDefault();

    const newCard = {
      name: e.target[1].value,
      weather: props.weather,
      link: e.target[2].value,
      setCardData: props.setCardData,
      setSeePreview: props.setSeePreview,
      selected: props.selected,
    };
    props.setCards([newCard, ...props.cards]);
    console.log("Updated cards Array:", props.cards);
    props.closeModal();
  }

  return (
    <div
      className={props.seeModal ? "modal modal_opened" : "modal"}
      id="post-modal"
      onClick={props.closeModal}
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{props.title}</h2>
          <button
            className="modal__close-btn"
            type="button"
            onClick={props.closeModal}
          ></button>
        </div>
        <form
          className={props.name}
          name="garment-form"
          id="garment-form"
          onSubmit={handleFormSubmit}
        >
          <fieldset className="modal__fieldset">
            {props.children}
            <button type="submit" className="modal__save-btn">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
