
import { Entorno } from "../entorno";
import { Instruccion } from "../instruccion";
import { Return } from "../return";
import * as _ from 'lodash';
import { EntornoAux } from "../entorno_aux";

export class LlamadaFuncion extends Instruccion {
  id: string;
  lista_parametros: Array<Instruccion>;

  constructor(linea: string, id: string, lista_parametros: Array<Instruccion> = null) {
    super(linea);
    Object.assign(this, { id, lista_parametros });
  }

  ejecutar(e: Entorno) {
    const entorno_aux = new Entorno();
    const entorno_local = new Entorno(e);

    const funcion = _.cloneDeep(e.getFuncion(this.id));

    if (this.lista_parametros) {
      for (let i = 0; i < this.lista_parametros.length; i++) {
        const exp = this.lista_parametros[i];
        const variable = funcion.lista_parametros[i];

        const valor = exp.ejecutar(entorno_local);

        variable.valor = valor;
        entorno_aux.setVariable(variable);
      }
    }

    entorno_local.variables = entorno_aux.variables;
    if(EntornoAux.getInstance().estoyEjecutandoFuncion() && this.id.endsWith('_')){
    }
    else{
      entorno_local.padre = e.getEntornoGlobal();
    }

    EntornoAux.getInstance().inicioEjecucionFuncion();
    for (let instruccion of funcion.instrucciones) {
      const resp = instruccion.ejecutar(entorno_local);
      if (resp instanceof Return) {
        if (resp.hasValue()) {
          let val = resp.getValue();
          EntornoAux.getInstance().finEjecucionFuncion();
          return val;
        }
        EntornoAux.getInstance().finEjecucionFuncion();
        return;
      }
    }
    EntornoAux.getInstance().finEjecucionFuncion();
  }

}
