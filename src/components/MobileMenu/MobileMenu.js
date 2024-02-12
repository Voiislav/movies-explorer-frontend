import { useState, useEffect } from 'react';
import './MobileMenu.css';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import closeIcon from '../../images/close-icon.svg';
import ProfileLink from '../AccountLink/ProfileLink';

function MobileMenu({ isOpen, openMenu, closeMenu }) {
  const [isClosing, setIsClosing] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleOpenMenu = () => {
    openMenu();
  };

  const handleCloseMenu = () => {
    setIsClosing(true);
    closeMenu();
  };

  const onAnimationEnd = () => {
    setIsClosing(false);
  };

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  return (
    <div className={`mobile-menu ${isOpen ? 'mobile-menu_opened' : ''} ${isClosing ? 'mobile-menu_closed' : ''}`} onAnimationEnd={onAnimationEnd}>
      <ul className='mobile-menu__links'>
        <li>
        <Link to='/' className={`mobile-menu__link ${isHomePage ? 'mobile-menu__link_disabled' : ''}`} disabled={isHomePage}>Главная</Link>
        </li>
        <li>
          <Navigation isMobileMenu={true} />
        </li>
      </ul>
      <button className='mobile-menu__close' type='button' aria-label='закрыть меню' onClick={handleCloseMenu}><img className='mobile-menu__close-icon' src={closeIcon} alt='иконка крестика'></img></button>
      <ProfileLink isMobileMenuOpen={isOpen} />
    </div>
  )
}

export default MobileMenu;

