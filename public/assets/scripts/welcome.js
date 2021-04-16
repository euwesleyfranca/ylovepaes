const welcome = document.querySelectorAll("#welcome");

if (welcome) {
    const step1 = document.querySelector('.step_1');
    const saudation = document.querySelector('.saudation');
    const client = document.querySelector('.step_2');

    client.style.display = "none";

    saudation.innerHTML = '';

    window.onload = attendance;

    function attendance() {

        setTimeout(() => {
            step1.classList.add('open');
            saudation.innerHTML = 'Seja bem vindo a Ilove Pães, uma nova experiência em pães caseiros!'
        }, 1000);

        setTimeout(() => {
            step1.classList.remove('open');
        }, 7000);

        setTimeout(() => {
            step1.classList.add('open');
            saudation.innerHTML = 'Pães quentes e fresquinhos... Uma explosão de sabores... '
        }, 8000);

        setTimeout(() => {
            step1.classList.remove('open');
        }, 13000);

        setTimeout(() => {
            step1.classList.add('open');
            saudation.innerHTML = 'E se puder fique em casa... nós entregamos pra você!'
        }, 14000);

        setTimeout(() => {
            client.style.display = "flex";
        }, 20000);

    }
}



