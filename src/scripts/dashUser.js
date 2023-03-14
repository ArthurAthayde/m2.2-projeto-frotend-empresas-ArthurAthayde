import { getUserInfoRequest, listDepartamentEmployees, listUserCompanyDepartaments, patchUserInfo } from "./requests.js";
import { toast } from "./toast.js";

function logout() {

    const logoutBtn = document.querySelector('.logoutBtn');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.replace('./login.html')
    })
}

export async function getUserInfo() {
    const token = localStorage.getItem('@kenzieCompany:token');
    const userInfo = await getUserInfoRequest(token);
    renderUserPainelInfo(userInfo);
}


async function renderUserPainelInfo(user) {
    const userDiv = document.querySelector('.userHeader');
    const username = document.createElement('h2');
    const infosDiv = document.createElement('div');
    const userMail = document.createElement('p');
    const userLevel = document.createElement('p');
    const workPlace = document.createElement('p');
    const editBtn = document.createElement('img');

    userDiv.innerHTML = '';

    username.innerText = user.username;

    infosDiv.classList.add('userInfos');

    userMail.innerText = `Email: ${user.email}`
    userMail.classList.add('userMail');

    userLevel.innerText = user.professional_level;
    userLevel.classList.add('userLevel');

    workPlace.innerText = user.kind_of_work;
    workPlace.classList.add('userWorkPlace');

    editBtn.src = '../assets/bluePencil.svg';
    editBtn.alt = 'Botão para editar';
    editBtn.classList.add('editUserData');

    editBtn.addEventListener('click', async () => {
        await editUserPainelInfo(user)
    })

    infosDiv.append(userMail, userLevel, workPlace);
    userDiv.append(username, infosDiv, editBtn);
}

async function editUserPainelInfo() {
    const token = localStorage.getItem('@kenzieCompany:token');
    const editProfileModal = document.querySelector('.editPerfil__modal');
    const inputUsername = document.querySelector('.editPerfil__name-input');
    const inputEmail = document.querySelector('.editPerfil__email-input');
    const inputPassword = document.querySelector('.editPerfil__password-input');
    const closeBtn = document.querySelector('.closeEditPerfilBtn');
    const submitBtn = document.querySelector('.editPerfil__submitBtn');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        if (inputUsername.value === '' || inputEmail.value === '' || inputPassword.value === '') {
            toast('Por favor, preencha todos os campos necessários', '#CE4646');
        } else {
            const body = {
                username: inputUsername.value,
                email: inputEmail.value,
                password: inputPassword.value
            }
            console.log(body);
            await patchUserInfo(body)
            console.log(body);
            toast('Usuário atualizado com sucesso, recarregue a página para conferir as alterações', '#4BA036');
            editProfileModal.close()
        }
    })
    closeBtn.addEventListener('click', () => {
        editProfileModal.close()

    })
    editProfileModal.showModal();
}


async function getCompanyInfo(){
    const coworkers = await listDepartamentEmployees();
    const allDepartamentsUser = await listUserCompanyDepartaments();

    renderCompanyInfo(allDepartamentsUser, coworkers[0])
   
}

getCompanyInfo()
getUserInfo()
logout()