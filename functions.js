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
function descargarTabla() {
    const table = document.getElementById('dataTable');

    // Crear una hoja de estilo temporal para aplicar estilos solo durante la captura
    const style = document.createElement('style');
    style.id = 'temporaryStyles';
    style.innerHTML = `
    table td, th {
                  border: 2px solid #000;
                  color: black !important; /* Texto negro */
                  }
    .tablaDiam thead {
                   background: transparent !important; /* Fondo transparente */
                   color: black !important; /* Texto negro */
                  }
    .tablaDiam tr:nth-of-type(2n) {
                   background: transparent !important;
                  } 
    .tablaDiam input {
                  background: transparent !important; /* Fondo transparente para inputs */
                  color: black !important; /* Texto negro en inputs */
                  border: none;
                  }
    #dataTable select {
                  background: transparent !important; /* Fondo transparente para inputs */
                  color: black !important; /* Texto negro en inputs */
                  border: none;
                  text-align: center;
    }              
    .result, .result-2, .sum {
                  color: black !important;
                  }              
    `;
    document.head.appendChild(style);

    // Eliminar la última columna de la tabla
    const headers = table.querySelectorAll('th');
    const lastColumnIndex = headers.length - 1;

    table.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('th, td');
        cells[lastColumnIndex]?.remove(); // Elimina la última celda si existe
    });

    // Convertir tabla a imagen
    html2canvas(table, {
        useCORS: true,
        backgroundColor: null // Hacer el fondo transparente
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'tabla.png';
        link.click();

        // Restaurar la tabla original y eliminar estilos temporales
        document.head.removeChild(style);
        location.reload(); // Recargar la página para restaurar la tabla original
    }).catch(error => {
        console.error('Error al capturar la tabla:', error);
        // Restaurar la tabla original en caso de error
        document.head.removeChild(style);
    });
}



// Función para calcular el volumen
function calculateVolume() {
    // Obtiene los valores de longitud, anchura y altura desde los elementos del DOM
    var length = parseFloat(document.getElementById('length').value);
    var width = parseFloat(document.getElementById('width').value);
    var height = parseFloat(document.getElementById('height').value);

    // Calcula el volumen multiplicando longitud, anchura y altura
    var volume = length * width * height;

    // Verifica si el resultado es un número y actualiza el DOM con el resultado
    if (!isNaN(volume)) {
        document.getElementById('result').innerHTML = "El volumen es: " + volume.toFixed(2) + " metros cúbicos";
    } else {
        document.getElementById('result').innerHTML = "Por favor ingrese números válidos para la longitud, anchura y altura.";
    }
}

// Función para calcular la división y la suma
function calculateDivisionAndSum() {
    // Selecciona todos los elementos con la clase 'data'
    var dataInputs = document.querySelectorAll('.data');
    var divisionResult = 0;

    // Suma los valores divididos por 9300
    for (var i = 0; i < dataInputs.length; i++) {
        var data = parseFloat(dataInputs[i].value);
        if (!isNaN(data)) {
            divisionResult += data / 9300;
        }
    }

    // Calcula la suma de los valores originales
    var sumResult = divisionResult * 9300;

    // Actualiza el DOM con los resultados
    document.getElementById('divisionResult').innerHTML = "Consumo en m3: " + divisionResult.toFixed(2);
    document.getElementById('sumResult').innerHTML = "Total de calorías: " + sumResult.toFixed(2);
}

// Función para agregar un nuevo conjunto de datos
function addDataSet() {
    var dataSetsContainer = document.getElementById('dataSets');
    var newDataSet = document.createElement('div');
    newDataSet.className = 'dataSet';
    newDataSet.innerHTML = '<input type="number" class="data" placeholder="Ingrese calorías del artefacto"><button onclick="removeDataSet(this)" class="eliminar">Eliminar</button>';
    dataSetsContainer.appendChild(newDataSet);
}

// Función para eliminar un conjunto de datos
function removeDataSet(button) {
    button.parentNode.remove();
}

