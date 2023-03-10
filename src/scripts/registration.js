import { replaceHome, replaceLogin } from "./header.js";
import { newUser } from "./requests.js";


// TOAST
function toast(text, color) {
    Toastify({
      text: text,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'center',
      style: {
        background: color
      }
    }).showToast()
  }

// BOTÕES HEADER - REPLACE

function eventReplaceHome() {
    const homeBtn = document.querySelector(".homeBtn");

    homeBtn.addEventListener("click", () => {
        replaceHome();

    })
}

function eventReplaceLogin() {
    const buttonLogin = document.querySelector(".loginBtn");

    buttonLogin.addEventListener("click", () => replaceLogin());
}

eventReplaceHome();
eventReplaceLogin();

// BOTÃO MENU - MOBILE FIRST

function openHomePageMenu() {
    const menuBtn = document.querySelector('.menuBtn');
    const closeBtn = document.querySelector('.closeBtn');
    const buttonsMenu = document.querySelector('.options__buttons');

    menuBtn.addEventListener('click', (event) => {
        event.preventDefault();
        menuBtn.classList.add('hiddenClass');
        closeBtn.classList.remove('hiddenClass');
        buttonsMenu.classList.remove('hiddenClass');

        return menuBtn;
    })

    closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        closeBtn.classList.add('hiddenClass');
        buttonsMenu.classList.add('hiddenClass');
        menuBtn.classList.remove('hiddenClass');

        return closeBtn;
    })
}

openHomePageMenu();


// FUNÇÃO DE REGISTRO E REDIRECIONAMENTO EM CASO DE SUCESSO

function registration (){
    const inputName = document.querySelector('#name');
    const inputEmail = document.querySelector('#login');
    const inputPassword = document.querySelector('#password');
    const profissionalLevelSelect = document.querySelector('#professionalLevel');
    const registrationSubmitBtn = document.querySelector('#registrationSubmit-btn');

    registrationSubmitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        let registrationData = {
            username: inputName.value,
            password: inputPassword.value,
            email: inputEmail.value,
            professional_level: profissionalLevelSelect.value
        };

        let registerUser = await newUser(registrationData);

        if(!registerUser.error){
            toast('Cadastro realizado com sucesso', '#4BA036');
            setTimeout(() => {
                window.location.replace("../pages/login.html");
              }, 2500); 
        } else{
            toast('Erro de cadastro, tente novamente', '#CE4646');
        }
    });
};


function homePage(){
    const homeBtn = document.querySelector('.returnBtn');

    homeBtn.addEventListener('click', (event) =>{
        event.preventDefault();

        window.location.replace('/');
    });
};

registration();
homePage();

