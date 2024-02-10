import './Profile.css';
import Header from '../Header/Header';

function Profile() {
  return (
    <>
      <Header authorized={true} />
      <section className='profile'>
        <h1 className='profile__greeting'>Привет, Виталий!</h1>
        <form className='profile__edit'>
          <div className='profile__inputs-area profile__inputs-area_top'>
            <label className='profile__label' htmlFor='name'>Имя</label>
            <input type='text' className='profile__input' id='name' defaultValue='Виталий' placeholder='Введите новое имя' required></input>
          </div>
          <div className='profile__inputs-area profile__inputs-area_bottom'>
            <label className='profile__label' htmlFor='email'>E-mail</label>
            <input type='email' className='profile__input' id='email' defaultValue='pochta@yandex.ru' placeholder='Введите новый адрес электронной почты' required></input>
          </div>
          <button className='profile__button' type='submit' aria-label='Редактировать профиль'>Редактировать</button>
        </form>
        <button className='profile__button profile__button_exit' type='button' aria-label='Выйти из аккаунта'>Выйти из аккаунта</button>
      </section>
    </>
  );
};

export default Profile;