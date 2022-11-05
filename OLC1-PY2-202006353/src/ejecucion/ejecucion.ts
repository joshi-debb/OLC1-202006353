import { Errores } from '../AST/errores';
import { Error } from '../AST/error';
import { Salida } from '../AST/salida';
import { Entorno } from './entorno';
import { Id } from './expresiones/id';
import { Nativo } from './expresiones/nativo';
import { Instruccion } from './instruccion';
import { DecId } from './instrucciones/declaraciones/dec_id';
import { DecIdExp } from './instrucciones/declaraciones/dec_id_exp';
import { Log } from './instrucciones/log';
import { Suma } from './expresiones/aritmeticas/suma';
import { Asignacion } from './instrucciones/asignaciones/asignacion';
import { Arreglo } from './expresiones/arreglo';
import { AccesoArregloSimple } from './expresiones/acceso_arreglo_simple';
import { AsignacionAtributoType } from './instrucciones/asignaciones/asignacion_atributo_type';
import { AsignacionArreglo } from './instrucciones/asignaciones/asignacion_arreglo';
import { DeclaracionFuncion } from './instrucciones/declaraciones/declaracion_funcion';
import { LlamadaFuncion } from './expresiones/llamada_funcion';
import { Return } from './expresiones/flujo/return';
import { Resta } from './expresiones/aritmeticas/resta';
import { Multiplicacion } from './expresiones/aritmeticas/multiplicacion';
import { Division } from './expresiones/aritmeticas/division';
import { Modular } from './expresiones/aritmeticas/modular';
import { Potencia } from './expresiones/aritmeticas/potencia';
import { Mayor } from './expresiones/relacionales/mayor';
import { Menor } from './expresiones/relacionales/menor';
import { MayorIgual } from './expresiones/relacionales/mayor_igual';
import { MenorIgual } from './expresiones/relacionales/menor_igual';
import { Igual } from './expresiones/relacionales/igual';
import { Diferente } from './expresiones/relacionales/diferente';
import { And } from './expresiones/logicas/And';
import { Or } from './expresiones/logicas/Or';
import { Not } from './expresiones/logicas/Not';
import { ArrayLengthAccesosArreglo } from './expresiones/length/array_length_accesos_arreglo';
import { ArrayPop } from './expresiones/pop/array_pop';
import { ArrayPopAccesosArreglo } from './expresiones/pop/array_pop_accesos_arreglo';
import { ArrayPopAccesosType } from './expresiones/pop/array_pop_accesos_type';
import { DecIdTipo } from './instrucciones/declaraciones/dec_id_tipo';
import * as _ from 'lodash';
import { DecIdTipoCorchetes } from './instrucciones/declaraciones/dec_id_tipo_corchetes';
import { DecIdTipoExp } from './instrucciones/declaraciones/dec_id_tipo_exp';
import { DecIdTipoCorchetesExp } from './instrucciones/declaraciones/dec_id_tipo_corchetes_exp';
import { PushArreglo } from './instrucciones/push/push_arreglo';
import { PushArregloAccesoType } from './instrucciones/push/push_arreglo_acceso_type';
import { Break } from './expresiones/flujo/break';
import { Continue } from './expresiones/flujo/continue';
import { If } from './if';
import { InstruccionIf } from './expresiones/condicionales/instruccion_if';
import { While } from './instrucciones/ciclos/while';
import { DoWhile } from './instrucciones/ciclos/do_while';
import { For } from './instrucciones/ciclos/for';
import { MasMas } from './expresiones/aritmeticas/mas_mas';
import { MenosMenos } from './expresiones/aritmeticas/menos_menos';
import { Variable } from './variable';
import { Ternario } from './expresiones/condicionales/ternario';
import { Case } from './case';
import { Switch } from './expresiones/condicionales/switch';
import { Entornos } from './entornos';
import { IncrementoDecremento } from './instrucciones/incremento_decremento';

export class Ejecucion {
  raiz: Object;
  contador: number;
  dot: string;

  constructor(raiz: Object) {
    Object.assign(this, { raiz, contador: 0, dot: '' });
  }

  getDot(): string {
    this.contador = 0;
    this.dot = "digraph G {\n";
    if (this.raiz != null) {
      this.generacionDot(this.raiz);
    }
    this.dot += "\n}";
    return this.dot;
  }

  generacionDot(nodo: any): void {
    if (nodo instanceof Object) {
      let idPadre = this.contador;
      this.dot += `node${idPadre}[label="${this.getStringValue(nodo.label)}"];\n`;
      if (nodo.hasOwnProperty("hijos")) {
        nodo.hijos.forEach((nodoHijo: any) => {
          let idHijo = ++this.contador;
          this.dot += `node${idPadre} -> node${idHijo};\n`;
          if (nodoHijo instanceof Object) {
            this.generacionDot(nodoHijo);
          } else {
            this.dot += `node${idHijo}[label="${this.getStringValue(nodoHijo)}"];`;
          }
        });
      }
    }
  }

  getStringValue(label: string): string {
    if (label.startsWith("\"") || label.startsWith("'") || label.startsWith("`")) {
      return label.substr(1, label.length - 2);
    }
    return label;
  }

