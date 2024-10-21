import React from "react";
import { Link } from "react-router-dom";
import "../style/serviceUnavailable.css";
import "../style/App.scss"


function ServiceUnavailable() {
    return (
        <>
            <div className="container">
                <div className="serviceUnavailable__block__img">
                    <img src="/503.webp" alt="ошибка" />
                </div>
                <div className="serviceUnavailable__block__title">
                    <div className="serviceUnavailable__block__title_left">
                        <Link className="serviceUnavailable__logo__home" to="/">
                            <img src="/header_footer/logo.png" alt="" />
                        </Link>
                    </div>
                    <div className="serviceUnavailable__block__title__right">
                        <h2>Сервис не отвечает...</h2>
                        <p>Решаем проблему</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceUnavailable;
