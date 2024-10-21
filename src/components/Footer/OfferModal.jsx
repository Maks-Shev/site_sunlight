import React from "react";
import "./dataOfferModal.modul.css";

function OfferModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal__container" onClick={onClose}>
            <div
                className="modal__content"
                onClick={(e) => e.stopPropagation()}>
                <span
                    className="modal__close"
                    onClick={onClose}>
                    &times;
                </span>
                <div className="modal__text">
                    <h2>УСЛОВИЯ СЕРВИСА СБОРА ПОЖЕРТВОВАНИЙ</h2>

                    <p>Публичная оферта о заключении договора пожертвования</p>
                    <p>
                        Автономная некоммерческая общеобразовательная
                        организация «Комплексный общеобразовательный центр для
                        детей с нарушениями развития «Солнечный круг» в лице
                        директора Теряева Андрея Михайловича
                    </p>
                    <p>
                        предлагает гражданам сделать пожертвование на ниже
                        приведенных условиях:
                    </p>
                    <p>
                        1. Общие положения <br />
                        1.1. В соответствии с п. 2 ст. 437 Гражданского кодекса
                        Российской Федерации данное предложение является
                        публичной офертой (далее – Оферта). <br />
                        1.2. В настоящей Оферте употребляются термины, имеющие
                        следующее значение: «Пожертвование» – «дарение вещи или
                        права в общеполезных целях»; «Жертвователь» – «граждане,
                        делающие пожертвования»; «Получатель пожертвования» –
                        АНОО «Солнечный круг».
                    </p>
                    <p>
                        1.3. Оферта действует бессрочно с момента размещения ее
                        на сайте Получателя пожертвования. <br />
                        1.4. Получатель пожертвования вправе отменить Оферту в
                        любое время путем удаления ее со страницы своего сайта в
                        Интернете. <br />
                        1.5. Недействительность одного или нескольких условий
                        Оферты не влечет недействительность всех остальных
                        условий Оферты.
                    </p>
                    <p>
                        2. Существенные условия договора пожертвования: <br />
                        2.1. Пожертвование используется на содержание и ведение
                        уставной деятельности Получателя пожертвования. <br />
                        2.2. Сумма пожертвования определяется Жертвователем.
                    </p>
                    <p>
                        3. Порядок заключения договора пожертвования: <br />
                        3.1. В соответствии с п. 3 ст. 434 Гражданского кодекса
                        Российской Федерации договор пожертвования заключается в
                        письменной форме путем акцепта Оферты Жертвователем.{" "}
                        <br />
                        3.2. Оферта может быть акцептована путем перечисления
                        Жертвователем денежных средств в пользу Получателя
                        пожертвования платежным поручением по реквизитам,
                        указанным в разделе 5 Оферты, с указанием в строке
                        «назначение платежа»: «пожертвование на содержание и
                        ведение уставной деятельности», а также с использованием
                        пластиковых карт, электронных платежных систем и других
                        средств и систем, позволяющих Жертвователю перечислять
                        Получателю пожертвования денежных средств. <br />
                        3.3. Совершение Жертвователем любого из действий,
                        предусмотренных п. 3.2. Оферты, считается акцептом
                        Оферты в соответствии с п. 3 ст. 438 Гражданского
                        кодекса Российской Федерации. <br />
                        3.4. Датой акцепта Оферты – датой заключения договора
                        пожертвования является дата поступления пожертвования в
                        виде денежных средств от Жертвователя на расчетный счет
                        Получателя пожертвования.
                    </p>
                    <p>
                        4. Заключительные положения: <br />
                        4.1. Совершая действия, предусмотренные настоящей
                        Офертой, Жертвователь подтверждает, что ознакомлен с
                        условиями Оферты, целями деятельности Получателя
                        пожертвования, осознает значение своих действий и имеет
                        полное право на их совершение, полностью и безоговорочно
                        принимает условия настоящей Оферты. <br />
                        4.2. Настоящая Оферта регулируется и толкуется в
                        соответствии с действующим российском законодательством.
                    </p>
                    <p>5. Подпись и реквизиты Получателя пожертвования</p>
                    <p>
                        Автономная некоммерческая общеобразовательная
                        организация «Комплексный общеобразовательный центр для
                        детей с нарушениями развития «Солнечный круг»
                    </p>
                    <p>
                        ОГРН: 1146300000571 <br />
                        ИНН/КПП: 6382997402/632101001 <br />
                        Адрес места нахождения: 445040, Самарская обл., г.
                        Тольятти, б-р Туполева д. 6, вход со стороны ул.
                        Свердлова
                    </p>
                    <p>
                        Банковские реквизиты: <br />
                        Номер банковского счёта: 40703810911240000417 <br />
                        Банк: ФИЛИАЛ БАНКА ВТБ (ПАО) В Г. НИЖНЕМ НОВГОРОДЕ{" "}
                        <br />
                        БИК банка: 042202837 <br />
                        Номер корреспондентского счёта банка:
                        30101810200000000837
                    </p>
                    <p>
                        Директор <br />
                        Теряев Андрей Михайлович
                    </p>
                    <strong>
                        АНОО «Солнечный круг» благодарит каждого, кто отзовется,
                        за оказание помощи детям с тяжелыми нарушениями
                        развития.
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default OfferModal;