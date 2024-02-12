import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <form className="filter">
      <label htmlFor="filter" className='filter__label'>Короткометражки</label>
      <input type="checkbox" id="filter" name="filter" className='filter__checkbox'></input>
    </form>
  );
};

export default FilterCheckbox;