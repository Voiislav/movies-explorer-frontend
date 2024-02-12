import Auth from '../Auth/Auth';

function Login() {
  return (
    <Auth
    titleText='Рады видеть!'
    submitButtonText='Войти'
    clarificationText='Еще не зарегистрированы?'
    linkText='Регистрация'
    linkPath='/signup'
    showNameInput={false}
    ></Auth>
  );
};

export default Login;