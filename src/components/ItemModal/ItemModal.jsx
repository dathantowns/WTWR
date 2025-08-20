import "./ItemModal.css";
import { useModal } from "../../contexts/modalContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function ItemModal({
  openDeleteModal,
  seePreview,
  selected,
  closeModal,
}) {
  const { selectedItem } = useModal();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const { owner, url, name, weather } = selectedItem;
  if (!seePreview) return null;

  const isOwn = owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete ${
    isOwn ? "" : "modal__delete_hidden"
  }`;

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
          <p className={itemDeleteButtonClassName} onClick={openDeleteModal}>
            Delete item
          </p>
        </div>
        <p className="modal__text">Weather: {weather}</p>
      </div>
    </div>
  );
}