  ejecutar(): void {
    const instrucciones = this.recorrer(this.raiz);
    if (instrucciones instanceof Array) {
      const entorno = new Entorno();
      Salida.getInstance().clear();
      instrucciones.forEach(element => {
        if (element instanceof Instruccion) {
          try {
            element.ejecutar(entorno);
          } catch (error) {

          }
        }
      });

      Entornos.getInstance().push(entorno);
    }
  }

  getSalida(): String[] {
    return Salida.getInstance().lista;
  }

  imprimirErrores(): void {
    if (Errores.getInstance().hasErrors()) {
      Errores.getInstance().getErrors().forEach((error: Error) => {
        console.log(error.descripcion);
      });
    }
  }

  recorrer(nodo: any): any {
    //S
    if (this.soyNodo('INICIO', nodo)) {
      return this.recorrer(nodo.hijos[0]);
    }

    //INSTRUCCIONES
    if (this.soyNodo('INSTRUCCIONES', nodo)) {
      let instrucciones = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        if (this.soyNodo('DEC_FUNCION', nodoHijo)) {
          const inst = this.recorrer(nodoHijo);
          if (inst instanceof Array) {
            instrucciones = instrucciones.concat(inst);
          }
          else {
            instrucciones.push(inst);
          }
        }
      });

