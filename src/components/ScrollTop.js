import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
	const { pathname } = useLocation(); // Получаем текущий путь из маршрутизатора

	useEffect(() => {
		window.scrollTo(0, 0); // Прокручиваем страницу к верху (координаты 0, 0)
	}, [pathname]); // Запускаем эффект при изменении pathname

	return null; // Компонент ничего не рендерит
};
export default ScrollTop;
