import { useState, useEffect } from 'react';
import './MoviesCard.css';
import heartIcon from '../../images/heart-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';
import heartIconClicked from '../../images/heart-icon-clicked.svg';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';

function MoviesCard({ movie, onDeleteMovie }) {
  const location = useLocation();
  const isSavedMoviesRoute = location.pathname === '/saved-movies';

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSavedMoviesRoute) {
      setIsLiked(true);
      setIsSaved(true);
    } else {
      setIsLiked(false);
      setIsSaved(false);
    }
  }, [isSavedMoviesRoute]);

  const toggleLike = () => {
    setIsSaved(!isSaved);
  }


  const handleSave = () => {
    mainApi.getSavedMovies()
    .then((moviesData) => {
      const savedMovie = moviesData.find(saved => saved.nameRU === movie.nameRU);
      if(savedMovie) {
        mainApi.deleteMovie(savedMovie._id)
        .then((deletedMovie) => {
          console.log(deletedMovie);
          toggleLike();
        })
        .catch((error) => {
          console.error(error);
        })
      } else {
        mainApi.saveMovie(movie)
        .then((savedMovie) => {
          console.log(savedMovie);
          toggleLike();
        })
        .catch((error) => {
          console.error(error)
        })
      }
    })
    .catch((error) => {
      console.error(error)
    })
  }
  

  const handleDelete = () => {
    mainApi.deleteMovie(movie._id)
    .then((deletedMovie) => {
      console.log(deletedMovie);
      toggleLike();
      setIsSaved(false);
      onDeleteMovie(movie._id);
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
      {isSaved ? (
        <img src={heartIconClicked} alt='иконка сердечка' />
      ) : (
        <img src={heartIcon} alt='иконка сердечка' />
      )}
    </button>
  );

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  const imageUrl = `https://api.nomoreparties.co/${movie.image.url}`;
  const savedImageUrl = movie.image;

  const moveToTrailer = () => {
    window.open(movie.trailerLink, '_blank');
  }

  const imageSrc = isSavedMoviesRoute ? savedImageUrl : imageUrl;

  return (
    <figure className='movie'>
      <button className='movie__trailer-button' onClick={moveToTrailer}><img className='movie__image' src={imageSrc} alt={"Кадр из фильма " + movie.nameRU} width={movie.image.width} height={movie.image.height} /></button>
      <figcaption className='movie__caption'>
        <h2 className='movie__title'>{movie.nameRU}</h2>
        {movieButton}
      </figcaption>
      <p className='movie__time'>{hours}ч{minutes}мин</p>
    </figure>
  );
};

export default MoviesCard;

