import { appendSummaryTemplate, moneyFormat } from "./utils";

const checkout = document.querySelector('#checkout');
const btnCheckout = document.querySelector('#btn_next');
const closeCheckout = checkout.querySelector('.close_checkout');

btnCheckout.addEventListener('click', event => {
    checkout.classList.add('active');
});

closeCheckout.addEventListener('click', event => {

    checkout.classList.remove('active');

});


const summary = document.querySelector('.summary');
//summary.innerHTML = ''

export function summaryProductList(itens) {

    itens.forEach(product => {

        appendSummaryTemplate(summary, 'label',

            `            
             <small class="title">${product.title}</small>
             <small class="price">${moneyFormat(product.price)}</small>
             <img src="./assets/images/icons/trash.svg" width="16px" height="16px" alt="trash" />
            `
        )
    })
}