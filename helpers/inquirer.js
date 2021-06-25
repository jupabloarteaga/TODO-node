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
        name: `${'4.'.green} Crear tarea pendientes`,
        
    },{
        value: '5',
        name:  `${'5.'.green} Completar tarea(s)` ,         
    },{
        value: '6',
        name: `${'6.'.green} Borrar tarea`,
    
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





module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    exito,
    listadoTareasBorrar,
    confirmarBorrar,
    completarTareas

}