import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import { useEffect, useState } from 'react';

function SavedMovies({ isAuth }) {
  const [movies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    mainApi.getSavedMovies()
      .then((moviesData) => {
        setSavedMovies(moviesData);
        console.log(moviesData)
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage('Сохраненные фильмы не найдены.');
        console.error(error);
      });
  }, []);

  useEffect(() => {
    mainApi.getUserData()
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Фильтрация фильмов по владельцу
  const filteredMovies = movies.filter(movie => movie.owner === userData.id);

  return (
    <>
      <Header authorized={isAuth} />
      <main className='saved-main'>
        <SearchForm />
        <FilterCheckbox />
        {isLoading ? (
          <Preloader />
        ) : errorMessage ? (
          <p className='saved-main__error'>{errorMessage}</p>
        ) : (
          <MoviesCardList movies={filteredMovies} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

