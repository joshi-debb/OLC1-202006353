
import { Entorno } from "../entorno";
import { Instruccion } from "../instruccion";
import { Variable } from "../variable";
import { Type as InstanciaType } from '../type';

export class Type extends Instruccion{

  lista_atributos: Array<Object>; //[{id, exp}]

  constructor(linea: string, lista_atributos: Array<Object>){
    super(linea);
    Object.assign(this, {lista_atributos});
  }

  ejecutar(e: Entorno) {
    const entorno = new Entorno();
    this.lista_atributos.forEach((atributo : Object) => {
      const id = atributo['id'];
      const exp = atributo['exp'];
      const tipo = atributo['tipo'];
      const fila = atributo['fila'];
      const columna = atributo['columna'];
      if(id && exp){
        let variable = entorno.getVariable(id);
        const valor = (exp as Instruccion).ejecutar(e);
        variable = new Variable({valor, id, tipo, fila, columna});
        entorno.setVariable(variable);
      }
    });
    return new InstanciaType(null,entorno.variables);
  }

}
