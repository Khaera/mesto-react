import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup( {
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading} ) {
  const avatarRef = React.useRef('');

  const [inputAvatarError, setInputAvatarError] = useState({
    errorMessage: '',
    isValid: false
  })

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    setInputAvatarError({
      isValid: false,
      errorMessage: ''
    });
    avatarRef.current.value = '';
  }

  function handleChange(e) {
    setInputAvatarError({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage
    });
  }

  const spanAvatarErrorClassName = `popup__input-error ${!inputAvatarError.isValid ? 'popup__input-error_active' : ''}`;
  const inputAvatarErrorClassName = `popup__input popup__input_edit_avatar ${inputAvatarError.errorMessage ? 'popup__input_invalid' : ''}`;

  return(
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitButtonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={inputAvatarError.isValid}>
      <label className="popup__field">
        <input
        onChange={handleChange}
        ref={avatarRef}
        name="avatar"
        type="url"
        className={inputAvatarErrorClassName}
        required
        placeholder="Ссылка на картинку" />
        <span className={spanAvatarErrorClassName}>{inputAvatarError.errorMessage}</span>
      </label>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
