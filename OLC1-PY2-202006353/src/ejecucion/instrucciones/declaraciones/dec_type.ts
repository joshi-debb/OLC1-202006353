
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Type } from "../../type";


export class DecType extends Instruccion{
  id: string;
  lista_atributos: Array<Object>;

  constructor(linea: string, id: string, lista_atributos: Array<Object>){
    super(linea);
    Object.assign(this, {id, lista_atributos});
  }

  ejecutar(e: Entorno) {
    const atributos = new Entorno();
    e.setType(new Type(this.id, atributos.variables));
  }

}
