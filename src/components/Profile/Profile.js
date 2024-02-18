import './Profile.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { checkToken } from '../../auth'; // Импортируем функцию проверки токена
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect((token) => {
      checkToken(token)
        .then(() => {
          mainApi.getUserData()
            .then((data) => {
              setUserData(data);
              setName(data.name);
              setEmail(data.email);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error('Ошибка при получении данных пользователя:', error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error('Ошибка при проверке токена:', error);
          setIsLoading(false);
        });
  }, []);

  const handleEditProfile = (e) => {
    e.preventDefault();
    mainApi.setNewUserData({
      name: name,
      email: email,
    })
      .then((data) => {
        console.log('Данные профиля успешно обновлены:', data);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных профиля:', error);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Header authorized={true} />
      <section className='profile'>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <h1 className='profile__greeting'>Привет, {name}!</h1>
            <form className='profile__edit' onSubmit={handleEditProfile}>
              <div className='profile__inputs-area profile__inputs-area_top'>
                <label className='profile__label' htmlFor='name'>Имя</label>
                <input
                  type='text'
                  className='profile__input'
                  id='name'
                  value={name}
                  onChange={handleNameChange}
                  placeholder='Введите новое имя'
                  required
                />
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
              </div>
              <button className='profile__button' type='submit' aria-label='Редактировать профиль'>Редактировать</button>
            </form>
            <button className='profile__button profile__button_exit' type='button' aria-label='Выйти из аккаунта'>Выйти из аккаунта</button>
          </>
        )}
      </section>
    </>
  );
}

export default Profile;



