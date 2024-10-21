import './donationButton.scss';

export function DonationButton({donationValue}) {       
    const donationText = typeof donationValue === 'number' ? donationValue + ' ₽' : donationValue;

    function onClickDonation() {
        if (typeof donationValue === 'number') {
            confirm(`пожертвовать ${donationValue} рублей?`);
        } else {
            prompt('введите сумму пожертвования:', 0);
        }        
    }

    return (
       <button className='donation__button' onClick={onClickDonation}>
            {donationText} 
       </button>
    );
}
