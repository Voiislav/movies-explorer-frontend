import './AboutMe.css';

function AboutMe() {
  return (
    <section className="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__content">
        <ul className="student__info">
          <li className="student__name">Войислав</li>
          <li className="student__profession">Веб-разработчик, 28 лет</li>
          <li className="student__about">Я родился в Санкт-Петербурге и закончил факультет логистики и транспорта СПБГЭУ. 6 лет работал по специальности, но не был доволен своим выбором. В 2022 году я решился на изменения. Сначала сменил страну - переехал в Испанию, затем решил сменить профессию. В веб-разработке я нашел именно то, чего желал всегда - творческую свободу в сочетании с точностью и систематичностью. Perfect match!</li>
          <li><a className="student__link" href="https://github.com/Voiislav" target="_blank" rel="noopener noreferrer">Github</a></li>
        </ul>
        <div className="student__photo"></div>
      </div>
    </section>
  );
};

export default AboutMe;