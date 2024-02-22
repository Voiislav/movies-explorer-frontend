import { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';

function Movies({ isAuth }) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem('searchQuery');
    const storedIsShortFilmChecked = localStorage.getItem('isShortFilmChecked');
    const storedMovies = JSON.parse(localStorage.getItem('movies'));

    if (storedMovies && storedMovies.length > 0) {
      setMovies(storedMovies);
      if (storedSearchQuery) {
        setSearchQuery(storedSearchQuery);
      }
      if (storedIsShortFilmChecked !== null && storedIsShortFilmChecked === 'true') {
        setIsShortFilmChecked(true);
      }
    } else {
      setNotFoundMessage('');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('isShortFilmChecked', isShortFilmChecked.toString());

  }, [searchQuery, isShortFilmChecked, movies]);

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

        localStorage.setItem('movies', JSON.stringify(filteredMovies));

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


  const handleCheckboxChange = (isChecked) => {
    setIsShortFilmChecked(isChecked);
    if (searchQuery) {
      handleSearch(searchQuery, isChecked);
    }
  };

  const handleSearchFormSubmit = (query) => {
    setSearchQuery(query);
    handleSearch(query, isShortFilmChecked);
  };

  return (
    <>
      <Header authorized={isAuth} />
      <main className='movies-main'>
        <SearchForm onSearch={handleSearchFormSubmit} searchQuery={searchQuery} />
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

