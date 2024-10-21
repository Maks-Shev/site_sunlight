import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutCentreById } from '../../features/API/aboutCentre/aboutCentreSlice';
import styles from './About.module.scss';
import TitleBlock from '../../components/UI/TitleBlock/TitleBlock';
import openYearIcon from '/img/home/open_year.svg';
import helpingHandIcon from '/img/home/helping-hand.svg';
import iconHouse from '/img/home/icon-house.svg';
import LinkStar from '../UI/TitleBlock/LinkStar';
import ServiceUnavailable from '../../pages/ServiceUnavailable';

function About() {
  const dispatch = useDispatch();
  
  const { about, status, error } = useSelector((state) => state.aboutCentre);

  useEffect(() => {
    if (!about || about.id !== 6) { 
      dispatch(fetchAboutCentreById(6));
    }
  }, [dispatch, about]);

  const [shouldDisplayLink, setShouldDisplayLink] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setShouldDisplayLink(true);
      } else {
        setShouldDisplayLink(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (error && error.includes('Сервис временно недоступен')) {
	return <ServiceUnavailable />;
}

  return (
    <section className={`${styles.about} container`}>
		<div className={styles.about__descBox}>
			<div className={styles.about__descBox__title}>
			<TitleBlock title="О ЦЕНТРЕ" />
			{!shouldDisplayLink && <LinkStar linkText="Подробнее" linkHref="/about" />}
			</div>

			{status === 'loading' && <p>Загрузка данных...</p>}
			{status === 'failed' && <p>{error}</p>}
			{status === 'succeeded' && (
			<p className={styles.about__descBox__desc}>
				{about.about_centre}
			</p>
			)}
		</div>
		<div className={styles.about__statsBox}>
			<div className={styles.about__statsBox__statItem}>
			<div
				className={styles.about__statsBox__statItem__icon1}
				style={{ backgroundImage: `url(${openYearIcon})` }}
			></div>
			<h3 className={styles.about__statsBox__statItem__num}>2014</h3>
			<p className={styles.about__statsBox__statItem__text}>
				год открытия АНОО «Солнечный круг»
			</p>
			</div>
			<div className={styles.about__statsBox__statItem}>
			<div
				className={styles.about__statsBox__statItem__icon2}
				style={{ backgroundImage: `url(${helpingHandIcon})` }}
			></div>
			<h3 className={styles.about__statsBox__statItem__num}>160</h3>
			<p className={styles.about__statsBox__statItem__text}>
				и более детей получают помощь прямо сейчас
			</p>
			</div>
			<div className={styles.about__statsBox__statItem}>
			<div
				className={styles.about__statsBox__statItem__icon3}
				style={{ backgroundImage: `url(${iconHouse})` }}
			></div>
			<h3 className={styles.about__statsBox__statItem__num}>40</h3>
			<p className={styles.about__statsBox__statItem__text}>
				и более семей получают консультации от центра
			</p>
			</div>
		</div>
		{shouldDisplayLink && <LinkStar linkText="Подробнее" linkHref="/about" />}
		</section>
	);
}

export default About;