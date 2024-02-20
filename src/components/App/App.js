import './App.css';
import '../../vendor/normalize.css';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ErrorPage from '../ErrorPage/ErrorPage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([mainApi.getUserData()])
      .then((userData) => {
        setCurrentUser(userData);
        setIsAuth(true);
        console.log(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Router>
        <Routes>
          <Route path="/" element={<Main isAuth={isAuth} />} />
          <Route path="/signup" element={<Register setIsAuth={setIsAuth} />} />
          <Route path="/signin" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/profile" element={<Profile setIsAuth={setIsAuth} />} />
          <Route path="/movies" element={<Movies isAuth={isAuth} />} />
          <Route path="/saved-movies" element={<SavedMovies isAuth={isAuth} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
