"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecIdExp = void 0;
const instruccion_1 = require("../../instruccion");
const tipo_1 = require("../../tipo");
const variable_1 = require("../../variable");
const _ = require("lodash");
class DecIdExp extends instruccion_1.Instruccion {
    constructor(linea, columna, reasignable, id, exp) {
        super(linea);
        Object.assign(this, { reasignable, id, exp });
        this.columna = columna;
    }
    ejecutar(e) {
        let variable = e.getVariable(this.id);
        let valor = this.exp.ejecutar(e);
        valor = _.cloneDeep(valor);
        const tipo_asignado = tipo_1.getTipo(valor);
        variable = new variable_1.Variable({ valor, id: this.id, tipo: tipo_asignado, fila: this.linea, columna: this.columna });
        e.setVariable(variable);
    }
}
exports.DecIdExp = DecIdExp;
