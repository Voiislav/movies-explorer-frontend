import './Auth.css';
import logo from '../../images/circle-logo.svg';
import { Link } from 'react-router-dom';

function Auth({ titleText, submitButtonText, clarificationText, linkText, linkPath, showNameInput }) {
  return (
    <section className='authorization'>
      <img className='authorization__logo' src={logo} alt="логотип в виде зеленого круга"></img>
      <h1 className='authorization__title'>{titleText}</h1>
      <form className='authorization__form'>
      {showNameInput && (
          <>
            <label htmlFor='name' className='authorization__label'>Имя</label>
            <input type='text' className='authorization__input' id='name' placeholder='Введите имя' required></input>
          </>
        )}
        <label htmlFor='email' className='authorization__label'>E-mail</label>
        <input type='email' className='authorization__input' id='email' placeholder='Введите адрес электронной почты' required></input>
        <label htmlFor='password' className='authorization__label'>Пароль</label>
        <input type='password' className='authorization__input' id='password' placeholder='Введите пароль' required></input>
        <button type='submit' className='authorization__submit' id='reg-submit'>{submitButtonText}</button>
      </form>
      <p className='authorization__link'>{clarificationText} <Link to={linkPath} className='authorization__link authorization__link_interactive'>{linkText}</Link></p>
    </section>
  );
};

export default Auth;