const { v4: uuidv4 } = require('uuid');

class RentaCar {
    id = '';
    empresa = '';
    fechaInicio = '';
    fechaFin = '';
    lugar = '';
    costo = '';

    constructor({ id, empresa, fechaInicio, fechaFin, lugar, costo }) {
        this.id = id || uuidv4();
        this.empresa = empresa;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.lugar = lugar;
        this.costo = costo;
    }
}

module.exports = RentaCar;
