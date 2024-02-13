import './SearchForm.css';
import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form className='search' onSubmit={handleSubmit}>
      <input
        type='text'
        minLength={1}
        className='search__input'
        placeholder='Фильм'
        value={searchQuery}
        onChange={handleChange}
        required>
      </input>
      <button type="submit" aria-label="Искать фильм" className='search__submit'>Найти</button>
    </form>
  );
};

export default SearchForm;