// Función para calcular la resta
function calculateSubtraction() {
    var dataInputs = document.querySelectorAll('#subtractionCalculator .data');
    var total = 0;
    var count = 0;
    var gridSize = document.getElementById('gridSize').value;

    // Suma los valores de los inputs
    for (var i = 0; i < dataInputs.length; i++) {
        var data = parseFloat(dataInputs[i].value);
        if (!isNaN(data)) {
            total += data;
        }
    }

    // Calcula la cantidad de rejillas necesarias dependiendo del tamaño de la rejilla
    if (gridSize === "15x15") {
        if (total < 21500) {
            count = 1;
        } else {
            count = Math.floor(total / 21500);
            total -= count * 21500;
            if (total > 0) {
                count++;
            }
        }
    } else if (gridSize === "30x15") {
        if (total < 43000) {
            count = 1;
        } else {
            count = Math.floor(total / 43000);
            total -= count * 43000;
            if (total > 0) {
                count++;
            }
        }
    }
    document.getElementById('subtractionCount').innerHTML = "Total de rejillas necesarias: " + count;
}

// Función para agregar un nuevo conjunto de datos de sustracción
function addSubtractionData() {
    var subtractionCalculator = document.getElementById('subtractionCalculator');
    var newDataSet = document.createElement('div');
    newDataSet.className = 'dataSet';
    newDataSet.innerHTML = '<input type="number" class="data" placeholder="Calorías a evacuar u oxigenar"><button onclick="removeDataSet(this)" class="eliminar">Eliminar</button>';
    subtractionCalculator.appendChild(newDataSet);
}

// Toggle
document.addEventListener('DOMContentLoaded', function () {
    var menuLinks = document.querySelectorAll('.menu a');
    var overlay = document.querySelector('.overlay');
    var toggleIcon = document.querySelector('.toggle');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var menu = document.querySelector('.menu');
            menu.style.display = 'none';
            overlay.style.display = 'none'; // Ocultar el overlay
            toggleIcon.classList.remove('active'); // Quitar la clase active al icono del menú
        });
    });
});

// Función para calcular calorías necesarias para calefaccionar un ambiente
function calculateCustom() {
    var value = parseFloat(document.getElementById('value').value);
    var option = document.getElementById('option').value;
    var result = value * 50;
    if (option === 'SI') {
        document.getElementById('customResult').innerText = "Calorías minímas para climatizar el ambiente: " + result + "kcal " + "(el calefactor debe ser TB)";
    } else {
        document.getElementById('customResult').innerText = "Calorías minímas para climatizar el ambiente: " + result + "kcal " + "(el calefactor puede ser de CA o TB)";
    }
}

// Arrays para almacenar elementos seleccionados, sus cantidades y valores
var selectedElements = JSON.parse(localStorage.getItem('selectedElements')) || [];
var selectedQuantities = JSON.parse(localStorage.getItem('selectedQuantities')) || [];
var selectedValues = JSON.parse(localStorage.getItem('selectedValues')) || [];

// Función para guardar los datos en localStorage
function saveToLocalStorage() {
    localStorage.setItem('selectedElements', JSON.stringify(selectedElements));
    localStorage.setItem('selectedQuantities', JSON.stringify(selectedQuantities));
    localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
}

// Función para agregar un elemento a la lista
function addElement() {
    var elementSelect = document.getElementById("element");
    var quantityInput = document.getElementById("quantity");

    var selectedValue = parseFloat(elementSelect.value);
    var quantity = parseInt(quantityInput.value);

    if (!isNaN(selectedValue) && !isNaN(quantity) && quantity > 0) {
        selectedElements.push(elementSelect.options[elementSelect.selectedIndex].text);
        selectedQuantities.push(quantity);
        selectedValues.push(selectedValue * quantity);
        quantityInput.value = ""; // Limpiar el campo de cantidad
        saveToLocalStorage(); // Guardar en localStorage
        updateElementList(); // Actualizar la lista de elementos agregados
    } else {
        alert("Por favor, seleccione un elemento y especifique una cantidad válida.");
    }
}

