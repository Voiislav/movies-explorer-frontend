import Auth from '../Auth/Auth';
import * as auth from "../../auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
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
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .register(formValue.email, formValue.password, formValue.name)
      .then((res) => {
        if (res && !res.error) {
          navigate('/movies');
        }
      })
      .catch((err) => {
        let errorMessage;
        switch (err.status) {
          case 400:
            errorMessage = "400 - некорректно заполнено одно из полей";
            break;
          case 500:
            errorMessage = "500 - ошибка сервера";
            break;
          default:
            errorMessage = "Произошла ошибка при регистрации";
            break;
        }
        setSubmitError(errorMessage);
        console.log(errorMessage);
      });
  }

  return (
    <Auth
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      titleText='Добро пожаловать!'
      submitButtonText='Зарегистрироваться'
      clarificationText='Уже зарегистрированы?'
      linkText='Войти'
      linkPath='/signin'
      showNameInput={true}
      submitError={submitError}
    ></Auth>
  );
};

export default Register;