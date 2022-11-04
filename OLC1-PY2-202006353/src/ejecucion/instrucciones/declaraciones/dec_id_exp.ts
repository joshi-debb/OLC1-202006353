
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { getTipo } from "../../tipo";
import { Variable } from "../../variable";
import * as _ from 'lodash';

export class DecIdExp extends Instruccion{
  reasignable: boolean;
  id: string;
  exp: Instruccion;
  columna: string;

  constructor(linea: string, columna: string, reasignable: boolean, id: string, exp: Instruccion){
    super(linea);
    Object.assign(this, {reasignable, id, exp});
    this.columna = columna;
  }

  ejecutar(e: Entorno) {
    let variable = e.getVariable(this.id);

    let valor = this.exp.ejecutar(e);
    valor = _.cloneDeep(valor);

    const tipo_asignado = getTipo(valor);
    variable = new Variable({valor, id: this.id, tipo: tipo_asignado, fila: this.linea, columna: this.columna });
    e.setVariable(variable);
  }

}
