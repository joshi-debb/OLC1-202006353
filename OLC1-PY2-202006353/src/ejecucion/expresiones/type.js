"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const entorno_1 = require("../entorno");
const instruccion_1 = require("../instruccion");
const variable_1 = require("../variable");
const type_1 = require("../type");
class Type extends instruccion_1.Instruccion {
    constructor(linea, lista_atributos) {
        super(linea);
        Object.assign(this, { lista_atributos });
    }
    ejecutar(e) {
        const entorno = new entorno_1.Entorno();
        this.lista_atributos.forEach((atributo) => {
            const id = atributo['id'];
            const exp = atributo['exp'];
            const tipo = atributo['tipo'];
            const fila = atributo['fila'];
            const columna = atributo['columna'];
            if (id && exp) {
                let variable = entorno.getVariable(id);
                const valor = exp.ejecutar(e);
                variable = new variable_1.Variable({ valor, id, tipo, fila, columna });
                entorno.setVariable(variable);
            }
        });
        return new type_1.Type(null, entorno.variables);
    }
}
exports.Type = Type;
