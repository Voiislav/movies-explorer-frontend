import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // имитируем задержку загрузки, чтобы протестировать прелоадер

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header authorized={true} />
      <main>
      <SearchForm />
      <FilterCheckbox />
      {isLoading ? <Preloader /> : <MoviesCardList numberOfCards={16} />}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
