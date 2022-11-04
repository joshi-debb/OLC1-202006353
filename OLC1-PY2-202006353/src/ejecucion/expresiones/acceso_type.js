"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesoType = void 0;
const arreglo_1 = require("../arreglo");
const instruccion_1 = require("../instruccion");
const type_1 = require("../type");
class AccesoType extends instruccion_1.Instruccion {
    constructor(linea, id, lista_accesos) {
        super(linea);
        Object.assign(this, { id, lista_accesos });
    }
    ejecutar(e) {
        const variable = e.getVariable(this.id);
        let res = variable.getValor();
        for (let i = 0; i < this.lista_accesos.length; i++) {
            const exp = this.lista_accesos[i];
            if (res instanceof type_1.Type) {
                res = res;
                if (typeof exp == 'string') {
                    const variable = res.getAtributo(exp);
                    res = variable.getValor();
                }
            }
            //Si el valor actual es un Arreglo
            else if (res instanceof arreglo_1.Arreglo) {
                res = res;
                for (let j = 0; j < exp.length; j++) {
                    const index = exp[j].ejecutar(e);
                    if (res instanceof arreglo_1.Arreglo) {
                        res = res.getValue(index);
                    }
                }
            }
        }
        return res;
    }
}
exports.AccesoType = AccesoType;
