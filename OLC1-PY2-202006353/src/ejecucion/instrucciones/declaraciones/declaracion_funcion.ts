
import { Entorno } from "../../entorno";
import { Funcion } from "../../funcion";
import { Instruccion } from "../../instruccion";
import { Variable } from "../../variable";

export class DeclaracionFuncion extends Instruccion{

  linea: string;
  id: string;
  instrucciones: Array<Instruccion>;
  tipo_return: string;
  lista_parametros: Array<Variable>;
  columna:  string;

  constructor(linea: string, columna:string, id: string, instrucciones: Array<Instruccion>, tipo_return: string, lista_parametros: Array<Variable> = null){
    super(linea);
    Object.assign(this, {id, instrucciones, tipo_return, lista_parametros});
    this.columna = columna;
  }

  ejecutar(e: Entorno) {
    const funcion = e.getFuncion(this.id);

    //Validacion nombre de parametros unicos
    if(this.lista_parametros){
      const items = [];
      for(let variable of this.lista_parametros){
        items.push(variable.id);
      }
    }
    
    e.setFuncion(new Funcion(this.id, this.instrucciones, this.tipo_return, this.lista_parametros, this.linea, this.columna));
  }

}
