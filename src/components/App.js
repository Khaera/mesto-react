import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  //стейт переменные попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: ''});
  const [currentUser, setCurrentUser] = useState( {} );
  const [cards, setCards] = useState( [] );

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsConfirmDeleteCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likeToggle = !isLiked ? api.likeCard(card._id) : api.deleteLike(card._id);

    likeToggle.then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  });

  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeleteCardPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onDeleteCard={handleDeleteCardClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      onClose={closeAllPopups}
      isOpen={isEditProfilePopupOpen}>
        <label className="popup__field">
          <input id="name-input" name="name" type="text" className="popup__input popup__input_edit_name" minLength="2" maxLength="40" required placeholder="Ваше имя" />
          <span className="popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input id="career-input" name="career" type="text" className="popup__input popup__input_edit_career" minLength="2" maxLength="200" required placeholder="Род деятельности" />
          <span className="popup__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
      name="card-add"
      title="Новое место"
      submitButtonText="Создать"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}>
      <label className="popup__field">
        <input id="place-input" name="place" type="text" className="popup__input popup__input_edit_place" minLength="2" maxLength="30" required placeholder="Название" />
        <span className="popup__input-error"></span>
      </label>
      <label className="popup__field">
        <input id="url-input" name="link" type="url" className="popup__input popup__input_edit_link" required placeholder="Ссылка на картинку" />
        <span className="popup__input-error"></span>
      </label>
      </PopupWithForm>

      <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitButtonText="Сохранить"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}>
      <label className="popup__field">
        <input name="avatar" type="url" className="popup__input popup__input_edit_avatar" required placeholder="Ссылка на картинку" />
        <span className="popup__input-error"></span>
      </label>
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        submitButtonText="Да"
        isOpen={isConfirmDeleteCardPopupOpen}
        onClose={closeAllPopups}>
      </PopupWithForm>

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
