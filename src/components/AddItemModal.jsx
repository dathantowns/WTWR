import ModalWithForm from "./ModalWithForm/ModalWithForm";

const AddItemModal = ({
  closeModal,
  seeModal,
  selected,
  weather,
  setCardData,
  setSelected,
  setSeePreview,
  setCards,
  cards,
  items,
  setItems,
  options,
  handleChange,
}) => {
  return (
    <>
      <ModalWithForm
        closeModal={closeModal}
        seeModal={seeModal}
        selected={selected}
        title="Add garment"
        name="modal__form"
        buttonText="Add garment"
        weather={weather}
        setCardData={setCardData}
        setSelected={setSelected}
        setSeePreview={setSeePreview}
        setCards={setCards}
        cards={cards}
        items={items}
        setItems={setItems}
        handleChange={handleChange}
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
    </>
  );
};

export default AddItemModal;