// Función para actualizar la lista de elementos
function updateElementList() {
    var elementList = document.getElementById("elementList");
    elementList.innerHTML = ""; // Limpiar la lista

    // Agregar elementos a la lista
    for (var i = 0; i < selectedElements.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = selectedElements[i] + " - Cant: " + selectedQuantities[i];

        // Crear botón de eliminación
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("eliminar"); // Agregar la clase "eliminar"
        deleteButton.dataset.index = i; // Almacenar el índice del elemento a eliminar
        deleteButton.onclick = function () {
            // Obtener el índice del elemento a eliminar desde el atributo dataset
            var index = parseInt(this.dataset.index);
            // Eliminar el elemento y su cantidad de las matrices
            selectedElements.splice(index, 1);
            selectedQuantities.splice(index, 1);
            selectedValues.splice(index, 1);
            saveToLocalStorage(); // Guardar los cambios en localStorage
            // Actualizar la lista de elementos mostrada
            updateElementList();
        };

        // Agregar botón de eliminación al elemento de la lista
        listItem.appendChild(deleteButton);

        // Agregar elemento a la lista
        elementList.appendChild(listItem);
    }
}

// Función para calcular el total de los accesorios seleccionados
function calculateTotal() {
    var total = 0;
    for (var i = 0; i < selectedValues.length; i++) {
        total += selectedValues[i];
    }
    var elementResult = document.getElementById("elementResult2");
    // Redondear el total a 3 números y convertirlo a cadena con coma como separador decimal
    var formattedTotal = total.toLocaleString('es-ES', {
        maximumFractionDigits: 3
    });
    elementResult.textContent = "El valor es: " + formattedTotal + " metros.";
}

// Inicializar la lista de elementos al cargar la página
window.onload = function() {
    updateElementList();
};


