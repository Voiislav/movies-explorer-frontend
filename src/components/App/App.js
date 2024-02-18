import './App.css';
import '../../vendor/normalize.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="page">
      <Router>
        <Routes>
          <Route path="/" element={<Main isAuth={isAuth} />} />
          <Route path="/signup" element={<Register setIsAuth={setIsAuth} />} />
          <Route path="/signin" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movies" element={<Movies isAuth={isAuth} />} />
          <Route path="/saved-movies" element={<SavedMovies isAuth={isAuth} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
