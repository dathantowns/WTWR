import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  closeModal,
  seeModal,
  selected,
  setCardData,
  setCards,
  cards,
  options,
  handleChange,
  handleFormSubmit,
}) => {
  return (
    <ModalWithForm
      closeModal={closeModal}
      seeModal={seeModal}
      title="Add garment"
      name="modal__form"
      modalId="add-item-modal"
      buttonText="Add garment"
      setCardData={setCardData}
      setCards={setCards}
      cards={cards}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
    >
      <label htmlFor="name-input" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name-input"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="modal__input-error" id="name-error"></span>
      </label>
      <label htmlFor="image-input" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="image-input"
          placeholder="Image URL"
          required
        />
        <span className="modal__input-error" id="image-error"></span>
      </label>
      Select the weather type:
      <ul className="modal__list">
        <li className="temp-options">
          {options.map((opt) => (
            <label
              key={opt}
              className={`temp-label ${selected === opt ? "checked" : ""}`}
            >
              <input
                type="radio"
                name="temperature"
                value={opt}
                checked={selected === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </li>
      </ul>
    </ModalWithForm>
  );
};

export default AddItemModal;
