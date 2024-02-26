import { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies({ isAuth }) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(localStorage.getItem('isShortFilmChecked') === 'true');
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    localStorage.setItem('isShortFilmChecked', isShortFilmChecked.toString());
  }, [isShortFilmChecked]);

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem('searchQuery');
    const storedMovies = JSON.parse(localStorage.getItem('movies'));

    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }

    if (storedMovies && storedMovies.length > 0) {
      setMovies(storedMovies);
      console.log(storedMovies)
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
    setIsSearching(true);
    moviesApi.getAllMovies()
      .then((moviesData) => {
        setIsLoading(false);
        setIsSearching(false);
        let filteredMovies = moviesData.filter((movie) => {
          const nameRU = movie.nameRU.toLowerCase();
          const nameEN = movie.nameEN.toLowerCase();
          const search = query.toLowerCase();
          return nameRU.includes(search) || nameEN.includes(search);
        });

        if (isShortFilmChecked) {
          filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
        }
        mainApi.getSavedMovies(localStorage.getItem('token'))
          .then((savedMovies) => {
            filteredMovies = filteredMovies.map(m => {
              const savedMovie = savedMovies.filter(sm => sm.nameRU === m.nameRU)[0]
              if (savedMovie) {
                m.isSaved = true
                m._id = savedMovie._id
              } else {
                m.isSaved = false
              }
              return m
            })
            setMovies(filteredMovies);
            localStorage.setItem('movies', JSON.stringify(filteredMovies));
          })
          .catch((error) => {
            console.error(error);
          });

        if (filteredMovies.length === 0) {
          setNotFoundMessage('Ничего не найдено');
        } else {
          setNotFoundMessage('');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsSearching(false);
        setErrorMessage(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
        console.error(error);
      });
  };

  const handleSaveMovie = (newMovie, isDeleteOperation) => {
    let cloneAllMovies = JSON.parse(JSON.stringify(movies));
    if (!isDeleteOperation) {
      console.log(newMovie);
      newMovie.isSaved = true;
    } else {
      newMovie.isSaved = false;
      console.log(newMovie);
    }
    cloneAllMovies = cloneAllMovies.map(m => m.nameRU === newMovie.nameRU ? newMovie : m);
    setMovies(cloneAllMovies);
    localStorage.setItem('movies', JSON.stringify(cloneAllMovies));
  }


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
        <SearchForm onSearch={handleSearchFormSubmit} searchQuery={searchQuery} isSearching={isSearching} />
        <FilterCheckbox isChecked={isShortFilmChecked} isSearching={isSearching} onCheckboxChange={handleCheckboxChange} />
        {isLoading ?
          <Preloader /> :
          (errorMessage ?
            <p className='movies-main__error'>{errorMessage}</p> :
            (notFoundMessage ?
              <p className='movies-main__error'>{notFoundMessage}</p> :
              <MoviesCardList movies={movies} handleSaveMovie={handleSaveMovie} />))}
      </main>
      <Footer />
    </>
  );
};

export default Movies;

