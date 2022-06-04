import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup( {isOpen, onClose, onAddPlace} ) {
  const nameRef = React.useRef('');
  const linkRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    })
  }
  return(
    <PopupWithForm
      name="card-add"
      title="Новое место"
      submitButtonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <label className="popup__field">
        <input ref={nameRef} id="place-input" name="place" type="text" className="popup__input popup__input_edit_place" minLength="2" maxLength="30" required placeholder="Название" />
        <span className="popup__input-error"></span>
      </label>
      <label className="popup__field">
        <input ref={linkRef} id="url-input" name="link" type="url" className="popup__input popup__input_edit_link" required placeholder="Ссылка на картинку" />
        <span className="popup__input-error"></span>
      </label>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
