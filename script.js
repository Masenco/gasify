// Definir la tabla como una matriz bidimensional
var tabla = [
    [0, 9.5, 13, 19, 25, 32, 38, 51],
    [2, 1.745, 3.580, 9.895, 20.260, 35.695, 55.835, 114.615],
    [3, 1.425, 2.925, 8.065, 16.540, 28.900, 45.585, 93.580],
    [4, 1235, 2535, 6985, 14325, 25030, 39480, 81050],
    // El resto de las filas...
];

// Función para encontrar el valor más cercano en la primera columna
function encontrarValorCercanoEnPrimeraColumna(valor, tabla) {
    var valorCercano = tabla[0][0];
    var diferenciaMinima = Math.abs(valor - valorCercano);
    for (var i = 1; i < tabla.length; i++) {
        var diferencia = Math.abs(valor - tabla[i][0]);
        if (diferencia < diferenciaMinima) {
            diferenciaMinima = diferencia;
            valorCercano = tabla[i][0];
        }
    }
    return valorCercano;
}

// Función para obtener el valor en la columna correspondiente a la altura dada
function obtenerValorEnColumnaAltura(altura, tabla) {
    var valorColumnaAltura = null;
    for (var i = 0; i < tabla.length; i++) {
        if (tabla[i][0] === altura) {
            // Si la altura coincide con la primera columna de una fila
            valorColumnaAltura = tabla[i];
            break;
        }
    }
    return valorColumnaAltura;
}

// Función para encontrar el valor en la fila correspondiente a la altura dada
function encontrarValorEnFilaAltura(valor, altura, tabla) {
    var filaAltura = obtenerValorEnColumnaAltura(altura, tabla);
    if (filaAltura) {
        // Si se encuentra la fila correspondiente a la altura
        var indiceColumna = filaAltura.indexOf(valor);
        if (indiceColumna !== -1) {
            // Si se encuentra el valor en la fila
            return filaAltura[indiceColumna];
        } else {
            return null; // El valor no se encuentra en la fila
        }
    } else {
        return null; // No se encuentra la fila correspondiente a la altura
    }
}

// Manejar envío del formulario
document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar envío del formulario

    // Obtener valores ingresados por el usuario
    var valorBuscado = parseFloat(document.getElementById("valor").value);
    var altura = parseFloat(document.getElementById("altura").value);

    // Encontrar valor más cercano en la primera columna
    var alturaCercana = encontrarValorCercanoEnPrimeraColumna(altura, tabla);

    // Encontrar valor en la fila correspondiente a la altura
    var valorEnFilaAltura = encontrarValorEnFilaAltura(valorBuscado, alturaCercana, tabla);

    // Mostrar resultado
    var resultadoDiv = document.getElementById("resultado");
    if (valorEnFilaAltura !== null) {
        resultadoDiv.textContent = "El valor en la columna correspondiente a la altura cercana es: " + valorEnFilaAltura;
    } else {
        resultadoDiv.textContent = "No se encontró un valor en la fila correspondiente a la altura dada.";
    }
});
