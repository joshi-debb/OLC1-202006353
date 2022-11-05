


import { Entorno } from './entorno';

export abstract class Instruccion{
  linea: string;
  abstract ejecutar(e : Entorno) : any;

  constructor(linea: string){
    const valor = +linea + 1;
    Object.assign(this, {linea: valor.toString()});
  }

  getLinea() : string{
    return this.linea;
  }
}


// import { Entorno } from './entorno';

// export abstract class Instruccion{
//   linea: string;
//   columna: string;
//   abstract ejecutar(e : Entorno) : any;

//   constructor(linea: string, columna: string){
//     const valor = +linea + 1;
//     const valor2 = +columna + 1;
//     Object.assign(this, {linea: valor.toString(), columna: valor2.toString()});
//   }

//   getLinea() : string{
//     return this.linea;
//   }

//   getColumna() : string{
//     return this.columna;
//   }
// }