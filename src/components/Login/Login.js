import Auth from '../Auth/Auth';
import * as auth from "../../auth";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login({ setIsAuth }) {
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
        setIsAuth(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        let errorMessage;
        switch (err) {
          case 'Ошибка 400':
            errorMessage = "Некорректно заполнено одно из полей";
            break;
            case 'Ошибка 401':
            errorMessage = "Почта или пароль не верны";
            break;
          case 'Ошибка 500':
            errorMessage = "Ошибка сервера";
            break;
          default:
            errorMessage = "Произошла ошибка при попытке входа";
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