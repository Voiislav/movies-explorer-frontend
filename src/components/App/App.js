import './App.css';
import '../../vendor/normalize.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ErrorPage from '../ErrorPage/ErrorPage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { checkToken } from '../../auth';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    checkToken()
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
            <Route path="/signup" element={<ProtectedRoute element={<Register setIsAuth={setIsAuth} />} isAuth={!isAuth} />} />
            <Route path="/signin" element={<ProtectedRoute element={<Login setIsAuth={setIsAuth} />} isAuth={!isAuth} />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={
                    <Profile
                      setIsAuth={setIsAuth}
                    />
                  }
                  isAuth={isAuth}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={
                    <Movies
                      setIsAuth={setIsAuth}
                    />
                  }
                  isAuth={isAuth}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={
                    <SavedMovies
                      setIsAuth={setIsAuth}
                    />
                  }
                  isAuth={isAuth}
                />
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
