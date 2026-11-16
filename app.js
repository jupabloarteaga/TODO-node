const { guardarDB, leerDB, guardarRentas, leerRentas, guardarGastro, leerGastro } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, exito, listadoTareasBorrar, confirmarBorrar, completarTareas,
        menuRentaCar, leerDatosRentaCar, listadoRentaCarBorrar,
        menuGastronomia, leerDatosGastronomia, listadoGastronomiaBorrar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const RentaCars = require('./models/rentaCars');
const ExpsGastronomicas = require('./models/expsGastronomicas');

require('colors');

//const { mostrarMenu, pausa } = require('./helpers/mensajes');


console.clear();
const main = async() => {
    let opt = "";
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) tareas.cargarTareaFromArray(tareasDB);

    const rentas = new RentaCars();
    const rentasDB = leerRentas();
    if (rentasDB) rentas.cargarDesdeArray(rentasDB);

    const expsGastro = new ExpsGastronomicas();
    const gastroGB = leerGastro();
    if (gastroGB) expsGastro.cargarDesdeArray(gastroGB);


    do{
        //Imprime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                        // crear opcion
                        const desc = await leerInput('Descripcion ');
                        tareas.crearTarea(desc);
                        await exito();
                        break;

            case '2':
                tareas.completarLista();
                break;

            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesIncompletadas();
                break;
            case '5':
                const ids = await completarTareas(tareas.listarArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listarArr);
                const ok = await confirmarBorrar();
                if (ok) tareas.borrarTarea(id);
            break;

            case '7': {
                let optRenta = '';
                do {
                    optRenta = await menuRentaCar();
                    if (optRenta === '1') {
                        const datos = await leerDatosRentaCar();
                        rentas.agregar(datos);
                        guardarRentas(rentas.listarArr);
                    } else if (optRenta === '2') {
                        rentas.listar();
                        await pausa();
                    } else if (optRenta === '3') {
                        if (rentas.listarArr.length === 0) {
                            console.log('\n  No hay alquileres para borrar.\n'.yellow);
                            await pausa();
                        } else {
                            const rid = await listadoRentaCarBorrar(rentas.listarArr);
                            const rokay = await confirmarBorrar();
                            if (rokay) { rentas.borrar(rid); guardarRentas(rentas.listarArr); }
                        }
                    }
                } while (optRenta !== '0');
                continue;
            }

            case '8': {
                let optGastro = '';
                do {
                    optGastro = await menuGastronomia();
                    if (optGastro === '1') {
                        const datos = await leerDatosGastronomia();
                        expsGastro.agregar(datos);
                        guardarGastro(expsGastro.listarArr);
                    } else if (optGastro === '2') {
                        expsGastro.listar();
                        await pausa();
                    } else if (optGastro === '3') {
                        if (expsGastro.listarArr.length === 0) {
                            console.log('\n  No hay experiencias para borrar.\n'.yellow);
                            await pausa();
                        } else {
                            const gid = await listadoGastronomiaBorrar(expsGastro.listarArr);
                            const gokay = await confirmarBorrar();
                            if (gokay) { expsGastro.borrar(gid); guardarGastro(expsGastro.listarArr); }
                        }
                    }
                } while (optGastro !== '0');
                continue;
            }
        }

        guardarDB(tareas.listarArr);

        await pausa();

    }while(opt !== '0');
    
    //pausa();


}

main();
