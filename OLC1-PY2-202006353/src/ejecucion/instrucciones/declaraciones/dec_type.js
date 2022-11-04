"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecType = void 0;
const entorno_1 = require("../../entorno");
const instruccion_1 = require("../../instruccion");
const type_1 = require("../../type");
class DecType extends instruccion_1.Instruccion {
    constructor(linea, id, lista_atributos) {
        super(linea);
        Object.assign(this, { id, lista_atributos });
    }
    ejecutar(e) {
        const atributos = new entorno_1.Entorno();
        e.setType(new type_1.Type(this.id, atributos.variables));
    }
}
exports.DecType = DecType;
