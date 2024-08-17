import Usuario from '../modelos/usuariosModelo.js';

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Mostrar y ocultar formularios
document.getElementById('loginBtn').addEventListener('click', () => {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
});

document.getElementById('registerBtn').addEventListener('click', () => {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
});

// Validaciones de formularios y registro de usuarios
document.getElementById('registerFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (validateEmail(email) && validatePassword(password)) {
        const usuario = new Usuario(name, email, password, role);
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Registro exitoso');
        window.location.href = 'src/view/dashboard.html';
    } else {
        alert('Por favor, corrige los errores en el formulario.');
    }
});

// Inicio de sesión
document.getElementById('loginFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const usuario = usuarios.find(user => user.email === email && user.password === password);

    if (usuario) {
        alert('Inicio de sesión exitoso');
        window.location.href = 'src/view/dashboard.html';
    } else {
        alert('Credenciales incorrectas');
    }
});

// Funciones de validación
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Contraseña debe tener al menos 6 caracteres, una letra mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordRegex.test(password);
}
