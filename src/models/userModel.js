// Cargar usuarios desde el localStorage
export function loadUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Guardar usuarios en el localStorage
export function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Buscar un usuario por email, contraseña y rol
export function findUser(email, password, rol) {
    const users = loadUsers();
    return users.find(user => user.email === email && user.password === password && user.rol === rol);
}

// Registrar un nuevo usuario
export function registerUser(newUser) {
    const users = loadUsers();
    const userExists = users.some(user => user.email === newUser.email);

    if (userExists) {
        throw new Error("Este email ya está registrado.");
    }

    users.push(newUser);
    saveUsers(users);
}
