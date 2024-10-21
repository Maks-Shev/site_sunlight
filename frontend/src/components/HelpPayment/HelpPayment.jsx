import { NavLink } from "react-router-dom";
import "./HelpPayment.scss";

export function HelpPayment() {
    return (
        <div className="help__sub">
            <div className="help__payment payment">
                <h3 className="payment__title">Реквизиты</h3>
                <ul className="payment__list">
                    <li className="payment__item">
                        <p className="payment__value">
                            <span className="payment__type">ИНН</span>
                            6382997402
                        </p>
                    </li>
                    <li className="payment__item">
                        <p className="payment__value">
                            <span className="payment__type">КПП</span>
                            632101001
                        </p>
                    </li>
                    <li className="payment__item">
                        <p className="payment__value">
                            <span className="payment__type">ОГРН</span>
                            1146300000571
                        </p>
                    </li>
                    <li className="payment__item">
                        <p className="payment__value">
                            <span className="payment__type">Р/С</span>
                            40703810911240000417
                        </p>
                    </li>
                    <li className="payment__item">
                        <p className="payment__type">
                            филиал Центральный банка ВТБ (ПАО)
                        </p>
                    </li>
                    <li className="payment__item">
                        <p className="payment__value">
                            <span className="payment__type">К/СЧ</span>
                            30101810145250000411
                        </p>
                    </li>
                    <li className="payment__item">
                        <p className="payment__value">
                            <span className="payment__type">БИК банка</span>
                            044525411
                        </p>
                    </li>
                    <li className="payment__item">
                        <p className="payment__value">
                            <span className="payment__type">ЮР. АДРЕС</span>
                            445040, Самарская обл., г. Тольятти, бульвар
                            Туполева, дом 6.
                        </p>
                    </li>
                </ul>
            </div>
            <div className="help__volunteer volunteer">
                <h3 className="volunteer__title">
                    Узнайте, как стать волонтером в центре «Солнечный круг»
                </h3>
                <NavLink to="/volunteer" className="volunteer__btn">
                    Стать волонтером
                </NavLink>
            </div>
        </div>
    );
}

export default HelpPayment;
