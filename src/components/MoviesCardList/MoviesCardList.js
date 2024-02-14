import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  const location = useLocation();
  const isMoviesRoute = location.pathname === '/movies';

  const [visibleCards, setVisibleCards] = useState(4);

  const handleLoadMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + (window.innerWidth <= 480 ? 2 : 4));
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(4);
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