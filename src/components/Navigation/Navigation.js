import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ isMobileMenu }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const isCurrentRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <nav>
      <ul className={`header__nav-links ${isMobileMenu ? 'header__nav-links_mobile' : ''}`}>
        <li>
          <Link
            to="/movies"
            className={`${isHomePage ? 'header__nav-link' : 'header__nav-link header__nav-link_black'} ${isMobileMenu ? 'header__nav-link_mobile' : ''} ${isMobileMenu && isCurrentRoute('/movies') ? 'header__nav-link_mobile_disabled' : ''}`}
            disabled={isMobileMenu && isCurrentRoute('/movies')}
          >
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            to="/saved-movies"
            className={`${isHomePage ? 'header__nav-link' : 'header__nav-link header__nav-link_black'} ${isMobileMenu ? 'header__nav-link_mobile' : ''} ${isMobileMenu && isCurrentRoute('/saved-movies') ? 'header__nav-link_mobile_disabled' : ''}`}
            disabled={isMobileMenu && isCurrentRoute('/saved-movies')}
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;