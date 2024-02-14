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
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        }
        if (err.status === 401) {
          console.log("401 - пользователь с таким email не найден");
        }
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
    ></Auth>
  );
};

export default Login;