// Función para filtrar opciones en un select
function filterOptions() {
    var keyword = document.getElementById("searchKeyword").value.toLowerCase();
    var select = document.getElementById("element");

    for (var i = 0; i < select.options.length; i++) {
        var optionText = select.options[i].text.toLowerCase();
        // Eliminar acentos y caracteres especiales del texto de la opción
        optionText = optionText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // Eliminar acentos y caracteres especiales de la palabra clave
        var keywordNormalized = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (optionText.indexOf(keywordNormalized) > -1) {
            select.options[i].style.display = ""; // Mostrar la opción si coincide con la palabra clave
        } else {
            select.options[i].style.display = "none"; // Ocultar la opción si no coincide con la palabra clave
        }
    }
}
//////////////////// Función para calcular diámetro de caños ////////////////////
////////////////////////////////////////////////////////////////////////////////
       var tablaTermofusion = [
  [0, 20, 25, 32, 40, 50, 63, 75, 90, 110],
  [1, 5.594, 12.377, 27.244, 54.867, 105.108, 195.331, 276.299, 413.150, 751.360],
  [2, 3.956, 8.752, 19.264, 38.797, 74.323, 138.120, 195.373, 292.141, 531.292],
  [3, 3.230, 7.146, 15.729, 31.678, 60.684, 112.775, 159.521, 238.532, 433.798],
  [4, 2.797, 6.188, 13.622, 27.434, 52.554, 97.666, 138.150, 206.575, 375.680],
  [5, 2.502, 5.535, 12.184, 24.537, 47.006, 87.355, 123.565, 184.766, 336.018],
  [6, 2.284, 5.053, 11.122, 22.399, 42.910, 79.744, 112.799, 168.668, 306.741],
  [7, 2.114, 4.678, 10.297, 20.738, 39.727, 73.828, 104.431, 156.156, 283.987],
  [8, 1.978, 4.376, 9.632, 19.399, 37.161, 69.060, 97.687, 146.071, 265.646],
  [9, 1.865, 4.126, 9.081, 18.289, 35.036, 65.110, 92.100, 137.717, 250.453],
  [10, 1.769, 3.914, 8.615, 17.351, 33.238, 61.769, 87.373, 130.649, 237.601],
  [12, 1.615, 3.573, 7.865, 15.839, 30.342, 56.387, 79.761, 119.266, 216.899],
  [14, 1.495, 3.308, 7.281, 14.664, 28.091, 52.204, 73.844, 110.419, 200.809],
  [16, 1.399, 3.094, 6.811, 13.717, 26.277, 48.833, 69.075, 103.287, 187.840],
  [18, 1.319, 2.917, 6.421, 12.932, 24.774, 46.040, 65.124, 97.380, 177.097],
  [20, 1.251, 2.768, 6.092, 12.269, 23.503, 43.677, 61.782, 92.383, 168.009],
  [22, 1.193, 2.639, 5.808, 11.698, 22.409, 41.645, 58.907, 88.084, 160.190],
  [24, 1.142, 2.526, 5.561, 11.200, 21.455, 39.872, 56.399, 84.334, 153.371],
  [26, 1.097, 2.427, 5.343, 10.760, 20.613, 38.308, 54.187, 81.025, 147.354],
  [28, 1.057, 2.339, 5.149, 10.369, 19.864, 36.914, 52.216, 78.078, 141.994],
  [30, 1.021, 2.260, 4.974, 10.017, 19.190, 35.662, 50.445, 75.431, 137.179],
  [32, 0.989, 2.188, 4.816, 9.699, 18.581, 34.530, 48.843, 73.035, 132.823],
  [34, 0.959, 2.123, 4.672, 9.410, 18.026, 33.499, 47.385, 70.855, 128.857],
  [36, 0.932, 2.063, 4.541, 9.145, 17.518, 32.555, 46.050, 68.858, 125.227],
  [38, 0.908, 2.008, 4.420, 8.901, 17.051, 31.687, 44.822, 67.022, 121.887],
  [40, 0.885, 1.957, 4.308, 8.675, 16.619, 30.885, 43.687, 65.325, 118.800],
  [42, 0.863, 1.910, 4.204, 8.466, 16.219, 30.140, 42.634, 63.750, 115.937],
  [44, 0.843, 1.866, 4.107, 8.272, 15.846, 29.447, 41.654, 62.285, 113.272],
  [46, 0.825, 1.825, 4.017, 8.090, 15.497, 28.800, 40.738, 60.916, 110.782],
  [48, 0.807, 1.786, 3.932, 7.919, 15.171, 28.194, 39.880, 59.633, 108.449],
  [50, 0.791, 1.750, 3.853, 7.759, 14.865, 27.624, 39.075, 58.428, 106.258],
  [55, 0.754, 1.669, 3.674, 7.398, 14.173, 26.338, 37.256, 55.709, 101.313],
  [60, 0.722, 1.598, 3.517, 7.083, 13.569, 25.217, 35.670, 53.337, 97.000],
  [65, 0.694, 1.535, 3.379, 6.805, 13.037, 24.228, 34.271, 51.245, 93.195],
  [70, 0.669, 1.479, 3.256, 6.558, 12.563, 23.347, 33.024, 49.381, 89.805],
  [75, 0.646, 1.429, 3.146, 6.336, 12.137, 22.555, 31.904, 47.706, 86.760],
  [80, 0.625, 1.384, 3.046, 6.134, 11.751, 21.839, 30.891, 46.192, 84.005],
  [85, 0.607, 1.342, 2.955, 5.951, 11.401, 21.187, 29.969, 44.812, 81.496],
  [90, 0.590, 1.305, 2.872, 5.784, 11.079, 20.590, 29.124, 43.550, 79.200],
  [95, 0.574, 1.270, 2.795, 5.629, 10.784, 20.041, 28.348, 42.388, 77.088],
  [100, 0.559, 1.238, 2.724, 5.487, 10.511, 19.533, 27.630, 41.315, 75.136],
  [105, 0.546, 1.208, 2.659, 5.354, 10.258, 19.062, 26.964, 40.319, 73.325],
  [110, 0.533, 1.180, 2.598, 5.231, 10.022, 18.624, 26.344, 39.392, 71.639],
  [115, 0.522, 1.154, 2.541, 5.116, 9.801, 18.215, 25.765, 38.526, 70.065],
  [120, 0.511, 1.130, 2.487, 5.009, 9.595, 17.831, 25.223, 37.715, 68.589],
  [125, 0.500, 1.107, 2.437, 4.907, 9.401, 17.471, 24.713, 36.953, 67.204],
  [130, 0.491, 1.086, 2.389, 4.812, 9.219, 17.132, 24.233, 36.236, 65.899],
  [135, 0.481, 1.065, 2.345, 4.722, 9.046, 16.811, 23.780, 35.558, 64.667],
  [140, 0.473, 1.046, 2.303, 4.637, 8.883, 16.509, 23.352, 34.918, 63.501],
  [145, 0.465, 1.028, 2.262, 4.556, 8.729, 16.221, 22.945, 34.310, 62.397],
  [150, 0.457, 1.011, 2.224, 4.480, 8.582, 15.949, 22.560, 33.734, 61.348],
  [155, 0.449, 0.994, 2.188, 4.407, 8.443, 15.689, 22.193, 33.185, 60.351],
  [160, 0.442, 0.978, 2.154, 4.338, 8.310, 15.442, 21.843, 32.662, 59.400],
  [165, 0.436, 0.964, 2.121, 4.271, 8.183, 15.207, 21.510, 32.164, 58.493],
  [170, 0.429, 0.949, 2.090, 4.208, 8.061, 14.981, 21.191, 31.687, 57.627],
  [175, 0.423, 0.936, 2.059, 4.148, 7.945, 14.766, 20.886, 31.231, 56.797],
  [180, 0.417, 0.923, 2.031, 4.090, 7.834, 14.559, 20.594, 30.794, 56.003],
  [185, 0.411, 0.910, 2.003, 4.034, 7.728, 14.361, 20.314, 30.375, 55.241],
  [190, 0.406, 0.898, 1.976, 3.980, 7.625, 14.171, 20.045, 29.973, 54.509],
  [195, 0.401, 0.886, 1.951, 3.929, 7.527, 13.988, 19.786, 29.586, 53.806],
  [200, 0.396, 0.875, 1.926, 3.880, 7.432, 13.812, 19.537, 29.214, 53.129]
        ];
        const valoresFijosTermofusion = [0, 20, 25, 32, 40, 50, 63, 75, 90, 110];

        // Cargar datos desde localStorage al iniciar la página
        document.addEventListener('DOMContentLoaded', () => {
            const datosGuardados = localStorage.getItem('tablaData');
            if (datosGuardados) {
                const datos = JSON.parse(datosGuardados);
                datos.forEach(dato => {
                    agregarFila(dato);
                });
            }
        });

  function calcularTabla() {
    const filas = document.querySelectorAll('#dataTable tbody tr');
    filas.forEach(fila => {
        // Validar y ajustar el valor máximo de .input-y
        const inputY = fila.querySelector('.input-y');
        const maxValue = 751.360;
        if (parseFloat(inputY.value) > maxValue) {
            inputY.value = maxValue;
        }

        const x = parseFloat(fila.querySelector('.input-x').value) || 0;
        const y = parseFloat(inputY.value) || 0; // Usar el valor ajustado de .input-y
        const valor5 = parseFloat(fila.querySelector('.input-5').value) || 0;
        const valor6 = parseFloat(fila.querySelector('.sum').textContent) || 0;

        // Calcular columna 4
        let filaSeleccionadaIndex = -1;
        for (let i = 0; i < tablaTermofusion.length; i++) {
            if (tablaTermofusion[i][0] >= x) {
                filaSeleccionadaIndex = i;
                break;
            }
        }

        if (filaSeleccionadaIndex === -1) {
            fila.querySelector('.result').textContent = "Revisar longitud o caudal.";
            fila.querySelector('.result-2').textContent = "";
            return;
        }

        const filaSeleccionada = tablaTermofusion[filaSeleccionadaIndex];
        let columnaSeleccionada = filaSeleccionada.length - 1; // Por defecto, la última columna

        for (let j = 1; j < filaSeleccionada.length; j++) { // Comenzamos en 1 para omitir la primera columna
            if (filaSeleccionada[j] >= y) {
                columnaSeleccionada = j;
                break;
            }
        }

        if (columnaSeleccionada >= valoresFijosTermofusion.length) {
            columnaSeleccionada = valoresFijosTermofusion.length - 1;
        }

        const resultado = valoresFijosTermofusion[columnaSeleccionada];
        fila.querySelector('.result').textContent = resultado + "mm.";

        // Calcular columna 6
        const suma = x + valor5;
        fila.querySelector('.sum').textContent = suma;

        // Calcular columna 7
        const valorXColumna7 = parseFloat(fila.querySelector('.sum').textContent) || 0;
        const valorYColumna7 = parseFloat(inputY.value) || 0; // Usar el valor ajustado de .input-y

        let filaSeleccionadaIndex2 = -1;
        for (let i = 0; i < tablaTermofusion.length; i++) {
            if (tablaTermofusion[i][0] >= valorXColumna7) {
                filaSeleccionadaIndex2 = i;
                break;
            }
        }

        if (filaSeleccionadaIndex2 === -1) {
            fila.querySelector('.result-2').textContent = "Revisar longitud o caudal.";
            return;
        }

        const filaSeleccionada2 = tablaTermofusion[filaSeleccionadaIndex2];
        let columnaSeleccionada2 = filaSeleccionada2.length - 1; // Por defecto, la última columna

        for (let j = 1; j < filaSeleccionada2.length; j++) { // Comenzamos en 1 para omitir la primera columna
            if (filaSeleccionada2[j] >= valorYColumna7) {
                columnaSeleccionada2 = j;
                break;
            }
        }

        if (columnaSeleccionada2 >= valoresFijosTermofusion.length) {
            columnaSeleccionada2 = valoresFijosTermofusion.length - 1;
        }

        const resultado2 = valoresFijosTermofusion[columnaSeleccionada2];
        fila.querySelector('.result-2').textContent = resultado2 + "mm.";
    });

    // Guardar los datos de la tabla en localStorage
    guardarDatosTabla();
}


        function agregarFila(datos = {}) {
            const tabla = document.querySelector('#dataTable tbody');
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td data-cell="Tramo"><input type="text" class="input-name" value="${datos.nombre || ''}" oninput="calcularTabla()"></td>
                <td data-cell="Long. Inicial (m)"><input type="number" class="input-x" value="${datos.x || ''}" oninput="calcularTabla()"></td>
                <td data-cell="Consumo (m3)"><input type="number" class="input-y" max="751.360" step="0.001" value="${datos.y || ''}" oninput="calcularTabla()"></td>
                <td data-cell="Diám. Inicial (mm)" class="result">${datos.resultado || ''}</td>
                <td data-cell="Long. Equiv (m)"><input type="number" class="input-5" value="${datos.valor5 || ''}" oninput="calcularTabla()"></td>
                <td data-cell="Long. Total (m)" class="sum">${datos.suma || ''}</td>
                <td data-cell="Diám. Final (mm)" class="result-2">${datos.resultado2 || ''}</td>
                <td data-cell="Diám. Adaptado (mm)">
            <select class="input-name-8" oninput="calcularTabla()">
                <option value="Opción 0" ${datos.nombre8 === 'Opción 0' ? 'selected' : ''}>Sin modificación</option>
                <option value="Opción 1" ${datos.nombre8 === 'Opción 1' ? 'selected' : ''}>20mm</option>
                <option value="Opción 2" ${datos.nombre8 === 'Opción 2' ? 'selected' : ''}>25mm</option>
                <option value="Opción 3" ${datos.nombre8 === 'Opción 3' ? 'selected' : ''}>32mm</option>
                <option value="Opción 4" ${datos.nombre8 === 'Opción 4' ? 'selected' : ''}>40mm</option>
                <option value="Opción 5" ${datos.nombre8 === 'Opción 5' ? 'selected' : ''}>50mm</option>
                <option value="Opción 6" ${datos.nombre8 === 'Opción 6' ? 'selected' : ''}>63mm</option>
                <option value="Opción 7" ${datos.nombre8 === 'Opción 7' ? 'selected' : ''}>75mm</option>
                <option value="Opción 8" ${datos.nombre8 === 'Opción 8' ? 'selected' : ''}>90mm</option>
                <option value="Opción 9" ${datos.nombre8 === 'Opción 9' ? 'selected' : ''}>110mm</option>
            </select>
        </td>
                <td data-cell="Acción"><button onclick="eliminarFila(this)" class="buttonEliminar">X</button></td>
            `;
            tabla.appendChild(fila);
            calcularTabla(); // Recalcular después de agregar una fila
        }

        function eliminarFila(boton) {
            const tabla = document.querySelector('#dataTable tbody');
            tabla.removeChild(boton.parentElement.parentElement);
            guardarDatosTabla(); // Guardar datos después de eliminar una fila
        }

        function guardarDatosTabla() {
            const filas = document.querySelectorAll('#dataTable tbody tr');
            const datos = Array.from(filas).map(fila => {
                return {
                    nombre: fila.querySelector('.input-name').value,
                    x: fila.querySelector('.input-x').value,
                    y: fila.querySelector('.input-y').value,
                    resultado: fila.querySelector('.result').textContent,
                    valor5: fila.querySelector('.input-5').value,
                    suma: fila.querySelector('.sum').textContent,
                    resultado2: fila.querySelector('.result-2').textContent,
                    nombre8: fila.querySelector('.input-name-8').value
                };
            });
            localStorage.setItem('tablaData', JSON.stringify(datos));
        }




