"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecIdTipoExp = void 0;
const instruccion_1 = require("../../instruccion");
const variable_1 = require("../../variable");
class DecIdTipoExp extends instruccion_1.Instruccion {
    constructor(linea, columna, reasignable, id, tipo, exp, type_generador) {
        super(linea);
        Object.assign(this, { reasignable, id, tipo, exp, type_generador });
        this.columna = columna;
    }
    ejecutar(e) {
        let variable = e.getVariable(this.id);
        const valor = this.exp.ejecutar(e);
        variable = new variable_1.Variable({ valor, id: this.id, tipo: this.tipo, fila: this.linea, columna: this.columna });
        e.setVariable(variable);
    }
}
exports.DecIdTipoExp = DecIdTipoExp;
