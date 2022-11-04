"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    constructor({ numero, tipo, descripcion, linea, columna }) {
        const valor = linea;
        const valor2 = columna;
        const valor3 = numero;
        Object.assign(this, { numero: valor3.toString(), tipo, descripcion, linea: valor.toString(), columna: valor2.toString() });
    }
}
exports.Error = Error;
