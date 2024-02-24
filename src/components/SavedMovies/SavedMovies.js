import { useState, useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';

function SavedMovies({ isAuth, currentUser }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialSavedMovies, setInitialSavedMovies] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser.id) { 
          console.log(currentUser.id)
          const moviesData = await mainApi.getSavedMovies();
          const userMovies = moviesData.filter(movie => movie.owner === currentUser.id);
          setSavedMovies(userMovies);
          setInitialSavedMovies(userMovies);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage('Сохраненные фильмы не найдены.');
        console.error(error);
      }
    };
    
    fetchData();
  }, [currentUser]);


  const handleSearch = (query, isShortFilmChecked) => {
    setIsLoading(false);
    let filteredMovies = initialSavedMovies.filter((movie) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();
      const search = query.toLowerCase();
      return nameRU.includes(search) || nameEN.includes(search);
    });

    if (isShortFilmChecked) {
      filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
    }

    setSavedMovies(filteredMovies);

    if (filteredMovies.length === 0) {
      setNotFoundMessage('Ничего не найдено');
    } else {
      setNotFoundMessage('');
    }
  };

  const handleCheckboxChange = (isChecked) => {
    setIsShortFilmChecked(isChecked);
    handleSearch(searchQuery, isChecked);
  };

  const handleSearchFormSubmit = (query) => {
    setSearchQuery(query);
    handleSearch(query, isShortFilmChecked);
  };

  const handleDeleteMovie = (movieId) => {
    setSavedMovies(savedMovies.filter(movie => movie._id !== movieId));
    setInitialSavedMovies(initialSavedMovies.filter(movie => movie._id !== movieId));
  };

  return (
    <>
      <Header authorized={isAuth} />
      <main className='saved-main'>
        <SearchForm onSearch={handleSearchFormSubmit} />
        <FilterCheckbox onCheckboxChange={handleCheckboxChange} />
        {isLoading ? (
          <Preloader />
        ) : errorMessage ? (
          <p className='saved-main__error'>{errorMessage}</p>
        ) : savedMovies.length === 0 ? (
          <p className='saved-main__error'>{notFoundMessage}</p>
        ) : (
          <MoviesCardList movies={[...savedMovies].reverse()} onDeleteMovie={handleDeleteMovie} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;



