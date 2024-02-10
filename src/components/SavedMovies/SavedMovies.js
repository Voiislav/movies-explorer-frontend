import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <>
      <Header
      authorized={true} />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList numberOfCards={3} />
      <Footer />
    </>
  );
};

export default SavedMovies;