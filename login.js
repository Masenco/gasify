import { ManageAccount } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("formulario-sesion");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (!email || !password) {
                alert("Por favor, ingresa ambos campos.");
                return;
            }

            // Deshabilitar el botón mientras se procesa
            const submitButton = loginForm.querySelector('input[type="submit"]');
            if (submitButton) submitButton.disabled = true;

            const account = new ManageAccount();
            account.authenticate(email, password)
                .catch(() => {
                    if (submitButton) submitButton.disabled = false;
                });
        });
    } else {
        console.error("El formulario de inicio de sesión no se encontró en la página.");
    }
});


