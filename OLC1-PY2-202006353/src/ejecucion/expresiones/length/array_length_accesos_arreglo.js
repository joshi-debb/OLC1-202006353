"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayLengthAccesosArreglo = void 0;
const instruccion_1 = require("../../instruccion");
class ArrayLengthAccesosArreglo extends instruccion_1.Instruccion {
    constructor(linea, id, lista_accesos) {
        super(linea);
        Object.assign(this, { id, lista_accesos });
    }
    ejecutar(e) {
        const variable = e.getVariable(this.id);
        let arreglo = variable.getValor();
        for (let instruccion of this.lista_accesos) {
            const index = instruccion.ejecutar(e);
            arreglo = arreglo.getValue(index);
        }
        return arreglo.getSize();
    }
}
exports.ArrayLengthAccesosArreglo = ArrayLengthAccesosArreglo;
