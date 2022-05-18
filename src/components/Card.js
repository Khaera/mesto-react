import likeImage from '../images/like.svg';

function Card ( { card, onCardClick, onDeleteCard } ) {
  const {link, name, likes } = card;

  function handleClickCard() {
    onCardClick(card);
  }
  return (
    <li className="element">
    <img className="element__image" src={link} alt={name} onClick={handleClickCard}/>
    <button type="button" className="element__delete-button" onClick={onDeleteCard}></button>
    <div className="element__info">
      <h2 className="element__title">{name}</h2>
      <button type="button" className="element__like">
        <img src={likeImage} alt="Кнопка Лайк" className="element__like-image"/>
        <span className="element__like-count">{likes.length}</span>
      </button>
    </div>
  </li>
  )
}

export default Card;
