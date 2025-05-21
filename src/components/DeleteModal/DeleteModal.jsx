import "./DeleteModal.css";
import React from "react";
import { deleteApiItem } from "../../utils/api";
import { useModal } from "../../contexts/modalContext";

export const DeleteModal = React.memo(
  ({ seeDelete, closeDeleteModal, items, setItems, closeModal }) => {
    const { selectedItem } = useModal();
    const [name, url, id] = selectedItem;

    const handleDeleteSubmit = () => {
      deleteApiItem(id)
        .then(() => {
          const newArr = items.filter((obj) => obj._id !== id);
          setItems(newArr);
          closeModal();
          closeDeleteModal();
        })
        .catch((err) => {
          if (err === "Error: 404") {
            const newArr = items.filter((obj) => obj._id !== id);
            setItems(newArr);
            closeModal();
            closeDeleteModal();
          }
        });
    };

    return (
      <div
        className={
          seeDelete == true
            ? "delete-modal delete-modal_opened"
            : "delete-modal"
        }
        id="delete-modal "
        onClick={closeDeleteModal}
      >
        <div
          className="delete-modal__content delete-modal__content_delete"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="delete-modal__container">
            <div className="delete-modal__text">
              <p className="delete-modal__question">
                Are you sure you want to delete this item?
              </p>
              <p className="delete-modal__question">
                This action is irreversible.
              </p>
              <div className="delete-modal__options">
                <p
                  className="delete-modal__delete"
                  onClick={handleDeleteSubmit}
                >
                  Yes, delete item
                </p>
                <p className="delete-modal__cancel" onClick={closeDeleteModal}>
                  Cancel
                </p>
              </div>
            </div>
          </div>
          <button
            className="delete-modal__close-btn"
            onClick={closeDeleteModal}
          ></button>
        </div>
      </div>
    );
  }
);
