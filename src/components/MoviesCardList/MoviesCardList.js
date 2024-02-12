import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ numberOfCards }) {
  const location = useLocation();
  const isMoviesRoute = location.pathname === '/movies';
  const cardNumbers = Array.from({ length: numberOfCards }, (_, index) => index + 1);

  return (
    <section className='movies'>
      <ul className='movies__list'>
        {cardNumbers.map(cardNumber => (
          <li key={cardNumber}>
            <MoviesCard />
          </li>
        ))}
      </ul>
      {isMoviesRoute && (
        <button className='movies__more' type='button' aria-label='Загрузить еще'>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;