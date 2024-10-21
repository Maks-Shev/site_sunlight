import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CharityContainer from "../components/CharityContainer/CharityContainer";
import { fetchSrv } from "../features/API/srv/srvSlice";
import "../style/srv.css";
import ServiceUnavailable from "./ServiceUnavailable";

function Srv() {
    const dispatch = useDispatch();
    const { srv, status, error } = useSelector((state) => state.srv);

    useEffect(() => {
        dispatch(fetchSrv());
    }, [dispatch]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "failed") {
        return <p>{error}</p>;
    }

    if (error && error.includes("Сервис временно недоступен")) {
        return <ServiceUnavailable />;
    }

    return (
        <>
            <Header />
            {srv && (
                <div className="container__srv container1200">
                    <div className="srv__title">
                        <h2>{srv[0].title}</h2>
                    </div>
                    <div className="srv__desc__up">
                        <div className="srv__title__block">
                            <div className="srv__desc__up__text">
                                <p>
                                    {srv[0].description_rus}
                                </p>
                            </div>
                            <div className="srv__desc__up__img">
                                <img src={srv[0].picture} alt="фото детей" />
                            </div>
                        </div>
                    </div>
                    <div className="srv__desc__down">
                        <p>{srv[0].description_en}</p>
                    </div>
                    <div className="srv__help__block">
                        <CharityContainer />
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Srv;
