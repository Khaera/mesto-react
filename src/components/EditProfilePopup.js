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

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return(
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      submitButtonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
        <label className="popup__field">
          <input value={name || ''}
          onChange={handleNameChange}
          id="name-input"
          name="name"
          type="text"
          className="popup__input popup__input_edit_name"
          minLength="2"
          maxLength="40"
          required
          placeholder="Ваше имя" />
          <span className="popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input
          onChange={handleDescriptionChange}
          value={description || ''}
          id="career-input"
          name="career"
          type="text"
          className="popup__input popup__input_edit_career"
          minLength="2"
          maxLength="200"
          required
          placeholder="Род деятельности" />
          <span className="popup__input-error"></span>
        </label>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
