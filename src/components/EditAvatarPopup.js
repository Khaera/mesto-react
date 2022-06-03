import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup( {
  isOpen,
  onClose,
  onUpdateAvatar} ) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return(
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input ref={avatarRef} name="avatar" type="url" className="popup__input popup__input_edit_avatar" required placeholder="Ссылка на картинку" />
        <span className="popup__input-error"></span>
      </label>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
