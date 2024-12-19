import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
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

// Exporta las instancias de Firebase
export { app as firebaseApp, auth as firebaseAuth, firestore as firebaseFirestore, database as firebaseDatabase };

export class ManageAccount {
    constructor() {
        this.auth = auth;
    }

    async register(email, password) {
        try {
            await createUserWithEmailAndPassword(this.auth, email, password);
            alert("Registro exitoso. Serás redirigido a la página de inicio de sesión.");
            window.location.href = "main.html";
        } catch (error) {
            console.error(error.code, error.message);
            if (error.code === 'auth/email-already-in-use') {
                alert("El correo electrónico ya está en uso.");
            } else if (error.code === 'auth/weak-password') {
                alert("La contraseña debe tener al menos 6 caracteres.");
            } else {
                alert("Error al registrarse");
            }
        }
    }

   async authenticate(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;

        console.log("Inicio de sesión exitoso. UID:", user.uid);

        // Consultar Firestore
        const userDocRef = doc(firestore, "usuarios", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const username = userDoc.data().username;
            console.log("Username del usuario:", username);

            // Guardar el nombre de usuario en el localStorage
            localStorage.setItem('username', username);

            // Mostrar la alerta solo una vez
            if (window.alertShown !== true) {
                window.alertShown = true;  // Marca que ya se mostró la alerta
                alert(`Bienvenido, ${username}.`);
            }
            
            window.location.href = "main.html";
        } else {
            console.error("No se encontró el documento en Firestore para este usuario.");
            alert("No se pudo obtener el username.");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error.code, error.message);

        if (error.code === 'auth/wrong-password') {
            alert("Contraseña incorrecta.");
        } else if (error.code === 'auth/user-not-found') {
            alert("No se encontró un usuario con ese correo.");
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    }
}





    async signOut() {
        try {
            await signOut(this.auth);
            alert("Sesión cerrada correctamente.");
            window.location.href = "main.html";
        } catch (error) {
            console.error(error.message);
            alert("Error al cerrar sesión.");
        }
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
console.log("Firebase App initialized:", app.name);
