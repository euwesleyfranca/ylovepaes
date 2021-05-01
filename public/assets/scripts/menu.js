import firebase from "./firebase-app";
import { appendTemplate } from "./utils";

let productSummary = [];

document.querySelectorAll('#container').forEach(page => {
    const db = firebase.firestore();

    db.collection('yloveproducts').onSnapshot(snapshot => {

        const products = [];

        snapshot.forEach(item => {
            products.push(item.data());
        })

        renderMenu(page, products);
    });
})

const renderMenu = (context, productOptions) => {

    const productList = context.querySelector('.products');
    productList.innerHTML = "";

    productOptions.forEach(product => {

        const item = appendTemplate(productList, 'label',

            `<div class="item_overlay"></div>
                <input type="text" name="id" value="${product.id}" hidden />
                <img src="${product.image}" height="70px" width="44px" alt="Pão caseiro em São Paulo " />
             <div class="description">
                <p>${product.title}</p>
                <small>${product.description}</small>
             </div>
             <div class="price">
                <p>${product.price}</p>
                <small>Reais</small>
             </div>
            `
        )

        item.addEventListener('click', e => {
            const element = e.target;
            const id = element.value;

            const prod = productOptions.filter((option) => {
                return (Number(option.id) === Number(id))
            })
            console.log(prod);
        })
    });
}

const renderProductsSummary = () => { }



const checkout = document.querySelector('#checkout');
const btnCheckout = document.querySelector('#btn_next');
const closeCheckout = checkout.querySelector('.close_checkout');

btnCheckout.addEventListener('click', event => {
    checkout.classList.add('active');
});

closeCheckout.addEventListener('click', event => {

    checkout.classList.remove('active');

});

