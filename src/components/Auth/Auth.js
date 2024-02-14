import { useState, useEffect } from 'react';
import './Auth.css';
import logo from '../../images/circle-logo.svg';
import { Link } from 'react-router-dom';

function Auth({ handleSubmit, titleText, submitButtonText, clarificationText, linkText, linkPath, showNameInput, submitError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    validateButton();
  }, [name, email, password, nameError, emailError, passwordError]);


  const handleNameChange = (evt) => {
    const value = evt.target.value;
    setName(value);
    validateName(value);
    validateButton();
  };

  const handleEmailChange = (evt) => {
    const value = evt.target.value;
    setEmail(value);
    validateEmail(value);
    validateButton();
  };

  const handlePasswordChange = (evt) => {
    const value = evt.target.value;
    setPassword(value);
    validatePassword(value);
    validateButton();
  };

  const validateName = (value) => {
    if (!value) {
      setNameError('');
    } else if (!value.match(/^[A-Za-zА-Яа-яЁё\s-]+$/)) {
      setNameError('Имя должно содержать только буквы латинского или кириллического алфавита, пробел или дефис');
    } else if (value.length < 2 || value.length > 30) {
      setNameError('Имя должно содержать от 2 до 30 символов');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (value) => {
    if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError('Введите корректный адрес электронной почты');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Введите пароль');
    } else {
      setPasswordError('');
    }
  };

  const validateButton = () => {
    if (showNameInput && (nameError || emailError || passwordError || !name || !email || !password)) {
      setIsButtonDisabled(true);
    } else if (!showNameInput && (emailError || passwordError || !email || !password)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  return (
    <section className='authorization'>
      <img className='authorization__logo' src={logo} alt="логотип в виде зеленого круга"></img>
      <h1 className='authorization__title'>{titleText}</h1>
      <form className='authorization__form' onSubmit={handleSubmit}>
        {showNameInput && (
          <>
            <label htmlFor='name' className='authorization__label'>Имя</label>
            <input onChange={handleNameChange} minLength={2} maxLength={30} type='text' className='authorization__input' id='name' placeholder='Введите имя' required></input>
            <p className='authorization__error'>{nameError}</p>
          </>
        )}
        <label htmlFor='email' className='authorization__label'>E-mail</label>
        <input onChange={handleEmailChange} type='email' className='authorization__input' id='email' placeholder='Введите адрес электронной почты' required></input>
        <p className='authorization__error'>{emailError}</p>
        <label htmlFor='password' className='authorization__label'>Пароль</label>
        <input onChange={handlePasswordChange} type='password' className='authorization__input' id='password' placeholder='Введите пароль' required></input>
        <p className='authorization__error'>{passwordError}</p>
        {submitError && <p className='authorization__error'>{submitError}</p>}
        <button type='submit' className={`authorization__submit ${isButtonDisabled ? 'authorization__submit_disabled' : ''}`} id='auth-submit' disabled={isButtonDisabled}>{submitButtonText}</button>
      </form>
      <p className='authorization__link'>{clarificationText} <Link to={linkPath} className='authorization__link authorization__link_interactive'>{linkText}</Link></p>
    </section>
  );
};

export default Auth;
