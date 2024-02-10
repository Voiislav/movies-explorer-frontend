import './SearchForm.css';

function SearchForm() {
  return (
    <form className='search'>
      <input className='search__input' placeholder='Фильм'></input>
      <button type="submit" aria-label="Искать фильм" className='search__submit'>Найти</button>
    </form>
  );
};

export default SearchForm;