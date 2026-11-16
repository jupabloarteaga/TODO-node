const { v4: uuidv4 } = require('uuid');

class ExpGastronomica {
    id = '';
    restaurante = '';
    fecha = '';
    lugar = '';
    costo = '';
    calificacion = '';

    constructor({ id, restaurante, fecha, lugar, costo, calificacion }) {
        this.id = id || uuidv4();
        this.restaurante = restaurante;
        this.fecha = fecha;
        this.lugar = lugar;
        this.costo = costo;
        this.calificacion = calificacion;
    }
}

module.exports = ExpGastronomica;
