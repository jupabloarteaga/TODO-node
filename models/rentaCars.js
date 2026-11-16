const RentaCar = require('./rentaCar');
require('colors');

class RentaCars {
    _listado = {};

    get listarArr() {
        return Object.values(this._listado);
    }

    agregar({ empresa, fechaInicio, fechaFin, lugar, costo }) {
        const rentaCar = new RentaCar({ empresa, fechaInicio, fechaFin, lugar, costo });
        this._listado[rentaCar.id] = rentaCar;
    }

    listar() {
        if (this.listarArr.length === 0) {
            console.log('\n  No hay alquileres registrados.\n'.yellow);
            return;
        }
        this.listarArr.forEach((r, i) => {
            const idx = `${i + 1}`.green;
            console.log(`${idx}. ${'Empresa:'.cyan} ${r.empresa}  ${'Lugar:'.cyan} ${r.lugar}`);
            console.log(`   ${'Desde:'.cyan} ${r.fechaInicio}  ${'Hasta:'.cyan} ${r.fechaFin}  ${'Costo:'.cyan} $${r.costo}\n`);
        });
    }

    borrar(id) {
        if (this._listado[id]) delete this._listado[id];
    }

    cargarDesdeArray(arr = []) {
        arr.forEach(r => { this._listado[r.id] = new RentaCar(r); });
    }
}

module.exports = RentaCars;
