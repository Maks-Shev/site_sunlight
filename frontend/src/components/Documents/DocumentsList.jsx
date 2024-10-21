import { useEffect, useState } from 'react';
import DocumentItem from './DocumentItem';
import './DocumentsList.scss';

function DocumentsList() {
	const [buttonText, setButtonText] = useState(
		'Помочь благотворительному центру'
	);

	const updateButtonText = () => {
		const width = window.innerWidth;
		if (width < 576) {
			setButtonText('Помочь центру');
		} else {
			setButtonText('Помочь благотворительному центру');
		}
	};

	useEffect(() => {
		updateButtonText(); // Установил текст при первом рендере
		window.addEventListener('resize', updateButtonText); // Установил слушатель события

		return () => {
			window.removeEventListener('resize', updateButtonText);
		};
	}, []);

	return (
		<section className='documents container'>
			<h1>Уставные документы</h1>
			<div className='documents__box'>
				<DocumentItem title='Свидетельство о гос. аккредитации' type_report={8}/>
				<DocumentItem title='Свидетельство налоговая' type_report={9}/>
				<DocumentItem title='Лицензия' type_report={10}/>
				<DocumentItem title='Устав' type_report={11}/>
				<DocumentItem title='Бухгалтерская отчётность' type_report={12}/>
			</div>
			<div className='documents__boxButton'>
				<button className='documents__button'>{buttonText}</button>
			</div>
		</section>
	);
}

export default DocumentsList;
