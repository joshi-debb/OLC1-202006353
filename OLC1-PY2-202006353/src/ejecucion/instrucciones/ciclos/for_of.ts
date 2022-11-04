import { Error } from "../../../arbol/error";
import { Errores } from "../../../arbol/errores";
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { getTipo, TIPO_DATO } from "../../tipo";
import { Variable } from "../../variable";
import * as _ from 'lodash';
import { Return } from "../../return";
import { Break } from "../../break";
import { Continue } from "../../continue";

export class ForOf extends Instruccion{
  tipo_declaracion: string;
  id: string;
  exp: Instruccion;
  instrucciones: Array<Instruccion>;

  constructor(linea: string, tipo_declaracion: string, id: string, exp: Instruccion, instrucciones: Array<Instruccion>){
    super(linea);
    Object.assign(this, {tipo_declaracion, id, exp, instrucciones});
  }

  ejecutar(e: Entorno) {
    const arreglo = this.exp.ejecutar(e);

    for(let actual of arreglo.arreglo){
      //Entorno generado por cada iteracion
      const entorno = new Entorno(e);
      let variable = new Variable({valor: _.cloneDeep(actual), id: this.id, tipo: getTipo(actual), fila: this.linea, columna: this.linea });

      //Inserto la variable en mi nuevo entorno de ejecucion
      entorno.setVariable(variable);

      //Ejecuto las instruccion
      for(let instruccion of this.instrucciones){
        const resp = instruccion.ejecutar(entorno);
        //Validacion de instruccion Return
        if(resp instanceof Return){
          return resp;
        }
        //Validacion de instrucion Break
        if(resp instanceof Break){
          return;
        }
        //Validacion instruccion Continue
        if(resp instanceof Continue){
          break;
        }
      }
    }
  }

}
