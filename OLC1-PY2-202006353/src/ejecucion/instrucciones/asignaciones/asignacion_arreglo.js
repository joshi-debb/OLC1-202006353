"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionArreglo = void 0;
const arreglo_1 = require("../../arreglo");
const instruccion_1 = require("../../instruccion");
const _ = require("lodash");
class AsignacionArreglo extends instruccion_1.Instruccion {
    constructor(linea, id, lista_accesos, tipo_igual, exp) {
        super(linea);
        Object.assign(this, { id, lista_accesos, tipo_igual, exp });
    }
    ejecutar(e) {
        //Busqueda en el entorno
        const variable = e.getVariable(this.id);
        let res = variable.getValor();
        let valor_a_asignar = this.exp.ejecutar(e);
        valor_a_asignar = _.cloneDeep(valor_a_asignar);
        for (let i = 0; i < this.lista_accesos.length; i++) {
            const index = this.lista_accesos[i].ejecutar(e);
            if (res instanceof arreglo_1.Arreglo) {
                if (!res.hasIndex(index)) {
                }
                //Si ya es el ultimo acceso
                if (i == this.lista_accesos.length - 1) {
                    if (this.tipo_igual == '=') {
                        res.setValue(index, valor_a_asignar);
                    }
                    else {
                        const nuevo_valor = this.tipo_igual == '+=' ? res.getValue(index) + valor_a_asignar : res.getValue(index) - valor_a_asignar;
                        res.setValue(index, nuevo_valor);
                    }
                }
                //Si aun no es el ultimo acceso
                else {
                    res = res.getValue(index);
                }
            }
        }
    }
}
exports.AsignacionArreglo = AsignacionArreglo;
