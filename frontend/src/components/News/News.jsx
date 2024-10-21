import TitleBlock from '../UI/TitleBlock/TitleBlock.jsx';
import LinkStar from '../UI/TitleBlock/LinkStar.jsx';
import './News.scss';
import { NewsCard } from './NewsCard/NewsCard.jsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../features/API/news/newsSlice.js';
import ServiceUnavailable from '../../pages/ServiceUnavailable';

export function News() {
	const dispatch = useDispatch();

	const { news: newsList, status, error } = useSelector(state => state.news);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const limitedNews = newsList.slice(0, 3);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchNews());
		}
	}, [dispatch, status]);

	useEffect(() => {
		const windowSizeHandler = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', windowSizeHandler);

		return () => {
			window.removeEventListener('resize', windowSizeHandler);
		};
	}, []);

	if (status === 'loading') {
		return <p>Загрузка новостей...</p>;
	}

	if (status === 'failed') {
		return <p>Ошибка загрузки новостей.</p>;
	}

	if (error && error.includes('Сервис временно недоступен')) {
		return <ServiceUnavailable />;
	}

	return (
		<section className='news container'>
			<div className='news__container'>
				<div className='news__title'>
					<TitleBlock title='НОВОСТИ' />
					{windowWidth > 576 && (
						<LinkStar linkText='Все новости' linkHref='/news' />
					)}
				</div>

				<div className='news__list'>
					{limitedNews.map(
						news =>
							news && (
								<NewsCard
									key={news.id}
									id={news.id}
									imgSrc={news.image}
									imgAlt={news.title}
									title={news.title}
									description={news.description}
								/>
							)
					)}
				</div>
				{windowWidth <= 576 && (
					<LinkStar linkText='Все новости' linkHref='/news' />
				)}
			</div>
		</section>
	);
}

export default News;
