import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports, fetchReportsByType } from '../features/API/reports/reportsSlice';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from '../style/Reports.module.scss';
import ServiceUnavailable from './ServiceUnavailable';

function Reports() {
    // Локальное состояние для отслеживания активной вкладки и хранения информации о файлах
    const [activeTab, setActiveTab] = useState('monthly'); // Активная вкладка
    const [fileInfo, setFileInfo] = useState({}); // Информация о файлах (размер и формат)
    // хук, который возвращает функцию dispatch, позволяющую отправлять действия (actions) в Redux
    const dispatch = useDispatch(); // хук, который возвращает функцию dispatch, позволяющую отправлять действия (actions) в Redux
    const { reports, status, error } = useSelector((state) => state.reports); // Получаем список отчетов и их статус
    const { reportsByType, status: statusByType } = useSelector((state) => state.reports); // Получаем отчеты по типам и их статус

    const tabsContainerRef = useRef(null); // Создаем ссылку на контейнер с вкладками

    // Загружаем данные отчетов и отчетов по типам при первом рендере
    useEffect(() => {
        dispatch(fetchReports()); // Загружаем список отчетов
        dispatch(fetchReportsByType()); // Загружаем отчеты по типам
        window.scrollTo(0, 0); // Прокручиваем страницу наверх при загрузке
    }, [dispatch]);

    // Определяем статичные доступные вкладки
    const tabs = [
        { title: 'Отчеты в Министерство юстиции', value: 'monthly' },
        { title: 'Годовой отчет', value: 'annual' },
        { title: 'Бухгалтерская отчетность', value: 'financial' }
    ];

    // Фильтрация отчетов в зависимости от активной вкладки
    const filteredReports = {
        monthly: Array.isArray(reportsByType) && Array.isArray(reports)
            ? reportsByType
                .filter(report => report.title === "Отчеты в Министерство юстиции" || report.type === "Ежемесячный отчет")
                .map(report => ({ ...report, url_doc: reports.find(r => r.type_report === report.id)?.url_doc }))
            : [],
        annual: Array.isArray(reportsByType) && Array.isArray(reports)
            ? reportsByType
                .filter(report => report.type === "Годовой отчет")
                .map(report => ({ ...report, url_doc: reports.find(r => r.type_report === report.id)?.url_doc }))
            : [],
        financial: Array.isArray(reportsByType) && Array.isArray(reports)
            ? reportsByType
                .filter(report => report.type === "Финансовый отчет")
                .map(report => ({ ...report, url_doc: reports.find(r => r.type_report === report.id)?.url_doc }))
            : []
    };

    // Обработчик смены активной вкладки
    const handleTabClick = (tab) => {
        setActiveTab(tab); // Устанавливаем активную вкладку
        const tabElement = document.querySelector(`[data-tab="${tab}"]`);
        if (tabElement) {
            tabElement.scrollIntoView({ // Прокручиваем вкладку в видимый диапазон
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });
        }
    };

    // Получаем информацию и формате и размере полученного файла с бэка
    useEffect(() => {
        const fetchFileInfo = async () => {
            const newFileInfo = {};
            for (const report of [...filteredReports.monthly, ...filteredReports.annual, ...filteredReports.financial]) {
                if (report.url_doc && !fileInfo[report.url_doc]) {
                    try {
                        const response = await fetch(report.url_doc, { method: 'HEAD' }); // Делаем HEAD запрос для получения заголовков файла
                        const contentLength = response.headers.get('Content-Length'); // Извлекаем размер файла
                        const contentType = response.headers.get('Content-Type'); // Извлекаем тип файла
                        let fileExtension = contentType.split('/').pop(); // Определяем расширение файла
                        const sizeInMB = formatFileSize(contentLength); // Форматируем размер файла в удобный вид

                        newFileInfo[report.url_doc] = {
                            size: sizeInMB,
                            extension: fileExtension,
                        };
                    } catch (error) {
                        console.error('Error fetching file info:', error);
                    }
                }
            }

            if (Object.keys(newFileInfo).length > 0) {
                setFileInfo((prevFileInfo) => ({
                    ...prevFileInfo,
                    ...newFileInfo, // Обновляем информацию о файлах в состоянии
                }));
            }
        };

        fetchFileInfo(); // Вызываем функцию для получения информации о файлах
    }, [filteredReports]);

    // Функция для форматирования размера файла (в байтах, килобайтах, мегабайтах)
    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes < 1024) {
            return `${sizeInBytes} B`;
        } else if (sizeInBytes < 1024 * 1024) {
            return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        } else if (sizeInBytes < 1024 * 1024 * 1024) {
            return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        } else {
            return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }
    };

    // Функция для скачивания файла
    const downloadFile = async (fileUrl) => {
        try {
            const response = await fetch(fileUrl); // Загружаем файл
    
            if (!response.ok) {
                throw new Error('Ошибка при скачивании файла');
            }
    
            const blob = await response.blob(); // Преобразуем ответ в Blob
            const url = window.URL.createObjectURL(blob); // Создаем URL для скачивания файла
            const link = document.createElement('a');
            
            if (window.innerWidth < 767) {
                link.href = url;
                link.download = fileUrl.split('/').pop(); // Определяем название файла для скачивания
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                window.open(url, '_blank'); // Открываем файл в новой вкладке для десктопа
            }
            
            window.URL.revokeObjectURL(url); // Удаляем URL после использования
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
    };

    // Показываем сообщение о загрузке, если отчеты еще не загружены
    if (status === 'loading' || statusByType === 'loading') {
        return <div>Загрузка отчетов...</div>;
    }

    // Показываем сообщение об ошибке, если загрузка отчетов не удалась
    if (status === 'failed' || statusByType === 'failed') {
        return <div>Ошибка при загрузке отчетов</div>;
    }

    // Если сервис недоступен, показываем компонент ServiceUnavailable
    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    return (
        <>
            <Header />
            <div className={`${styles.title__container} container1200`}>
                <h2 className={styles.title__container__textTitle}>Отчеты</h2>
            </div>
            <section className={styles.reports__container}>
                <div className={styles.tabsContainer} ref={tabsContainerRef}>
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={activeTab === tab.value ? styles.activeTab : styles.tab}
                            onClick={() => handleTabClick(tab.value)}
                            data-tab={tab.value}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>
                <div className={styles.tabsUnderline}></div>
                <table className={styles.reports__container__table}>
                    <tbody>
                        {filteredReports[activeTab].map((report, index) => {
                            const fileInfoForReport = fileInfo[report.url_doc] || {};
                            const { size = 'Unknown size', extension = 'Unknown format' } = fileInfoForReport;

                            return (
                                <tr key={index}>
                                    <td>{report.description}</td>
                                    <td>{`${size}, ${extension}`}</td>
                                    <td>
                                        <button
                                            className={styles.reports__container__table__downloadButton}
                                            onClick={() => downloadFile(report.url_doc)}
                                        >
                                            Скачать
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
            <Footer />
        </>
    );
}

export default Reports;