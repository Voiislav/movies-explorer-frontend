import { checkResponse } from "./utils/CheckResponse";

export const BASE_URL = "https://api.moomovies.nomoredomainsmonster.ru";

const request = (url, options) => {
  return fetch(url, { ...options, credentials: 'include' }).then(checkResponse);
}


export const register = (email, password, name) => {
  console.log(name);
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  })
};

export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((data) => {
      if (data.token) {
        const token = data.token;
        saveCookie("token", token); // Сохраняем токен в куки
        console.log(token);
        return data;
      }
    })
};

export const checkToken = () => {
  const token = getCookie("token"); // Получаем токен из куки
  console.log(token)
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      credentials: 'include',
    },
  })
    .then((data) => data)
};

// Функция для сохранения токена в куки
const saveCookie = (name, value) => {
  document.cookie = `${name}=Bearer ${value}; path=/`;
};

// Функция для получения куки по имени
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};


