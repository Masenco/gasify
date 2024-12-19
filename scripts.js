window.onload = function () {
    loadImagesFromLocalStorage();
    updateInventoryVisibility(); // Ocultar o mostrar inventario
    renderCanvas();
};
// Función para alternar el menú
function toggleMenu() {
    var menu = document.querySelector('.menu');
    var overlay = document.querySelector('.overlay');
    var toggleIcon = document.querySelector('.toggle');

    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex';
        overlay.style.display = 'flex'; // Mostrar el overlay
        toggleIcon.classList.add('active'); // Agregar la clase active al icono del menú
        // Agregar manejador de eventos al overlay para cerrar el menú al hacer clic
        overlay.addEventListener('click', function () {
            menu.style.display = 'none';
            overlay.style.display = 'none'; // Ocultar el overlay
            toggleIcon.classList.remove('active'); // Quitar la clase active al icono del menú
        });
    } else {
        menu.style.display = 'none';
        overlay.style.display = 'none'; // Ocultar el overlay
        toggleIcon.classList.remove('active'); // Quitar la clase active al icono del menú
        // Eliminar el manejador de eventos al cerrar el menú
        overlay.removeEventListener('click', function () {
            menu.style.display = 'none';
            overlay.style.display = 'none'; // Ocultar el overlay
            toggleIcon.classList.remove('active'); // Quitar la clase active al icono del menú
        });
    }
}
/////////////////////////////// TABLAS ///////////////////////////////
      // Función para agregar fila
function agregarFila(tableId, datos = {}) {
    const tabla = document.querySelector(`#${tableId} tbody`);
    const fila = document.createElement('tr');
    
    if (tableId === 'dataTable2') {
        // Para la tabla con 5 columnas
        fila.innerHTML = `
            <td data-cell="Accesorios"><input type="text" class="input-name" value="${datos.nombre || ''}" oninput="actualizarTabla('${tableId}')"></td>
            <td data-cell="Marca"><input type="text" class="input-x" value="${datos.x || ''}" oninput="actualizarTabla('${tableId}')"></td>
            <td data-cell="Matrícula"><input type="text" class="input-y" value="${datos.y || ''}" oninput="actualizarTabla('${tableId}')"></td>
            <td data-cell="Material"><input type="text" class="input-material" value="${datos.material || ''}" oninput="actualizarTabla('${tableId}')"></td>
            <td data-cell="Cantidad"><input type="number" class="input-cantidad" value="${datos.cantidad || ''}" oninput="actualizarTabla('${tableId}')"></td>
            <td data-cell="Acción"><button onclick="eliminarFila(this, '${tableId}')" class="buttonEliminar">X</button></td>
        `;
    } else {
        // Para las tablas con 4 columnas
        fila.innerHTML = `
            <td data-cell="Accesorios"><input type="text" class="input-name" value="${datos.nombre || ''}" oninput="actualizarTabla('${tableId}')"></td>
            <td data-cell="Marca"><input type="text" class="input-x" value="${datos.x || ''}" oninput="actualizarTabla('${tableId}')"></td>
            <td data-cell="Matrícula"><input type="text" class="input-y" value="${datos.y || ''}" oninput="actualizarTabla('${tableId}')"></td>
            <td data-cell="Material"><input type="text" class="input-material" value="${datos.material || ''}" oninput="actualizarTabla('${tableId}')"></td>
            <td data-cell="Acción"><button onclick="eliminarFila(this, '${tableId}')" class="buttonEliminar">X</button></td>
        `;
    }
    
    tabla.appendChild(fila);
    actualizarTabla(tableId);
}

// Función para eliminar fila
function eliminarFila(boton, tableId) {
    const fila = boton.closest('tr');
    fila.remove();
    actualizarTabla(tableId);
}

// Función para actualizar la tabla y guardar en localStorage
// Función para agregar una fila a la tabla
function agregarFila(tableId, filaDatos = {}) {
    const tabla = document.querySelector(`#${tableId} tbody`);
    const fila = document.createElement('tr');

    const columnas = ['Accesorios', 'Marca', 'Matrícula', 'Material'];
    if (tableId === 'dataTable2') {
        columnas.push('Cantidad'); // Añadir columna 'Cantidad' a la segunda tabla
    }

    columnas.forEach(columna => {
        const celda = document.createElement('td');
        celda.setAttribute('data-cell', columna.toLowerCase());
        const input = document.createElement('input');
        input.type = 'text';
        input.value = filaDatos[columna.toLowerCase()] || '';
        input.addEventListener('input', () => actualizarTabla(tableId));
        celda.appendChild(input);
        fila.appendChild(celda);
    });

    const celdaEliminar = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add("eliminar");
    botonEliminar.textContent = 'X';
    botonEliminar.addEventListener('click', () => {
        fila.remove();
        actualizarTabla(tableId);
    });
    celdaEliminar.appendChild(botonEliminar);
    fila.appendChild(celdaEliminar);

    tabla.appendChild(fila);
    actualizarTabla(tableId);
}

