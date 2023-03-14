import { createNewDepartamentRequest, deleteDepartamentRequest, deleteUser, listAllCompanies, listAllRegistredDepartamens, listAllRegistredUsers, listCompanyDepartaments, patchDepartamentDescription, userUpdate, userValidate } from "./requests.js";
import { toast } from "./toast.js";

async function authentication() {

    const user = await userValidate();
    if (user.is_admin === false) {
        window.location.replace('./dashboardUser.html');
    }
}

function authorization(){
    const token = localStorage.getItem('@kenzieCompany:token');

    if(!token){
        window.location.replace('../../index.html')
    }
}
authorization()

function logout() {

    const logoutBtn = document.querySelector('.logoutBtn');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.replace('./login.html')
    })
}

async function renderCompanySelect() {
    const dataCompany = await listAllCompanies();
    const select = document.querySelector('.selectCompany');

    dataCompany.forEach(company => {
        const option = document.createElement('option');
        option.innerText = company.name;
        option.value = company.uuid;
        option.classList.add('selectCompany__option')
        select.appendChild(option)
    });
}

async function renderAllDepartaments() {
    const token = localStorage.getItem('@kenzieCompany:token');
    const departamentsList = await listAllRegistredDepartamens(token);


    const departamentsContainer = document.querySelector('.departament__container-body');
    departamentsContainer.innerHTML = '';
    departamentsList.forEach(departament => {
        const card = createDepartamentCard(departament);

        departamentsContainer.appendChild(card);
    })

    editDepartament()
    openDepartamentModal()
    deleteDepartament()

}

async function renderCompanyDepartamens() {
    const departamentsContainer = document.querySelector('.departament__container-body');
    const token = localStorage.getItem('@kenzieCompany:token');
    const selectCompany = document.querySelector('.selectCompany');
    const companyId = selectCompany.value;

    departamentsContainer.innerHTML = '';

    const departaments = await listCompanyDepartaments(companyId, token);

    departaments.forEach(departament => {
        const card = createDepartamentCard(departament);

        departamentsContainer.appendChild(card);
    })

    editDepartament()
    deleteDepartament()
    openDepartamentModal()


}

function changeSelectEvent() {
    const selectCompany = document.querySelector('.selectCompany');
    selectCompany.addEventListener('change', renderCompanyDepartamens)

}

function createDepartamentCard(departament) {
    const departamentCard = document.createElement('li');
    const cardInfoDiv = document.createElement('div');
    const departamentName = document.createElement('h4');
    const departamentDescription = document.createElement('p');
    const companyName = document.createElement('span');
    const formDiv = document.createElement('div');
    const showBtn = document.createElement('img');
    const editBtn = document.createElement('img');
    const deleteBtn = document.createElement('img');

    departamentCard.classList.add('departamentCard');

    cardInfoDiv.classList.add('departamentCard-info');

    departamentName.innerText = departament.name;

    departamentDescription.innerText = departament.description;

    companyName.innerText = departament.companies.name;

    formDiv.classList.add('departament__buttons')

    showBtn.src = '../assets/eye.svg';
    showBtn.classList.add('showDepartament');
    showBtn.id = departament.uuid;

    editBtn.src = '../assets/pencil.svg';
    editBtn.classList.add('editDepartament');
    editBtn.id = departament.uuid;

    deleteBtn.src = '../assets/trash.svg';
    deleteBtn.classList.add('deleteDepartament');
    deleteBtn.id = departament.uuid
    // deleteBtn.dataset.buttonName = 

    cardInfoDiv.append(departamentName, departamentDescription, companyName);
    formDiv.append(showBtn, editBtn, deleteBtn);

    departamentCard.append(cardInfoDiv, formDiv);

    return departamentCard;
}

// CRIAR NOVO DEPARTAMENTO -------------------------------------------------------

