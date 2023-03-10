// CREATE CARD DO SELECT PARA DEBUGAR
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

// LISTAR EMPRESAS POR SETOR

//REQUISIÇÃO COM O VALUE SELECIONADO EM CADA OPTION DO SELECT

async function filterCompanies(sector){
    const companies = await fetch(`http://localhost:6278/companies/${sector}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    .then((res) => res.json())
    .then((res) => renderFiltered(res))
    .catch((error) => console.log(error));

}

function renderFiltered(array) {
    const companiesList = document.querySelector('.cards');

    companiesList.innerHTML = '';

    array.forEach(element => {
        const card = createCard(element);

        companiesList.appendChild(card);
    });

}

async function addEventSelect() {
    const selectEmpresa = document.querySelector('.cards__title');

    selectEmpresa.addEventListener('change', async (event) => {

        await filterCompanies(event.target.value)
    })
}

addEventSelect()