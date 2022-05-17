import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <>
    <Header />
    <Main />
    <Footer />
  <template id="card-template">
      <li className="element">
        <img className="element__image" src="/" alt="" />
        <button type="button" className="element__delete-button"></button>
        <div className="element__info">
          <h2 className="element__title"></h2>
          <button type="button" className="element__like">
            <img src="<%=require('./images/like.svg')%>" alt="Кнопка Лайк" className="element__like-image" />
            <span className="element__like-count">0</span>
          </button>
        </div>
      </li>
  </template>

  </>
  );
}

export default App;
