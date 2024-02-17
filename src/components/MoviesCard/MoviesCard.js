import { useState } from 'react';
import './MoviesCard.css';
import heartIcon from '../../images/heart-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';
import heartIconClicked from '../../images/heart-icon-clicked.svg';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';

function MoviesCard({ name, duration, image, trailerLink, movieId }) {
  const location = useLocation();
  const isSavedMoviesRoute = location.pathname === '/saved-movies';

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  }

  const handleSave = (movieData) => {
    mainApi.saveMovie(movieData)
    .then((savedMovie) => {
      console.log(savedMovie);
      toggleLike();
      setIsSaved(true);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  const handleDelete = () => {
    mainApi.deleteMovie(movieId)
    .then((deletedMovie) => {
      console.log(deletedMovie);
      toggleLike();
      setIsSaved(false);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  const movieButton = isSavedMoviesRoute ? (
    <button className='movie__button movie__button_delete' type='button' aria-label='Удалить' onClick={() => handleDelete(movieId)}>
      <img className='movie__delete-icon' src={deleteIcon} alt='иконка крестика' />
    </button>
  ) : (
    <button className='movie__button' type='button' aria-label='Сохранить' onClick={isSaved ? () => handleDelete(movieId) : handleSave}>
      {isLiked ? (
        <img src={heartIconClicked} alt='иконка сердечка' />
      ) : (
        <img src={heartIcon} alt='иконка сердечка' />
      )}
    </button>
  );

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const imageUrl = `https://api.nomoreparties.co/${image.url}`;

  const moveToTrailer = () => {
    window.open(trailerLink, '_blank');
  }

  return (
    <figure className='movie'>
      <button className='movie__trailer-button' onClick={moveToTrailer}><img className='movie__image' src={imageUrl} alt={"Кадр из фильма " + name} width={image.width} height={image.height} /></button>
      <figcaption className='movie__caption'>
        <h2 className='movie__title'>{name}</h2>
        {movieButton}
      </figcaption>
      <p className='movie__time'>{hours}ч{minutes}мин</p>
    </figure>
  );
};

export default MoviesCard;
