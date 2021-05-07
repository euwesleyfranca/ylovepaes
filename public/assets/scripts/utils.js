import Imask from "imask";

export function getFormValues(form) {
    const values = {};

    form.querySelectorAll("[name]").forEach((input) => {
        values[input.name] = input.value;
    });

    return values;
}

export function loginUser(email, password) {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {

            const { user } = response;

            if (user != null) {
                window.location.href = "menu.html";
            }

        })
        .catch((err) => showAlertError('Usuário e/ou senha incorreto(s).'))
}

export function appendMenuTemplate(element, tagName, html) {
    const wrapElement = document.createElement(tagName);
    wrapElement.classList.add("item");

    wrapElement.innerHTML = html;

    element.append(wrapElement);

    return wrapElement;
}

export function appendSummaryTemplate(element, tagName, html) {
    const wrapElement = document.createElement(tagName);
    wrapElement.classList.add("summary_details");

    wrapElement.innerHTML = html;

    element.append(wrapElement);

    return wrapElement;
}

export function moneyFormat(value) {
    return parseFloat(value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function hideAlertError(form) {
    const alertElement = form.querySelector('#error');
    alertElement.style.display = "none";
}

export function showAlertError(form, error) {
    const alertElement = form.querySelector('#error');
    const message = document.querySelector('.message');
    message.innerHTML = error.message
    alertElement.style.display = "block";
}

export function clearDisplay(cardName, cardNumber, cardValidate, cardCvv, total) {
    cardName.innerHTML = '';
    cardNumber.innerHTML = '';
    cardValidate.innerHTML = '';
    cardCvv.innerHTML = '';
    total.innerHTML = '';
}

export function cardNumberMask(number) {
    new Imask(number, {
        mask: '0000 0000 0000 0000'
    })
}

export function cardExpireMask(expire) {
    new Imask(expire, {
        mask: '00/00'
    })
}

export function cardCvvMask(cvv) {
    new Imask(cvv, {
        mask: '000[0]'
    })
}



