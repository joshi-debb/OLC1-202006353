"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const instruccion_1 = require("../../instruccion");
const _ = require("lodash");
class Asignacion extends instruccion_1.Instruccion {
    constructor(linea, id, tipo_igual, exp) {
        super(linea);
        Object.assign(this, { id, tipo_igual, exp });
    }
    ejecutar(e) {
        //Busqueda de id
        const variable = e.getVariable(this.id);
        let valor = this.exp.ejecutar(e);
        valor = _.cloneDeep(valor);
        if (this.tipo_igual == '=') {
            variable.valor = valor;
        }
        else {
            const res = this.tipo_igual == '+=' ? variable.getValor() + valor : variable.getValor() - valor;
            variable.valor = res;
        }
    }
}
exports.Asignacion = Asignacion;
