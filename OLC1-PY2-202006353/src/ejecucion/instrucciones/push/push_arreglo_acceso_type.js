"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushArregloAccesoType = void 0;
const instruccion_1 = require("../../instruccion");
class PushArregloAccesoType extends instruccion_1.Instruccion {
    constructor(linea, id, lista_accesos, exp) {
        super(linea);
        Object.assign(this, { id, lista_accesos, exp });
    }
    ejecutar(e) {
        const variable = e.getVariable(this.id);
        let actual = variable.getValor();
        const valor = this.exp.ejecutar(e);
        actual.push(valor);
    }
}
exports.PushArregloAccesoType = PushArregloAccesoType;
