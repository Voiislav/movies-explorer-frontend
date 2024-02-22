import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import { useEffect, useState } from 'react';

function SavedMovies() {
  const [movies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <>
      <Header authorized={true} />
      <main className='saved-main'>
        <SearchForm />
        <FilterCheckbox />
        {isLoading ? (
          <Preloader />
        ) : errorMessage ? (
          <p className='saved-main__error'>{errorMessage}</p>
        ) : (
          <MoviesCardList movies={movies} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
