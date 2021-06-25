const Tarea = require("./tarea");




class Tareas{
    _listado = {};

    constructor(){
        this._listado = {};
    }


    borrarTarea( id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }

    }
    get listarArr(){
        const listado = [];
        //keys convierte un objeto a array
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];     
            listado.push(tarea);
        });
        return listado;
    }



crearTarea( desc = '' ){

    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareaFromArray( tareas = []){
     tareas.forEach( tarea => {     
        this._listado[tarea.id] = tarea;
    });
  }


  completarLista(){
      this.listarArr.forEach(( tarea, i) =>{
        const idx = `${i + 1}`.green;
        const { desc, completadoEn } = tarea;
        const estado = ( completadoEn ) ? ' Completada'.green : 'Pendiente'.red
        console.log(`${idx}-. ${ desc } :: ${ estado }`);
        

      });
  }

  listarPendientesCompletadas( completadas = true ){
      let contador = 0;

    this.listarArr.forEach(( tarea, i) =>{
        const { desc, completadoEn } = tarea;
        const estado = ( completadoEn ) ? ' Completada'.green : 'Pendiente'.red
        if( completadas){
            if (completadoEn){
                contador +=1;
                console.log(`${contador.toString().green}-. ${ desc } :: ${ estado } - ${completadoEn.red}`)

            }
      }
        

      });
    }

      listarPendientesIncompletadas( completadas = false ){
        let contador = 0;
  
      this.listarArr.forEach(( tarea, i) =>{
          const { desc, completadoEn } = tarea;
          const estado = ( completadoEn ) ? ' Completada'.green : 'Pendiente'.red
          if(!completadas){
              if (!completadoEn){
                  contador +=1;
                  console.log(`${contador.toString().green}-. ${ desc } :: ${ estado }`)
  
              }
        }
          
  
        });
    }

    toggleCompletadas = ( ids = []) =>{
        ids.forEach ( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listarArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

  

}

module.exports = Tareas;