async function createNewDepartament() {
    const modal = document.querySelector('.createDepartament__modal');
    const openBtn = document.querySelector('.createCompanieBtn');
    const modalSelect = document.querySelector('.selectCompanie-modal');
    const companiesList = await listAllCompanies();
    const token = localStorage.getItem('@kenzieCompany:token');


    companiesList.forEach(company => {
        const option = document.createElement('option');
        option.innerText = company.name;
        option.value = company.uuid;
        option.classList.add('company__option')
        modalSelect.appendChild(option);
    })

    openBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const inputName = document.querySelector('.departamentName-modal');
        const inputDescription = document.querySelector('.departamentDescription-modal');
        const createBtn = document.querySelector('.createDepartamentBtn-modal');
        const companyId = document.querySelector('.selectCompanie-modal');
        const closeBtn = document.querySelector('.closeDepartamentModal');



        createBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const body = {
                name: inputName.value,
                description: inputDescription.value,
                company_uuid: companyId.value
            };

            if (body.name == '' || body.description == '' || body.company_uuid == '') {
                toast('Por favor, preencha o campo necessário', '#CE4646');
            } else {
                await createNewDepartamentRequest(token, body);
                toast('Departamento criado com sucesso', '#4BA036');

                renderAllDepartaments();
                modal.close();
            }

        })

        closeBtn.addEventListener('click', () => {
            modal.close();
        })

        modal.showModal();
    })

}

// EDITAR DEPARTAMENTO EXISTENTE --------------------------------------

async function editDepartament() {
    const editBtns = document.querySelectorAll('.editDepartament');
    const token = localStorage.getItem('@kenzieCompany:token');


    editBtns.forEach(button => {
        button.addEventListener('click', () => {
            const editModal = document.querySelector('.editDepartament__modal');
            const inputDescription = document.querySelector('.departamentEdit-modal');
            const submitBtn = document.querySelector('.editDepartamentBtn-modal');
            const buttonId = button.id;
            const closeBtn = document.querySelector('#closeBtnModal');


            submitBtn.addEventListener('click', async (e) => {
                e.preventDefault();

                if (inputDescription.value === '') {
                    toast('Por favor, preencha o campo necessário', '#CE4646');
                } else {

                    const body = {
                        description: inputDescription.value
                    }
                    await patchDepartamentDescription(body, buttonId, token);
                    toast('Descrição atualizada com sucesso', '#4BA036');
                    renderAllDepartaments();
                    editModal.close();
                }


            })
            closeBtn.addEventListener('click', () => {
                editModal.close();
            })

            editModal.showModal();
        })
    })
}

async function deleteDepartament() {
    const allDeleteBtns = document.querySelectorAll('.deleteDepartament');

    allDeleteBtns.forEach(button => {
        button.addEventListener('click', () => {
            const deleteDepartamentModal = document.querySelector('.deleteDepartament__modal');
            const returnText = document.querySelector('.deleteDepartament__message');
            const confirmDeleteBtn = document.querySelector('.deleteDepartamentBtn-modal');
            const closeBtn = document.querySelector('#closeDepartamentModal');
            const buttonId = button.id;
            const token = localStorage.getItem('@kenzieCompany:token');

            returnText.innerText = `Realmente deseja deletar o Departamento ${button.value} e demitir seus funcionários?`

            confirmDeleteBtn.addEventListener('click', async () => {
                await deleteDepartamentRequest(buttonId, token);
                toast('Departamento deletado com sucesso', '#4BA036');
                renderAllDepartaments();
                deleteDepartamentModal.close();
            })
            closeBtn.addEventListener('click', () => {
                deleteDepartamentModal.close();
            })
            deleteDepartamentModal.showModal();
        })
    })
}

function openDepartamentModal() {
    const openBtn = document.querySelectorAll('.showDepartament');
    const departamentModal = document.querySelector('.hireUser__modal');

    openBtn.forEach(button => {
        button.addEventListener('click', () => {
            departamentModal.showModal();
        })
    })
}


