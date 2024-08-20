
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
// Función para cargar los datos de las tablas desde localStorage

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

/////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Función para generar el PDF ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// Función para generar el PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;

    // Crear un nuevo documento PDF
    const doc = new jsPDF();
    const margin = 10; // Margen del documento
    const canvasWidth = doc.internal.pageSize.width - 2 * margin; // Ancho del canvas ajustado
    const canvasHeight = 100; // Alto del canvas (puedes ajustar esto según el contenido del canvas)
    const tableMargin = 10; // Espacio entre tablas

    // Función para ocultar elementos no deseados
    function hideElements() {
        document.querySelectorAll('button').forEach(button => button.style.display = 'none');
    }

    // Función para mostrar los elementos ocultos
    function showElements() {
        document.querySelectorAll('button').forEach(button => button.style.display = '');
    }

    // Capturar el canvas y las tablas como imágenes
    function captureContent() {
        return new Promise((resolve) => {
            // Capturar el canvas
            html2canvas(document.querySelector('#drawingCanvas')).then(canvas => {
                const imgData = canvas.toDataURL('image/png');

                // Agregar el canvas al PDF
                doc.addImage(imgData, 'PNG', margin, margin, canvasWidth, canvasHeight);
                let yOffset = canvasHeight + 2 * margin; // Offset después del canvas

                // Función para capturar y agregar tablas al PDF
                function addTableAsImage(tableId) {
                    return new Promise((resolve) => {
                        html2canvas(document.querySelector(`#${tableId}`)).then(tableCanvas => {
                            const tableImgData = tableCanvas.toDataURL('image/png');
                            const imgWidth = canvasWidth; // Ancho máximo de la imagen en el PDF
                            const imgHeight = tableCanvas.height * (imgWidth / tableCanvas.width); // Altura proporcional

                            // Verificar si la tabla cabe en la página actual
                            if (yOffset + imgHeight > doc.internal.pageSize.height - margin) {
                                doc.addPage(); // Añadir una nueva página si el contenido excede el tamaño de la página
                                yOffset = margin; // Reiniciar el offset para la nueva página
                            }

                            // Agregar la tabla al PDF
                            doc.addImage(tableImgData, 'PNG', margin, yOffset, imgWidth, imgHeight); // Ajustar altura automática
                            yOffset += imgHeight + tableMargin; // Actualizar el offset con margen

                            resolve(); // Resolver la promesa cuando la tabla se haya agregado
                        });
                    });
                }

                // Agregar todas las tablas al PDF
                const tables = ['dataTable1', 'dataTable2', 'dataTable3'];
                let promiseChain = Promise.resolve();

                tables.forEach(tableId => {
                    promiseChain = promiseChain.then(() => addTableAsImage(tableId));
                });

                promiseChain.then(() => {
                    resolve(); // Resolver la promesa cuando todas las tablas se hayan agregado
                });
            });
        });
    }

    // Ocultar elementos, capturar contenido y luego mostrar elementos
    hideElements();
    captureContent().then(() => {
        showElements(); // Restaurar los elementos después de la captura
        doc.save('documento.pdf'); // Guardar el PDF
    });
}



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


function descargarTabla(tableId, fileName) {
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