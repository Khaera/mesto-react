import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";

function AddPlacePopup( {isOpen, onClose, onAddPlace, isLoading} ) {
  const placeRef = React.useRef('');
  const linkRef = React.useRef('');

  const [inputPlaceError, setInputPlaceError] = useState({
    isValid: false,
    errorMessage: ''
  });

  const [inputLinkError, setInputLinkError] = useState({
    isValid: false,
    errorMessage: ''
  });

  function handlePlaceChange(e) {
    setInputPlaceError({
      isValid: placeRef.current.validity.valid,
      errorMessage: placeRef.current.validationMessage
    });
  }

  function handleLinkChange(e) {
    setInputLinkError({
      isValid: linkRef.current.validity.valid,
      errorMessage: linkRef.current.validationMessage
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeRef.current.value,
      link: linkRef.current.value
    });

    setInputPlaceError({
      isValid: false,
      errorMessage: ''
    });

    setInputLinkError({
      isValid: false,
      errorMessage: ''
    });

    placeRef.current.value = '';
    linkRef.current.value = '';
  }

  const isValid = inputPlaceError.isValid && inputLinkError.isValid ? true : false;

  const spanPlaceErrorClassName = `popup__input-error ${!inputPlaceError.isValid ? 'popup__input-error_active' : ''}`;
  const inputPlaceErrorClassName = `popup__input popup__input_edit_place ${inputPlaceError.errorMessage ? 'popup__input_invalid' : ''}`;
  const spanLinkErrorClassName = `popup__input-error ${!inputLinkError.isValid ? 'popup__input-error_active' : ''}`;
  const inputLinkErrorClassName = `popup__input popup__input_edit_link ${inputLinkError.errorMessage ? 'popup__input_invalid' : ''}`;


  return(
    <PopupWithForm
      name="card-add"
      title="Новое место"
      submitButtonText={isLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      >
      <label className="popup__field">
        <input
        onChange={handlePlaceChange}
        ref={placeRef}
        id="place-input"
        name="place" type="text"
        className={inputPlaceErrorClassName}
        minLength="2"
        maxLength="30"
        required
        placeholder="Название" />
        <span className={spanPlaceErrorClassName}>{inputPlaceError.errorMessage}</span>
      </label>
      <label className="popup__field">
        <input
        onChange={handleLinkChange}
        ref={linkRef}
        id="url-input"
        name="link"
        type="url"
        className={inputLinkErrorClassName}
        required
        placeholder="Ссылка на картинку" />
        <span className={spanLinkErrorClassName}>{inputLinkError.errorMessage}</span>
      </label>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
