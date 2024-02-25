import './SearchForm.css';
import { useState } from 'react';

function SearchForm({ onSearch, searchQuery, isSearching }) {
  const [searchValue, setSearchValue] = useState(searchQuery || '');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form className='search' onSubmit={handleSubmit}>
      <input
        type='text'
        minLength={1}
        className='search__input'
        placeholder='Фильм'
        value={searchValue}
        onChange={handleChange}
        required
      />
      <button type="submit" aria-label="Искать фильм" className={`search__submit ${isSearching ? 'search__submit_disabled' : ''}`} disabled={isSearching}>Найти</button>
    </form>
  );
};

export default SearchForm;