import "./ItemModal.css";

export default function ItemModal({ seePreview, closeModal, data, weather }) {
  const [name, url] = data;

  return (
    <div
      className={seePreview ? "modal modal_opened" : "modal"}
      id="preview-modal"
      onClick={closeModal}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <img src={url} alt="pic" className="modal__img" />
        <button
          className="modal__close-btn modal__close-btn_preview"
          type="button"
          onClick={closeModal}
        ></button>
        <p className="modal__text">{name}</p>
        <p className="modal__text">Weather: {weather}</p>
      </div>
    </div>
  );
}
