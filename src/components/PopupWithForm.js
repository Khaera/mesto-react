import React from "react";
function PopupWithForm({name,
  isOpen,
  onClose,
  title,
  children,
  submitButtonText}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
      <button type="button" className="popup__close-button" onClick={onClose}></button>
      <h2 className="popup__title">{title}</h2>
      <form name={name} className="popup__form popup__form_edit_profile">
        {children}
      <button type="submit" className="popup__save-button">{submitButtonText}</button>
      </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