      //Recorro las demas instrucciones
      nodo.hijos.forEach((nodoHijo: any) => {
        if (!this.soyNodo('DEC_FUNCION', nodoHijo)) {
          const inst = this.recorrer(nodoHijo);
          if (inst instanceof Array) {
            instrucciones = instrucciones.concat(inst);
          }
          else {
            instrucciones.push(inst);
          }
        }
      });
      return instrucciones;
    }

    //DEC_VARIABLE
    if (this.soyNodo('DEC_VARIABLE', nodo)) {
      //TIPO DECLARACIONES punto_coma
      const reasignable = this.recorrer(nodo.hijos[0]) as boolean;
      const tipo = nodo.hijos[0];
      const lista_declaraciones = this.recorrer(nodo.hijos[1]) as Array<Object>;
      const lista_instrucciones = [];
      lista_declaraciones.forEach((item: Object) => {
        const linea = nodo.linea;
        const columna = nodo.columna;
        const id = item['id'];
        //{id, tipo, dimensiones, exp, type_generador? }
        if (_.has(item, 'id') && _.has(item, 'tipo') && _.has(item, 'dimensiones') && _.has(item, 'exp')) {
          const dimensiones = item['dimensiones'];
          const exp = item['exp'];
          const type_generador = item['type_generador'] ?? null;
          lista_instrucciones.push(new DecIdTipoCorchetesExp(nodo.linea,nodo.columna, reasignable, id, tipo, dimensiones, exp, type_generador));
        }
        //{id, tipo, dimensiones, type_generador? }
        else if (_.has(item, 'id') && _.has(item, 'tipo') && _.has(item, 'dimensiones')) {
          const dimensiones = item['dimensiones'];
          const type_generador = item['type_generador'] ?? null;
          lista_instrucciones.push(new DecIdTipoCorchetes(nodo.linea,nodo.columna, reasignable, id, tipo, dimensiones, type_generador));
        }
        //{id, tipo, exp, type_generador?}
        else if (_.has(item, 'id') && _.has(item, 'tipo') && _.has(item, 'exp')) {
          const exp = item['exp'];
          const type_generador = item['type_generador'] ?? null;
          lista_instrucciones.push(new DecIdTipoExp(nodo.linea,nodo.columna, reasignable, id, tipo, exp, type_generador));
        }
        //{id, tipo, type_generador?}
        else if (_.has(item, 'id') && _.has(item, 'tipo')) {
          const type_generador = item['type_generador'] ?? null;
          lista_instrucciones.push(new DecIdTipo(nodo.linea,nodo.columna, reasignable, id, tipo, type_generador));
        }
        //{id, exp}
        else if (_.has(item, 'id') && _.has(item, 'exp')) {
          const exp = item['exp'];
          lista_instrucciones.push(new DecIdExp(linea,columna, reasignable, id, exp));
        }
        //{id}
        else if (_.has(item, 'id')) {
          lista_instrucciones.push(new DecId(linea,columna, reasignable, id));
        }
      })
      return lista_instrucciones;
    }

    //DECLARACIONES
    if (this.soyNodo('DECLARACIONES', nodo)) {
      const lista_declaraciones = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        lista_declaraciones.push(this.recorrer(nodoHijo));
      });
      return lista_declaraciones;
    }

    //EXPRESIONES
    if (this.soyNodo('EXPRESIONES', nodo)) {
      const lista = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        if (nodoHijo instanceof Object) {
          const exp = this.recorrer(nodoHijo);
          lista.push(exp);
        }
      });
      return lista;
    }

    //DEC_ID
    if (this.soyNodo('DEC_ID', nodo)) {
      return { id: nodo.hijos[0] };
    }

    // DEC_ID_TIPO
    if (this.soyNodo('DEC_ID_TIPO', nodo)) {
      const tipo_var_nat = this.recorrer(nodo.hijos[2]) as Object;
      return { id: nodo.hijos[0], ...tipo_var_nat }
    }

    //DEC_ID_TIPO_EXP
    if (this.soyNodo('DEC_ID_TIPO_EXP', nodo)) {
      const tipo_var_nat = this.recorrer(nodo.hijos[2]) as Object;
      const exp = this.recorrer(nodo.hijos[4]);
      return { id: nodo.hijos[0], ...tipo_var_nat, exp };
    }

    //DEC_ID_EXP
    if (this.soyNodo('DEC_ID_EXP', nodo)) {
      const id = nodo.hijos[0] as string;
      const exp = this.recorrer(nodo.hijos[2]) as Object;
      return { id, exp };
    }

    //CAST_EXP
    if (this.soyNodo('CAST_EXP', nodo)) {
      const id = nodo.hijos[0] as string;
      const tipo = nodo.hijos[3] as string;
      const exp = this.recorrer(nodo.hijos[5]) as Object;
      return { id, tipo, exp };
    }

    //CAST
    if (this.soyNodo('CAST', nodo)) {
      const tipo = nodo.hijos[1] as string;
      const exp = this.recorrer(nodo.hijos[3]) as Object;
      return { tipo, exp };
    }

    //DEC_ID_COR
    if (this.soyNodo('DEC_ID_COR', nodo)) {
      const id = nodo.hijos[0];
      const tipo_var_nat = this.recorrer(nodo.hijos[2]);
      const dimensiones = this.recorrer(nodo.hijos[3]);
      return { id, ...tipo_var_nat, dimensiones };
    }

    //DEC_ARREGLOS
    if (this.soyNodo('DEC_ARREGLOS', nodo)) {
      const tipo = nodo.hijos[0];
      const accesos1 = this.recorrer(nodo.hijos[1]);
      const id = nodo.hijos[2];
      const tipo2 = nodo.hijos[5];
      const accesos2 = this.recorrer(nodo.hijos[6]);
      return {tipo, accesos1, id, tipo2, accesos2 };
    }

    //ARREGLOS
    if (this.soyNodo('ARREGLOS', nodo)) {
      const accesos1 = this.recorrer(nodo.hijos[1]);
      return {accesos1 };
    }

    //ACCESOS_ARRAY
    if (this.soyNodo('ACCESOS_ARRAY', nodo)) {
      const lista: Instruccion[] = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        if (nodoHijo instanceof Object) {
          const exp = this.recorrer(nodoHijo);
          if (exp instanceof Instruccion) {
            lista.push(exp);
          }
        }
      });
      return lista;
    }

    //DEC_ID_TIPO_CORCHETES_EXP
    if (this.soyNodo('DEC_ID_TIPO_CORCHETES_EXP', nodo)) {
      const id = nodo.hijos[0];
      const tipo_var_nat = this.recorrer(nodo.hijos[2]);
      const dimensiones = this.recorrer(nodo.hijos[3]);
      const exp = this.recorrer(nodo.hijos[5]);
      return { id, ...tipo_var_nat, dimensiones, exp };
    }

    //TIPO
    if (this.soyNodo('TIPO', nodo)) {
      return nodo.hijos[0].toString();
    }

    //ID
    if (this.soyNodo('ID', nodo)) {
      return nodo.hijos[0];
    }

    //EXPRESION
    if (this.soyNodo('EXPRESION', nodo)) {
      switch (nodo.hijos.length) {
        case 1:
          {
            const exp = this.recorrer(nodo.hijos[0]);;
            if (typeof exp == 'string') return new Id(nodo.linea, exp.toString());

            //Si es un objeto
            if (exp instanceof Object) return exp;
          }
        case 2:
          //menos EXPRESION
          if (nodo.hijos[0] == '-' && this.soyNodo('EXPRESION', nodo.hijos[1])) {
            const expIzq = new Nativo(nodo.linea, -1);
            const expDer = this.recorrer(nodo.hijos[1]);
            return new Multiplicacion(nodo.linea, expIzq, expDer);
          }
          //cor_izq cor_der
          if (nodo.hijos[0] == '[' && nodo.hijos[1] == ']') {
            return new Arreglo(nodo.linea);
          }
          //id mas_mas
          if (nodo.hijos[1] == '++') {
            const id = nodo.hijos[0];
            return new MasMas(nodo.linea, id);
          }
          //id menos_menos
          if (nodo.hijos[1] == '--') {
            const id = nodo.hijos[0];
            return new MenosMenos(nodo.linea, id);
          }
          //not EXPRESION
          if (nodo.hijos[0] == '!' && this.soyNodo('EXPRESION', nodo.hijos[1])) {
            const exp = this.recorrer(nodo.hijos[1]);
            return new Not(nodo.linea, exp);
          }
        case 3:
          //EXPRESION mas EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '+' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Suma(linea, expIzq, expDer);
          }
          //EXPRESION menos EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '-' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Resta(linea, expIzq, expDer);
          }
          //EXPRESION por EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '*' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Multiplicacion(linea, expIzq, expDer);
          }
          //EXPRESION div EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '/' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Division(linea, expIzq, expDer);
          }
          //EXPRESION mod EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '%' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Modular(linea, expIzq, expDer);
          }
          //EXPRESION potencia EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '**' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Potencia(linea, expIzq, expDer);
          }
          //par_izq EXPRESION par_der
          if (nodo.hijos[0] == '(' && this.soyNodo('EXPRESION', nodo.hijos[1]) && nodo.hijos[2] == ')') {
            return this.recorrer(nodo.hijos[1]);
          }
          //EXPRESION mayor EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '>' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Mayor(linea, expIzq, expDer);
          }
          //EXPRESION menor EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '<' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Menor(linea, expIzq, expDer);
          }
          //EXPRESION mayor_igual EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '>=' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new MayorIgual(linea, expIzq, expDer);
          }
          //EXPRESION menor_igual EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '<=' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new MenorIgual(linea, expIzq, expDer);
          }
          //EXPRESION igual_que EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '==' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Igual(linea, expIzq, expDer);
          }
          //EXPRESION dif_que EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '!=' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Diferente(linea, expIzq, expDer);
          }
          //EXPRESION and EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '&&' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new And(linea, expIzq, expDer);
          }
          //EXPRESION or EXPRESION
          if (this.soyNodo('EXPRESION', nodo.hijos[0]) && nodo.hijos[1] == '||' && this.soyNodo('EXPRESION', nodo.hijos[2])) {
            const expIzq = this.recorrer(nodo.hijos[0]);
            const expDer = this.recorrer(nodo.hijos[2]);
            const linea = nodo.linea;
            return new Or(linea, expIzq, expDer);
          }

          //cor_izq EXPRESIONES cor_der
          if (nodo.hijos[0] == '[' && this.soyNodo('EXPRESIONES', nodo.hijos[1]) && nodo.hijos[2] == ']') {
            const lista_expresiones = this.recorrer(nodo.hijos[1]);
            return new Arreglo(nodo.linea, lista_expresiones);
          }
      }
    }

    //NUMBER
    if (this.soyNodo('NUMBER', nodo)) {
      const str_num = nodo.hijos[0];
      return new Nativo(nodo.linea, Number(str_num));
    }

    //STRING
    if (this.soyNodo('STRING', nodo)) {
      const str = nodo.hijos[0] as string;
      const str2 = str.substr(1, str.length - 2);
      return new Nativo(nodo.linea, str2);
    }

    // BOOLEAN
    if (this.soyNodo('BOOLEAN', nodo)) {
      if (nodo.hijos[0] == 'true') {
        return new Nativo(nodo.linea, true);
      }
      return new Nativo(nodo.linea, false);
    }

    //NULL
    if (this.soyNodo('NULL', nodo)) {
      return new Nativo(nodo.linea, null);
    }

    //PRINT
    if (this.soyNodo('PRINT', nodo)) {
      const lista = this.recorrer(nodo.hijos[2]) as Array<Instruccion>;

      return new Log(nodo.linea, lista);
    }

    //PRINTLN
    if (this.soyNodo('PRINTLN', nodo)) {
      const lista = this.recorrer(nodo.hijos[2]) as Array<Instruccion>;
      return new Log(nodo.linea, lista);
    }

    // ATRIBUTO
    if (this.soyNodo('ATRIBUTO', nodo)) {
      const id = nodo.hijos[0];
      const tipo = this.recorrer(nodo.hijos[2]) as Object;
      const atributo = { id, ...tipo };
      if (nodo.hijos.length == 4 && this.soyNodo('CORCHETES', nodo.hijos[3])) {
        atributo['corchetes'] = this.recorrer(nodo.hijos[3]) as Number;
      }
      return atributo;
    }

    //CORCHETES
    if (this.soyNodo('CORCHETES', nodo)) {
      let size = 0;
      nodo.hijos.forEach((nodoHijo: any) => {
        if (nodoHijo == '[]') size++;
      });
      return size;
    }

    //LISTA_ATRIBUTOS
    if (this.soyNodo('LISTA_ATRIBUTOS', nodo)) {
      const lista_atributos: Object[] = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        if (nodoHijo instanceof Object) {
          lista_atributos.push(this.recorrer(nodoHijo));
        }
      });
      return lista_atributos;
    }

    //ACCESOS_ARRAY
    if (this.soyNodo('ACCESOS_ARRAY', nodo)) {
      const lista: Instruccion[] = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        if (nodoHijo instanceof Object) {
          const exp = this.recorrer(nodoHijo);
          if (exp instanceof Instruccion) {
            lista.push(exp);
          }
        }
      });
      return lista;
    }

    //ACCESOS
    if (this.soyNodo('ACCESOS', nodo)) {
      const lista: Array<Object | String> = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        if (nodoHijo instanceof Object) {
          const res = this.recorrer(nodoHijo);
          lista.push(res);
        }
        if (typeof nodoHijo == 'string' && nodoHijo != '.') {
          lista.push(nodoHijo);
        }
      });
      return lista;
    }

    //IGUALES
    if (this.soyNodo('IGUALES', nodo)) {
      switch (nodo.hijos.length) {
        case 1:
          return '=';
        case 2:
          if (nodo.hijos[0] == '+') return '+=';
          if (nodo.hijos[0] == '-') return '-=';
      }
    }

    //ASIGNACION
    if (this.soyNodo('ASIGNACION', nodo)) {
      switch (nodo.hijos.length) {
        case 5: {
          const id = nodo.hijos[0];
          const lista_accesos = this.recorrer(nodo.hijos[1]);
          const tipo_igual = this.recorrer(nodo.hijos[2]);
          const exp = this.recorrer(nodo.hijos[3]);

          return new AsignacionAtributoType(nodo.linea, id, lista_accesos, tipo_igual, exp);
        }
        case 4: {
          if (this.soyNodo('ACCESO_ARREGLO', nodo.hijos[0])) {
            const acceso_arreglo_simple: AccesoArregloSimple = this.recorrer(nodo.hijos[0]);
            const tipo_igual = this.recorrer(nodo.hijos[1]);
            const exp = this.recorrer(nodo.hijos[2]);

            const id = acceso_arreglo_simple.id;
            const lista_accesos = acceso_arreglo_simple.lista_accesos;

            return new AsignacionArreglo(nodo.linea, id, lista_accesos, tipo_igual, exp);
          }
          if (typeof nodo.hijos[0] == 'string') {
            const id = nodo.hijos[0];
            const tipo_igual = this.recorrer(nodo.hijos[1]);
            const exp = this.recorrer(nodo.hijos[2]);

            return new Asignacion(nodo.linea, id, tipo_igual, exp);
          }
        }
      }
    }



    //ACCESO_ARREGLO
    if (this.soyNodo('ACCESO_ARREGLO', nodo)) {
      //id ACCESOS_ARRAY
      const id = nodo.hijos[0];
      const lista_accesos_arreglo = this.recorrer(nodo.hijos[1]);
      return new AccesoArregloSimple(nodo.linea, id, lista_accesos_arreglo);
    }

    //DEC_FUNCION
    if (this.soyNodo('DEC_FUNCION', nodo)) {
      switch (nodo.hijos.length) {
        case 7: {
          const id = nodo.hijos[0];
          const instrucciones = this.recorrer(nodo.hijos[6]);
          const tipo = nodo.hijos[4]
          return new DeclaracionFuncion(nodo.linea,nodo.columna, id, instrucciones, tipo);
        }
        // id par_izq PARAMETROS par_der llave_izq INSTRUCCIONES llave_der
        case 8: {
          const id = nodo.hijos[0];
          const lista_parametros = this.recorrer(nodo.hijos[3]);
          const instrucciones = this.recorrer(nodo.hijos[6]);
          const tipo = 'void';
          return new DeclaracionFuncion(nodo.linea,nodo.columna, id, instrucciones,tipo, lista_parametros);
        }
        // id par_izq par_der dos_puntos TIPOS llave_izq INSTRUCCIONES llave_der
        case 9: {
          const id = nodo.hijos[0];
          const instrucciones = this.recorrer(nodo.hijos[6]);
          const tipo = nodo.hijos[4];
          return new DeclaracionFuncion(nodo.linea,nodo.columna, id, instrucciones, tipo);
        }
        case 10: {
          //  id par_izq par_der dos_puntos TIPOS CORCHETES llave_izq INSTRUCCIONES llave_der
          if(this.soyNodo('CORCHETES', nodo.hijos[6])){
            const id = nodo.hijos[0];
            const tipo_return =  nodo.hijos[4];
            const instrucciones = this.recorrer(nodo.hijos[7]);
            return new DeclaracionFuncion(nodo.linea,nodo.columna, id, instrucciones, tipo_return);
          }
          // id par_izq PARAMETROS par_der dos_puntos TIPOS llave_izq INSTRUCCIONES llave_der
          else if(this.soyNodo('PARAMETROS', nodo.hijos[3])){
            const id = nodo.hijos[0];
            //[Variable ...]
            const lista_parametros = this.recorrer(nodo.hijos[2]);

            // {tipo, type_generador?}
            const tipo_variable_nativa = this.recorrer(nodo.hijos[5]);
            const tipo_return = tipo_variable_nativa.tipo;
            const instrucciones = this.recorrer(nodo.hijos[8]);
            return new DeclaracionFuncion(nodo.linea, id, instrucciones, tipo_return, lista_parametros);
          }
        }
        //  id par_izq PARAMETROS par_der dos_puntos TIPOS CORCHETES llave_izq INSTRUCCIONES llave_der
        case 11: {
          const id = nodo.hijos[1];
          //[Variable ...]
          const lista_parametros = this.recorrer(nodo.hijos[3]);
          const tipo_return = nodo.hijos[5];
          const instrucciones = this.recorrer(nodo.hijos[9]);
          return new DeclaracionFuncion(nodo.linea, id, instrucciones, tipo_return, lista_parametros);
        }
      }
    }


    //LLAMADA_FUNCION
    if (this.soyNodo('LLAMADA_FUNCION', nodo)) {
      const id = nodo.hijos[0];
      switch (nodo.hijos.length) {
        //id par_izq par_der punto_coma
        case 4:
          return new LlamadaFuncion(nodo.linea, id);
        //id par_izq EXPRESIONES par_der punto_coma
        case 5:
          //[EXPRESION ...]
          const lista_expresiones = this.recorrer(nodo.hijos[2]);
          return new LlamadaFuncion(nodo.linea, id, lista_expresiones);
      }
    }

    //FUNCIONES
    if (this.soyNodo('FUNCIONES', nodo)) {
      const id = nodo.hijos[0];
      switch (nodo.hijos.length) {
        //id par_izq par_der
        case 3:
          return new LlamadaFuncion(nodo.linea, id);
        //id par_izq EXPRESIONES par_der
        case 4:
          //[EXPRESION ...]
          const lista_expresiones = this.recorrer(nodo.hijos[2]);
          return new LlamadaFuncion(nodo.linea, id, lista_expresiones);
      }
    }

    //LLAMADA_FUNCION
    if (this.soyNodo('RUN_FUNCION', nodo)) {
      const id = nodo.hijos[1];
      switch (nodo.hijos.length) {
        //id par_izq par_der punto_coma
        case 4:
          return new LlamadaFuncion(nodo.linea, id);
        //id par_izq EXPRESIONES par_der punto_coma
        case 5:
          //[EXPRESION ...]
          const lista_expresiones = this.recorrer(nodo.hijos[3]);
          return new LlamadaFuncion(nodo.linea, id, lista_expresiones);
      }
    }

    //RETURN
    if (this.soyNodo('RETURN', nodo)) {
      switch (nodo.hijos.length) {
        //return EXPRESION punto_coma
        case 3:
          const exp = this.recorrer(nodo.hijos[1]);
          return new Return(nodo.linea, true, exp);
        //return punto_coma
        case 2:
          return new Return(nodo.linea, false);
      }
    }

    //ARRAY_LENGTH
    if (this.soyNodo('ARRAY_LENGTH', nodo)) {
      const id = nodo.hijos[1];
      //TIPO id igual length par_izq ACCESO_ARREGLO par_der punto_coma
      if (this.soyNodo('ACCESOS_ARRAY', nodo.hijos[5])) {
        const lista_accesos = this.recorrer(nodo.hijos[5]);
        return new ArrayPopAccesosArreglo(nodo.linea, id, lista_accesos);
      }else{

        const idd = nodo.hijos[5];
        return new ArrayLengthAccesosArreglo(nodo.linea, id, idd);

      }
    }

    //ARRAY_POP
    if (this.soyNodo('ARRAY_POP', nodo)) {
      const id = nodo.hijos[0];
      switch (nodo.hijos.length) {
        //id punto pop par_izq par_der
        case 5:
          return new ArrayPop(nodo.linea, id);
        case 6:
          //id ACCESOS_ARRAY punto pop par_izq par_der
          if (this.soyNodo('ACCESOS_ARRAY', nodo.hijos[1])) {
            const lista_accesos = this.recorrer(nodo.hijos[1]);
            return new ArrayPopAccesosArreglo(nodo.linea, id, lista_accesos);
          }
          //id ACCESOS punto pop par_izq par_der
          if (this.soyNodo('ACCESOS', nodo.hijos[1])) {
            const lista_accesos = this.recorrer(nodo.hijos[1]);
            return new ArrayPopAccesosType(nodo.linea, id, lista_accesos);
          }
      }
    }

    //ARRAY_PUSH
    if (this.soyNodo('ARRAY_PUSH', nodo)) {
      const id = nodo.hijos[0];
      switch (nodo.hijos.length) {
        // id punto push par_izq EXPRESION par_der punto_coma
        case 7: {
          const exp = this.recorrer(nodo.hijos[4]);
          return new PushArreglo(nodo.linea, id, exp);
        }
        // id ACCESOS punto push par_izq EXPRESION par_der punto_coma
        case 8: {
          const lista_accesos = this.recorrer(nodo.hijos[1]);
          const exp = this.recorrer(nodo.hijos[5]);
          return new PushArregloAccesoType(nodo.linea, id, lista_accesos, exp);
        }
      }
    }

    //BREAK
    if (this.soyNodo('BREAK', nodo)) {
      //break punto_coma
      return new Break(nodo.linea);
    }

    //CONTINUE
    if (this.soyNodo('CONTINUE', nodo)) {
      //continue punto_coma
      return new Continue(nodo.linea);
    }

    //SENTENCIA_IF
    if (this.soyNodo('SENTENCIA_IF', nodo)) {
      switch (nodo.hijos.length) {
        //IF
        case 1:
          const inst = this.recorrer(nodo.hijos[0]);
          return new InstruccionIf(nodo.linea, [inst]);
        case 2:
          //IF ELSE
          if (this.soyNodo('IF', nodo.hijos[0]) && this.soyNodo('ELSE', nodo.hijos[1])) {
            const inst_if = this.recorrer(nodo.hijos[0]);
            const inst_else = this.recorrer(nodo.hijos[1]);
            return new InstruccionIf(nodo.linea, [inst_if, inst_else]);
          }
          //IF L_ELIF
          if (this.soyNodo('IF', nodo.hijos[0]) && this.soyNodo('L_ELIF', nodo.hijos[1])) {
            const inst_if = this.recorrer(nodo.hijos[0]);
            const lista_ifs = this.recorrer(nodo.hijos[1]);
            return new InstruccionIf(nodo.linea, [inst_if, ...lista_ifs]);
          }
        //IF L_ELIF ELSE
        case 3:
          const inst_if = this.recorrer(nodo.hijos[0]);
          const lista_ifs = this.recorrer(nodo.hijos[1]);
          const inst_else = this.recorrer(nodo.hijos[2]);
          return new InstruccionIf(nodo.linea, [inst_if, ...lista_ifs, inst_else]);
      }
    }

    //IF
    if (this.soyNodo('IF', nodo)) {
      //if par_izq EXPRESION par_der llave_izq INSTRUCCIONES llave_der
      const condicion = this.recorrer(nodo.hijos[2]);
      const instrucciones = this.recorrer(nodo.hijos[5]);
      return new If(condicion, instrucciones);
    }

    //ELSE
    if (this.soyNodo('ELSE', nodo)) {
      //else llave_izq INSTRUCCIONES llave_der
      const condicion = new Nativo(nodo.linea, true);
      const instrucciones = this.recorrer(nodo.hijos[2]);
      return new If(condicion, instrucciones);
    }

    //ES_ELIF
    if (this.soyNodo('ES_ELIF', nodo)) {
      //else if par_izq EXPRESION par_der llave_izq INSTRUCCIONES llave_der
      const condicion = this.recorrer(nodo.hijos[3]);
      const instrucciones = this.recorrer(nodo.hijos[6]);
      return new If(condicion, instrucciones);
    }

    //L_ELIF
    if (this.soyNodo('L_ELIF', nodo)) {
      const lista = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        const resp = this.recorrer(nodoHijo);
        if (resp instanceof If) {
          lista.push(resp);
        }
      });
      return lista;
    }

    //WHILE
    if (this.soyNodo('WHILE', nodo)) {
      //while par_izq EXPRESION par_der llave_izq INSTRUCCIONES llave_der
      const condicion = this.recorrer(nodo.hijos[2]);
      const instrucciones = this.recorrer(nodo.hijos[5]);
      return new While(nodo.linea, condicion, instrucciones);
    }

    //DO_WHILE
    if (this.soyNodo('DO_WHILE_UNTIL', nodo)) {
      //do llave_izq INSTRUCCIONES llave_der while par_izq EXPRESION par_der punto_coma
      const instrucciones = this.recorrer(nodo.hijos[2]);
      const condicion = this.recorrer(nodo.hijos[6]);
      return new DoWhile(nodo.linea, instrucciones, condicion);
    }


    //ASIGNACION_FOR
    if (this.soyNodo('ASIGNACION_FOR', nodo)) {
      const id = nodo.hijos[0];
      switch (nodo.hijos.length) {
        // id IGUALES EXPRESION
        case 3:
          const tipo_igual = this.recorrer(nodo.hijos[1]);
          const exp = this.recorrer(nodo.hijos[2]);
          return new Asignacion(nodo.linea, id, tipo_igual, exp);
        //id mas_mas | id menos_menos
        case 2:
          if (nodo.hijos[1] == '++')
            return new MasMas(nodo.linea, id);
          if (nodo.hijos[1] == '--')
            return new MenosMenos(nodo.linea, id);
      }
    }

    //FOR
    if (this.soyNodo('FOR', nodo)) {
      const condicion = this.recorrer(nodo.hijos[3]);
      const asignacion_for = this.recorrer(nodo.hijos[5]);
      const instrucciones = this.recorrer(nodo.hijos[8]);
      //for par_izq DEC_VARIABLE EXPRESION punto_coma ASIGNACION_FOR par_der llave_izq INSTRUCCIONES llave_der
      if (this.soyNodo('DEC_VARIABLE', nodo.hijos[2])) {
        const lista_instrucciones = this.recorrer(nodo.hijos[2]);
        const declaracion = lista_instrucciones[0];
        return new For(nodo.linea, declaracion, null, condicion, asignacion_for, instrucciones);
      }
      //for par_izq ASIGNACION EXPRESION punto_coma ASIGNACION_FOR par_der llave_izq INSTRUCCIONES llave_der
      if (this.soyNodo('ASIGNACION', nodo.hijos[2])) {
        const asignacion = this.recorrer(nodo.hijos[2]);
        return new For(nodo.linea, null, asignacion, condicion, asignacion_for, instrucciones);
      }
    }



    //PARAMETRO
    if (this.soyNodo('PARAMETRO', nodo)) {
      const id = nodo.hijos[0];

      switch (nodo.hijos.length) {
        //id dos_puntos TIPOS
        case 3: {
          //{tipo, tpe_generador?}
          const tipo_variable_nativa = this.recorrer(nodo.hijos[2]);
          const tipo = tipo_variable_nativa.tipo;
          return new Variable({ valor: null, id, tipo: tipo, fila: nodo.linea, columna: nodo.linea});
        }

        //id dos_puntos TIPOS CORCHETES
        case 4: {
          //{tipo, tpe_generador?}
          const tipo_variable_nativa = this.recorrer(nodo.hijos[2]);
          const tipo = tipo_variable_nativa.tipo;
          const dimensiones = this.recorrer(nodo.hijos[3]);
          return new Variable({ valor: null, id, tipo: tipo, fila: nodo.linea, columna: nodo.linea });
        }
        // id dos_puntos Array menor TIPOS mayor
        case 6: {
          //{tipo, tpe_generador?}
          const tipo_variable_nativa = this.recorrer(nodo.hijos[4]);
          const tipo = tipo_variable_nativa.tipo;
          return new Variable({ valor: null, id, tipo: tipo, fila: nodo.linea, columna: nodo.linea });
        }
      }
    }

    //PARAMETROS
    if (this.soyNodo('PARAMETROS', nodo)) {
      const variables = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        if (nodoHijo instanceof Object) {
          const resp = this.recorrer(nodoHijo);
          if (resp instanceof Variable) {
            variables.push(resp);
          }
        }
      });
      return variables; //[Variable...]
    }

    //TERNARIO
    if (this.soyNodo('TERNARIO', nodo)) {
      //EXPRESION interrogacion EXPRESION dos_puntos EXPRESION
      const condicion = this.recorrer(nodo.hijos[0]);
      const exp_true = this.recorrer(nodo.hijos[2]);
      const exp_false = this.recorrer(nodo.hijos[4]);
      return new Ternario(nodo.linea, condicion, exp_true, exp_false);
    }

    //SWITCH
    if (this.soyNodo('SWITCH', nodo)) {
      //switch par_izq EXPRESION par_der llave_izq CASES llave_der
      const exp = this.recorrer(nodo.hijos[2]);
      const lista_case = this.recorrer(nodo.hijos[5]);
      return new Switch(nodo.linea, exp, lista_case);
    }

    //CASE
    if (this.soyNodo('CASE', nodo)) {
      //case EXPRESION dos_puntos INSTRUCCIONES
      const exp = this.recorrer(nodo.hijos[1]);
      const instrucciones = this.recorrer(nodo.hijos[3]);
      return new Case(exp, instrucciones);
    }

    //DEFAULT
    if (this.soyNodo('DEFAULT', nodo)) {
      //default dos_puntos INSTRUCCIONES
      const instrucciones = this.recorrer(nodo.hijos[2]);
      return new Case(null, instrucciones, true);
    }

    //CASES
    if (this.soyNodo('CASES', nodo)) {
      const lista = [];
      nodo.hijos.forEach((nodoHijo: any) => {
        if (nodoHijo instanceof Object) {
          const resp = this.recorrer(nodoHijo);
          if (resp instanceof Case) {
            lista.push(resp);
          }
        }
      });
      return lista; //[Case ...]
    }


    //MAS_MENOS
    if (this.soyNodo('MAS_MENOS', nodo)) {
      //id mas_mas punto_coma || id menos_menos punto_coma
      const id = nodo.hijos[0];
      const incremento = nodo.hijos[1] == '++';
      return new IncrementoDecremento(nodo.linea, id, incremento);
    }
  }

  /**
   * Funcion para determinar si no tengo funciones anidadas
   * @param nodo
   */
  puedoEjecutar(nodo: any): boolean {

    //S
    if (this.soyNodo('INICIO', nodo)) {
      for (let nodoHijo of nodo.hijos) {
        const resp = this.puedoEjecutar(nodoHijo);
        if (!resp) return false;
      }
    }

    //INSTRUCCIONES
    if (this.soyNodo('INSTRUCCIONES', nodo)) {
      for (let nodoHijo of nodo.hijos) {
        //Ejecuto solo los nodos que sean DEC_FUNCION
        if (this.soyNodo('DEC_FUNCION', nodoHijo)) {
          const res = this.puedoEjecutar(nodoHijo);
          if (!res) return false;
        }
      }
    }

    //DEC_FUNCION
    if (this.soyNodo('DEC_FUNCION', nodo)) {
      for (let nodoHijo of nodo.hijos) {
        //Si es el nodo INSTRUCCIONES
        if (this.soyNodo('INSTRUCCIONES', nodoHijo)) {
          for (let nodoInst of nodoHijo.hijos) {
            if (this.soyNodo('DEC_FUNCION', nodoInst)) {
              return false;
            }
          }
        }
      }
    }

    return true;
  }

  /**
   * Funcion para determinar en que tipo de nodo estoy
   * @param label
   * @param nodo
   */
  soyNodo(label: string, nodo: any): boolean {
    if (nodo == null || !(nodo instanceof Object)) {
      return false;
    }
    if (nodo.hasOwnProperty('label') && nodo.label != null) {
      return nodo.label === label;
    }
    return false;
  }
}
