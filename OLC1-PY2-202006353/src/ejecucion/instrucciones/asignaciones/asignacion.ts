
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import * as _ from 'lodash';

export class Asignacion extends Instruccion {
  id: string;
  tipo_igual: string;
  exp: Instruccion;

  constructor(linea: string, id: string, tipo_igual: string, exp: Instruccion) {
    super(linea);
    Object.assign(this, { id, tipo_igual, exp });
  }

  ejecutar(e: Entorno) {
    //Busqueda de id
    const variable = e.getVariable(this.id);

    let valor = this.exp.ejecutar(e);
    valor = _.cloneDeep(valor);

    if(this.tipo_igual == '='){
      variable.valor = valor;
    }
    else {
      const res = this.tipo_igual == '+=' ? variable.getValor() + valor : variable.getValor() - valor;
      variable.valor = res;
    }

  }

}
