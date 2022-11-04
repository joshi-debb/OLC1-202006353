"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecId = void 0;
const instruccion_1 = require("../../instruccion");
const variable_1 = require("../../variable");
class DecId extends instruccion_1.Instruccion {
    constructor(linea, columna, reasignable, id) {
        super(linea);
        Object.assign(this, { id, reasignable });
        this.columna = columna;
    }
    ejecutar(e) {
        let variable = e.getVariable(this.id);
        variable = new variable_1.Variable({ valor: null, id: this.id, tipo: null, fila: this.linea, columna: this.columna });
        e.setVariable(variable);
    }
}
exports.DecId = DecId;
