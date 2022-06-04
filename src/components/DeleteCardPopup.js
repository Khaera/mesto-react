import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup( {card, isOpen, onClose, onDeleteCard} ) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }
  return(
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      submitButtonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
