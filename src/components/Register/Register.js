import Auth from '../Auth/Auth';
import * as auth from "../../auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setIsAuth }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [submitError, setSubmitError] = useState("");

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
    auth
      .register(formValue.email, formValue.password, formValue.name)
      .then((res) => {
        if (res && !res.error) {
          setIsAuth(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        let errorMessage;
        switch (err) {
          case 'Ошибка 400':
            errorMessage = "Некорректно заполнено одно из полей";
            break;
          case 'Ошибка 500':
            errorMessage = "Ошибка сервера";
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