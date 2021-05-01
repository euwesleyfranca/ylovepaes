import firebase from "./firebase-app";
import { getFormValues, hideAlertError, showAlertError, validateInputDefalt } from "./utils";

const page = document.querySelector('#auth');
const formAuthLogin = document.getElementById('form-login');

if (page) {

    const auth = firebase.auth();
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