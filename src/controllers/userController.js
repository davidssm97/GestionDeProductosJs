import { registerUser, findUser } from '../models/userModel.js';

document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos del DOM
    const formRegister = document.getElementById('formRegister');
    const formLogin = document.getElementById('formLogin');
    const createUserButton = document.getElementById('createUser');
    const loginUserButton = document.getElementById('loginUser');
    const showFormLogin = document.getElementById('showFormLogin');
    const showFormRegister = document.getElementById('showFormRegister');
    const authContainer = document.getElementById('authContainer');


    // Cambiar al formulario de inicio de sesión cuando se haga clic en "Iniciar Sesión"
    if (showFormLogin) {
        showFormLogin.addEventListener('click', function () {
            formRegister.style.display = 'none'; // Ocultar el formulario de registro
            formLogin.style.display = 'block'; // Mostrar el formulario de inicio de sesión
        });
    }

    // Cambiar al formulario de registro cuando se haga clic en "Registrarse"
    if (showFormRegister) {
        showFormRegister.addEventListener('click', function () {
            formLogin.style.display = 'none'; // Ocultar el formulario de inicio de sesión
            formRegister.style.display = 'block'; // Mostrar el formulario de registro
        });
    }

    // Manejar el registro de usuario
    if (createUserButton) {
        createUserButton.addEventListener('click', function () {
            const name = document.getElementById('r-name').value.trim();
            const email = document.getElementById('r-email').value.trim();
            const password = document.getElementById('r-password').value.trim();
            const phone = document.getElementById('r-phone').value.trim();
            const rol = document.getElementById('r-rol').value.trim();

            if (!name || !email || !password || !phone || !rol) {
                alert("Todos los campos son obligatorios.");
                return;
            }

            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email)) {
                alert("Por favor, ingrese un email válido.");
                return;
            }

            if (password.length < 8) {
                alert("La contraseña debe tener al menos 8 caracteres.");
                return;
            }

            const phonePattern = /^[0-9]{10}$/;
            if (!phonePattern.test(phone)) {
                alert("Por favor, ingrese un número de teléfono válido (solo dígitos, de 10 caracteres).");
                return;
            }

            const newUser = {
                name: name,
                email: email,
                password: password,
                phone: phone,
                rol: rol
            };

            try {
                registerUser(newUser);
                alert("Usuario registrado con éxito.");
                formRegister.reset();
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Manejar el inicio de sesión del usuario
    if (loginUserButton) {
        loginUserButton.addEventListener('click', function () {
            const email = document.getElementById('l-email').value.trim();
            const password = document.getElementById('l-password').value.trim();
            const rol = document.getElementById('l-rol').value.trim();

            if (!email || !password || !rol) {
                alert("Todos los campos son obligatorios.");
                return;
            }

            const user = findUser(email, password, rol);
            if (!user) {
                alert("Email o contraseña incorrectos.");
                return;
            }

            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'src/view/dashboard.html';
        });
    }
});
