import Auth from '../Auth/Auth';
import * as auth from "../../auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function Register({ setIsAuth }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    auth
      .register(formValue.email, formValue.password, formValue.name)
      .then((res) => {
        if (res && !res.error) {
          auth.authorize(formValue.email, formValue.password)
            .then((data) => {
              if (data.token) {
                setIsAuth(true);
                navigate('/movies', { replace: true });
              }
            })
            .catch((err) => {
              setSubmitError("Произошла ошибка при регистрации: пользователь не авторизован");
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        let errorMessage;
        switch (err) {
          case 'Ошибка 400':
            errorMessage = "Некорректно заполнено одно из полей";
            break;
          case 'Ошибка 409':
            errorMessage = "Пользователь с такой почтой уже зарегистрирован";
            break;
          case 'Ошибка 500':
            errorMessage = "Ошибка сервера";
            break;
          default:
            errorMessage = "Произошла ошибка при регистрации";
            break;
        }
        setSubmitError(errorMessage);
        setIsLoading(false);
      });
  };

  return (
    isLoading ? 
    <Preloader /> 
    :
    <Auth
      handleSubmit={handleSubmit}
      titleText='Добро пожаловать!'
      submitButtonText='Зарегистрироваться'
      clarificationText='Уже зарегистрированы?'
      linkText='Войти'
      linkPath='/signin'
      showNameInput={true}
      submitError={submitError}
      handleChange={handleChange}
    ></Auth>
  );
};

export default Register;