// CAMPO DE BAIXO -------- USERS -------------------------------------------------------

async function renderAllUsers() {
    const token = localStorage.getItem('@kenzieCompany:token');
    const usersContainer = document.querySelector('.users__container-body');
    const userlist = await listAllRegistredUsers(token);

    usersContainer.innerHTML = '';

    userlist.forEach(async (user) => {
        if (!user.is_admin) {
            const card = await createUserCard(user);

            usersContainer.appendChild(card);
        }
    })

}

async function createUserCard(user) {
    const userCard = document.createElement('li');
    const divInfo = document.createElement('div');
    const username = document.createElement('h4');
    const userLevel = document.createElement('p');
    const company = document.createElement('span');
    const divButtons = document.createElement('div');
    const editUserBtn = document.createElement('img');
    const deleteUserBtn = document.createElement('img');
    const allDepartamentsList = await listAllRegistredDepartamens();

    allDepartamentsList.forEach(department => {
        if (user.department_uuid == department.uuid) {
            company.innerText = department.companies.name;
        }
    })

    userCard.classList.add('userCard');

    divInfo.classList.add('userCard-info');

    username.innerText = user.username;

    userLevel.innerText = user.professional_level;

    divButtons.classList.add('users__Buttons');

    editUserBtn.classList.add('editUser');
    editUserBtn.src = '../assets/bluePencil.svg';
    editUserBtn.id = user.uuid;

    editUserBtn.addEventListener('click', async (event)=>{

        await editUsers(event.target.id);
    })

    deleteUserBtn.classList.add('deleteUser');
    deleteUserBtn.src = '../assets/trash.svg';
    deleteUserBtn.id = user.uuid;

    deleteUserBtn.addEventListener('click', async (event) =>{

        await deleteUsers(event.target.id)
    })

    divButtons.append(editUserBtn, deleteUserBtn);
    divInfo.append(username, userLevel, company);

    userCard.append(divInfo, divButtons);

    return userCard;
}

async function editUsers(id) {  
    const token = localStorage.getItem('@kenzieCompany:token');
    const editUserModal = document.querySelector('.editUser__modal');
    const userModality = document.querySelector('.selectUserModality-modal');
    const userLevel = document.querySelector('.selectUserLevel-modal');
    const userId = id;
    const closeBtn = document.querySelector('#closeEditUserModal');
    const submitBtn = document.querySelector('.editUserBtn-modal');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (userModality.value == '' || userLevel.value == '') {
            toast('Por favor, preencha o campo necessário', '#CE4646');

        } else {
            const updatedBody = {
                kind_of_work: userModality.value,
                professional_level: userLevel.value
            }
            await userUpdate(userId, updatedBody, token);
            toast('Departamento deletado com sucesso', '#4BA036');
            // window.location.reload();
            renderAllUsers();
            editUserModal.close();
        }
    })

    closeBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        editUserModal.close();
    })
    editUserModal.showModal();
}

async function deleteUsers(id){
    const token = localStorage.getItem('@kenzieCompany:token');
    const deleteUserModal = document.querySelector('.deleteUser__modal');
    const confirmDeleteBtn = document.querySelector('.deleteUserBtn-modal');
    const closeBtn = document.querySelector('.closeDepartamentModal-delete');
    const text = document.querySelector('.textDelete')
    const userId = id;

    text.innerText = `Realmente deseja remover o usuário?`
    
    confirmDeleteBtn.addEventListener('click', async (e)=>{
        e.preventDefault();
        
        const deleteRequest = await deleteUser(userId, token);
        toast('Usuário deletado com sucesso', '#4BA036');
        deleteUserModal.close();
        renderAllUsers();
        window.location.reload();
    })

    closeBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        deleteUserModal.close();
    })
    deleteUserModal.showModal();
}


await renderAllUsers()
await renderAllDepartaments()
await renderCompanySelect()
authentication()
createNewDepartament()
changeSelectEvent()


logout()

