import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox({ onCheckboxChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (evt) => {
    const isChecked = evt.target.checked;
    setIsChecked(isChecked);
    onCheckboxChange(isChecked);
  };

  return (
    <form className="filter">
      <label htmlFor="filter" className='filter__label'>Короткометражки</label>
      <input type="checkbox" id="filter" name="filter" className='filter__checkbox' checked={isChecked} onChange={handleCheckboxChange}></input>
    </form>
  );
};

export default FilterCheckbox;