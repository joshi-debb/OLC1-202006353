
import { Entorno } from "../entorno";
import { Instruccion } from "../instruccion";

export class IncrementoDecremento extends Instruccion{
  id: string;
  incremento: boolean;

  constructor(linea: string, id: string, incremento: boolean){
    super(linea);
    Object.assign(this, {id, incremento});
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);

    if(this.incremento){
      variable.valor++;
    }
    else{
      variable.valor--;
    }
  }
}
