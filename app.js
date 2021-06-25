const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, exito, listadoTareasBorrar, confirmarBorrar, completarTareas } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors');

//const { mostrarMenu, pausa } = require('./helpers/mensajes');


console.clear();
const main = async() => {
    let opt = "";
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareaFromArray(tareasDB);
    }


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
                // listar tareas
                const a = tareas.completarLista();
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
                const id =  await listadoTareasBorrar( tareas.listarArr);
                await confirmarBorrar();
                tareas.borrarTarea(id);
            break;
        }

        guardarDB(tareas.listarArr);

            //if( opt !== '0') await pausa();
        await pausa();

    }while(opt !== '0');
    
    //pausa();


}

main();
