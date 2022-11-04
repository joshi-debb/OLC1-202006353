"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushArreglo = void 0;
const arreglo_1 = require("../../arreglo");
const instruccion_1 = require("../../instruccion");
class PushArreglo extends instruccion_1.Instruccion {
    constructor(linea, id, exp) {
        super(linea);
        Object.assign(this, { id, exp });
    }
    ejecutar(e) {
        const variable = e.getVariable(this.id);
        const arreglo = variable.getValor();
        const valor = this.exp.ejecutar(e);
        if (arreglo instanceof arreglo_1.Arreglo) {
            arreglo.push(valor);
        }
    }
}
exports.PushArreglo = PushArreglo;
