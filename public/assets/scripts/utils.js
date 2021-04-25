

export function getFormValues(form) {
    const values = {};

    form.querySelectorAll("[name]").forEach((input) => {
        values[input.name] = input.value;
    });

    return values;
}

export function appendTemplate(element, tagName, html) {
    const wrapElement = document.createElement(tagName);

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