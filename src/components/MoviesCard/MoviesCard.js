import { useState, useEffect } from 'react';
import './MoviesCard.css';
import heartIcon from '../../images/heart-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';
import heartIconClicked from '../../images/heart-icon-clicked.svg';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';

function MoviesCard({ movie }) {
  const location = useLocation();
  const isSavedMoviesRoute = location.pathname === '/saved-movies';

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSavedMoviesRoute) {
      setIsLiked(true); // Если мы на странице сохраненных фильмов, то считаем фильм уже лайкнутым
      setIsSaved(true);
    } else {
      setIsLiked(false);
      setIsSaved(false);
    }
  }, [isSavedMoviesRoute]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  }

  const handleSave = () => {
    if (!isSaved) {
      mainApi.saveMovie(movie)
      .then((savedMovie) => {
        console.log(savedMovie);
        toggleLike();
        setIsLiked(true);
        setIsSaved(true);
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }

  const handleDelete = () => {
    mainApi.deleteMovie(movie.movieId)
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
    <button className='movie__button movie__button_delete' type='button' aria-label='Удалить' onClick={() => handleDelete(movie.movieId)}>
      <img className='movie__delete-icon' src={deleteIcon} alt='иконка крестика' />
    </button>
  ) : (
    <button className='movie__button' type='button' aria-label='Сохранить' onClick={handleSave}>
      {isLiked ? (
        <img src={heartIconClicked} alt='иконка сердечка' />
      ) : (
        <img src={heartIcon} alt='иконка сердечка' />
      )}
    </button>
  );

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  const imageUrl = `https://api.nomoreparties.co/${movie.image.url}`;

  const moveToTrailer = () => {
    window.open(movie.trailerLink, '_blank');
  }

  return (
    <figure className='movie'>
      <button className='movie__trailer-button' onClick={moveToTrailer}><img className='movie__image' src={imageUrl} alt={"Кадр из фильма " + movie.nameRU} width={movie.image.width} height={movie.image.height} /></button>
      <figcaption className='movie__caption'>
        <h2 className='movie__title'>{movie.nameRU}</h2>
        {movieButton}
      </figcaption>
      <p className='movie__time'>{hours}ч{minutes}мин</p>
    </figure>
  );
};

export default MoviesCard;

