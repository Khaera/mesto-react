import React, { useEffect, useState} from 'react';
import api from '../utils/Api'
import Card from '../components/Card';
import editImage from '../images/edit-button.svg';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onDeleteCard,
  onCardClick})
  {
  const [userInfo, setCurrentUserInfo] = useState({});
  const [cards, setCards] = useState([]);
  const { name, about, avatar } = userInfo;

  //получаем данные от сервера через хук
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUserInfo(userData);
        setCards(initialCards);
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img src={avatar} alt="Аватар профиля" className="profile__avatar" />
          <img src={editImage} alt="Редактировать аватар" className="profile__avatar-edit" />
        </div>
        <div className="profile__content">
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__career">{about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((item) => (
            <Card
            key={item._id}
            card={item}
            onDeleteCard={onDeleteCard}
            onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );

}

export default Main;
