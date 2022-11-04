"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadaFuncion = void 0;
const entorno_1 = require("../entorno");
const instruccion_1 = require("../instruccion");
const return_1 = require("../return");
const _ = require("lodash");
const entorno_aux_1 = require("../entorno_aux");
class LlamadaFuncion extends instruccion_1.Instruccion {
    constructor(linea, id, lista_parametros = null) {
        super(linea);
        Object.assign(this, { id, lista_parametros });
    }
    ejecutar(e) {
        const entorno_aux = new entorno_1.Entorno();
        const entorno_local = new entorno_1.Entorno(e);
        const funcion = _.cloneDeep(e.getFuncion(this.id));
        if (this.lista_parametros) {
            for (let i = 0; i < this.lista_parametros.length; i++) {
                const exp = this.lista_parametros[i];
                const variable = funcion.lista_parametros[i];
                const valor = exp.ejecutar(entorno_local);
                variable.valor = valor;
                entorno_aux.setVariable(variable);
            }
        }
        entorno_local.variables = entorno_aux.variables;
        if (entorno_aux_1.EntornoAux.getInstance().estoyEjecutandoFuncion() && this.id.endsWith('_')) {
        }
        else {
            entorno_local.padre = e.getEntornoGlobal();
        }
        entorno_aux_1.EntornoAux.getInstance().inicioEjecucionFuncion();
        for (let instruccion of funcion.instrucciones) {
            const resp = instruccion.ejecutar(entorno_local);
            if (resp instanceof return_1.Return) {
                if (resp.hasValue()) {
                    let val = resp.getValue();
                    entorno_aux_1.EntornoAux.getInstance().finEjecucionFuncion();
                    return val;
                }
                entorno_aux_1.EntornoAux.getInstance().finEjecucionFuncion();
                return;
            }
        }
        entorno_aux_1.EntornoAux.getInstance().finEjecucionFuncion();
    }
}
exports.LlamadaFuncion = LlamadaFuncion;
