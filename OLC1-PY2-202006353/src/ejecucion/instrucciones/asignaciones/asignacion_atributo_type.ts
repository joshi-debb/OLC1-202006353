
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Type } from "../../type";
import { Variable } from "../../variable";
import * as _ from 'lodash';

export class AsignacionAtributoType extends Instruccion {
  linea: string;
  id: string;
  lista_accesos: Array<any>;
  tipo_igual: string;
  exp: Instruccion;

  constructor(linea: string, id: string, lista_accesos: Array<any>, tipo_igual: string, exp: Instruccion) {
    super(linea);
    Object.assign(this, { id, lista_accesos, tipo_igual, exp });
  }

  ejecutar(e: Entorno) {
    let variable = e.getVariable(this.id);
    let valor = variable.getValor();
    const size = this.lista_accesos.length;

    //Inicio los accesos
    for (let i = 0; i < size; i++) {
      const exp = this.lista_accesos[i];

      if (valor instanceof Variable) {
        valor = valor.getValor();
      }

      //Si el valor actual es un type
      if (valor instanceof Type) {
        valor = valor.getAtributo(exp); //Devuelve una instancia de variable
      }
      //Si el valor actual es un arreglo
      else if (valor instanceof Arreglo) {
        if (i == size - 1) break;
        for(let j = 0; j < exp.length; j++){
          const index = exp[j].ejecutar(e);
          
          if(valor instanceof Arreglo){
            valor = valor.getValue(index);
          }
        }
      }
    }

    let valor_a_asignar = this.exp.ejecutar(e);
    _.cloneDeep(valor_a_asignar);
    if (valor instanceof Variable) {
      if(this.tipo_igual == '='){
        valor.valor = valor_a_asignar;
      }
      else{
        const res = this.tipo_igual == '+=' ? valor.getValor() + valor_a_asignar : valor.getValor() - valor_a_asignar;
        valor.valor = res;
      }
    }
    else if (valor instanceof Arreglo) {
      const lista_exps = this.lista_accesos[size - 1];
      for (let i = 0; i < lista_exps.length; i++) {
        const index = lista_exps[i].ejecutar(e);

        if (valor instanceof Arreglo) {
      
          //Si soy el ultimo indice
          if (i == lista_exps.length - 1) {
            if(this.tipo_igual == '='){
              valor.setValue(index, valor_a_asignar);
            }
            else{
              const res = this.tipo_igual == '+=' ? valor.getValue(index) + valor_a_asignar : valor.getValue(index) - valor_a_asignar;
              valor.setValue(index, res);
            }
          } else {
            valor = valor.getValue(index);
          }
        }
      }
    }
  }

}
