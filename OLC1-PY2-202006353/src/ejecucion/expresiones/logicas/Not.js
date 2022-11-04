"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Not = void 0;
const instruccion_1 = require("../../instruccion");
class Not extends instruccion_1.Instruccion {
    constructor(linea, exp) {
        super(linea);
        Object.assign(this, { exp });
    }
    ejecutar(e) {
        const exp1 = this.exp.ejecutar(e);
        return !exp1;
    }
}
exports.Not = Not;
