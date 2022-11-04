
import { Arreglo } from "../arreglo";
import { Entorno } from "../entorno";
import { Instruccion } from "../instruccion";
import { Type } from "../type";
import { Variable } from "../variable";

export class AccesoType extends Instruccion{
  id: string;
  lista_accesos: Array<any>;

  constructor(linea: string, id: string, lista_accesos: Array<string|Instruccion>){
    super(linea);
    Object.assign(this, {id, lista_accesos});
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);
    let res = variable.getValor();
    for(let i = 0; i < this.lista_accesos.length; i++){
      const exp = this.lista_accesos[i];
      if(res instanceof Type){
        res = res as Type;
        if(typeof exp == 'string'){          
          const variable : Variable = res.getAtributo(exp);
          res = variable.getValor();
        }
      }
      //Si el valor actual es un Arreglo
      else if(res instanceof Arreglo){
        res = res as Arreglo;
        for(let j = 0; j < exp.length; j++){
          const index = exp[j].ejecutar(e);
          if(res instanceof Arreglo){
            res = res.getValue(index);
          }
        }
      }
    }
    return res;
  }

}
