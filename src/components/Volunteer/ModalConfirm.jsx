import React from "react";
import "./modalConfirm.css";

function ModalConfirm({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal__container__confirm" onClick={onClose}>
            <div
                className="modal__content__confirm"
                onClick={(e) => e.stopPropagation()}>
                <div className="modal__block__confirm">
                    <div className="modal__image__confirm">
                        <img src="/message_gonfirm.png" alt="Успех" />
                    </div>
                    <div className="modal__text__confirm">
                        <h2>Спасибо! Заявка отправлена.</h2>
                        <p>В ближайшее время мы с Вами свяжемся!!</p>
                        <button
                            className="modal__btn__confirm"
                            onClick={onClose}>
                            Хорошо
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;
