import { replaceLogin, replaceRegistration } from "./header.js";
import { userValidate } from "./requests.js";


// BOTÕES DO HEADER - funcionamento

function eventReplaceLogin() {
    const buttonLogin = document.querySelector(".loginBtn");

    buttonLogin.addEventListener("click", () => replaceLogin());
}

function eventReplaceRegistration() {
    const buttonRegistration = document.querySelector(".registrationBtn");

    buttonRegistration.addEventListener("click", () => replaceRegistration());
}

eventReplaceLogin();
eventReplaceRegistration();


// RENDERIZAR EMPRESAS NA HOME PAGE

function renderAllCompanies(array) {
    const companiesList = document.querySelector('.cards');

    companiesList.innerHTML = '';

    array.forEach(element => {
        const card = createCard(element);

        companiesList.appendChild(card);
    });

}
// REQUISIÇÃO PARA BUSCAR TODAS AS EMPRESAS PARA A HOME PAGE
async function getAllCompanies(){
    const companies = await fetch(`http://localhost:6278/companies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((res) => renderAllCompanies(res))

    return companies;
}



// CRIAR CARDS DAS EMPRESAS PARA A HOME PAGE

function createCard({ name, opening_hours, sectors }) {
    const card = document.createElement('li');
    const cardTitle = document.createElement('h3');
    const cardWorkSection = document.createElement('div');
    const openingHours = document.createElement('span');
    const departament = document.createElement('span');

    cardTitle.innerText = name;
    openingHours.innerText = opening_hours;
    departament.innerText = sectors.description;

    card.classList.add("card");
    cardTitle.classList.add("card__title");
    cardWorkSection.classList.add("card__work-section");
    openingHours.classList.add("openingHours");
    departament.classList.add("departament")


    cardWorkSection.append(openingHours, departament)
    card.append(cardTitle, cardWorkSection)

    return card;

}

// ABRIR BOTÕES DO NAV NO MOBILE

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

async function authentication(){
    // const token = localStorage.getItem('@kenzieCompany:token');
    const user = await userValidate()
    if(user.is_admin === false){
        window.location.replace('./src/pages/dashboardUser.html');
    } else if (user.is_admin === true){
        window.location.replace('./src/pages/dashboardAdm.html');
    } else if (user.is_admin === null){
        window.location.replace('/');  
    }
}


authentication();
openHomePageMenu();
getAllCompanies();