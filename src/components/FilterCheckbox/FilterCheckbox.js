import './FilterCheckbox.css';
import { useState, useEffect } from 'react';

function FilterCheckbox({ onCheckboxChange, isSearching }) {
  const [isChecked, setIsChecked] = useState(localStorage.getItem('isShortFilmChecked') === 'true' ? true : false);

  useEffect(() => {
    localStorage.setItem('isShortFilmChecked', isChecked.toString());
  }, [isChecked]);

  const handleCheckboxChange = (evt) => {
    const isChecked = evt.target.checked;
    setIsChecked(isChecked);
    onCheckboxChange(isChecked);
  };

  return (
    <form className="filter">
      <label htmlFor="filter" className='filter__label'>Короткометражки</label>
      <input type="checkbox" id="filter" name="filter" className={`filter__checkbox ${isChecked ? 'filter__checkbox--checked' : ''}`} checked={isChecked} onChange={handleCheckboxChange} disabled={isSearching}></input>
    </form>
  );
};

export default FilterCheckbox;