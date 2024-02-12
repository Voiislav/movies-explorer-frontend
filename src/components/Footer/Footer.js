import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <ul className="footer__info">
        <li className="footer__copywrite">&copy; 2024</li>
        <li className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/Voiislav/movies-explorer-frontend" target="_blank" rel="noopener noreferrer">Github</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;