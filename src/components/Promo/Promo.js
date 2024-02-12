import './Promo.css';
import promoImage from '../../images/planet-web-image.svg';

const scrollToAbout = () => {
  const aboutProjectSection = document.getElementById('about-project');
  if (aboutProjectSection) {
    aboutProjectSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function Promo() {
  return (
    <section className="promo">
      <ul className="promo__info">
        <li><h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1></li>
        <li><h2 className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h2></li>
        <li><button className="promo__button" onClick={scrollToAbout}>Узнать больше</button></li>
      </ul>
      <img className="promo__image" alt="рисунок планеты, составленный из слов web" src={promoImage}></img>
    </section>
  );
};

export default Promo;