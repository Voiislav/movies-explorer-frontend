import { getTokenFromLocalStorage } from "../auth";

export class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  setNewUserData({
    name,
    email
  }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
    .then(this._checkResponse)
  }

  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    owner,
    id,
    nameRU,
    nameEN
  }) {
    return fetch(`${this._baseUrl}/movies/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: `https://api.nomoreparties.co/${image.url}`,
        trailerLink: trailerLink,
        thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        owner: owner,
        movieId: id,
        nameRU: nameRU,
        nameEN: nameEN
      })
    })
    .then(this._checkResponse)
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse)
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.moomovies.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
  }
});

export default mainApi;