const welcome = document.querySelectorAll("#welcome");

if (welcome) {
    const step1 = document.querySelector('.step_1');
    const saudation = document.querySelector('.saudation');
    const client = document.querySelector('.step_2');

    client.style.display = "none";

    saudation.innerHTML = '';

    window.onload = attendance;

    function attendance(){
        
       setTimeout(() => {
           step1.classList.add('open');
           saudation.innerHTML = 'Ola, meu nome é Julia, atendente virtual da Ylove Pães!'
       }, 1000);

       setTimeout(() => {
        step1.classList.remove('open');         
       }, 6000);

       setTimeout(() => {
           step1.classList.add('open');
           saudation.innerHTML = 'Quero te dar as boas vindas a Ylove, seu pão caseiro quentinho de todos os dias!'
       }, 7000);

       setTimeout(() => {
           step1.classList.remove('open');
       }, 12000);

       setTimeout(() => {
           step1.classList.add('open');
           saudation.innerHTML = 'Vamos começar?'
       }, 13000);

       setTimeout(() => {
           client.style.display = "flex";
       }, 15000);
                
    }
}



