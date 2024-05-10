function calculateVolume() {
    var length = parseFloat(document.getElementById('length').value);
    var width = parseFloat(document.getElementById('width').value);
    var height = parseFloat(document.getElementById('height').value);

    var volume = length * width * height;

    if (!isNaN(volume)) {
        document.getElementById('result').innerHTML = "El volumen es: " + volume.toFixed(2) + " metros cúbicos";
    } else {
        document.getElementById('result').innerHTML = "Por favor ingrese números válidos para la longitud, ancho y altura.";
    }
}

function calculateDivisionAndSum() {
    var dataInputs = document.querySelectorAll('.data');
    var divisionResult = 0;

    for (var i = 0; i < dataInputs.length; i++) {
        var data = parseFloat(dataInputs[i].value);
        if (!isNaN(data)) {
            divisionResult += data / 9300;
        }
    }

    var sumResult = divisionResult * 9300;

    document.getElementById('divisionResult').innerHTML = "Consumo en m3: " + divisionResult.toFixed(2);
    document.getElementById('sumResult').innerHTML = "Total de calorías: " + sumResult.toFixed(2);
}

function addDataSet() {
    var dataSetsContainer = document.getElementById('dataSets');
    var newDataSet = document.createElement('div');
    newDataSet.className = 'dataSet';
    newDataSet.innerHTML = '<input type="number" class="data" placeholder="Ingrese calorías del artefacto"><button onclick="removeDataSet(this)" class="eliminar">Eliminar</button>';
    dataSetsContainer.appendChild(newDataSet);
}

function removeDataSet(button) {
    button.parentNode.remove();
}

function calculateSubtraction() {
    var dataInputs = document.querySelectorAll('#subtractionCalculator .data');
    var total = 0;
    var count = 0;

    for (var i = 0; i < dataInputs.length; i++) {
        var data = parseFloat(dataInputs[i].value);
        if (!isNaN(data)) {
            total += data;
        }
    }

    if (total < 21500) {
        count = 1;
    } else {
        count = Math.floor(total / 21500);
        total -= count * 21500;
        if (total > 0) {
            count++;
        }
    }
    document.getElementById('subtractionCount').innerHTML = "Total de rejillas necesarias: " + count;
}

function addSubtractionData() {
    var subtractionCalculator = document.getElementById('subtractionCalculator');
    var newDataSet = document.createElement('div');
    newDataSet.className = 'dataSet';
    newDataSet.innerHTML = '<input type="number" class="data" placeholder="Calorías a evacuar u oxigenar"><button onclick="removeDataSet(this)" class="eliminar">Eliminar</button>';
    subtractionCalculator.appendChild(newDataSet);
}

function toggleMenu() {
    var menu = document.querySelector('.menu');
    var overlay = document.querySelector('.overlay');
    var toggleIcon = document.querySelector('.toggle');

    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex';
        overlay.style.display = 'flex'; // Mostrar el overlay
        toggleIcon.classList.add('active'); // Agregar la clase active al icono del menú
        // Agregar manejador de eventos al overlay para cerrar el menú al hacer clic
        overlay.addEventListener('click', function() {
            menu.style.display = 'none';
            overlay.style.display = 'none'; // Ocultar el overlay
            toggleIcon.classList.remove('active'); // Quitar la clase active al icono del menú
        });
    } else {
        menu.style.display = 'none';
        overlay.style.display = 'none'; // Ocultar el overlay
        toggleIcon.classList.remove('active'); // Quitar la clase active al icono del menú
        // Eliminar el manejador de eventos al cerrar el menú
        overlay.removeEventListener('click', function() {
            menu.style.display = 'none';
            overlay.style.display = 'none'; // Ocultar el overlay
            toggleIcon.classList.remove('active'); // Quitar la clase active al icono del menú
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var menuLinks = document.querySelectorAll('.menu a');
    var overlay = document.querySelector('.overlay');
    var toggleIcon = document.querySelector('.toggle');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            var menu = document.querySelector('.menu');
            menu.style.display = 'none';
            overlay.style.display = 'none'; // Ocultar el overlay
            toggleIcon.classList.remove('active'); // Quitar la clase active al icono del menú
        });
    });
});

function calculateCustom() {
    var value = parseFloat(document.getElementById('value').value);
    var option = document.getElementById('option').value;
    var result = value * 50;
    if (option === 'SI') {
        document.getElementById('customResult').innerText = "Calorías minímas para climatizar el ambiente: " 
        + result + "kcal " + "(el calefactor debe ser TB)";
    } else {
        document.getElementById('customResult').innerText = "Calorías minímas para climatizar el ambiente: " 
        + result + "kcal " + "(el calefactor puede ser de CA o TB)";
    }
}