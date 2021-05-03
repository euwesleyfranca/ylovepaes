import { summaryProductList } from "./checkout";
import firebase from "./firebase-app";
import { appendMenuTemplate } from "./utils";

let productSummary = [];

document.querySelectorAll('#index').forEach(page => {
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
                <input type="checkbox" name="id" value="${product.id}"  />
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

        item.querySelector('[type=checkbox]').addEventListener('change', e => {
            const { checked, value } = e.target;

            if (checked) {

                const prod = productOptions.filter((option) => {
                    return (Number(option.id) === Number(value))
                })[0];

                productSummary.push(prod.id)

            } else {
                productSummary = productSummary.filter((id) => {
                    return Number(id) !== Number(value)
                })
            }

            renderProductsSummary(context, productOptions)
        });
    });
}


const renderProductsSummary = (context, productOptions) => {
    const summary = context.querySelector('.summary');
    summary.innerHTML = "";

    const result = productSummary
        .map(id => {
            return productOptions.filter(item => {
                return +item.id === +id;
            })[0]
        });

    summaryProductList(summary, result);
}




