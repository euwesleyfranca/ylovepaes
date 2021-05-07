import { appendSummaryTemplate, cardNumberMask, cardExpireMask, cardCvvMask, clearDisplay, moneyFormat } from "./utils";

const checkout = document.querySelector('#checkout');
const btnCheckout = document.querySelector('#btn_next');
const closeCheckout = checkout.querySelector('.close_checkout');

btnCheckout.addEventListener('click', event => {
    checkout.classList.add('active');
});

closeCheckout.addEventListener('click', event => {
    checkout.classList.remove('active');
});

export function summaryProductList(context, items) {

    items.forEach(item => {
        appendSummaryTemplate(context, 'label',
            `            
             <small class="title">${item.title}</small>
             <small class="price">${moneyFormat(item.price)}</small>
             <img id="trash_product_list" src="./assets/images/icons/trash.svg" width="16px" height="16px" alt="trash" />
            `
        )
    })
}

document.querySelectorAll('#checkout').forEach(checkout => {
    const creditCardName = checkout.querySelector('#credit_card_name')
    const placeCardName = checkout.querySelector('.name-place');
    placeCardName.innerHTML = ''

    const cardNumber = checkout.querySelector('#credit_card_number')
    const placeNumberCard = checkout.querySelector('.number-place')
    placeNumberCard.innerHTML = ''

    const cardValidate = checkout.querySelector('#credit_card_validate')
    const placeCardValidate = checkout.querySelector('.valid-place')
    placeCardValidate.innerHTML = ''

    const cardCvv = checkout.querySelector('#credit_card_code')
    const placeCardCvv = checkout.querySelector('.cod-place')
    placeCardCvv.innerHTML = ''

    const message = checkout.querySelector('#insert_the_card');
    message.innerHTML = 'Digite os dados do seu cartão';

    const btnPay = checkout.querySelector('#btn_insert_card');

    cardNumber.disabled = true
    cardValidate.disabled = true
    cardCvv.disabled = true

    creditCardName.addEventListener('keyup', e => {
        placeCardName.innerHTML = e.target.value
        message.innerHTML = ''
        cardNumber.disabled = false

        if (e.target.value == 0) {
            message.innerHTML = 'Digite os dados do seu cartão'
            cardNumber.disabled = true
        }
    })

    cardNumber.addEventListener('keyup', e => {
        placeNumberCard.innerHTML = e.target.value
        cardValidate.disabled = false

        if (e.target.value == 0) {
            cardValidate.disabled = true
        }

    })

    cardValidate.addEventListener('keyup', e => {
        placeCardValidate.innerHTML = e.target.value
        cardCvv.disabled = false

        if (e.target.value == 0) {
            cardCvv.disabled = true
        }
    })

    cardCvv.addEventListener('keyup', e => {
        placeCardCvv.innerHTML = e.target.value
        btnPay.disabled = false

        if (e.target.value == 0) {
            btnPay.disabled = true
        }
    })

    checkout.querySelectorAll('#form').forEach(page => {

        const cardName = page.querySelector('#credit_card_name')
        const cardNumber = page.querySelector('#credit_card_number')
        const cardExpire = page.querySelector('#credit_card_validate')
        const cardCvv = page.querySelector('#credit_card_code')
        const display = document.querySelector('.dataDisplay');
        const total = display.querySelector('.total');
        const message = document.querySelector('#insert_the_card');
        const btnPay = page.querySelector('#btn_insert_card');

        cardNumberMask(cardNumber)
        cardExpireMask(cardExpire)
        cardCvvMask(cardCvv)

        btnPay.addEventListener('click', event => {
            event.preventDefault()

            clearDisplay(placeCardName, placeNumberCard, placeCardValidate, placeCardCvv, total)

            setTimeout(() => {
                message.innerHTML = 'processando pagamento...'
            }, 1000);

            setTimeout(() => {
                message.innerHTML = `<img src="./assets/images/icons/approved.svg" width="50px" height="50px" alt="approved icon" /> <span style="color:white;">APROVADO</span>`
            }, 5000);

            setTimeout(() => {
                message.innerHTML = 'Agradecemos por escolher a Ylove Pães, bom apetite'
            }, 10000);

            setTimeout(() => {
                window.location.href = "orders.html";
            }, 15000);

        })
    });

})







