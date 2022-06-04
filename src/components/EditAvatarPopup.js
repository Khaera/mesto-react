import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup( {
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading} ) {
  const avatarRef = React.useRef('');

  const [inputError, setInputError] = useState({
    errorMessage: '',
    isValid: false
  })

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    setInputError({
        isValid: false,
        errorMessage: ''
      })
    avatarRef.current.value = '';
  }

  function handleChange(e) {
    setInputError({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage
    });
  }

  return(
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitButtonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={inputError.isValid}>
      <label className="popup__field">
        <input onChange={handleChange} ref={avatarRef} name="avatar" type="url" className="popup__input popup__input_edit_avatar" required placeholder="Ссылка на картинку" />
        <span className={!inputError.isValid ? 'popup__input-error popup__input-error_active' : 'popup__input-error'}>{inputError.errorMessage}</span>
      </label>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
