import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";

export class Division extends Instruccion{
  expIzq: Instruccion;
  expDer: Instruccion;

  constructor(linea: string, expIzq: Instruccion, expDer: Instruccion){
    super(linea);
    Object.assign(this, {expIzq, expDer});
  }

  ejecutar(e: Entorno) {
    const exp1 = this.expIzq.ejecutar(e);
    const exp2 = this.expDer.ejecutar(e);
    
    if(typeof exp1 == 'number' && typeof exp2 == 'number'){
      return exp1 / exp2;
    }

  }
}
