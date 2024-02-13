import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';

function Movies() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([])

  useEffect(() => {
    Promise.all([moviesApi.getAllMovies()])
    .then(([moviesData]) => {
      setIsLoading(false);
      setMovies(moviesData);
      console.log(moviesData);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

  return (
    <>
      <Header authorized={true} />
      <main className='movies-main'>
        <SearchForm />
        <FilterCheckbox />
        {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
