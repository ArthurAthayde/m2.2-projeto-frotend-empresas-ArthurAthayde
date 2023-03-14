// import { replaceHome, replaceRegistration } from "./header.js";

import { userLogin, userValidate } from "./requests.js";



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
        window.location.replace('../../index.html')

    })
}

function eventReplaceRegistration() {
    const buttonRegistration = document.querySelector(".registrationBtn");

    buttonRegistration.addEventListener("click", () => {
        window.location.replace('./registation.html')
    });
}

eventReplaceHome();
eventReplaceRegistration();

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



/**************************LÓGICA LOGIN*********************************/


async function typeOfUserValidate() {
    const token = localStorage.getItem('@kenzieCompany:token');
    const user = await userValidate(token);

    if (user.is_admin === true) {
        window.location.replace('./dashboardAdm.html');
    } else if (!user.is_admin){
        window.location.replace('./dashboardUser.html');
    }
}


function login() {
    const submitBtn = document.querySelector('.login__submit');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const emailValue = document.querySelector('.loginEmail').value;
        const passwordValue = document.querySelector('.loginPassword').value;

        const userData = {
            email: emailValue,
            password: passwordValue
        };

        const loginRequest = await userLogin(userData);
        localStorage.setItem('@kenzieCompany:token', loginRequest.token);

        if (loginRequest.token) {
            toast('Login realizado com sucesso, bem vindo', '#4BA036');
            setTimeout(() => {
                typeOfUserValidate();
            }, 2500);
        } else {
            toast('Erro no login, favor verificar os dados', '#CE4646');
        }
    })
}
login()