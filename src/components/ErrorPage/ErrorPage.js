import './ErrorPage.css';

function ErrorPage() {

  const goBack = () => { // возвращаемся на страницу, с которой произошел переход на несуществующий роут
    window.history.back();
  };

  return (
    <section className='error'>
      <h1 className='error__title'>404</h1>
      <p className='error__description'>Страница не найдена</p>
      <button className='error__button' onClick={goBack}>Назад</button>
    </section>
  )
}

export default ErrorPage;