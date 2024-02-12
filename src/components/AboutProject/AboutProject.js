import './AboutProject.css';

function AboutProject() {
  return (
    <section className="project" id='about-project'>
      <h2 className="project__title">О проекте</h2>
      <ul className="project__text-info">
        <li className="project__info-title">Дипломный проект включал 5 этапов</li>
        <li className="project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</li>
        <li className="project__info-title">На выполнение диплома ушло 5 недель</li>
        <li className="project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</li>
      </ul>
      <ul className="project__timeline">
        <li><div className="project__interval">
          <p className="project__interval-text">1 неделя</p>
        </div></li>
        <li><div className="project__interval project__interval_type_long">
          <p className="project__interval-text">4 недели</p>
        </div></li>
        <li className="project__caption">Back-end</li>
        <li className="project__caption">Front-end</li>
      </ul>
    </section>
  );
};

export default AboutProject;