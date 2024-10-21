import MapComponent from "../Footer/MapComponent";
import DirectorateCard from "./DirectorateCard/DirectorateCard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { fetchExperts } from '../../features/API/experts/expertsSlice';
import { fetchContacts } from '../../features/API/contacts/contactsSlice';
import './PageContacts.scss';
import 'swiper/css';


function PageContact() {
    const dispatch = useDispatch();
    
    const experts = useSelector((state) => state.experts.experts);
    const expertsStatus = useSelector((state) => state.experts.status);
    const error = useSelector((state) => state.experts.error);

    const contactStatus = useSelector((state) => state.contacts.status);
    const contact = useSelector((state) => state.contacts.contact);
    const contactError = useSelector((state) => state.contacts.error);

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

    useEffect(() => {
        if (contactStatus === 'idle') {
            dispatch(fetchContacts());
        }

        if (expertsStatus === 'idle') {
            dispatch(fetchExperts());
        }
    }, [contactStatus, expertsStatus, dispatch]);
   
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (expertsStatus === 'loading') {
        return <p>Loading experts...</p>;
    }

    if (expertsStatus === 'failed') {
        return <p>Error: {error}</p>;
    }

    if (contactStatus === 'loading') {
        return <p>Loading contacts...</p>;
    }

    if (contactStatus === 'failed') {
        return <p>Error: {contactError}</p>;
    }

    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    // Функция для валидации и форматирования номера телефона
    function formatPhoneNumber(phoneNumber) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      
        if (cleaned.length === 11 && cleaned.startsWith('7')) {
            const country = cleaned[0];
            const code = cleaned.slice(1, 4);
            const part1 = cleaned.slice(4, 7);
            const part2 = cleaned.slice(7, 9);
            const part3 = cleaned.slice(9, 11);
        
            return `+${country} (${code}) ${part1}-${part2}-${part3}`;
        } else {
            return phoneNumber;
        }
    }

    return ( 
        <>
            <div className="contactsPage__container">
                <h2 className="contactsPage__title">КОНТАКТЫ</h2>

                {contactStatus === 'succeeded' && contact && contact.length > 0 && (
                    <div className="contactsPage__top">
                        <ul className="contactsPage__connect connection">
                            <li className="connection__item">
                                <span className="connection__type">Адрес</span>
                                <p className="connection__value">{contact[0].address}</p>
                            </li>
                            <li className="connection__item">
                                <span className="connection__type">Телефон</span>
                                <a href={`tel:${contact[0].phone_number}`} className="connection__phone">
                                    {formatPhoneNumber(contact[0].phone_number)}
                                </a>
                            </li>
                            <li className="connection__item">
                                <span className="connection__type">Email</span>
                                <a href={`mailto:${contact[0].email}`} className="connection__email">{contact[0].email}</a>
                            </li>
                        </ul>
                        <div className="conatctsPage__schedule schedule">
                            <p className="schedule__time">{contact[0].working_hours}</p>
                            <p className="schedule__days">{contact[0].working_days}</p>
                        </div>
                    </div>
                )}

                <div className="contactsPage__map">
                    <MapComponent zoomValue={isMobileView ? 16 : 18} />
                </div>

                <div className="contactsPage__bottom employee">
                    <h3 className="employee__title">К КОМУ ОБРАТИТЬСЯ </h3>
                    <div className="employee__list">
                        {isMobileView ? (
                            <Swiper
                                modules={[Pagination]}
                                spaceBetween={46}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                            >
                                {experts.slice(0, 4).map((expert, index) => (
                                    <SwiperSlide key={index}>
                                        <DirectorateCard
                                            key={index}
                                            image={expert.image}
                                            imgAlt={`${expert.surname} ${expert.name} ${expert.patronymic}`}
                                            name={expert.name}
                                            surname={expert.surname}
                                            patronymic={expert.patronymic}
                                            jobTitle={expert.job_title}
                                            responsibilities={expert.responsibilities}
                                            phone={formatPhoneNumber(expert.phone_number)}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            experts.slice(0, 4).map((expert, index) => (
                                <DirectorateCard
                                    key={index}
                                    image={expert.image}
                                    imgAlt={`${expert.surname} ${expert.name} ${expert.patronymic}`}
                                    name={expert.name}
                                    surname={expert.surname}
                                    patronymic={expert.patronymic}
                                    jobTitle={expert.job_title}
                                    responsibilities={expert.responsibilities}
                                    phone={formatPhoneNumber(expert.phone_number)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PageContact;
