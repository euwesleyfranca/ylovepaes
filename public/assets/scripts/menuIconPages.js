const page = document.getElementById('index');


if (page) {

    const btnOpen = document.querySelector('#btn_open');
    const btnClose = document.querySelector('#btn_close');
    const active = document.querySelector('#menu');
    const logo = document.querySelector('#logo');

    btnOpen.addEventListener('click', (event) => {
        btnOpen.style.display = "none";
        btnClose.style.display = "block";
        active.classList.add('active');
    })
    btnClose.addEventListener('click', (event) => {
        btnClose.style.display = "none";
        btnOpen.style.display = "block";
        active.classList.remove('active');
    })






}


