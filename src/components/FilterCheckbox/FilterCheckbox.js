import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, onCheckboxChange, isSearching }) {

  const handleCheckboxChange = (evt) => {
    const isChecked = evt.target.checked;
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