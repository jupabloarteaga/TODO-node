const ExpGastronomica = require('./expGastronomica');
require('colors');

class ExpsGastronomicas {
    _listado = {};

    get listarArr() {
        return Object.values(this._listado);
    }

    agregar({ restaurante, fecha, lugar, costo, calificacion }) {
        const exp = new ExpGastronomica({ restaurante, fecha, lugar, costo, calificacion });
        this._listado[exp.id] = exp;
    }

    listar() {
        if (this.listarArr.length === 0) {
            console.log('\n  No hay experiencias registradas.\n'.yellow);
            return;
        }
        this.listarArr.forEach((e, i) => {
            const idx = `${i + 1}`.green;
            const estrellas = '★'.repeat(Number(e.calificacion)) + '☆'.repeat(5 - Number(e.calificacion));
            console.log(`${idx}. ${'Restaurante:'.cyan} ${e.restaurante}  ${'Lugar:'.cyan} ${e.lugar}`);
            console.log(`   ${'Fecha:'.cyan} ${e.fecha}  ${'Costo:'.cyan} $${e.costo}  ${'Calificación:'.cyan} ${estrellas.yellow}\n`);
        });
    }

    borrar(id) {
        if (this._listado[id]) delete this._listado[id];
    }

    cargarDesdeArray(arr = []) {
        arr.forEach(e => { this._listado[e.id] = new ExpGastronomica(e); });
    }
}

module.exports = ExpsGastronomicas;
