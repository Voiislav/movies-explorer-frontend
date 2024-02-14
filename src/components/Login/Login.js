import Auth from '../Auth/Auth';
import * as auth from "../../auth";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
        }
        handleLogin();
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        let errorMessage;
        switch (err.status) {
          case 400:
            errorMessage = "400 - некорректно заполнено одно из полей";
            break;
            case 401:
            errorMessage = "401 - почта или пароль не верны";
            break;
          case 500:
            errorMessage = "500 - ошибка сервера";
            break;
          default:
            errorMessage = "Произошла ошибка при регистрации";
            break;
        }
        setSubmitError(errorMessage);
      });
  }

  return (
    <Auth
    handleSubmit={handleSubmit}
    handleChange={handleChange}
    titleText='Рады видеть!'
    submitButtonText='Войти'
    clarificationText='Еще не зарегистрированы?'
    linkText='Регистрация'
    linkPath='/signup'
    showNameInput={false}
    submitError={submitError}
    ></Auth>
  );
};

export default Login;