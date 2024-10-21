import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CharityContainer from "../components/CharityContainer/CharityContainer";
import { fetchWorkshop } from "../features/API/workshop/workshopSlice";
import "../style/workshops.css";
import ServiceUnavailable from './ServiceUnavailable';

function Workshops() {
  const dispatch = useDispatch();
  const { workshop, status, error } = useSelector((state) => state.workshop);

  useEffect(() => {
    dispatch(fetchWorkshop());
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
        {workshop && (
            <div className="container__workshops container1200">
                <div className="workshops__title">
                    <h2>{workshop[0].title}</h2>
                </div>
                <div className="workshops__desc__up">
                    <div className="workshops__title__block">
                    <div className="workshops__desc__up__text">
                        <p><b>{workshop[0].description_rus}</b></p>
                    </div>
                    <div className="workshops__desc__up__img">
                        <img src={workshop[0].image} alt="фото детей" />
                    </div>
                    </div>
                </div>
                <div className="workshops__desc__down">
                    <p>{workshop[0].description_en}</p>
                </div>
                <div className="workshops__help__block">
                    <CharityContainer />
                </div>
            </div>
        )}
        <Footer />
    </>
  );
}

export default Workshops;