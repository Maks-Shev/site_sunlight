import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CharityContainer from '../components/CharityContainer/CharityContainer';
import { fetchGarden } from '../features/API/garden/gardenSlice';
import '../style/garden.css';
import ServiceUnavailable from './ServiceUnavailable';

function Garden() {
	const dispatch = useDispatch();
	const { garden, status, error } = useSelector(state => state.garden);

	useEffect(() => {
		dispatch(fetchGarden());
	}, [dispatch]);

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	if (status === 'failed') {
		return <p>{error}</p>;
	}

	if (error && error.includes('Сервис временно недоступен')) {
		return <ServiceUnavailable />;
	}

	return (
		<>
			<Header />
			{garden && (
				<div className='container__garden container1200'>
					<div className='garden__title'>
						<h2>{garden[0].title}</h2>
					</div>
					<div className='garden__desc__up'>
						<div className='garden__title__block'>
							<div className='garden__desc__up__text'>
								<p>
									<b>{garden[0].description_rus}</b>
								</p>
							</div>
							<div className='garden__desc__up__img'>
								<img src={garden[0].picture} alt='фото детей' />
							</div>
						</div>
					</div>
					<div className='garden__desc__down'>
						<p>{garden[0].description_en}</p>
					</div>
					<div className='garden__help__block'>
						<CharityContainer />
					</div>
				</div>
			)}
			<Footer />
		</>
	);
}

export default Garden;
