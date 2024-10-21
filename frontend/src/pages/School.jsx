import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CharityContainer from "../components/CharityContainer/CharityContainer";
import { fetchSchool } from "../features/API/school/schoolSlice";
import "../style/school.css";
import ServiceUnavailable from './ServiceUnavailable';

function School() {
    const dispatch = useDispatch();
    const { school, status, error } = useSelector((state) => state.school);

    useEffect(() => {
        dispatch(fetchSchool());
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
            {school && (
                <div className="container__school container1200">
                    <div className="school__title">
                        <h2>{school[0].title}</h2>
                    </div>
                    <div className="school__desc__up">
                        <div className="school__title__block">
                        <div className="school__desc__up__text">
                            <p><b>{school[0].description_rus}</b></p>
                        </div>
                        <div className="school__desc__up__img">
                            <img src={school[0].image} alt="фото детей" />
                        </div>
                        </div>
                    </div>
                    <div className="school__desc__down">
                        <p>{school[0].description_en}</p>
                    </div>
                    <div className="school__help__block">
                        <CharityContainer />
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default School;
