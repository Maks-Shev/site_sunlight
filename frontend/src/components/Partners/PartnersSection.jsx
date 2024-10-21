import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./partnersSection.css";
import "../../style/App.scss";
import LinkStar from "../UI/TitleBlock/LinkStar";
import TitleBlock from "../UI/TitleBlock/TitleBlock";
import { fetchPartners } from "../../features/API/partners/partnersSlice";
import ServiceUnavailable from '../../pages/ServiceUnavailable';

function PartnersSection() {
    const dispatch = useDispatch();
    const { partners, status, error } = useSelector((state) => state.partners);

    const [shouldDisplayLink, setShouldDisplayLink] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPartners());
        }
    }, [dispatch, status]);

    useEffect(() => {
        const handleResize = () => {
            setShouldDisplayLink(window.innerWidth <= 576);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (status === "loading") {
        return <p>Загрузка партнёров...</p>;
    }

    if (status === "failed") {
        return <p>Ошибка загрузки партнёров.</p>;
    }

    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    // Добавляем placeholders, если партнёров меньше 12
    const displayedPartners = [...partners];
    while (displayedPartners.length < 12) {
        displayedPartners.push({
            id: `placeholder-${displayedPartners.length}`,
            title: "Placeholder",
            image: "",
            url: "#",
        });
    }

    return (
        <div className="partners__section__container container">
            <div className="partners__section">
                <div className="partners__section__link__block">
                    <div className="partners__section__link__block__title">
                        <TitleBlock className="link__partners" title="Партнеры" />
                        {!shouldDisplayLink && (
                            <LinkStar linkText="Посмотреть всех" linkHref="/partners" />
                        )}
                    </div>
                </div>
            </div>
            <div className="partners__section__logos">
                {displayedPartners.map((partner, index) =>
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
            <div className="continer__partners__section__link__block__adaptive">
                {shouldDisplayLink && (
                    <LinkStar linkText="Посмотреть всех" linkHref="/partners" />
                )}
            </div>
        </div>
    );
}

export default PartnersSection;