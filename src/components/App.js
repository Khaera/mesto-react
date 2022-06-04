import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {
  //стейт переменные попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''});
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

  function handleDeleteClick(card) {
    setIsConfirmDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser( {name, about} ) {
    api.editUserInfo( {name, about} )
    .then((newData) => {
      setCurrentUser(newData);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({avatar}) {
    api.editProfileAvatar({avatar})
    .then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch((err) => console.log(err));;
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
    .catch((err) => console.log(err));;
  }

  function handleAddPlaceSubmit( {name, link} ) {
    api.addNewCard( {name, link} )
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }


  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
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
        onDeleteClick={handleDeleteClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isImagePopupOpen}/>

      <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
      />

      <DeleteCardPopup
      card={selectedCard}
      isOpen={isConfirmDeleteCardPopupOpen}
      onClose={closeAllPopups}
      onDeleteCard={handleCardDelete}
      />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