// Función para actualizar la tabla en el localStorage
function actualizarTabla(tableId) {
    const tabla = document.querySelector(`#${tableId} tbody`);
    const filas = tabla.querySelectorAll('tr');
    const datos = [];

    filas.forEach(fila => {
        const inputs = fila.querySelectorAll('input');
        const filaDatos = {};
        inputs.forEach(input => {
            const cellType = input.closest('td').getAttribute('data-cell');
            filaDatos[cellType] = input.value;
        });
        datos.push(filaDatos);
    });

    localStorage.setItem(tableId, JSON.stringify(datos));
}

// Función para cargar datos del localStorage
function cargarDatosDesdeLocalStorage() {
    ['dataTable1', 'dataTable2', 'dataTable3'].forEach(tableId => {
        const datos = JSON.parse(localStorage.getItem(tableId) || '[]');
        datos.forEach(filaDatos => agregarFila(tableId, filaDatos));
    });
}

// Llamar a esta función cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarDatosDesdeLocalStorage);
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar datos guardados en localStorage
    document.querySelectorAll('.auto-save').forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }

        // Guardar cambios automáticamente en localStorage
        input.addEventListener('input', () => {
            localStorage.setItem(input.id, input.value);
        });
    });

    // Botón para resetear la tabla
    document.querySelector('.eliminarDatos').addEventListener('click', function() {
        document.querySelectorAll('.auto-save').forEach(input => {
            input.value = ''; // Vaciar los campos
            localStorage.removeItem(input.id); // Eliminar del localStorage
        });
    });
});

function descargarTabla1(tableId, fileName) {
    const table = document.getElementById(tableId);

    // Crear una hoja de estilo temporal para aplicar estilos solo durante la captura
    const style = document.createElement('style');
    style.id = 'temporaryStyles';
    style.innerHTML = `
    .container {
     background: transparent !important;
    }
    #${tableId} td, #${tableId} th, #${tableId} tr {
        border: 1px solid #000;
        color: black !important;
        background: transparent !important;
    }
    #${tableId} thead {
        background: transparent !important;
        color: black !important;
    }
    #${tableId} input {
        background: transparent !important;
        color: black !important;
        border: none;
        text-align: center;
    }
        #${tableId} tbody td:last-child {
        display: none;
    }
    `;
    document.head.appendChild(style);

    // Convertir tabla a imagen
    html2canvas(table, {
        useCORS: true,
        backgroundColor: null // Hacer el fondo transparente
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${fileName}.png`;
        link.click();

        // Eliminar estilos temporales
        document.head.removeChild(style);
    }).catch(error => {
        console.error('Error al capturar la tabla:', error);
        // Eliminar estilos temporales en caso de error
        document.head.removeChild(style);
    });
}

function descargarTablaGas(tableId, fileName) {
    const table = document.getElementById(tableId);

    // Crear una hoja de estilo temporal para aplicar estilos solo durante la captura
    const style = document.createElement('style');
    style.id = 'temporaryStyles';
    style.innerHTML = `
     #${tableId} {
        border: none;
        color: black !important;
    }
    #${tableId} td, #${tableId} th {
        border: none;
        color: black !important;
    }
    #${tableId} th {
        background: transparent !important;
        color: black !important;
        border: 2px solid #000;
    }
    #${tableId} input {
        background: transparent !important;
        color: black !important;
        border: none;
    }
    #${tableId} tr:nth-child(-n+5) td:nth-child(1) {
    border-left: 3px solid #000;

  }

   #${tableId} tr:nth-child(-n+5) td:last-child {
    border-right: 3px solid #000;
  }

  #${tableId} tr:nth-child(5) td {
    border-bottom: 3px solid #000;
  }
  
  #${tableId} tr:first-child th {
    border: 3px solid #000;
   
  }

  #${tableId} tr:nth-child(-n+7) td:nth-child(1) {
    border-left: 3px solid #000;
  }

   #${tableId} tr:nth-child(-n+7) td:last-child {
    border-right: 3px solid #000;
  }

  #${tableId} tr:nth-child(7) td {
    border-bottom: 3px solid #000;
  }
  
  #${tableId} tr:first-child th {
    border-top: 3px solid #000;
    border-left: 3px solid #000;
    border-right: 3px solid #000;
  }
    `;
    document.head.appendChild(style);

    // Convertir tabla a imagen
    html2canvas(table, {
        useCORS: true,
        backgroundColor: null // Hacer el fondo transparente
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${fileName}.png`;
        link.click();

        // Eliminar estilos temporales
        document.head.removeChild(style);
    }).catch(error => {
        console.error('Error al capturar la tabla:', error);
        // Eliminar estilos temporales en caso de error
        document.head.removeChild(style);
    });
}











