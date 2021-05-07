import { summaryProductList } from "./checkout";
import firebase from "./firebase-app";
import { appendMenuTemplate, moneyFormat } from "./utils";

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;

        let productSummary = [];

        document.querySelectorAll('#index').forEach(page => {
            const db = firebase.firestore();

            const logout = page.querySelector('#logout');
            const username = page.querySelector('.username');
            const useremail = page.querySelector('.useremail');
            username.innerHTML = user.displayName
            useremail.innerHTML = user.email

            logout.addEventListener('click', e => {
                firebase.auth().signOut().then(() => {
                    window.location.href = "index.html";
                }).catch((error) => {
                    console.log(error);
                });

            })
            const totalfooter = page.querySelector('#totalfooter');
            totalfooter.innerHTML = ""

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
                <img src="${product.image}" height="250px" width="100%" alt="Pão caseiro em São Paulo " />
             <div>
                <div class="description">
                    <p>${product.title}</p>
                    <small>${product.description}</small>
                </div>
                <div class="price">
                    <p>${product.price}</p>
                    <small>Reais</small>
                </div>
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
            const container = document.querySelector('#container');
            const bntnext = container.querySelector('#btn_next');
            bntnext.disabled = true

            const result = productSummary.map(id => {
                return productOptions.filter(item => {
                    return +item.id === +id
                })[0]
            });

            const valueTotal = result.reduce((totalResult, item) => {
                return Number(totalResult) + Number(item.price);
            }, 0)

            total.innerHTML = moneyFormat(valueTotal)
            totalfooter.innerHTML = ' Total: ' + moneyFormat(valueTotal)

            if (valueTotal > 0) {
                bntnext.disabled = false
            }

        }


    } else {
        window.location.href = "login.html";
    }
});












