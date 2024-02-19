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

const saveTokenToCookie = (token) => {
  document.cookie = `token=${token}; path=/;`;
};

const getTokenFromCookie = () => {
  const name = 'token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for(let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
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
        saveTokenToCookie(token);
        console.log(token);
        return data;
      }
    })
};

export const checkToken = () => {
  const token = getTokenFromCookie();
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


