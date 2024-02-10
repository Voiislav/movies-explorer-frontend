import './Portfolio.css';
import arrowIcon from '../../images/arrow.svg'

function Portfolio() {
  return (
    <section className="portfolio">
    <h2 className="portfolio__title">Портфолио</h2>
    <ul className="portfolio__links">
      <li className='portfolio__link-container'><a className="portfolio__link" href="https://github.com/Voiislav/how-to-learn" target="_blank" rel="noopener noreferrer">Статичный сайт</a></li>
      <li className='portfolio__link-container'><a href="https://github.com/Voiislav/how-to-learn" target="_blank" rel="noopener noreferrer"><img className="portfolio__arrow" alt="стрелка" src={arrowIcon}></img></a></li>
      <li className='portfolio__link-container'><a className="portfolio__link" href="https://voiislav.github.io/russian-travel/index.html" target="_blank" rel="noopener noreferrer">Адаптивный сайт</a></li>
      <li className='portfolio__link-container'><a href="https://voiislav.github.io/russian-travel/index.html" target="_blank" rel="noopener noreferrer"><img className="portfolio__arrow" alt="стрелка" src={arrowIcon}></img></a></li>
      <li><a className="portfolio__link portfolio__link_type_last" href="https://voiislav.github.io/react-mesto-auth/" target="_blank" rel="noopener noreferrer">Одностраничное приложение</a></li>
      <li><a href="https://voiislav.github.io/react-mesto-auth/" target="_blank" rel="noopener noreferrer"><img className="portfolio__arrow" alt="стрелка" src={arrowIcon}></img></a></li>
    </ul>
    </section>
  );
};

export default Portfolio;