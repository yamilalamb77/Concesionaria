/* const autos = require('./autos'); */
let autos = require('./autos');

let concesionaria = {
    /*   autos : autos, */
    buscarAuto: (patente) => {
        let autoEncontrado = autos.find(auto => auto.patente == patente)
        return autoEncontrado ? autoEncontrado : null
    },
    venderAuto: (patente) => {
        let auto = concesionaria.buscarAuto(patente);
        if (auto.vendido == false) {
            auto.vendido = true;
            return auto
        }
    },

    autosParaLaVenta: () => {
        return autos.filter(auto => auto.vendido === false)

    },

    autosNuevos: () => {
        return concesionaria.autosParaLaVenta().filter(auto => auto.km < 100)
    },
    listaDeVentas: () => {
        let autosVendidos = autos.filter(auto => auto.vendido === true)
        return autosVendidos.map(auto => auto.precio)
    },
    totalDeVentas: () => {
        let ventas = concesionaria.listaDeVentas()
        let total = ventas.length !== 0 ? ventas.reduce((acum, num) => acum + num) : 0
        return total
    },
    puedeComprar: (auto, persona) => {
        let montoCuota = auto.precio / auto.cuotas;
        return auto.precio <= persona.capacidadDePagoTotal && persona.capacidadDePagoEnCuotas >= montoCuota
    },
    autosQuePuedeComprar: (persona) => {
        let autosDisponibles = concesionaria.autosParaLaVenta()
        let autosQuePuedeComprar = []
        autosDisponibles.forEach(auto => {
            if (concesionaria.puedeComprar(auto, persona))
                autosQuePuedeComprar.push(auto)

        })
        return autosQuePuedeComprar
    }

}
let persona = {
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000

}
console.log(concesionaria.autosQuePuedeComprar(persona));