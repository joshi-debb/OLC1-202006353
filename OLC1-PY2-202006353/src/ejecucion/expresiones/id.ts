
import { Entorno } from "../entorno";
import { Instruccion } from "../instruccion";
import * as _ from 'lodash';

export class Id extends Instruccion{
  id: string;

  constructor(linea: string, id: string){
    super(linea);
    Object.assign(this, {id, linea});
  }

  ejecutar(e: Entorno) {
    //Busco el id en el entorno
    const variable = e.getVariable(this.id);
    if(variable){
      return variable.getValor();
    }
  }
}
