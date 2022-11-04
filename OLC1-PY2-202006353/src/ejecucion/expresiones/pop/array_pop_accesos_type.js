"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayPopAccesosType = void 0;
const instruccion_1 = require("../../instruccion");
class ArrayPopAccesosType extends instruccion_1.Instruccion {
    constructor(linea, id, lista_accesos) {
        super(linea);
        Object.assign(this, { id, lista_accesos });
    }
    ejecutar(e) {
        //Busqueda y validaciones de variable
        const variable = e.getVariable(this.id);
        let actual = variable.getValor();
        return actual.pop();
    }
}
exports.ArrayPopAccesosType = ArrayPopAccesosType;
