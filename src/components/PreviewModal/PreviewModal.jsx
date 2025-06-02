import "./PreviewModal.css";
import { useModal } from "../../contexts/modalContext";

export default function PreviewModal({
  openDeleteModal,
  seePreview,
  selected,
  closeModal,
}) {
  const { selectedItem } = useModal();

  const [name, url, , weather] = selectedItem ?? ["", ""];
  if (!seePreview) return null;
  return (
    <div
      className={seePreview ? "item-modal modal_opened" : "item-modal"}
      id="preview-modal"
      onClick={closeModal}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <img src={url} alt="pic" className="modal__img" />
        <button
          className="modal__close-btn_preview"
          type="button"
          onClick={closeModal}
        ></button>
        <div className="modal__row">
          <p className="modal__text">{name}</p>
          <p className="modal__delete" onClick={openDeleteModal}>
            Delete item
          </p>
        </div>
        <p className="modal__text">Weather: {weather}</p>
      </div>
    </div>
  );
}
