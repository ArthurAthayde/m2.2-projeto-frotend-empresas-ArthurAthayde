// import { replaceHome, replaceRegistration } from "./header.js";



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
        window.location.replace('./registation.html')});
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




// TIPO DE USUÁRIO - REPLACE ADM OU USER

async function getLogin(token) {

    const typeOfUser = await fetch(`http://localhost:6278/auth/validate_user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((res) => replaceLogin(res.is_admin))
        .catch((error) => console.log(error));

    return typeOfUser;
}


// REPLACE LOGIN

function replaceLogin(user) {
    if (user === true) {
        toast('Login realizado com sucesso, bem vindo ADM', '#4BA036');
        setTimeout(() => {
            window.location.replace("../pages/dashboardAdm.html");
        }, 2500);

    } else {
        toast('Login realizado com sucesso, bem vindo', '#4BA036');
        setTimeout(() => {
            window.location.replace("../pages/dashboardUser.html");
        }, 2500);
    }
}


function loginContainer() {
    const emailLogin = document.querySelector('.loginEmail');
    const passwordLogin = document.querySelector('.loginPassword');
    const loginSubmitBtn = document.querySelector('.login__submit');

    loginSubmitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        let loginData = {
            email: emailLogin.value,
            password: passwordLogin.value
        };
        await requestLogin(loginData)
    })
}


//REQUESTS DO LOGIN - (estou tendo problema de importação)

async function requestLogin(loginData) {
    const loginRequest = await fetch(`http://localhost:6278/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    const loginDataJson = await loginRequest.json();

    if (loginRequest.ok) {
        localStorage.setItem(
            "@kenzieCompanies:user",
            loginDataJson.token
        );
        setTimeout(() => {
            window.location.replace("../pages/dashboardAdm.html");
        }, 2500);
        getLogin(loginDataJson.token);
    } else {
        setTimeout(() => {
            toast('Erro no login, favor verificar os dados', '#CE4646');
        }, 500);
    }
}


loginContainer()
