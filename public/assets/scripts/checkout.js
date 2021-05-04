import { appendSummaryTemplate, moneyFormat } from "./utils";
import Imask from "imask";

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

const cardCvvValue = []

checkout.querySelectorAll('#form').forEach(page => {

    const cardName = page.querySelector('#credit_card_name')
    const cardNumber = page.querySelector('#credit_card_number')
    const cardExpire = page.querySelector('#credit_card_validate')
    const cardCvv = page.querySelector('#credit_card_code')
    const messageValidate = page.querySelector('.messageCard');
    messageValidate.innerHTML = ''
    const btnPay = page.querySelector('#btn_insert_card')
    btnPay.disabled = true;

    const data = new Date();
    const month = ("0" + (data.getMonth())).slice(-2);
    const year = data.getFullYear() % 100;

    new Imask(cardNumber, {
        mask: '0000 0000 0000 0000'
    })

    new Imask(cardExpire, {
        mask: '00/00'
    })

    new Imask(cardCvv, {
        mask: '000[0]'
    })

    cardName.addEventListener('change', e => {
        const cardNameLength = e.target.value.length
        if (cardNameLength <= 0 || cardNameLength == null) {
            console.log('zero não pode');
            console.log(cardNameLength);
        }
    })

    cardNumber.addEventListener('change', e => {
        const cardNumberLength = e.target.value.length

    })

    cardExpire.addEventListener('change', e => {
        const cardExpireValue = e.target.value

        const value = cardExpireValue.split('/');

        if (value[1] < year || value[0] < month) {
            messageValidate.innerHTML = 'Cartão inválido, entre em contato com sua operadora'
        }

    })

});

