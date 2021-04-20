import firebase from "./firebase-app";
import { appendTemplate } from "./utils";

const renderMenu = (context, products) => {

    const targetElement = context.querySelector('.product');

    targetElement.innerHTML = "";

    products.forEach(product => {

        appendTemplate(targetElement, 'label',

            `
                <div class="over"></div>
                <picture>
                    <img src="${product.image}" width="90" height="70"
                        id="image-product" alt="Pão caseiro">
                </picture>
                <div class="description">
                    <p class="title">${product.title}</p>
                    <span>${product.description}</span>
                </div>
                <div class="price">
                    <span class="value">${product.price}</span>
                    <small>reais</small>
                </div>      
            
            `
        )

    });

}


document.querySelectorAll('#menu').forEach(page => {

    const db = firebase.firestore();

    db.collection('yloveproducts').onSnapshot(snapshot => {

        const products = [];

        snapshot.forEach(item => {
            products.push(item.data());
        })

        renderMenu(page, products);
    });




});;