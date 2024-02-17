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
        setCookie("token", data.token, { path: "/", expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        return data;
      }
    })
};

const setCookie = (name, value, options) => {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      credentials: 'include',
    },
  })
    .then((data) => data)
};
