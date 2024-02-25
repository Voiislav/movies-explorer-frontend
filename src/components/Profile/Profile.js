import './Profile.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { checkToken } from '../../auth';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

function Profile({ setIsAuth, isAuth }) {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [onEdit, setOnEdit] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setOriginalName(userData.name);
      setOriginalEmail(userData.email);
      validateButton();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      setOriginalName(userData.name);
      setOriginalEmail(userData.email);
      validateButton();
    }
  }, [userData]);

  useEffect(() => {
    checkToken()
      .then((data) => {
        setUserData(data);
        setName(data.name);
        setEmail(data.email);
        setIsLoading(false);
        setOriginalName(data.name);
        setOriginalEmail(data.email);
        setIsAuth(true);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных пользователя:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    validateButton();
  }, [name, email, originalName, originalEmail]);

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mainApi.setNewUserData({
      name: name,
      email: email,
    }, localStorage.getItem('token'))
      .then((data) => {
        console.log('Данные профиля успешно обновлены:', data);
        setSuccessMessage('Данные профиля успешно обновлены.')
        setOriginalName(name);
        setOriginalEmail(email);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных профиля:', error);
        if (error.response && error.response.status === 500) {
          setSubmitError('Произошла ошибка сервера при обновлении данных профиля.');
        } else {
          setSubmitError('Произошла ошибка при обновлении данных профиля.');
        }
        setIsLoading(false);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
    validateButton();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
    validateButton();
  };

  const validateName = (value) => {
    if (!value) {
      setNameError('');
    } else if (!value.match(/^[A-Za-zА-Яа-яЁё\s-]+$/)) {
      setNameError('Некорректный формат имени');
    } else if (value.length < 2 || value.length > 30) {
      setNameError('Имя должно содержать от 2 до 30 символов');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (value) => {
    if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError('Введите корректный адрес почты');
    } else {
      setEmailError('');
    }
  };

  const validateButton = () => {
    if (nameError || emailError || !name || !email || (name === originalName && email === originalEmail)) {
      setOnEdit(false);
    } else {
      setOnEdit(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('isShortFilmChecked');
    localStorage.removeItem('movies');
    setIsAuth(false);
    navigate('/', { replace: true });
  }

  return (
    <>
      <Header authorized={isAuth} />
      <section className='profile'>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <h1 className='profile__greeting'>Привет, {name}!</h1>
            <p className='profile__message'>{successMessage}</p>
            {submitError && <p className='profile__message profile__message_error'>{submitError}</p>}
            <form className='profile__edit' onSubmit={handleEditProfile}>
              <div className='profile__inputs-area profile__inputs-area_top'>
                <label className='profile__label' htmlFor='name'>Имя</label>
                <input
                  type='text'
                  minLength={2}
                  maxLength={30}
                  className='profile__input'
                  id='name'
                  value={name}
                  onChange={handleNameChange}
                  placeholder='Введите новое имя'
                  required
                />
                <p className='profile__error'>{nameError}</p>
              </div>
              <div className='profile__inputs-area profile__inputs-area_bottom'>
                <label className='profile__label' htmlFor='email'>E-mail</label>
                <input
                  type='email'
                  className='profile__input'
                  id='email'
                  value={email}
                  onChange={handleEmailChange}
                  placeholder='Введите новый адрес электронной почты'
                  required
                />
                <p className='profile__error profile__error_bottom'>{emailError}</p>
              </div>
              <button className={`profile__button ${onEdit ? '' : 'profile__button_disabled'}`} type='submit' aria-label='Редактировать профиль' disabled={!onEdit}>Редактировать</button>
            </form>
            <button className='profile__button profile__button_exit' type='button' aria-label='Выйти из аккаунта' onClick={handleSignOut}>Выйти из аккаунта</button>
          </>
        )}
      </section>
    </>
  );
}

export default Profile;




