var cartonJuan = 
{
    "Dueño": "Juan",
    "CartonOriginal": [2, 11, 19, 26,30,37,48,49,55,60,69,76,77,81,87],
    "EstaCompleto" : false,
    "LineasOriginales": {
        "Linea1" : {
            "Celdas" : [26,30,55,60,81],
            "EstaCompleta" : false,
        },
        "Linea2" : {
            "Celdas" : [11,37,48,76,87],
            "EstaCompleta" : false,
        },
        "Linea3" : {
            "Celdas" : [2,19,49,69,77],
            "EstaCompleta" : false,
        },
    },
    "LineasMarcas": {
        "Linea1" : [26,30,55,60,81],
        "Linea2" : [11,37,48,76,87],
        "Linea3" : [2,19,49,69,77]
    }
};

var cartonMili =  
{
    "Dueño": "Mili",
    "CartonOriginal": [24,30,53,75,84,7,11,31,58,85,9,12,42,49,66],
    "EstaCompleto" : false,
    "LineasOriginales": {
        "Linea1" : {
            "Celdas" : [24,30,53,75,84],
            "EstaCompleta" : false,
        },
        "Linea2" : {
            "Celdas" : [7,11,31,58,85],
            "EstaCompleta" : false,
        },
        "Linea3" : {
            "Celdas" : [9,12,42,49,66],
            "EstaCompleta" : false,
        },
    },
    "LineasMarcas": {
        "Linea1" : [24,30,53,75,84],
        "Linea2" : [7,11,31,58,85],
        "Linea3" : [9,12,42,49,66]
    }
};

var cartones = [];

cartones.push(cartonJuan, cartonMili);

var CantarNumero = function (numeroCantado) {

    if (!$.isNumeric(numeroCantado)) {
        alert("el ingreso no es numérico");
        return false;
    }
    cartones.forEach(carton => {
        if (!carton.EstaCompleto)
        {
            //linea 1
            var resultados1 = BuscarYMarcarEnLinea(carton.Dueño, 1, carton.LineasMarcas.Linea1, carton.LineasOriginales.Linea1, numeroCantado)
            carton.LineasMarcas.Linea1 = resultados1[0];
            carton.LineasOriginales.Linea1 = resultados1[1];
            
            //linea 2
            var resultados2 = BuscarYMarcarEnLinea(carton.Dueño, 2, carton.LineasMarcas.Linea2, carton.LineasOriginales.Linea2, numeroCantado)
            carton.LineasMarcas.Linea2 = resultados2[0];
            carton.LineasOriginales.Linea2 = resultados2[1];

            //linea 3
            var resultados3 = BuscarYMarcarEnLinea(carton.Dueño, 3, carton.LineasMarcas.Linea3, carton.LineasOriginales.Linea3, numeroCantado)
            carton.LineasMarcas.Linea3 = resultados3[0];
            carton.LineasOriginales.Linea3 = resultados3[1];

            //verificamos si hay carton lleno
            if (carton.LineasOriginales.Linea1.EstaCompleta == true && carton.LineasOriginales.Linea2.EstaCompleta == true && carton.LineasOriginales.Linea3.EstaCompleta == true ) {
                alert("BINGOO!! Ganador: " + carton.Dueño + " - Números: " + carton.CartonOriginal.toString());
                carton.EstaCompleto = true;
            }
        }
    });
}

var BuscarYMarcarEnLinea = function (dueño, numeroLinea, linea, lineaOriginal, numero) {
    if (!lineaOriginal.EstaCompleta) {
        posicion = linea.findIndex(numeroEnFila => numeroEnFila == numero);
        if (posicion != -1)
            linea.splice(posicion, 1);
    
        if (linea.length == 0) {
            alert("Linea completa! -> Linea n°" + numeroLinea + " - Ganador:" + dueño + " - Linea: " + lineaOriginal.Celdas.toString());
            lineaOriginal.EstaCompleta = true;
        }
    }
    
    return [linea, lineaOriginal];
}

var CargarCarton = function (dueño, linea1Txt, linea2Txt, linea3Txt) {
    var linea1 = linea1Txt.split(",");
    var linea2 = linea2Txt.split(",");
    var linea3 = linea3Txt.split(",");

    var lineaA = linea1Txt.split(",");
    var lineaB = linea2Txt.split(",");
    var lineaC = linea3Txt.split(",");

    var datosCarton = [];
    datosCarton = datosCarton.concat(linea1);
    datosCarton = datosCarton.concat(linea2);
    datosCarton = datosCarton.concat(linea3);

    var cartonNuevo = 
    {
        "Dueño": dueño,
        "CartonOriginal": datosCarton,
        "EstaCompleto" : false,
        "LineasOriginales": {
            "Linea1" : {
                "Celdas" : linea1,
                "EstaCompleta" : false,
            },
            "Linea2" : {
                "Celdas" : linea2,
                "EstaCompleta" : false,
            },
            "Linea3" : {
                "Celdas" : linea3,
                "EstaCompleta" : false,
            },
        },
        "LineasMarcas": {
            "Linea1" : lineaA,
            "Linea2" : lineaB,
            "Linea3" : lineaC
        }
    };

    cartones.push(cartonNuevo);
}

var CantarVariosNumeros = function(numerosTxt) {
    var listaNumeros = numerosTxt.split(",");
    listaNumeros.forEach(numeroACantar => {
        CantarNumero(numeroACantar);       
    });
}