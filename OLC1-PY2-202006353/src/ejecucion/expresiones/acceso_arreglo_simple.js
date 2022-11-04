"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesoArregloSimple = void 0;
const arreglo_1 = require("../arreglo");
const instruccion_1 = require("../instruccion");
class AccesoArregloSimple extends instruccion_1.Instruccion {
    constructor(linea, id, lista_accesos) {
        super(linea);
        Object.assign(this, { id, lista_accesos });
    }
    ejecutar(e) {
        const variable = e.getVariable(this.id);
        let res = variable.getValor();
        for (let i = 0; i < this.lista_accesos.length; i++) {
            const index = this.lista_accesos[i].ejecutar(e);
            if (i == this.lista_accesos.length - 1) {
                if (res instanceof arreglo_1.Arreglo) {
                    return res.getValue(index);
                }
            }
            else {
                if (res instanceof arreglo_1.Arreglo) {
                    res = res.getValue(index);
                }
            }
        }
    }
}
exports.AccesoArregloSimple = AccesoArregloSimple;
