import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AboutBottom({
	title,
	description,
	buttonText,
	imgSrc,
	hrefLink,
	isReversed = false,
	isLast = false
}) {
	const className = `aboutBottom__item ${
		isReversed ? 'aboutBottom__item-reversed' : ''
	}`;

	const classNameLast = `aboutBottom__button ${
		isLast ? 'aboutBottom__button-last' : ''
	}`;

	return (
		<div className={className}>
			<div className='aboutBottom__info'>
				<h2 className='aboutBottom__title'>{title}</h2>
				<p className='aboutBottom__description'>{description}</p>
				<Link to={hrefLink} className={classNameLast}>
					{buttonText}
				</Link>
			</div>
			<div
				className='aboutBottom__img'
				style={{
					backgroundImage: `url(${imgSrc})`
				}}
				aria-label='Img about item'
			></div>
		</div>
	);
}

AboutBottom.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	buttonText: PropTypes.string,
	hrefLink: PropTypes.string.isRequired,
	imgSrc: PropTypes.string.isRequired,
	isReversed: PropTypes.bool,
	isLast: PropTypes.bool
};

export default AboutBottom;
