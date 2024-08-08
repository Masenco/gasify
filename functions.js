
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

// Agrega manejadores de eventos al cargar el contenido del DOM
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

// Función para calcular un valor personalizado
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

// Función para calcular el diámetro de un caño de gas
function calculateGasPipeDiameter() {
    var lengthGasPipe = parseFloat(document.getElementById('lengthGasPipe').value);
    var consumption = parseFloat(document.getElementById('consumption').value);

    if (!isNaN(lengthGasPipe) && !isNaN(consumption)) {
        var flowRate = consumption; // Flujo volumétrico en metros cúbicos por hora
        var velocity = flowRate / (Math.PI * Math.pow((0.0254), 2)); // Convertir metros cúbicos por hora a metros cúbicos por segundo
        var diameter = Math.sqrt((4 * flowRate) / (Math.PI * velocity));
        document.getElementById('gasPipeDiameterResult').innerHTML = "El diámetro del caño de gas necesario es: " + diameter.toFixed(2) + " mm";
    } else {
        document.getElementById('gasPipeDiameterResult').innerHTML = "Por favor ingrese números válidos para la longitud del caño y el consumo.";
    }
}

// Arrays para almacenar elementos seleccionados, sus cantidades y valores
var selectedElements = [];
var selectedQuantities = [];
var selectedValues = [];

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
            // Actualizar la lista de elementos mostrada
            updateElementList();
        };

        // Agregar botón de eliminación al elemento de la lista
        listItem.appendChild(deleteButton);

        // Agregar elemento a la lista
        elementList.appendChild(listItem);
    }
}

// Función para calcular el total de los valores seleccionados
function calculateTotal() {
    var total = 0;
    for (var i = 0; i < selectedValues.length; i++) {
        total += selectedValues[i];
    }
    var elementResult = document.getElementById("elementResult2");
    // Redondear el total a 5 números y convertirlo a cadena con coma como separador decimal
    var formattedTotal = total.toLocaleString('es-ES', {
        maximumFractionDigits: 3
    });
    elementResult.textContent = "El valor es: " + formattedTotal + " metros.";
}

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




