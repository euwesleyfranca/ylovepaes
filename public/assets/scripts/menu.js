import firebase from "./firebase-app";
import { appendTemplate, moneyFormat } from "./utils";


document.querySelectorAll('#menu').forEach(page => {

    const db = firebase.firestore();

    db.collection('yloveproducts').onSnapshot(snapshot => {

        const products = [];

        snapshot.forEach(item => {
            products.push(item.data());
        })

        renderMenu(page, products);
    });
});

const renderMenu = (context, products) => {

    const targetElement = context.querySelector('.product');

    targetElement.innerHTML = "";

    products.forEach(product => {

        const item = appendTemplate(targetElement, 'label',

            `
                <div class="over"></div>
                <input type="text" name="id_product" value="${product.id}" hidden />
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

        item.addEventListener('click', e => {
            item.querySelector('[type=text]').addEventListener('click', event => {

                const { value } = event.target;

                const colection = products.filter((option) => {

                    return (Number(option.id) === Number(value));

                })[0];

                console.log(teste);
                //countProd.innerHTML = colection;
            });




        });

    });

}

