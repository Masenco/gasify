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