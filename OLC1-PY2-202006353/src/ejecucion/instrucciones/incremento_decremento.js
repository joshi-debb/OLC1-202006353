"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrementoDecremento = void 0;
const instruccion_1 = require("../instruccion");
class IncrementoDecremento extends instruccion_1.Instruccion {
    constructor(linea, id, incremento) {
        super(linea);
        Object.assign(this, { id, incremento });
    }
    ejecutar(e) {
        const variable = e.getVariable(this.id);
        if (this.incremento) {
            variable.valor++;
        }
        else {
            variable.valor--;
        }
    }
}
exports.IncrementoDecremento = IncrementoDecremento;
