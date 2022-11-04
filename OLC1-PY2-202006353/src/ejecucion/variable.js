"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variable = void 0;
class Variable {
    constructor({ valor = null, id, tipo, fila, columna }) {
        Object.assign(this, { valor, id, tipo, fila, columna });
    }
    getValor() {
        return this.valor;
    }
    toString() {
        let salida = `VARIABLE  <===>  Id: ${this.id} <===>  Tipo: ${this.tipo}  <===>  Fila: ${this.fila}  <===>  Columna: ${this.columna} `;
        return salida;
    }
}
exports.Variable = Variable;
