"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForOf = void 0;
const entorno_1 = require("../../entorno");
const instruccion_1 = require("../../instruccion");
const tipo_1 = require("../../tipo");
const variable_1 = require("../../variable");
const _ = require("lodash");
const return_1 = require("../../return");
const break_1 = require("../../break");
const continue_1 = require("../../continue");
class ForOf extends instruccion_1.Instruccion {
    constructor(linea, tipo_declaracion, id, exp, instrucciones) {
        super(linea);
        Object.assign(this, { tipo_declaracion, id, exp, instrucciones });
    }
    ejecutar(e) {
        const arreglo = this.exp.ejecutar(e);
        for (let actual of arreglo.arreglo) {
            //Entorno generado por cada iteracion
            const entorno = new entorno_1.Entorno(e);
            let variable = new variable_1.Variable({ valor: _.cloneDeep(actual), id: this.id, tipo: tipo_1.getTipo(actual), fila: this.linea, columna: this.linea });
            //Inserto la variable en mi nuevo entorno de ejecucion
            entorno.setVariable(variable);
            //Ejecuto las instruccion
            for (let instruccion of this.instrucciones) {
                const resp = instruccion.ejecutar(entorno);
                //Validacion de instruccion Return
                if (resp instanceof return_1.Return) {
                    return resp;
                }
                //Validacion de instrucion Break
                if (resp instanceof break_1.Break) {
                    return;
                }
                //Validacion instruccion Continue
                if (resp instanceof continue_1.Continue) {
                    break;
                }
            }
        }
    }
}
exports.ForOf = ForOf;