const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");
let images = [];
let selectedImage = null;
let offsetX, offsetY;
let isDragging = false;
let isResizing = false;
const resizeHandleSize = 10;
let idCounter = 0; // Contador para IDs únicos

// Función para actualizar la visibilidad del inventario de imágenes
function updateInventoryVisibility() {
    const inventoryDiv = document.getElementById("imageInventory");
    if (images.length === 0) {
        inventoryDiv.style.display = "none"; // Ocultar si no hay imágenes
    } else {
        inventoryDiv.style.display = "block"; // Mostrar si hay imágenes
    }
}

function handleFiles(event) {
    const files = event.target.files;
    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                images.push({
                    id: idCounter++, // Asigna un ID único
                    img: img,
                    src: img.src,
                    name: file.name,
                    x: 20 * (idCounter - 1),
                    y: 20 * (idCounter - 1),
                    width: img.width / 4,
                    height: img.height / 4,
                    aspectRatio: img.width / img.height,
                    isFixed: false // Propiedad para fijar imagen
                });
                saveImagesToLocalStorage();
                renderInventory();
                renderCanvas();
                updateInventoryVisibility(); // Actualizar visibilidad después de agregar
            };
        };
        reader.readAsDataURL(file);
    });
}

function saveImagesToLocalStorage() {
    const imageData = images.map(image => ({
        id: image.id,
        src: image.src,
        name: image.name,
        x: image.x,
        y: image.y,
        width: image.width,
        height: image.height,
        aspectRatio: image.aspectRatio,
        isFixed: image.isFixed // Guardar estado de fijación
    }));
    localStorage.setItem("images", JSON.stringify(imageData));
}

function loadImagesFromLocalStorage() {
    const imageData = JSON.parse(localStorage.getItem("images"));
    if (imageData) {
        images = []; // Asegurarse de limpiar antes de cargar
        imageData.forEach(data => {
            const img = new Image();
            img.src = data.src;
            img.onload = function () {
                images.push({
                    id: data.id, // Cargar el ID único
                    img: img,
                    src: data.src,
                    name: data.name,
                    x: data.x,
                    y: data.y,
                    width: data.width,
                    height: data.height,
                    aspectRatio: data.aspectRatio,
                    isFixed: data.isFixed // Cargar estado de fijación
                });
                renderCanvas();
                renderInventory();
                updateInventoryVisibility(); // Actualizar visibilidad después de cargar
            };
        });
    } else {
        updateInventoryVisibility(); // Asegurar visibilidad correcta si no hay imágenes
    }
}


function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    images.forEach(image => {
        ctx.drawImage(image.img, image.x, image.y, image.width, image.height);
        ctx.fillStyle = "blue";
        ctx.fillRect(image.x + image.width - resizeHandleSize, image.y + image.height - resizeHandleSize, resizeHandleSize, resizeHandleSize);
    });
}

