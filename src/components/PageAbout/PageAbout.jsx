import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PageAbout.scss';
import '../../style/App.scss';
import AboutItem from './AboutItem';
import CharityContainer from '../../components/CharityContainer/CharityContainer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { fetchAboutCentre } from '../../features/API/aboutCentre/aboutCentreSlice';

function PageAbout() {
	const location = useLocation();
	const dispatch = useDispatch();
	const containerRef = useRef(null);

	const { about = [], status, error } = useSelector(state => state.aboutCentre);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

	useEffect(() => {
		dispatch(fetchAboutCentre());
	}, [dispatch]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const getHrefLink = title => {
		switch (title) {
			case 'Служба раннего развития':
				return '/SRV';
			case 'Сад':
				return '/garden';
			case 'Школа':
				return '/School';
			case 'Мастерские':
				return '/workshops';
			case 'Специалисты':
				return '/specialists';
			default:
				return '#';
		}
	};

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setIsMobile(width <= 576);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	if (status === 'failed') {
		return <p>Error loading data</p>;
	}

	if (error && error.includes('Сервис временно недоступен')) {
		return <ServiceUnavailable />;
	}

	const filteredItems =
		about.length > 0 ? about.filter(item => item.title !== 'О центре') : [];

	return (
		<div className='aboutPage container1200'>
			<section className='aboutTop'>
				<div className='aboutTop__header'>
					<h1 className='aboutTop__headerTitle'>О центре</h1>
				</div>
				<div className='aboutTop__boxTop'>
					<div className='aboutTop__boxTopTextBox'>
						<p className='aboutTop__boxTopText aboutTop__boxTopTextBold'>
							Каждый день мы помогаем особым семьям Тольятти жить полноценной
							жизнью. Наша миссия: сопровождение семьи, в которой воспитывается
							ребёнок с инвалидностью с момента рождения до момента ухода.
						</p>
						<p className='aboutTop__boxTopText'>
							В России дети со средней и тяжелой степенью инвалидности из-за
							отсутствия специализированных заведений лишены конституционного
							права на образование, а бесконечные реабилитации в отрыве от дома
							лишают их детства обычных детей.
						</p>
						<p className='aboutTop__boxTopText'>
							Идея создания центра заключается в комплексном ведении семьи,
							начиная от службы раннего вмешательства до получения ребенком
							доступного профессионального образования. При этом дети смогут
							получать не только общее образование, но и реабилитационные и
							коррекционные занятия, заниматься спортом, таким как бочча и
							скалолазание, адаптироваться в обществе благодаря школе
							социально-бытовой адаптации.
						</p>
					</div>
					<div className='aboutTop__boxTopImgBox'>
						<div className='aboutTop__boxTopImg'></div>
						<div className='aboutTop__boxBottomStatistics'>
							<div className='aboutTop__boxBottomStatItem'>
								<div className='aboutTop__boxBottomStatIcon1'></div>
								<h3 className='aboutTop__boxBottomStatNum'>2014</h3>
								<p className='aboutTop__boxBottomStatText'>
									год открытия АНОО «Солнечный круг»
								</p>
							</div>
							<div className='aboutTop__boxBottomStatItem'>
								<div className='aboutTop__boxBottomStatIcon2'></div>
								<h3 className='aboutTop__boxBottomStatNum'>160</h3>
								<p className='aboutTop__boxBottomStatText'>
									и более детей получают помощь прямо сейчас
								</p>
							</div>
							<div className='aboutTop__boxBottomStatItem'>
								<div className='aboutTop__boxBottomStatIcon3'></div>
								<h3 className='aboutTop__boxBottomStatNum'>40</h3>
								<p className='aboutTop__boxBottomStatText'>
									и более семей получают консультации от центра
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='aboutTop__boxBottom'>
					<div className='aboutTop__boxBottomDescription'>
						<p className='aboutTop__boxTopText'>
							На сегодняшний день в нашем центре получателями услуг являются
							более 160 детей. Нами запущена работа службы раннего
							вмешательства, под патронажем которой находятся 20 детей, также
							действуют программы: детский сад и школа для детей с ДЦП и
							аутизмом.
						</p>
						<p className='aboutTop__boxTopText'>
							Центр посещает 40 детей в режиме полного дня с 4-х разовым
							питанием. С ребятами проводятся не только развивающие и творческие
							занятия на группе, но и индивидуальные коррекционные:
						</p>
						<ol className='aboutTop__boxTopText'>
							<li>- адаптивная физкультура</li>
							<li>- массаж</li>
							<li>- занятия с эрготерапевтом</li>
							<li>- терапия руки</li>
							<li>- АВА-терапия</li>
							<li>- занятия с логопедом-дефектологом</li>
						</ol>
						<p className='aboutTop__boxTopText'>
							Также в июне 2017 г. была открыта школа социально-бытовой
							адаптации, где проходят занятия с воспитанниками центра по
							освоению бытовых навыков. В творческих мастерских на регулярной
							основе занимаются 10 детей. Ежегодно на индивидуальных занятиях со
							специалистами Центра занимаются более 40 детей. Более 60 семьям
							оказываются консультационные услуги.
						</p>
					</div>
					<div className='aboutTop__boxBottomStatistics-twins'>
						<div className='aboutTop__boxBottomStatItem'>
							<div className='aboutTop__boxBottomStatIcon1'></div>
							<h3 className='aboutTop__boxBottomStatNum'>2014</h3>
							<p className='aboutTop__boxBottomStatText'>
								год открытия АНОО «Солнечный круг»
							</p>
						</div>
						<div className='aboutTop__boxBottomStatItem'>
							<div className='aboutTop__boxBottomStatIcon2'></div>
							<h3 className='aboutTop__boxBottomStatNum'>160</h3>
							<p className='aboutTop__boxBottomStatText'>
								и более детей получают помощь прямо сейчас
							</p>
						</div>
						<div className='aboutTop__boxBottomStatItem'>
							<div className='aboutTop__boxBottomStatIcon3'></div>
							<h3 className='aboutTop__boxBottomStatNum'>40</h3>
							<p className='aboutTop__boxBottomStatText'>
								и более семей получают консультации от центра
							</p>
						</div>
					</div>
					<div className='aboutTop__boxBottomDescription-width'>
						<p className='aboutTop__boxTopText aboutTop__boxTopText-width'>
							Наша целевая аудитория:
						</p>
						<ol className='aboutTop__boxTopText aboutTop__boxTopText-width'>
							<li>
								- Дети с ментальными и физическими нарушениями и их родители.
							</li>
							<li>
								- Подростки и молодые люди с ментальными и физическими
								нарушениями, а также их родители.
							</li>
						</ol>
						<p className='aboutTop__boxTopText aboutTop__boxTopText-width'>
							На примере детей мы видим, как изменилась жизнь их семей.
						</p>
						<p className='aboutTop__boxTopText aboutTop__boxTopText-width'>
							Здесь дети, которые раньше находились дома, учатся, общаются,
							играют, радуются, совместно отмечают праздники. Ребята-школьники
							занимаются и более серьезной деятельностью: выращивают рассаду,
							ухаживают за рыбками, помогают в столовой, ходят в магазин за
							хлебом. Все это дает возможность жить полной жизнью, чувствовать
							свою нужность, и при этом получать необходимые коррекционные
							занятия. А родители получили возможность работать, родить еще
							детей, заняться своим здоровьем, что значительно улучшило качество
							жизни всей семьи.
						</p>
						<p className='aboutTop__boxTopText aboutTop__boxTopText-width'>
							АНОО «Солнечный круг» был открыт в ноябре 2014 года по инициативе
							родителей и при поддержке мэрии г. Тольятти.
						</p>
					</div>
				</div>
			</section>

			<div className='about__boxButton'>
				<a
					className='about__button'
					href='http://guild-of-developers.ru'
					target='_blank'
				>
					Перейти на образовательный сайт
				</a>
			</div>

			<section className='aboutBottom' ref={containerRef}>
				{isMobile ? (
					<div className='pageAbout-Swiper'>
						<Swiper
							modules={[Pagination]}
							pagination={{ clickable: true }}
							slidesPerView={1}
						>
							{filteredItems.map((item, i) => (
								<SwiperSlide key={item.id}>
									<AboutItem
										title={item.title}
										description={item.about_centre}
										hrefLink={getHrefLink(item.title)}
										buttonText={
											i === filteredItems.length - 1
												? 'Все специалисты'
												: 'Подробнее'
										}
										imgSrc={item.picture}
										{...(i % 2 === 1 && { isReversed: true })}
										{...(i === filteredItems.length - 1 && { isLast: true })}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				) : (
					<div className='aboutBottom__box'>
						{filteredItems.map((item, i) => (
							<AboutItem
								key={item.id}
								title={item.title}
								description={item.about_centre}
								hrefLink={getHrefLink(item.title)}
								buttonText={
									i === filteredItems.length - 1
										? 'Все специалисты'
										: 'Подробнее'
								}
								imgSrc={item.picture}
								{...(i % 2 === 1 && { isReversed: true })}
								{...(i === filteredItems.length - 1 && { isLast: true })}
							/>
						))}
					</div>
				)}
			</section>

			<CharityContainer />
		</div>
	);
}

export default PageAbout;
