import firebase from "./firebase-app";
import { getFormValues, hideAlertError, messageSuccess, showAlertError } from "./utils";

const auth = firebase.auth();

const page = document.querySelector('#auth');
const formAuthLogin = document.getElementById('form-login');

if (page) {

    hideAlertError(formAuthLogin)

    formAuthLogin.addEventListener('submit', e => {

        e.preventDefault();

        const values = getFormValues(formAuthLogin);

        auth.signInWithEmailAndPassword(values.email, values.password)
            .then(response => { window.location.href = "menu.html" })
            .catch(error => {
                showAlertError(formAuthLogin, error)
            })
    })
}

document.querySelectorAll('.formResetPassword').forEach(form => {

    const element = form.querySelector('#success');
    const messageSuccess = element.querySelector('.success');
    element.style.display = "none"

    const elementError = form.querySelector('#error');
    const messageError = elementError.querySelector('.error');
    elementError.style.display = "none"

    const mail = form.querySelector('input[name=email]');
    const submit = form.querySelector('button[type=submit]');

    submit.addEventListener('click', event => {
        event.preventDefault();
        auth.sendPasswordResetEmail(mail.value)
            .then(function (success) {
                element.style.display = "block"
                messageSuccess.innerHTML = success.message
                console.log(success);

            }).catch(function (error) {
                elementError.style.display = "block"
                messageError.innerHTML = error.message
                console.log(error);

            });

    })


})