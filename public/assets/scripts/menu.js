import { summaryProductList } from "./checkout";
import firebase from "./firebase-app";
import { appendMenuTemplate, moneyFormat } from "./utils";

let productSummary = [];

document.querySelectorAll('#index').forEach(page => {
    const db = firebase.firestore();

    const next = page.querySelector('#btn_next');
    //next.disabled = true

    db.collection('yloveproducts').onSnapshot(snapshot => {

        const products = [];

        snapshot.forEach(item => {
            products.push(item.data());
        })

        renderMenu(page, products);
        renderDisplayCheckout(page);
    });
})

const renderMenu = (context, productOptions) => {

    const productList = context.querySelector('.products');
    productList.innerHTML = "";

    productOptions.forEach(product => {

        const item = appendMenuTemplate(productList, 'label',

            `<div class="item_overlay"></div>
                <input type="checkbox" name="id" id="check" value="${product.id}" hidden />
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
    renderDisplayCheckout(result)

}

const renderDisplayCheckout = (productOptions) => {
    const total = checkout.querySelector('.total')
    total.innerHTML = '';
    const data = document.querySelector('#insert_the_card');
    data.innerHTML = '';

    const result = productSummary.map(id => {
        return productOptions.filter(item => {
            return +item.id === +id
        })[0]
    });

    const valueTotal = result.reduce((totalResult, item) => {
        return Number(totalResult) + Number(item.price);
    }, 0)

    total.innerHTML = moneyFormat(valueTotal)

    if (valueTotal > 0) {
        data.innerHTML = "Insira os dados do cartão para finalizar sua compra"
    }

}






