import { useState } from "react";
import "./ModalWithForm.css";

export default function ModalWithForm(props) {
  const getNextId = (items) => {
    return items.length === 0 ? 1 : Math.max(...items.map((i) => i._id)) + 1;
  };

  function handleFormSubmit(e) {
    e.preventDefault();

    const newCard = {
      name: e.target[1].value,
      weather: props.weather,
      imageUrl: e.target[2].value,
      setCardData: props.setCardData,
      setSeePreview: props.setSeePreview,
      selected: props.selected,
      _id: getNextId(props.items),
    };
    props.setItems([newCard, ...props.items]);
    console.log("Updated cards Array:", props.items);
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
