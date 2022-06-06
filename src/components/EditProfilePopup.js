import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup( {
  isOpen,
  onClose,
  onUpdateUser,
  isLoading} ) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const [inputNameError, setInputNameError] = useState({
    isValid: true,
    errorMessage: ''
  });

  const [inputDescriptionError, setInputDescriptionError] = useState({
    isValid: true,
    errorMessage: ''
  });

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    setInputNameError({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage
    });
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    setInputDescriptionError({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  const isValid = inputNameError.isValid && inputDescriptionError.isValid ? true : false;


  const spanNameErrorClassName = `popup__input-error ${!inputNameError.isValid ? 'popup__input-error_active' : ''}`;
  const inputNameErrorClassName = `popup__input ${inputNameError.errorMessage ? 'popup__input_invalid' : ''}`;
  const spanDescriptionErrorClassName = `popup__input-error ${!inputDescriptionError.isValid ? 'popup__input-error_active' : ''}`;
  const inputDescriptionErrorClassName = `popup__input ${inputDescriptionError.errorMessage ? 'popup__input_invalid' : ''}`;

  return(
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      submitButtonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}>
        <label className="popup__field">
          <input
          value={name || ''}
          onChange={handleNameChange}
          id="name-input"
          name="name"
          type="text"
          className={inputNameErrorClassName}
          minLength="2"
          maxLength="40"
          required
          placeholder="Ваше имя" />
          <span className={spanNameErrorClassName}>{inputNameError.errorMessage}</span>
        </label>
        <label className="popup__field">
          <input
          value={description || ''}
          onChange={handleDescriptionChange}
          id="about-input"
          name="about"
          type="text"
          className={inputDescriptionErrorClassName}
          minLength="2"
          maxLength="200"
          required
          placeholder="Род деятельности" />
          <span className={spanDescriptionErrorClassName}>{inputDescriptionError.errorMessage}</span>
        </label>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
