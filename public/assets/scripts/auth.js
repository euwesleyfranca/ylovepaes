import firebase from "./firebase-app";
import Cropper from "cropperjs";
import { getFormValues } from "./utils";

document.querySelectorAll("#new_account").forEach((page) => {

    const auth = firebase.auth();

    const formAuthRegister = page.querySelector('#new_user');
    const formAuthBtnRegister = page.querySelector('#btn_register');
    const formAuthBtnOverlay = page.querySelector('#overlay');
    const formAuthError = page.querySelector('#error');
    const messageError = formAuthError.querySelector('.message');
    formAuthBtnRegister.style.color = "var(--brown-1)";
    formAuthError.style.display = "none"

    formAuthRegister.addEventListener('submit', event => {

        event.preventDefault();

        formAuthBtnOverlay.style.background = "var(--brown-over)";
        formAuthBtnOverlay.style.animation = "progress-animation 6s infinite";
        formAuthBtnRegister.style.color = "var(--black)";
        formAuthBtnRegister.innerHTML = 'Processando...';

        const values = getFormValues(formAuthRegister);

        auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(response => {
                const { user } = response

                user.updateProfile({
                    displayName: values.name
                });

                setTimeout(() => {
                    window.location.href = "welcome.html";
                }, 4000);
            })
            .catch(error => {
                messageError.innerHTML = error.message;
                formAuthError.style.display = "block";
                formAuthBtnRegister.innerHTML = "Tente novamente";
                formAuthBtnOverlay.style.animation = "none";
                formAuthBtnOverlay.style.background = "none"
            });

    });



});

