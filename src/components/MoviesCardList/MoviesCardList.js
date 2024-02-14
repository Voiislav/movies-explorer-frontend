import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  const location = useLocation();
  const isMoviesRoute = location.pathname === '/movies';

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
            key={movie.id}
            name={movie.nameRU}
            duration={movie.duration}
            image={movie.image}
            trailerLink={movie.trailerLink}
          />
        ))}
      </ul>
      {isMoviesRoute && visibleCards < movies.length && (
        <button className='movies__more' type='button' aria-label='Загрузить еще' onClick={handleLoadMore}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
