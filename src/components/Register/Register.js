import Auth from '../Auth/Auth';

function Register() {
  return (
    <Auth
    titleText='Добро пожаловать!'
    submitButtonText='Зарегистрироваться'
    clarificationText='Уже зарегистрированы?'
    linkText='Войти'
    linkPath='/signin'
    showNameInput={true}
    ></Auth>
  );
};

export default Register;