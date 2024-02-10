import { useState, useEffect } from 'react';
import './Header.css';
import logo from "../../images/circle-logo.svg";
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import whiteBurgerIcon from '../../images/burger-icon-white.svg';
import blackBurgerIcon from '../../images/burger-icon-black.svg';
import MobileMenu from '../MobileMenu/MobileMenu';
import ProfileLink from '../AccountLink/ProfileLink';

function Header({ authorized }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isBlackBurger = !isHomePage;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <header className={`${isHomePage ? 'header' : 'header header_white'}`}>
      <Link to="/"><img className="header__logo" alt="логотип в виде зеленого круга" src={logo}></img></Link>

      {authorized && isMobile ? (
        <button className='header__burger-menu' type='button' aria-label='Открыть мобильное меню' onClick={openMobileMenu}>
          <img className='header__burger-icon' src={isBlackBurger ? blackBurgerIcon : whiteBurgerIcon} alt='иконка бургер меню'></img>
        </button>
      ) : (
        authorized && <Navigation />
      )}

      {authorized && !isMobile ? (
        <ProfileLink />
      ) : (
        !authorized && (
          <ul className='header__links'>
            <li><Link to="/signup" className="header__link">Регистрация</Link></li>
            <li><Link to="/signin" className="header__link header__link_type_signin">Войти</Link></li>
          </ul>
        )
      )}

      <MobileMenu isOpen={isMobileMenuOpen} openMenu={openMobileMenu} closeMenu={closeMobileMenu} />
    </header>
  );
}

export default Header;
