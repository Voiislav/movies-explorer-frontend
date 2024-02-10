import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <ul className="techs__content">
        <li className="techs__content-title">7 технологий</li>
        <li className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</li>
      </ul>
      <ul className="techs__items">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;