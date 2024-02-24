import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import mainApi from '../../utils/MainApi';

function MoviesCardList({ movies, onDeleteMovie }) {
  const location = useLocation();
  const isMoviesRoute = location.pathname === '/movies';
  const isSavedMoviesRoute = location.pathname === '/saved-movies';


  const calculateVisibleCards = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 16;
    } else if (screenWidth >= 768) {
      return 8;
    } else {
      return 5;
    }
  };


  const [visibleCards, setVisibleCards] = useState(calculateVisibleCards());
  const [savedMovies, setSavedMovies] = useState([]);


  useEffect(() => {
      mainApi.getSavedMovies(localStorage.getItem('token'))
        .then((savedMovies) => {
          setSavedMovies(savedMovies);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);


  const handleLoadMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + (window.innerWidth <= 768 ? 2 : 4));
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(calculateVisibleCards());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className='movies'>
      <ul className='movies__list'>
        {movies.slice(0, visibleCards).map((movie) => (
          <MoviesCard
            key={isMoviesRoute ? movie.id : movie._id}
            movie={movie}
            image={movie.image}
            onDeleteMovie={onDeleteMovie}
            isSaved={savedMovies.some(savedMovie => savedMovie.nameRU === movie.nameRU)}
          />
        ))}
      </ul>
      {visibleCards < movies.length && (
        <button className='movies__more' type='button' aria-label='Загрузить еще' onClick={handleLoadMore}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
