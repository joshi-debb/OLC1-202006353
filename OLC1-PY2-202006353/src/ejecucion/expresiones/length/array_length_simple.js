"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayLengthSimple = void 0;
const instruccion_1 = require("../../instruccion");
class ArrayLengthSimple extends instruccion_1.Instruccion {
    constructor(linea, id) {
        super(linea);
        Object.assign(this, { id });
    }
    ejecutar(e) {
        const variable = e.getVariable(this.id);
        const arreglo = variable.getValor();
        return arreglo.getSize();
    }
}
exports.ArrayLengthSimple = ArrayLengthSimple;
