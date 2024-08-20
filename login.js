import { ManageAccount } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("formulario-sesion");
    
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const account = new ManageAccount();
            account.authenticate(email, password);
        });
    } else {
        console.error("El formulario de inicio de sesión no se encontró en la página.");
    }
});