import './DirectorateCard.scss';
import { useState } from 'react';

function DirectorateCard({ image, imgAlt, name, surname, patronymic, jobTitle, responsibilities, phone }) {
    const [imgSrc, setImgSrc] = useState(image);
    const telHref = `tel:${phone}`;
    const fullName = `${surname} ${name} ${patronymic}`;


    const handleImageError = () => {
        setImgSrc(`/img/contacts/directorate/${surname.toLowerCase()}.webp`);
    };

    return (
        <div className='directorateCard'>
            <img
                className='directorateCard__photo'
                src={imgSrc}
                alt={imgAlt || fullName}
                onError={handleImageError}
            />
            <div className='directorateCard__content'>
                <p className='directorateCard__name'>{fullName}</p>
                <p className='directorateCard__position'>{jobTitle}</p>
                {responsibilities && (
                    <p className='directorateCard__topic'>{responsibilities}</p>
                )}
                <a href={telHref} className='directorateCard__phone'>{phone}</a>
            </div>
        </div>
    );
}

export default DirectorateCard;