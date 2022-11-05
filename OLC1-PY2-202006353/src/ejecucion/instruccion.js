"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruccion = void 0;
class Instruccion {
    constructor(linea) {
        const valor = +linea + 1;
        Object.assign(this, { linea: valor.toString() });
    }
    getLinea() {
        return this.linea;
    }
}
exports.Instruccion = Instruccion;
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
