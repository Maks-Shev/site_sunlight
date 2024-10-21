import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetrics } from '../features/API/metrika/metricsSlice';

const MetricsComponent = () => {
    const dispatch = useDispatch();

    // Данные Посещаемости
    const { data: trafficData, status: trafficStatus, error: trafficError } = useSelector((state) => state.metrika.traffic);

    // Данные Географии
    const { data: geoData, status: geoStatus, error: geoError } = useSelector((state) => state.metrika.geo);

    // Данные Глубины просмотра
    const { data: deepnessData, status: deepnessStatus, error: deepnessError } = useSelector((state) => state.metrika.deepness);

    // Данные Времени на сайте
    const { data: deepnessTimeData, status: deepnessTimeStatus, error: deepnessTimeError } = useSelector((state) => state.metrika.deepnessTime);

    // Данные Браузеров
    const { data: browsersData, status: browsersStatus, error: browsersError } = useSelector((state) => state.metrika.browsers);

    // Данные Операционных систем
    const { data: platformsData, status: platformsStatus, error: platformsError } = useSelector((state) => state.metrika.platforms);

    // Данные Устройств
    const { data: devicesData, status: devicesStatus, error: devicesError } = useSelector((state) => state.metrika.devices);

    useEffect(() => {
        const fetchAllMetrics = async () => {
            // Вызов для Посещаемости
            await dispatch(fetchMetrics({
                type: 'traffic',
                preset: 'traffic',
                dimensions: 'ym:s:datePeriod<group>',
                metrics: 'ym:s:visits,ym:s:users,ym:s:pageviews,ym:s:percentNewVisitors,ym:s:bounceRate,ym:s:pageDepth,ym:s:avgVisitDurationSeconds',
            }));
            // Задержка перед следующим запросом
            await new Promise(resolve => setTimeout(resolve, 1000));
        
            // Вызов для Географии
            await dispatch(fetchMetrics({
                type: 'geo',
                preset: 'geo_country',
                dimensions: 'ym:s:regionCountry,ym:s:regionArea,ym:s:regionCity',
                metrics: 'ym:s:visits,ym:s:users,ym:s:bounceRate,ym:s:pageDepth,ym:s:avgVisitDurationSeconds',
            }));
            // Задержка перед следующим запросом
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Вызов для Глубины просмотра
            await dispatch(fetchMetrics({
                type: 'deepness',
                preset: 'deepness_depth',
                dimensions: 'ym:s:pageViewsInterval',
                metrics: 'ym:s:visits,ym:s:users,ym:s:bounceRate,ym:s:pageDepth,ym:s:avgVisitDurationSeconds',
            }));
            // Задержка перед следующим запросом
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Вызов для Время на сайте
            await dispatch(fetchMetrics({
                type: 'deepnessTime',
                preset: 'deepness_time',
                dimensions: 'ym:s:visitDurationInterval',
                metrics: 'ym:s:visits,ym:s:users,ym:s:bounceRate,ym:s:pageDepth,ym:s:avgVisitDurationSeconds',
            }));
            // Задержка перед следующим запросом
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Вызов для Браузеры
            await dispatch(fetchMetrics({
                type: 'browsers',
                preset: 'tech_browsers',
                dimensions: 'ym:s:browser,ym:s:browserAndVersionMajor,ym:s:browserAndVersion',
                metrics: 'ym:s:visits,ym:s:users,ym:s:bounceRate,ym:s:pageDepth,ym:s:avgVisitDurationSeconds',
            }));
            // Задержка перед следующим запросом
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Вызов для Операционные системы
            await dispatch(fetchMetrics({
                type: 'platforms',
                preset: 'tech_platforms',
                dimensions: 'ym:s:operatingSystemRoot,ym:s:operatingSystem',
                metrics: 'ym:s:visits,ym:s:users,ym:s:bounceRate,ym:s:pageDepth,ym:s:avgVisitDurationSeconds',
            }));
            // Задержка перед следующим запросом
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Вызов для Устройства
            await dispatch(fetchMetrics({
                type: 'devices',
                preset: 'tech_devices',
                dimensions: 'ym:s:deviceCategory,ym:s:mobilePhone,ym:s:mobilePhoneModel',
                metrics: 'ym:s:visits,ym:s:users,ym:s:bounceRate,ym:s:pageDepth,ym:s:avgVisitDurationSeconds',
            }));
        };
        fetchAllMetrics();
    }, [dispatch]);

    // Функция для отображения данных и обработки ошибок
    const renderDataSection = (status, data, error, title) => {
        return (
            <section>
                <h2>{title}</h2>
                {status === 'loading' && <p>Loading {title.toLowerCase()} data...</p>}
                {status === 'failed' && <p>Error: {error?.message || JSON.stringify(error)}</p>}
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </section>
        );
    };

    return (
        <div>
            <h1>Metrics Data</h1>
            {renderDataSection(trafficStatus, trafficData, trafficError, "Посещаемость")}
            {renderDataSection(geoStatus, geoData, geoError, "География")}
            {renderDataSection(deepnessStatus, deepnessData, deepnessError, "Глубина просмотра")}
            {renderDataSection(deepnessTimeStatus, deepnessTimeData, deepnessTimeError, "Время на сайте")}
            {renderDataSection(browsersStatus, browsersData, browsersError, "Браузеры")}
            {renderDataSection(platformsStatus, platformsData, platformsError, "Операционные системы")}
            {renderDataSection(devicesStatus, devicesData, devicesError, "Устройства")}
        </div>
    );
};

export default MetricsComponent;