import styles from './NewsCard.module.scss';
import { Link } from 'react-router-dom';

export function NewsCard({ id, imgSrc, imgAlt, title, description, date }) {
	return (
		<div className={styles.card}>
			<picture className={styles.card__picture}>
				<img src={imgSrc} className={styles.card__image} alt={imgAlt} />
			</picture>
			<div className={styles.card__content}>
				<h4 className={styles.card__title}>{title}</h4>
				<p className={styles.card__description}>{description}</p>
				<div className={styles.card__footer}>
					<span className={styles.card__date}>{date}</span>
					<Link to={`/news/${id}`} className={styles.card__link}>
						Читать дальше
					</Link>
				</div>
			</div>
		</div>
	);
}

export default NewsCard;
