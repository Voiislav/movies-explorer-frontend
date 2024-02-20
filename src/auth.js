import { checkResponse } from "./utils/CheckResponse";

export const BASE_URL = "https://api.moomovies.nomoredomainsmonster.ru";

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
}

export const register = (email, password, name) => {
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
  });
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
        saveTokenToLocalStorage(token);
      }
      return data;
    });
};

export const checkToken = () => {
  const token = getTokenFromLocalStorage();
  console.log(token);
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data);
};

export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
}



