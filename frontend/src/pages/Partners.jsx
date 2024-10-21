import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "../style/partners.css";
import CharityContainer from "../components/CharityContainer/CharityContainer";
import PaginationNum from '../components/UI/PaginationNum/PaginationNum';
import { fetchPartners } from "../features/API/partners/partnersSlice";
import ServiceUnavailable from './ServiceUnavailable';

function Partners() {
    const dispatch = useDispatch(); // хук, который возвращает функцию dispatch, позволяющую отправлять действия (actions) в Redux
    const { partners, status, error } = useSelector((state) => state.partners); // Достаём список партнёров, статус загрузки и возможную ошибку из Redux-хранилища

    const [currentPage, setCurrentPage] = useState(1); // Состояние для хранения текущей страницы в пагинации
    const partnersPerPage = 16; // Количество партнёров на одной странице

    // Загружаем партнёров, если статус — "idle" (данные ещё не загружены)
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPartners());
        }
    }, [dispatch, status]);

    // Индексы для получения текущих партнёров на выбранной странице
    const indexOfLastPartner = currentPage * partnersPerPage;
    const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
    const currentPartners = partners.slice(indexOfFirstPartner, indexOfLastPartner); // Получаем партнёров для текущей страницы

    const totalPages = Math.ceil(partners.length / partnersPerPage); // Общее количество страниц для пагинации

    // Обработчик для смены страницы в пагинации
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Прокрутка страницы наверх при смене страницы
    useEffect(() => {
        window.scrollTo({ top: 100, behavior: "smooth" });
    }, [currentPage]);

    // Отображение загрузки, пока данные партнёров не загружены
    if (status === "loading") {
        return <p>Загрузка партнёров...</p>;
    }

    // Обработка ошибки загрузки данных
    if (status === "failed") {
        return <p>Ошибка загрузки партнёров.</p>;
    }

    // Если сервис недоступен, отображаем страницу с ошибкой
    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    return (
        <>
            <Header />
            <div className="container__partners container1200">
                <div className="partners__page">
                    <div className="partners__header">
                        <h2>ПАРТНЕРЫ</h2>
                    </div>
                    <div className="partners__desc">
                        <p>
                            <b>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Etiam quis rutrum lacus. Mauris
                                faucibus ligula eu euismod lacinia. Interdum et
                                malesuada fames ac ante ipsum primis in
                                faucibus.

                            </b>
                        </p>
                        <p>
                            Donec vestibulum mi et orci maximus auctor. Integer
                            imperdiet erat vel purus pretium, ut venenatis urna
                            tincidunt. Nam maximus ultrices fringilla. Ut
                            malesuada euismod elit id volutpat. Quisque eu neque
                            interdum, posuere nulla at, tempor mi. Praesent
                            convallis interdum est, non cursus sapien rutrum et.
                            Vestibulum tristique eleifend efficitur. Nullam mi
                            orci, dignissim a varius eget, consequat quis
                            lectus. Maecenas pharetra tincidunt gravida. Morbi
                            et aliquet felis, vitae consequat nibh. Fusce id
                            facilisis erat. Phasellus at sem libero. Nam erat
                            leo, convallis a consequat sit amet, condimentum ut
                            nunc.

                        </p>
                    </div>
                    <div className="container__partners__logo">
                        <div className="partners__logo">
                            {currentPartners.map((partner, index) =>
                                partner.image ? (
                                    <div key={index} className="partner">
                                        <a href={partner.url} target="_blank" rel="noopener noreferrer">
                                            <img src={partner.image} alt={partner.title} />
                                        </a>
                                    </div>
                                ) : (
                                    <div key={index} className="placeholder"></div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="pagination__partners">
                        <PaginationNum
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>

                    <div className="help__block">
                        <CharityContainer />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Partners;
