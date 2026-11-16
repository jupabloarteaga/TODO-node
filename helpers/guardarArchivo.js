const fs = require('fs');

const archivTareas   = './db/data.json';
const archivRentas   = './db/rentaCars.json';
const archivGastro   = './db/expGastronomicas.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivTareas, JSON.stringify(data));
};

const leerDB = () => {
    if (!fs.existsSync(archivTareas)) return null;
    const info = fs.readFileSync(archivTareas, { encoding: 'utf-8' });
    return JSON.parse(info);
};

const guardarRentas = (data) => {
    fs.writeFileSync(archivRentas, JSON.stringify(data));
};

const leerRentas = () => {
    if (!fs.existsSync(archivRentas)) return null;
    const info = fs.readFileSync(archivRentas, { encoding: 'utf-8' });
    return JSON.parse(info);
};

const guardarGastro = (data) => {
    fs.writeFileSync(archivGastro, JSON.stringify(data));
};

const leerGastro = () => {
    if (!fs.existsSync(archivGastro)) return null;
    const info = fs.readFileSync(archivGastro, { encoding: 'utf-8' });
    return JSON.parse(info);
};

module.exports = {
    guardarDB,
    leerDB,
    guardarRentas,
    leerRentas,
    guardarGastro,
    leerGastro,
}