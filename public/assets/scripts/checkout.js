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


export function summaryProductList(context, items) {

    items.forEach(item => {

        appendSummaryTemplate(context, 'label',
            `            
             <small class="title">${item.title}</small>
             <small class="price">${moneyFormat(item.price)}</small>
             <img src="./assets/images/icons/trash.svg" width="16px" height="16px" alt="trash" />
            `
        )

    })
}