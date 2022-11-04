"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
class Entorno {
    constructor(padre) {
        this.padre = padre != null ? padre : null;
        this.variables = new Map();
        this.types = new Map();
        this.funciones = new Map();
    }
    setVariable(variable) {
        this.variables.set(variable.id, variable);
    }
    getVariable(id) {
        for (let e = this; e != null; e = e.padre) {
            let variable = e.variables.get(id);
            if (variable != null)
                return variable;
        }
        return null;
    }
    hasVariable(id) {
        for (let e = this; e != null; e = e.padre) {
            if (e.variables.has(id)) {
                return true;
            }
        }
        return false;
    }
    updateValorVariable(id, valor) {
        const variable = this.getVariable(id);
        if (variable) {
            variable.valor = valor;
        }
    }
    getType(id) {
        for (let e = this; e != null; e = e.padre) {
            let type = e.types.get(id);
            if (type != null)
                return type;
        }
        return null;
    }
    setType(type) {
        this.types.set(type.id, type);
    }
    setFuncion(funcion) {
        this.funciones.set(funcion.id, funcion);
    }
    hasFuncion(id) {
        for (let e = this; e != null; e = e.padre) {
            if (e.funciones.has(id)) {
                return true;
            }
        }
        return false;
    }
    getFuncion(id) {
        for (let e = this; e != null; e = e.padre) {
            if (e.funciones.has(id)) {
                return e.funciones.get(id);
            }
        }
        return null;
    }
    //Utilizado para saber si debo ir a una funcion a buscar la variable
    deboBuscarEnFunciones(id) {
        const ids = id.split("_");
        if (ids.length < 3)
            return false;
        if (ids[0] != 'nv')
            return false;
        return true;
    }
    //Utilizado para obtener el id de la funcion en la cual debo ir a buscar
    getIdFuncionABuscar(id) {
        var _a;
        const ids = id.split("_", 2);
        return (_a = ids[1]) !== null && _a !== void 0 ? _a : '';
    }
    getEntornoGlobal() {
        for (let e = this; e != null; e = e.padre) {
            if (e.padre == null)
                return e;
        }
    }
    toString() {
        let salida = `*** VARIABLES ****\n`;
        for (let variable of Array.from(this.variables.values())) {
            salida += variable.toString() + '\n';
        }
        return salida;
    }
    getVariables() {
        return Array.from(this.variables.values());
    }
}
exports.Entorno = Entorno;
