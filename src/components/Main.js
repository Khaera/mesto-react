import React from 'react';


function handleEditAvatarClick() {
  const avatarPopup = document.querySelector('.popup_type_edit-avatar');
  avatarPopup.classList.add('popup_opened');
}

function handleEditProfileClick() {
  const editPopup = document.querySelector('.popup_type_profile');
  editPopup.classList.add('popup_opened');
}

function handleAddPlaceClick() {
  const placePopup = document.querySelector('.popup_type_card-add');
  placePopup.classList.add('popup_opened');
}


function Main() {
  return (
    <main>

      <section className="profile">
        <div className="profile__avatar-container" onClick={handleEditAvatarClick}>
          <img src="" alt="Аватар профиля" className="profile__avatar" />
          <img src="" alt="Редактировать аватар" className="profile__avatar-edit" />
        </div>
        <div className="profile__content">
          <div className="profile__info">
            <h1 className="profile__name">Жак-Ив Кусто</h1>
            <button type="button" className="profile__edit-button" onClick={handleEditProfileClick}></button>
          </div>
          <p className="profile__career">Исследователь океана</p>
        </div>
        <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">

        </ul>
      </section>

      <div className="popup popup_type_profile">
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form name="edit-info" className="popup__form popup__form_edit_profile" novalidate>
            <label className="popup__field">
              <input value="" id="name-input" name="name" type="text" className="popup__input popup__input_edit_name" minlength="2" maxlength="40" required placeholder="Ваше имя" />
              <span className="popup__input-error"></span>
            </label>
            <label className="popup__field">
              <input value="" id="career-input" name="career" type="text" className="popup__input popup__input_edit_career" minlength="2" maxlength="200" required placeholder="Род деятельности" />
              <span className="popup__input-error"></span>
            </label>
            <button type="submit" className="popup__save-button">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_card-add">
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <h2 className="popup__title">Новое место</h2>
          <form name="add-card" className="popup__form popup__form_add_card">
            <label className="popup__field">
              <input value="" id="place-input" name="place" type="text" className="popup__input popup__input_edit_place" minlength="2" maxlength="30" required placeholder="Название" />
              <span className="popup__input-error"></span>
            </label>
            <label className="popup__field">
              <input value="" id="url-input" name="link" type="url" className="popup__input popup__input_edit_link" required placeholder="Ссылка на картинку" />
              <span className="popup__input-error"></span>
            </label>
            <button type="submit" className="popup__save-button">Создать</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_picture">
        <div className="popup__zoom">
          <img className="popup__image" src="/" alt="" />
          <p className="popup__caption"></p>
          <button type="button" className="popup__close-button"></button>
        </div>
      </div>

      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="submit" className="popup__save-button">Да</button>
        </div>
      </div>

      <div className="popup popup_type_edit-avatar">
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <form name="edit-avatar" className="popup__form popup__form_edit_avatar">
            <label className="popup__field">
              <input value="" name="avatar" type="url" className="popup__input popup__input_edit_avatar" required placeholder="Ссылка на картинку" />
              <span className="popup__input-error"></span>
            </label>
            <button type="submit" className="popup__save-button">Сохранить</button>
          </form>
        </div>
      </div>

    </main>
  );

}

export default Main;
