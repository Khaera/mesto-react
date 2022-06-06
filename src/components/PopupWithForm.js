import React from "react";
function PopupWithForm({name,
  isOpen,
  onClose,
  title,
  children,
  submitButtonText,
  onSubmit,
  isValid
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
      <button type="button" className="popup__close-button" onClick={onClose}></button>
      <h2 className="popup__title">{title}</h2>
      <form onSubmit={onSubmit} name={name} className="popup__form">
        {children}
      <button disabled={!isValid ? true : false} type="submit" className={!isValid ? "popup__save-button popup__save-button_disabled" : "popup__save-button"}>{submitButtonText}</button>
      </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
