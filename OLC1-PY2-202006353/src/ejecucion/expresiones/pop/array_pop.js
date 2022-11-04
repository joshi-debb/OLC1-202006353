"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayPop = void 0;
const instruccion_1 = require("../../instruccion");
class ArrayPop extends instruccion_1.Instruccion {
    constructor(linea, id) {
        super(linea);
        Object.assign(this, { id });
    }
    ejecutar(e) {
        const variable = e.getVariable(this.id);
        const arreglo = variable.getValor();
        return arreglo.pop();
    }
}
exports.ArrayPop = ArrayPop;
