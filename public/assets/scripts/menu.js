import { summaryProductList } from "./checkout";
import firebase from "./firebase-app";
import { appendMenuTemplate, appendSummaryTemplate, appendTemplate } from "./utils";

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

        const item = appendMenuTemplate(productList, 'label',

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

        item.querySelector('input').addEventListener('click', e => {
            const element = e.target.value;

            const prod = productOptions.filter((option) => {
                return (Number(option.id) === Number(element))
            })[0];

            productSummary.push(prod.id)
            renderProductsSummary(context, productOptions)
        })
    });
}


const renderProductsSummary = (context, productOptions) => {

    const result = productSummary.map(id => {

        return productOptions.filter((item) => {
            return Number(item.id) === Number(id)
        })[0]

    })

    summaryProductList(result); // retornando produtos duplicados , verificar
}




