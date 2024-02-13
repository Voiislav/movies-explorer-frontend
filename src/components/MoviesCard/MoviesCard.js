import React from 'react';
import './MoviesCard.css';
import heartIcon from '../../images/heart-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';
import { useLocation } from 'react-router-dom';

function MoviesCard() {
  const location = useLocation();
  const isSavedMoviesRoute = location.pathname === '/saved-movies';
  const movieButton = isSavedMoviesRoute ? (
    <button className='movie__button movie__button_delete' type='button' aria-label='Удалить'>
      <img className='movie__delete-icon' src={deleteIcon} alt='иконка крестика' />
    </button>
  ) : (
    <button className='movie__button' type='button' aria-label='Сохранить'>
      <img className='movie__save-icon' src={heartIcon} alt='иконка сердечка' />
    </button>
  );

  return (
    <figure className='movie'>
      <img className='movie__image' src='' alt='Кадр из фильма ...' />
      <figcaption className='movie__caption'>
        <h2 className='movie__title'></h2>
        {movieButton}
      </figcaption>
      <p className='movie__time'></p>
    </figure>
  );
};

export default MoviesCard;
