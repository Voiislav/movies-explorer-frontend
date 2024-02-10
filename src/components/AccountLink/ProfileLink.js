import './ProfileLink.css';
import profileIcon from '../../images/profile-icon.svg';
import { Link, useLocation } from 'react-router-dom';

function ProfileLink({ isMobileMenuOpen }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <Link to='/profile' className={`${isHomePage && !isMobileMenuOpen ? 'profile-link' : 'profile-link profile-link_white'}`}>
      Аккаунт<div className='profile-link__icon'><img src={profileIcon} alt='иконка профиля'></img></div>
    </Link>
  )
}

export default ProfileLink;