function renderInventory() {
    const inventoryDiv = document.getElementById("imageInventory");
    inventoryDiv.innerHTML = "<h3>Inventario de Imágenes</h3>";

    images.forEach((image) => {
        const imgContainer = document.createElement("div");
        imgContainer.style.display = "flex";
        imgContainer.style.alignItems = "center";
        imgContainer.style.marginBottom = "10px";

        const thumbnail = document.createElement("img");
        thumbnail.src = image.src;
        thumbnail.width = 200;
        thumbnail.style.marginRight = "10px";

        const fileName = document.createElement("span");
        fileName.textContent = image.name ? image.name : "Nombre no disponible";
        fileName.style.marginRight = "10px";

        const selectButton = document.createElement("button");
        selectButton.textContent = "Seleccionar";
        selectButton.style.marginLeft = "auto";
        selectButton.onclick = () => selectImageFromInventory(image.id); // Usa el ID

        const fixButton = document.createElement("button");
        fixButton.textContent = image.isFixed ? "Mover" : "Fijar"; // Cambiar texto según estado
        fixButton.style.marginLeft = "10px";
        fixButton.onclick = () => toggleFixImage(image.id); // Alternar fijación

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = () => deleteImage(image.id); // Usa el ID

        imgContainer.appendChild(thumbnail);
        imgContainer.appendChild(fileName);
        imgContainer.appendChild(selectButton);
        imgContainer.appendChild(fixButton);
        imgContainer.appendChild(deleteButton);
        inventoryDiv.appendChild(imgContainer);
    });
}
function selectImageFromInventory(id) {
    if (isDragging) return; // Evitar seleccionar mientras se arrastra
    selectedImage = images.find(image => image.id === id); // Busca la imagen por ID
    offsetX = 0;
    offsetY = 0;
    isDragging = true;
    renderCanvas();
}

function toggleFixImage(id) {
    const image = images.find(image => image.id === id);
    if (image) {
        image.isFixed = !image.isFixed; // Alternar estado de fijación
        saveImagesToLocalStorage();
        renderInventory();
        renderCanvas();
    }
}

function deleteImage(id) {
    images = images.filter(image => image.id !== id); // Filtra la imagen por ID
    saveImagesToLocalStorage();
    renderInventory();
    renderCanvas();
    updateInventoryVisibility(); // Actualizar visibilidad después de eliminar
}

function resetCanvas() {
    // Mostrar una alerta de confirmación
    const confirmReset = confirm("¿Estás seguro de que deseas eliminar el espacio de trabajo?");

    if (confirmReset) {
        // Si el usuario confirma, borrar imágenes y almacenamiento local
        images = [];
        localStorage.removeItem("images");
        renderInventory();
        renderCanvas();
        updateInventoryVisibility(); // Ocultar inventario después de reiniciar
    }
}


canvas.addEventListener("mousedown", (event) => {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    // Si la imagen está seleccionada, no la muevas si está fijada
    if (selectedImage && selectedImage.isFixed) {
        return; // No permitir mover si está fijada
    }

    if (selectedImage) {
        const handleX = selectedImage.x + selectedImage.width - resizeHandleSize;
        const handleY = selectedImage.y + selectedImage.height - resizeHandleSize;

        if (mouseX >= handleX && mouseY >= handleY) {
            isResizing = true;
            return;
        }
    }

    // Buscamos la imagen más alta en la pila de imágenes
    for (let i = images.length - 1; i >= 0; i--) {
        const image = images[i];
        if (
            mouseX >= image.x &&
            mouseX <= image.x + image.width &&
            mouseY >= image.y &&
            mouseY <= image.y + image.height
        ) {
            if (!image.isFixed) { // Solo permitir mover si no está fijada
                selectedImage = image;

                // Mover la imagen seleccionada al final del array
                images.splice(i, 1);
                images.push(selectedImage);

                isDragging = true;
                offsetX = mouseX - selectedImage.x;
                offsetY = mouseY - selectedImage.y;

                console.log("Imagen seleccionada:", selectedImage); // Debugging
                renderCanvas();
            }
            return;
        }
    }
    selectedImage = null;
});

canvas.addEventListener("mousemove", (event) => {
    if (isDragging && selectedImage) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        selectedImage.x = mouseX - offsetX;
        selectedImage.y = mouseY - offsetY;
        renderCanvas();
    } else if (isResizing && selectedImage) {
        const mouseX = event.offsetX;
        const newWidth = mouseX - selectedImage.x;
        selectedImage.width = newWidth;
        selectedImage.height = newWidth / selectedImage.aspectRatio;
        renderCanvas();
    }
});

canvas.addEventListener("mouseup", () => {
    if (selectedImage) saveImagesToLocalStorage();
    isDragging = false;
    isResizing = false;
});

function generateImage() {
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = canvas.width;
    finalCanvas.height = canvas.height;
    const finalCtx = finalCanvas.getContext("2d");
    images.forEach(image => {
        finalCtx.drawImage(image.img, image.x, image.y, image.width, image.height);
    });
    const dataURL = finalCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "PlanoFinal.png";
    link.click();
}
// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadImagesFromLocalStorage(); // Cargar imágenes
});

