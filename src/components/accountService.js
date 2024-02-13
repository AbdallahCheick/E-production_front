let saveToken = (token) => {
    localStorage.setItem('token', token);
}
let saveInfo = (data) => {
    localStorage.setItem('userLevel', data['levelAdmin']);
    localStorage.setItem('nom', data['nomAdmin']);
    localStorage.setItem('prenoms', data['prenomsAdmin']);
    localStorage.setItem('username', data['usernameAdmin']);
    localStorage.setItem('contact', data['contactAdmin']);
}


let logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userLevel');
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token
}

export const accountService = {
    saveToken, logout, isLogged,saveInfo
}