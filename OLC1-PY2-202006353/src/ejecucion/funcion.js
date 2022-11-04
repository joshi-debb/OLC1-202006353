"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
class Funcion {
    constructor(id, instrucciones, tipo, lista_parametros = null, fila, columna) {
        Object.assign(this, { id, instrucciones, tipo, lista_parametros, fila, columna });
    }
    hasParametros() {
        return this.lista_parametros != null;
    }
    getParametrosSize() {
        return this.hasParametros() ? this.lista_parametros.length : 0;
    }
    toString() {
        let salida = `FUNCION <===> Id: ${this.id} <===> Tipo: ${this.tipo}  <===>  Fila: ${this.fila} <===> Columna: ${this.columna}`;
        return salida;
    }
}
exports.Funcion = Funcion;
