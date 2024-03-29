import './SavedMovies.css';
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
      <main className='saved-main'>
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList numberOfCards={3} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;