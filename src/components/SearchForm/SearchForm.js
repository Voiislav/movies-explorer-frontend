import './SearchForm.css';

function SearchForm() {
  return (
    <form className='search'>
      <input type='text' minLength={1} className='search__input' placeholder='Фильм' required></input>
      <button type="submit" aria-label="Искать фильм" className='search__submit'>Найти</button>
    </form>
  );
};

export default SearchForm;