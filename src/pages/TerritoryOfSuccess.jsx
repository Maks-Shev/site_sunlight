import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import '../style/TerritoryOfSuccess.scss';

function TerritoryOfSuccess() {
	return (
		<>
			<Header />
			<div className='territoryOfSuccess'>
				<h1 className='territoryOfSuccess__title'>Территория успеха</h1>
				<section className='territoryOfSuccess__description container1200'>
					<p className='territoryOfSuccess__description-text'>
						Имеется спорная точка зрения, гласящая примерно следующее: базовые
						сценарии поведения пользователей могут быть преданы
						социально-демократической анафеме. Являясь всего лишь частью общей
						картины, диаграммы связей неоднозначны и будут описаны максимально
						подробно. Принимая во внимание показатели успешности, существующая
						теория выявляет срочную потребность благоприятных перспектив.
						Повседневная практика показывает, что понимание сути
						ресурсосберегающих технологий влечет за собой процесс внедрения и
						модернизации существующих финансовых и административных условий.
						Также как убеждённость некоторых оппонентов не даёт нам иного
						выбора, кроме определения анализа существующих паттернов поведения.
						Мы вынуждены отталкиваться от того, что синтетическое тестирование
						не даёт нам иного выбора, кроме определения.
					</p>
					<div className='territoryOfSuccess__description-imgBox'>
						<div className='territoryOfSuccess__description-img'></div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	);
}

export default TerritoryOfSuccess;
