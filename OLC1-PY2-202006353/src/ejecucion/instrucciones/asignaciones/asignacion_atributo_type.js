"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionAtributoType = void 0;
const arreglo_1 = require("../../arreglo");
const instruccion_1 = require("../../instruccion");
const type_1 = require("../../type");
const variable_1 = require("../../variable");
const _ = require("lodash");
class AsignacionAtributoType extends instruccion_1.Instruccion {
    constructor(linea, id, lista_accesos, tipo_igual, exp) {
        super(linea);
        Object.assign(this, { id, lista_accesos, tipo_igual, exp });
    }
    ejecutar(e) {
        let variable = e.getVariable(this.id);
        let valor = variable.getValor();
        const size = this.lista_accesos.length;
        //Inicio los accesos
        for (let i = 0; i < size; i++) {
            const exp = this.lista_accesos[i];
            if (valor instanceof variable_1.Variable) {
                valor = valor.getValor();
            }
            //Si el valor actual es un type
            if (valor instanceof type_1.Type) {
                valor = valor.getAtributo(exp); //Devuelve una instancia de variable
            }
            //Si el valor actual es un arreglo
            else if (valor instanceof arreglo_1.Arreglo) {
                if (i == size - 1)
                    break;
                for (let j = 0; j < exp.length; j++) {
                    const index = exp[j].ejecutar(e);
                    if (valor instanceof arreglo_1.Arreglo) {
                        valor = valor.getValue(index);
                    }
                }
            }
        }
        let valor_a_asignar = this.exp.ejecutar(e);
        _.cloneDeep(valor_a_asignar);
        if (valor instanceof variable_1.Variable) {
            if (this.tipo_igual == '=') {
                valor.valor = valor_a_asignar;
            }
            else {
                const res = this.tipo_igual == '+=' ? valor.getValor() + valor_a_asignar : valor.getValor() - valor_a_asignar;
                valor.valor = res;
            }
        }
        else if (valor instanceof arreglo_1.Arreglo) {
            const lista_exps = this.lista_accesos[size - 1];
            for (let i = 0; i < lista_exps.length; i++) {
                const index = lista_exps[i].ejecutar(e);
                if (valor instanceof arreglo_1.Arreglo) {
                    //Si soy el ultimo indice
                    if (i == lista_exps.length - 1) {
                        if (this.tipo_igual == '=') {
                            valor.setValue(index, valor_a_asignar);
                        }
                        else {
                            const res = this.tipo_igual == '+=' ? valor.getValue(index) + valor_a_asignar : valor.getValue(index) - valor_a_asignar;
                            valor.setValue(index, res);
                        }
                    }
                    else {
                        valor = valor.getValue(index);
                    }
                }
            }
        }
    }
}
exports.AsignacionAtributoType = AsignacionAtributoType;
