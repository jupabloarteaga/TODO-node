const inquirer = require('inquirer');
require('uuid');
const fs = require('fs');
require('colors');


const preguntas = [{
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
    {
        value: '1',
        name: `${'1.'.green} Crear tarea`,
    },{
        value: '2',
        name: `${'2.'.green} Listar tareas`,
        
    },{
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`,
    },{
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`,
        
    },{
        value: '5',
        name:  `${'5.'.green} Completar tarea(s)` ,         
    },{
        value: '6',
        name: `${'6.'.green} Borrar tarea`,
    
    },{
        value: '7',
        name: `${'7.'.green} Rent a Car`,
    },{
        value: '8',
        name: `${'8.'.green} Experiencias Gastronómicas`,
    },{
        value: '0',
        name:  `${'0.'.green} Salir`

    }
]
}];

const confirmacion = [{
    type: 'input',
    name: 'confirmar',
    message: `Presione ${'ENTER'.green} para continuar :`
}]; 

const inquirerMenu = async() =>{

    console.clear();
    console.log('=================='.green);
    console.log(' Seleccione una opción: '.green);
    console.log('==================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
    
};


const exito = async() => {
    const exitoso = [{
        type: 'input',
        name: 'exito',
        message: `Tarea creada ${'EXITOSAMENTE'.green}`
    }];

    const { exito } = await inquirer.prompt(exitoso);
    return  exito;
}
 

const pausa = async() => {
    console.log('\n');
    const { confirmar } = await inquirer.prompt(confirmacion);
    return  confirmar;
}

    const leerInput = async(message) =>{
        const question = [{
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor ingrese un value';
                }
                return true;
            }
        }]

        const { desc } = await inquirer.prompt(question);
        return desc;

    }


    const listadoTareasBorrar = async(tareas = []) => {
        const choices = tareas.map( ({id, desc}, index) => {
            const idx = `${index + 1}`.green;

            return {
                value: id,
                name: `${idx} ${desc}`
            }
        });

        const preguntas = [{
            type: 'list',
            name: 'id',
            message: '¿Que tarea desea borrar?',
            choices
        }];

        const { id }  = await inquirer.prompt(preguntas);
        return id;    
    }


    const confirmarBorrar = async() => {
        const borra = [{
            type: 'confirm',
            name: 'borrar',
            message: `Desea ${'BORRAR'.red} tarea?`
        }];
    
        const { borrar } = await inquirer.prompt(borra);
        return  borrar;
    }


    const completarTareas = async(tareas = []) => {
        const choices = tareas.map( ({id, desc, completadoEn}, index) => {
            const idx = `${index + 1}`.green;

            return {
                value: id,
                name: `${idx} ${desc}`,
                checked: (completadoEn) ? true : false

            }
        });
        

        const pregunta = [{
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione'.yellow,
            choices
        }];

        const { ids }  = await inquirer.prompt(pregunta);
        return ids;    
    }





const menuRentaCar = async () => {
    console.clear();
    console.log('=================='.green);
    console.log(' Rent a Car '.green);
    console.log('==================\n'.green);

    const { opcion } = await inquirer.prompt([{
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            { value: '1', name: `${'1.'.green} Registrar alquiler` },
            { value: '2', name: `${'2.'.green} Ver alquileres` },
            { value: '3', name: `${'3.'.green} Borrar alquiler` },
            { value: '0', name: `${'0.'.green} Volver al menú principal` },
        ]
    }]);
    return opcion;
};

const leerDatosRentaCar = async () => {
    const preguntas = [
        { type: 'input', name: 'empresa',     message: 'Empresa de alquiler:',  validate: v => v.length > 0 || 'Campo requerido' },
        { type: 'input', name: 'lugar',       message: 'Lugar de recogida:',    validate: v => v.length > 0 || 'Campo requerido' },
        { type: 'input', name: 'fechaInicio', message: 'Fecha de inicio (DD/MM/AAAA):', validate: v => v.length > 0 || 'Campo requerido' },
        { type: 'input', name: 'fechaFin',    message: 'Fecha de devolución (DD/MM/AAAA):', validate: v => v.length > 0 || 'Campo requerido' },
        { type: 'input', name: 'costo',       message: 'Costo total ($):',      validate: v => v.length > 0 || 'Campo requerido' },
    ];
    return await inquirer.prompt(preguntas);
};

const listadoRentaCarBorrar = async (rentas = []) => {
    const choices = rentas.map(({ id, empresa, lugar }, i) => ({
        value: id,
        name: `${`${i + 1}`.green} ${empresa} - ${lugar}`
    }));
    const { id } = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: '¿Qué alquiler desea borrar?',
        choices
    }]);
    return id;
};

const menuGastronomia = async () => {
    console.clear();
    console.log('=================='.green);
    console.log(' Experiencias Gastronómicas '.green);
    console.log('==================\n'.green);

    const { opcion } = await inquirer.prompt([{
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            { value: '1', name: `${'1.'.green} Registrar experiencia` },
            { value: '2', name: `${'2.'.green} Ver experiencias` },
            { value: '3', name: `${'3.'.green} Borrar experiencia` },
            { value: '0', name: `${'0.'.green} Volver al menú principal` },
        ]
    }]);
    return opcion;
};

const leerDatosGastronomia = async () => {
    const preguntas = [
        { type: 'input', name: 'restaurante',  message: 'Nombre del restaurante:', validate: v => v.length > 0 || 'Campo requerido' },
        { type: 'input', name: 'lugar',        message: 'Ciudad / Lugar:',          validate: v => v.length > 0 || 'Campo requerido' },
        { type: 'input', name: 'fecha',        message: 'Fecha (DD/MM/AAAA):',      validate: v => v.length > 0 || 'Campo requerido' },
        { type: 'input', name: 'costo',        message: 'Costo ($):',               validate: v => v.length > 0 || 'Campo requerido' },
        {
            type: 'list',
            name: 'calificacion',
            message: 'Calificación:',
            choices: [
                { value: '5', name: '★★★★★ Excelente' },
                { value: '4', name: '★★★★☆ Muy bueno' },
                { value: '3', name: '★★★☆☆ Bueno' },
                { value: '2', name: '★★☆☆☆ Regular' },
                { value: '1', name: '★☆☆☆☆ Malo' },
            ]
        },
    ];
    return await inquirer.prompt(preguntas);
};

const listadoGastronomiaBorrar = async (exps = []) => {
    const choices = exps.map(({ id, restaurante, lugar }, i) => ({
        value: id,
        name: `${`${i + 1}`.green} ${restaurante} - ${lugar}`
    }));
    const { id } = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: '¿Qué experiencia desea borrar?',
        choices
    }]);
    return id;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    exito,
    listadoTareasBorrar,
    confirmarBorrar,
    completarTareas,
    menuRentaCar,
    leerDatosRentaCar,
    listadoRentaCarBorrar,
    menuGastronomia,
    leerDatosGastronomia,
    listadoGastronomiaBorrar,
}