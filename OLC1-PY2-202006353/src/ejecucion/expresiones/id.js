"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
const instruccion_1 = require("../instruccion");
class Id extends instruccion_1.Instruccion {
    constructor(linea, id) {
        super(linea);
        Object.assign(this, { id, linea });
    }
    ejecutar(e) {
        //Busco el id en el entorno
        const variable = e.getVariable(this.id);
        if (variable) {
            return variable.getValor();
        }
    }
}
exports.Id = Id;
