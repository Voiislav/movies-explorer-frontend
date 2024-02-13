import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  const location = useLocation();
  const isMoviesRoute = location.pathname === '/movies';

  return (
    <section className='movies'>
      <ul className='movies__list'>
      {movies.map((movie, movieId) => (
            <MoviesCard
              movie={movie}
              key={movieId}
            />
          ))}
      </ul>
      {isMoviesRoute && (
        <button className='movies__more' type='button' aria-label='Загрузить еще'>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;