import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getDatabase, ref, set, push, remove, onValue, update } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDjXjOqoV6wlFZxdC2kLn9vLlboSd5SSyY",
  authDomain: "inventario1-2e185.firebaseapp.com",
  databaseURL: "https://inventario1-2e185-default-rtdb.firebaseio.com",
  projectId: "inventario1-2e185",
  storageBucket: "inventario1-2e185.appspot.com",
  messagingSenderId: "75989371575",
  appId: "1:75989371575:web:98b1c44a4320455d451b32"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

// Hacer disponibles globalmente
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseFirestore = firestore;
window.firebaseDatabase = database;

export class ManageAccount {
    constructor() {
        this.auth = auth;
    }

    register(email, password) {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then(() => {
                window.location.href = "main.html";
                alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
            })
            .catch((error) => {
                console.error(error.message);
                alert("Error al registrarse");
            });
    }

    authenticate(email, password) {
        signInWithEmailAndPassword(this.auth, email, password)
            .then(() => {
                window.location.href = "main.html";
                alert("Has iniciado sesión correctamente. Serás redirigido a la página principal.");
            })
            .catch((error) => {
                console.error(error.message);
                alert("Correo o contraseña incorrectos");
            });
    }

    signOut() {
        signOut(this.auth)
            .then(() => {
                window.location.href = "main.html";
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}

// Función para manejar el inicio de sesión de manera segura
function login(event) {
    event.preventDefault(); // Previene el envío del formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const manageAccount = new ManageAccount();
    manageAccount.authenticate(email, password);
}

// Asigna la función de login al evento de envío del formulario
document.getElementById('formulario-sesion').addEventListener('submit', login);
