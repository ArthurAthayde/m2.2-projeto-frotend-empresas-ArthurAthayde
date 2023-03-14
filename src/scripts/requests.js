import { toast } from './toast.js'
// import {renderAllCompanies} from './index.js'
// import { renderFiltered } from './select.js';


const baseUrl = 'http://localhost:6278';
const token = localStorage.getItem('@kenzieCompany:token');
const requestHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
}

//  ------------- VALIDAR ROTA DO USUÁRIO (ADM OU USER) ----------------

export async function userValidate(token) {
  try {
    const response = await fetch(`${baseUrl}/auth/validate_user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}



// ----------- ROTAS SEM AUTENTICAÇÃO ------------------

// CRIAR NOVO USUÁRIO

export async function createNewUser(userBody) {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(userBody)
    });
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// LOGIN DO USER COM TOKEN DE RESPONSE

export async function userLogin(userBody) {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(userBody)
    });
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// LISTAR TODA AS EMPRESAS CADASTRADAS

export async function listAllCompanies() {
  try {
    const response = await fetch(`${baseUrl}/companies`, {
      method: 'GET',
      headers: requestHeaders
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// LISTAR AS EMPRESAS POR SETOR

export async function listCompaniesBySector(sectorName) {
  try {
    const response = await fetch(`${baseUrl}/companies/${sectorName}`, {
      method: 'GET',
      headers: requestHeaders
    })
    const resJson = await response.json();
    return resJson
  } catch (err) {
    console.log(err);
  }
}

// LISTAS TODOS OS SETORES

export async function listAllSectors() {
  try {
    const response = await fetch(`${baseUrl}/sectors`, {
      method: 'GET',
      headers: requestHeaders
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// ----------- ROTAS COM TOKEN DE ADM ------------------

// CADASTRAR EMPRESAS NO SISTEMA

export async function registerNewCompanie(companyBody) {
  try {
    const response = await fetch(`${baseUrl}/companies`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(companyBody)
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// LISTAR TODOS OS FUNCIONÁRIOS CADASTRADOS

export async function listAllRegistredUsers(token) {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'GET',
      headers: requestHeaders
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// LISTAR TODOS OS DEPARTAMENTOS CADASTRADOS

export async function listAllRegistredDepartamens() {
  try {
    const response = await fetch(`${baseUrl}/departments`, {
      method: 'GET',
      headers: requestHeaders
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }

}

// CRIAR NOVO DEPARTAMENTO

export async function createNewDepartamentRequest(token, departamentBody) {
  try {
    const response = await fetch(`${baseUrl}/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(departamentBody)
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// LISTAR TODOS OS DEPARTAMENTOS DE UMA EMPRESA

export async function listCompanyDepartaments(companyUuid, token) {
  try {
    const response = await fetch(`${baseUrl}/departments/${companyUuid}`, {
      method: 'GET',
      headers: requestHeaders
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// CONTRATAR FUNCIONÁRIO PARA UM DEPARTAMENTO

export async function hireToDepartament(employeeBody) {
  try {
    const response = await fetch(`${baseUrl}/departments/hire/`, {
      method: 'PATCH',
      headers: requestHeaders,
      body: JSON.stringify(employeeBody)
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// DEMITIR FUNCIONÁRIO DE UM DEPARTAMENTO

export async function dismissEmployee(employeeUuid) {
  try {
    const response = await fetch(`${baseUrl}/departments/dismiss/${employeeUuid}`, {
      method: 'PATCH',
      headers: requestHeaders
    })
    const resJson = await response.json();
    return resJson;

  } catch (err) {
    console.log(err);
  }
}

// ATUALIZAR DESCRIÇÃO DE UM DEPARTAMENTO

export async function patchDepartamentDescription(DepartamentDescription, id, token) {
  try {
    const response = await fetch(`${baseUrl}/departments/${id}`, {
      method: 'PATCH',
      headers: {  
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(DepartamentDescription)
    })
    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

// DELETAR UM DEPARTAMENTO

export async function deleteDepartamentRequest(departamentUuid, token) {
  try {
    const reponse = await fetch(`${baseUrl}/departments/${departamentUuid}`, {
      method: 'DELETE',
      headers: {  
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const resJson = await reponse.json();
    return resJson
  } catch (err) {
    console.log(err);
  }
}

// LISTAR FUNCIONÁRIOS NÃO CONTRATADOS

export async function outOfWork() {
  try {
    const reponse = await fetch(`${baseUrl}/admin/out_of_work`, {
      method: 'GET',
      headers: requestHeaders
    })
    const resJson = await reponse.json();
    return resJson
  } catch (err) {
    console.log(err);
  }
}

// ATUALIZAR INFORMAÇÕES DE USUÁRIO

export async function userUpdate(userUuid, updatedBody, token) {
  try {
    const reponse = await fetch(`${baseUrl}/admin/update_user/${userUuid}`, {
      method: 'PATCH',
      headers: {  
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedBody)
    })
    const resJson = await reponse.json();
    return resJson
  } catch (err) {
    console.log(err);
  }
}

// DELETAR UM USUÁRIO

export async function deleteUser(userUuid, token) {
  try {
    const response = await fetch(`${baseUrl}/admin/delete_user/${userUuid}`, {
      method: 'DELETE',
      headers: {  
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const resJson = await response.json();
    return resJson
  } catch (err) {
    console.log(err);
  }
}


// ----------- ROTAS COM TOKEN DE FUNCIONÁRIO ------------------

// PEGAR INFORMAÇÕES DE USUÁRIO LOGADO

export async function getUserInfoRequest(token) {
  try {
    const reponse = await fetch(`${baseUrl}/users/profile`, {
      method: 'GET',
      headers: {  
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const resJson = await reponse.json();
    return resJson
  } catch (err) {
    console.log(err);
  }
}


// LISTAR FUNCIONÁRIOS DE UM MESMO DEPARTAMENTO

export async function listDepartamentEmployees() {
  try {
    const response = await fetch(`${baseUrl}/users/departments/coworkers`, {
      method: 'GET',
      headers: requestHeaders
    })
    const resJson = await response.json();
    return resJson
  } catch (err) {
    console.log(err);
  }
}

// LISTAR TODOS OS DEPARTAMENTOS DA EMPRESA DO USUÁRIO LOGADO

export async function listUserCompanyDepartaments() {
  try {
    const response = await fetch(`${baseUrl}/users/departments`, {
      method: 'GET',
      headers: requestHeaders
    })
    const resJson = await response.json();
    return resJson
  } catch (err) {
    console.log(err);
  }
}

// ATUALIZAR INFORMAÇÕES DE UM USUÁRIO LOGADO

export async function patchUserInfo(userBody) {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'PATCH',
      headers: requestHeaders,
      body: JSON.stringify(userBody)
    })
    const resJson = await response.json();
    return resJson
  } catch (err) {
    console.log(err);
  }
}

























export async function newUser(register) {
  const newUser = await fetch(`http://localhost:6278/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(register)
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));

  return newUser
}

// LOGIN REQUEST

export async function getUser(token) {
  const user = await fetch(`http://localhost:6278/auth/validate_user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => renderLogin(res.is_admin));

  return user;
}

export async function login(data) {
  const loginData = await fetch('http://localhost:6278/auth/login', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const loginDataJson = await loginData.json();

  if (!loginData.ok) {
    toast(loginDataJson.message, '#CE4646');
  } else {
    toast('Login realizado com sucesso', '#4BA036');
    localStorage.setItem("@kenzieCompanies:user", loginDataJson.token);
    getUser(loginDataJson.token);
  }

  return loginDataJson;
}

