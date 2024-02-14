import { useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query, isShortFilmChecked) => {
    setIsLoading(true);
    moviesApi.getAllMovies()
      .then((moviesData) => {
        setIsLoading(false);
        let filteredMovies = moviesData.filter((movie) => {
          const nameRU = movie.nameRU.toLowerCase();
          const nameEN = movie.nameEN.toLowerCase();
          const search = query.toLowerCase();
          return nameRU.includes(search) || nameEN.includes(search);
        });
  
        if (isShortFilmChecked) {
          filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
        }
  
        setMovies(filteredMovies);
  
        if (filteredMovies.length === 0) {
          setNotFoundMessage('Ничего не найдено');
        } else {
          setNotFoundMessage('');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
        console.error(error);
      });
  };
  

  const handleCheckboxChange = (isShortFilmChecked) => {
    setIsShortFilmChecked(isShortFilmChecked);
    handleSearch(searchQuery, isShortFilmChecked);
  };

  const handleSearchFormSubmit = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <>
      <Header authorized={true} />
      <main className='movies-main'>
        <SearchForm onSearch={handleSearchFormSubmit} />
        <FilterCheckbox onCheckboxChange={handleCheckboxChange} />
        {isLoading ?
          <Preloader /> :
          (errorMessage ?
            <p className='movies-main__error'>{errorMessage}</p> :
            (notFoundMessage ?
              <p className='movies-main__error'>{notFoundMessage}</p> :
              <MoviesCardList movies={movies} />))}
      </main>
      <Footer />
    </>
  );
};

export default Movies;

