  /* Definición Léxica */
%lex

%options case-insensitive

%%

\s+											                // espacios en blanco
"//".*										              // comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multilíneas

//Palabras reservadas
'number'      return 'number';
'void'        return 'void';
'boolean'     return 'boolean';
'string'      return 'string';
'const'       return 'const';
'return'      return 'return';
'null'        return 'null';
'push'        return 'push';
'pop'         return 'pop';
'if'          return 'if';
'else'        return 'else';
'true'        return 'true';
'false'       return 'false';
'break'       return 'break';
'switch'      return 'switch';
'case'        return 'case';
'default'     return 'default';
'continue'    return 'continue';
'while'       return 'while';
'do'          return 'do';
'for'         return 'for';
'print'       return 'print';
'println'     return 'println';
'int'         return 'int';
'double'      return 'double';
'char'        return 'char';
'new'         return 'new';
'elif'        return 'elif';
'until'       return 'until';
'run'         return 'run';
'tochararray' return 'tochararray';
'length'      return 'length';
'typeof'      return 'typeof';
'tostring'    return 'tostring';
'tolower'     return 'tolower';
'toupper'     return 'toupper';
'round'       return 'round';


';'  return 'punto_coma';
','  return 'coma';
':'  return 'dos_puntos';
'{'  return 'llave_izq';
'}'  return 'llave_der';
'('  return 'par_izq';
')'  return 'par_der';
'['  return 'cor_izq';
']'  return 'cor_der';
'.'  return 'punto';
'++' return 'mas_mas'
'+'  return 'mas';
'--' return 'menos_menos'
'-'  return 'menos';
'^'  return 'potencia';
'*'  return 'por';
'/'  return 'div';
'%'  return 'mod';
'<=' return 'menor_igual';
'>=' return 'mayor_igual';
'>'  return 'mayor';
'<'  return 'menor';
'==' return 'igual_que';
'='  return 'igual';
'!=' return 'dif_que';
'&&' return 'and';
'||' return 'or';
'!'  return 'not';
'?'  return 'interrogacion';

\"[^\"]*\"      { yytext = yytext.substr(0,yyleng-0); return 'cadena'; }

\'[^\']*\'      { yytext = yytext.substr(0,yyleng-0); return 'character'; }

[0-9]+("."[0-9]+)?\b    return 'number';
([a-zA-Z])[a-zA-Z0-9_]* return 'id';

<<EOF>>       return 'EOF';

. {
  const er = new error_1.Error({ numero: errores_1.Errores.getInstance().getError_L(), tipo: 'lexico', descripcion: `El valor "${yytext}" no es valido`,  linea: `${yylineno + 1}` , columna: `${yylloc.first_column + 1}` });
  errores_1.Errores.getInstance().push(er);
  }

/lex

//Imports
%{
  const { NodoAST } = require('../AST/nodoAST');
  const error_1 = require("../AST/error");
  const errores_1 = require("../AST/errores");
%}

/* Asociación de operadores y precedencia */
// https://entrenamiento-python-basico.readthedocs.io/es/latest/leccion3/operadores_aritmeticos.html
%left 'interrogacion'
%left 'or'
%left 'and'
%left 'not'
%left 'igual_que' 'dif_que'
%left 'mayor' 'menor' 'mayor_igual' 'menor_igual'
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left 'umenos'
%right 'potencia'
%left 'mas_mas' 'menos_menos'

%start INICIO

%%

INICIO
  : INSTRUCCIONES EOF { return new NodoAST({label: 'INICIO', hijos: [$1], linea: yylineno}); }
;


INSTRUCCIONES
  : INSTRUCCIONES INSTRUCCION  { $$ = new NodoAST({label: 'INSTRUCCIONES', hijos: [...$1.hijos, ...$2.hijos], linea: yylineno}); }
  | INSTRUCCION                { $$ = new NodoAST({label: 'INSTRUCCIONES', hijos: [...$1.hijos], linea: yylineno}); }
;

INSTRUCCION
  : DEC_VARIABLE      { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | DEC_FUNCION       { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | DEC_ARREGLOS      { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | ASIGNACION        { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | ARRAY_PUSH        { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | ARRAY_POP         { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | PRINT             { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | PRINTLN           { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | SENTENCIA_IF      { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | SWITCH            { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | BREAK             { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | RETURN            { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | CONTINUE          { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | WHILE             { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | DO_WHILE          { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | FOR               { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | FOR_OF            { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | FOR_IN            { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | LLAMADA_FUNCION   { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | RUN_FUNCION       { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | MAS_MENOS         { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | ARRAY_LENGTH      { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
;

EXPRESION
  : menos EXPRESION %prec umenos    { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2], linea: yylineno}); }
  | EXPRESION mas EXPRESION         { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION menos EXPRESION       { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION por EXPRESION         { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION div EXPRESION         { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION mod EXPRESION         { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION potencia EXPRESION    { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | id mas_mas                      { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2], linea: yylineno}); }
  | id menos_menos                  { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2], linea: yylineno}); }
  | par_izq EXPRESION par_der       { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION mayor EXPRESION       { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION menor EXPRESION       { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION mayor_igual EXPRESION { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION menor_igual EXPRESION { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION igual_que EXPRESION   { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION dif_que EXPRESION     { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION and EXPRESION         { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXPRESION or EXPRESION          { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2, $3], linea: yylineno}); }
  | not EXPRESION                   { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1, $2], linea: yylineno}); }
  | number                          { $$ = new NodoAST({label: 'EXPRESION', hijos: [new NodoAST({label: 'NUMBER', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | cadena                          { $$ = new NodoAST({label: 'EXPRESION', hijos: [new NodoAST({label: 'STRING', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | character                       { $$ = new NodoAST({label: 'EXPRESION', hijos: [new NodoAST({label: 'STRING', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | id                              { $$ = new NodoAST({label: 'EXPRESION', hijos: [new NodoAST({label: 'ID', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | true                            { $$ = new NodoAST({label: 'EXPRESION', hijos: [new NodoAST({label: 'BOOLEAN', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | false                           { $$ = new NodoAST({label: 'EXPRESION', hijos: [new NodoAST({label: 'BOOLEAN', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | null                            { $$ = new NodoAST({label: 'EXPRESION', hijos: [new NodoAST({label: 'NULL', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | cor_izq EXPRESIONES cor_der     { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1,$2,$3], linea: yylineno}); }
  | cor_izq cor_der                 { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1,$2], linea: yylineno}); }
  | ACCESO_ARREGLO                  { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1], linea: yylineno}); }
  | ARRAY_POP                       { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1], linea: yylineno}); }
  | TERNARIO                        { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1], linea: yylineno}); }
  | FUNCIONES                       { $$ = new NodoAST({label: 'EXPRESION', hijos: [$1], linea: yylineno}); }
;

DECLARACIONES 
  : DECLARACIONES coma DEC_ID                    { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | DECLARACIONES coma DEC_ID_TIPO               { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | DECLARACIONES coma DEC_ID_COR                { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | DECLARACIONES coma DEC_ID_EXP                { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | DECLARACIONES coma DEC_ID_TIPO_EXP           { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | DECLARACIONES coma DEC_ID_TIPO_CORCHETES_EXP { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | DEC_ID                                       { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_TIPO                                  { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_COR                                   { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_EXP                                   { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_TIPO_EXP                              { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_TIPO_CORCHETES_EXP                    { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | CASTEOS                                      { $$ = new NodoAST({label: 'DECLARACIONES', hijos: [$1], linea: yylineno}); }
;


DEC_ID_COR 
  : id dos_puntos TIPOS CORCHETES  { $$ = new NodoAST({label: 'DEC_ID_COR', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;
DEC_ID_TIPO  
  : id dos_puntos TIPOS            { $$ = new NodoAST({label: 'DEC_ID_TIPO', hijos: [$1,$2,$3], linea: yylineno}); }
;
DEC_ID  
  : id                             { $$ = new NodoAST({label: 'DEC_ID', hijos: [$1], linea: yylineno}); }
;


TIPO
  : let         { $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }
  | const       { $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }
  | int         { $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }
  | double      { $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }
  | char        { $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }
  | string      { $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }
  | boolean     { $$ = new NodoAST({label: 'TIPO', hijos: [$1], linea: yylineno}); }
;

TIPOS
  : string      { $$ = new NodoAST({label: 'TIPOS', hijos: [$1], linea: yylineno}); }
  | number      { $$ = new NodoAST({label: 'TIPOS', hijos: [$1], linea: yylineno}); }
  | int         { $$ = new NodoAST({label: 'TIPOS', hijos: [$1], linea: yylineno}); }
  | double      { $$ = new NodoAST({label: 'TIPOS', hijos: [$1], linea: yylineno}); }
  | char        { $$ = new NodoAST({label: 'TIPOS', hijos: [$1], linea: yylineno}); }
  | boolean     { $$ = new NodoAST({label: 'TIPOS', hijos: [$1], linea: yylineno}); }
  | void        { $$ = new NodoAST({label: 'TIPOS', hijos: [$1], linea: yylineno}); }
  | id          { $$ = new NodoAST({label: 'TIPOS', hijos: [new NodoAST({label: 'ID', hijos: [$1], linea: yylineno})], linea: yylineno}); }
;

//DEC_VARIABLE VARIABLES
DEC_VARIABLE 
  : TIPO DECLARACIONES punto_coma  { $$ = new NodoAST({label: 'DEC_VARIABLE', hijos: [$1,$2,$3], linea: yylineno});  }
;
//DEC_VARIABLE EXPRESIONES
DEC_ID_EXP 
  : id igual EXPRESION             { $$ = new NodoAST({label: 'DEC_ID_EXP', hijos: [$1,$2,$3], linea: yylineno}); }
;

//ASIGNACION
ASIGNACION 
  : id IGUALES EXPRESION punto_coma               { $$ = new NodoAST({label: 'ASIGNACION', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | id ACCESOS IGUALES EXPRESION punto_coma       { $$ = new NodoAST({label: 'ASIGNACION', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
  | ACCESO_ARREGLO IGUALES EXPRESION punto_coma   { $$ = new NodoAST({label: 'ASIGNACION', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;
IGUALES 
  : igual         { $$ = new NodoAST({label: 'IGUALES', hijos: [$1], linea: yylineno}); }
  | mas igual     { $$ = new NodoAST({label: 'IGUALES', hijos: [$1,$2], linea: yylineno}); }
  | menos igual   { $$ = new NodoAST({label: 'IGUALES', hijos: [$1,$2], linea: yylineno}); }
;

//DEC_VARIABLE DE FUNCIONES
DEC_FUNCION 
  : id par_izq par_der dos_puntos TIPOS llave_izq INSTRUCCIONES llave_der                          { $$ = new NodoAST({label: 'DEC_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7, $8], linea: yylineno}); }
  | id par_izq par_der dos_puntos TIPOS CORCHETES llave_izq INSTRUCCIONES llave_der                { $$ = new NodoAST({label: 'DEC_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9], linea: yylineno}); }
  | id par_izq par_der llave_izq INSTRUCCIONES llave_der                                           { $$ = new NodoAST({label: 'DEC_FUNCION', hijos: [$1, $2, $3, $4, $5, $6], linea: yylineno}); }
  | id par_izq PARAMETROS par_der dos_puntos TIPOS llave_izq INSTRUCCIONES llave_der               { $$ = new NodoAST({label: 'DEC_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9], linea: yylineno}); }
  | id par_izq PARAMETROS par_der dos_puntos TIPOS CORCHETES llave_izq INSTRUCCIONES llave_der     { $$ = new NodoAST({label: 'DEC_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9, $10], linea: yylineno}); }
  | id par_izq PARAMETROS par_der llave_izq INSTRUCCIONES llave_der                                { $$ = new NodoAST({label: 'DEC_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7], linea: yylineno}); }

;
CORCHETES 
  : CORCHETES cor_izq cor_der   { $$ = new NodoAST({label: 'CORCHETES', hijos: [...$1.hijos, '[]'], linea: yylineno}); }
  | cor_izq cor_der             { $$ = new NodoAST({label: 'CORCHETES', hijos: ['[]'], linea: yylineno}); }
;
PARAMETRO 
  : TIPO id { $$ = new NodoAST({label: 'PARAMETRO', hijos: [$1, $2], linea: yylineno}); }
;
PARAMETROS 
  : PARAMETROS coma PARAMETRO     { $$ = new NodoAST({label: 'PARAMETROS', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
  | PARAMETRO                     { $$ = new NodoAST({label: 'PARAMETROS', hijos: [$1], linea: yylineno}); }
;

//DEC_VARIABLE DE ARREGLOS
DEC_ARREGLOS
  : TIPO ACCESOS_ARRAY id igual new TIPO ACCESOS_ARRAY punto_coma                     { $$ = new NodoAST({label: 'DEC_ARREGLOS', hijos: [$1,$2,$3,$6,$7], linea: yylineno}); }
  | TIPO ACCESOS_ARRAY id igual tochararray par_izq EXPRESION par_der punto_coma      { $$ = new NodoAST({label: 'DEC_ARREGLOS', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9], linea: yylineno}); }
  | TIPO ACCESOS_ARRAY id igual llave_izq ARREGLOS llave_der punto_coma               { $$ = new NodoAST({label: 'DEC_ARREGLOS', hijos: [$1,$2,$3,$6], linea: yylineno}); }
  | TIPO ACCESOS_ARRAY id igual llave_izq EXPRESIONES llave_der punto_coma            { $$ = new NodoAST({label: 'DEC_ARREGLOS', hijos: [$1,$2,$3,$6], linea: yylineno}); }
;

ARREGLOS
  : ARREGLOS coma llave_izq EXPRESIONES llave_der     { $$ = new NodoAST({label: 'ARREGLOS', hijos: [...$1.hijos,$4], linea: yylineno}); } 
  | llave_izq EXPRESIONES llave_der                   { $$ = new NodoAST({label: 'ARREGLOS', hijos: [$2], linea: yylineno}); }
;
EXPRESIONES 
  : EXPRESIONES coma EXPRESION    { $$ = new NodoAST({label: 'EXPRESIONES', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
  | EXPRESION                     { $$ = new NodoAST({label: 'EXPRESIONES', hijos: [$1], linea: yylineno}); }
;

//POP EN UN VECTOR
ARRAY_POP 
  : id punto pop par_izq par_der punto_coma  { $$ = new NodoAST({label: 'ARRAY_POP', hijos: [$1,$2,$3,$4,$5,$6], linea: yylineno}); }
;

//PUSH EN UN VECTOR
ARRAY_PUSH 
  : id punto push par_izq EXPRESION par_der punto_coma              { $$ = new NodoAST({label: 'ARRAY_PUSH', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
  | id ACCESOS punto push par_izq EXPRESION par_der punto_coma      { $$ = new NodoAST({label: 'ARRAY_PUSH', hijos: [$1,$2,$3,$4,$5,$6,$7,$8], linea: yylineno}); }
;

//TAMANO DE UN VECTOR
ARRAY_LENGTH 
  : TIPO id igual length par_izq ACCESO_ARREGLO par_der  punto_coma  { $$ = new NodoAST({label: 'ARRAY_LENGTH', hijos: [$1,$2,$3,$4,$5,$6,$7,$8], linea: yylineno}); }
  | TIPO id igual length par_izq id par_der punto_coma               { $$ = new NodoAST({label: 'ARRAY_LENGTH', hijos: [$1,$2,$3,$4,$5,$6,$7,$8], linea: yylineno}); }
;

ACCESO_ARREGLO 
  : id ACCESOS_ARRAY { $$ = new NodoAST({label: 'ACCESO_ARREGLO', hijos: [$1, $2], linea: yylineno}); }
;
ACCESOS 
  : ACCESOS punto id                            { $$ = new NodoAST({label: 'ACCESOS', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
  | punto id                                    { $$ = new NodoAST({label: 'ACCESOS', hijos: [$1,$2], linea: yylineno}); }
  | ACCESOS punto id ACCESOS_ARRAY              { $$ = new NodoAST({label: 'ACCESOS', hijos: [...$1.hijos,$2,$3,$4], linea: yylineno}); }
  | punto id ACCESOS_ARRAY                      { $$ = new NodoAST({label: 'ACCESOS', hijos: [$1,$2,$3], linea: yylineno}); }
;
ACCESOS_ARRAY 
  : ACCESOS_ARRAY cor_izq EXPRESION cor_der     { $$ = new NodoAST({label: 'ACCESOS_ARRAY', hijos: [...$1.hijos,$2,$3,$4], linea: yylineno}); }
  | cor_izq EXPRESION cor_der                   { $$ = new NodoAST({label: 'ACCESOS_ARRAY', hijos: [$1,$2,$3], linea: yylineno}); }
  | ACCESOS_ARRAY cor_izq CAST cor_der          { $$ = new NodoAST({label: 'ACCESOS_ARRAY', hijos: [...$1.hijos,$2,$3,$4], linea: yylineno}); }
  | cor_izq CAST cor_der                        { $$ = new NodoAST({label: 'ACCESOS_ARRAY', hijos: [$1,$2,$3], linea: yylineno}); }
  | ACCESOS_ARRAY cor_izq cor_der               { $$ = new NodoAST({label: 'ACCESOS_ARRAY', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
  | cor_izq cor_der                             { $$ = new NodoAST({label: 'ACCESOS_ARRAY', hijos: [$1,$2], linea: yylineno}); }
;

//CICLO WHILE
WHILE 
  : while par_izq EXPRESION par_der llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'WHILE', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
;

//CICLO DO WHILE
DO_WHILE 
  : do llave_izq INSTRUCCIONES llave_der while par_izq EXPRESION par_der punto_coma { $$ = new NodoAST({label: 'DO_WHILE_UNTIL', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9], linea: yylineno}); }
  | do llave_izq INSTRUCCIONES llave_der until par_izq EXPRESION par_der punto_coma { $$ = new NodoAST({label: 'DO_WHILE_UNTIL', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9], linea: yylineno}); }
;

//CICLO FOR
FOR 
  : for par_izq DEC_VARIABLE EXPRESION punto_coma ASIGNACION_FOR par_der llave_izq INSTRUCCIONES llave_der  { $$ = new NodoAST({label: 'FOR', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10], linea: yylineno}); }
  | for par_izq ASIGNACION EXPRESION punto_coma ASIGNACION_FOR par_der llave_izq INSTRUCCIONES llave_der            { $$ = new NodoAST({label: 'FOR', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10], linea: yylineno}); }
;

ASIGNACION_FOR 
  : id IGUALES EXPRESION      { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2,$3], linea: yylineno}); }
  | id mas_mas                { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2], linea: yylineno}); }
  | id menos_menos            { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2], linea: yylineno}); }
  | id mas EXPRESION          { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2,$3], linea: yylineno}); }
  | id menos EXPRESION        { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2,$3], linea: yylineno}); }
;

//SENTENCIA SWITHC
SWITCH 
  : switch par_izq EXPRESION par_der llave_izq CASES llave_der { $$ = new NodoAST({label: 'SWITCH', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
;
CASES 
  : CASES CASE          { $$ = new NodoAST({label: 'CASES', hijos: [...$1.hijos,$2], linea: yylineno}); }
  | CASE                { $$ = new NodoAST({label: 'CASES', hijos: [$1], linea: yylineno}); }
  | DEFAULT             { $$ = new NodoAST({label: 'CASES', hijos: [$1], linea: yylineno}); }
  | CASES DEFAULT       { $$ = new NodoAST({label: 'CASES', hijos: [...$1.hijos,$2], linea: yylineno}); }
;
CASE 
  : case EXPRESION dos_puntos INSTRUCCIONES { $$ = new NodoAST({label: 'CASE', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;
DEFAULT 
  : default dos_puntos INSTRUCCIONES   { $$ = new NodoAST({label: 'DEFAULT', hijos: [$1,$2,$3], linea: yylineno}); }
;
CONTINUE 
  : continue punto_coma         { $$ = new NodoAST({label: 'CONTINUE', hijos: [$1, $2], linea: yylineno}); }
;
BREAK 
  : break punto_coma            { $$ = new NodoAST({label: 'BREAK', hijos: [$1,$2], linea: yylineno}); }
;
RETURN 
  : return EXPRESION punto_coma { $$ = new NodoAST({label: 'RETURN', hijos: [$1,$2,$3], linea: yylineno}); }
  | return punto_coma           { $$ = new NodoAST({label: 'RETURN', hijos: [$1,$2], linea: yylineno}); }
;

//SENTENCIA IF
SENTENCIA_IF 
  : IF                      { $$ = new NodoAST({label: 'SENTENCIA_IF', hijos: [$1], linea: yylineno}); }
  | IF ELSE                 { $$ = new NodoAST({label: 'SENTENCIA_IF', hijos: [$1,$2], linea: yylineno}); }
  | IF L_ELIF        { $$ = new NodoAST({label: 'SENTENCIA_IF', hijos: [$1,$2], linea: yylineno}); }
  | IF L_ELIF ELSE   { $$ = new NodoAST({label: 'SENTENCIA_IF', hijos: [$1,$2,$3], linea: yylineno}); }
;
IF 
  : if par_izq EXPRESION par_der llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'IF', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
;
ELSE 
  : else llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'ELSE', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;
ES_ELIF 
  : elif par_izq EXPRESION par_der llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'ES_ELIF', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
;
L_ELIF 
  : L_ELIF ES_ELIF   { $$ = new NodoAST({label: 'L_ELIF', hijos: [...$1.hijos, $2], linea: yylineno}); }
  | ES_ELIF          { $$ = new NodoAST({label: 'L_ELIF', hijos: [$1], linea: yylineno}); }
;

//EJECUTAR FUNCION
RUN_FUNCION 
  : run id par_izq par_der punto_coma             { $$ = new NodoAST({label: 'RUN_FUNCION', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
  | run id par_izq EXPRESIONES par_der punto_coma { $$ = new NodoAST({label: 'RUN_FUNCION', hijos: [$1,$2,$3,$4,$5,$6], linea: yylineno}); }
;

//LLAMADA DE FUNCION
LLAMADA_FUNCION 
  : id par_izq par_der punto_coma             { $$ = new NodoAST({label: 'LLAMADA_FUNCION', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | id par_izq EXPRESIONES par_der punto_coma { $$ = new NodoAST({label: 'LLAMADA_FUNCION', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
;
//LLAMADA DE FUNCION COMO EXPRESION
FUNCIONES 
  : id par_izq par_der                    { $$ = new NodoAST({label: 'FUNCIONES', hijos: [$1,$2,$3], linea: yylineno}); }
  | id par_izq EXPRESIONES par_der        { $$ = new NodoAST({label: 'FUNCIONES', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | typeof par_izq EXPRESIONES par_der    { $$ = new NodoAST({label: 'FUNCIONES', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | tostring par_izq EXPRESIONES par_der  { $$ = new NodoAST({label: 'FUNCIONES', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | tolower par_izq EXPRESIONES par_der   { $$ = new NodoAST({label: 'FUNCIONES', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | toupper par_izq EXPRESIONES par_der   { $$ = new NodoAST({label: 'FUNCIONES', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | round par_izq EXPRESIONES par_der     { $$ = new NodoAST({label: 'FUNCIONES', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;

//CASTEOS
CASTEOS
  : id igual par_izq TIPO par_der EXPRESION  { $$ = new NodoAST({label: 'CAST_EXP', hijos: [$1,$2,$3,$4,$5,$6], linea: yylineno}); }
;
CAST
  : par_izq TIPO par_der EXPRESION           { $$ = new NodoAST({label: 'CAST', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;

//INCREMENTO Y DECREMENTO
MAS_MENOS
  : id mas_mas punto_coma       { $$ = new NodoAST({label: 'MAS_MENOS', hijos: [$1,$2,$3], linea: yylineno}); }
  | id menos_menos punto_coma   { $$ = new NodoAST({label: 'MAS_MENOS', hijos: [$1,$2,$3], linea: yylineno}); }
  | mas_mas id punto_coma       { $$ = new NodoAST({label: 'MAS_MENOS', hijos: [$1,$2,$3], linea: yylineno}); }
  | menos_menos id punto_coma   { $$ = new NodoAST({label: 'MAS_MENOS', hijos: [$1,$2,$3], linea: yylineno}); }
;

//OPERADOR TERNARIO
TERNARIO 
  : EXPRESION interrogacion EXPRESION dos_puntos EXPRESION { $$ = new NodoAST({label: 'TERNARIO', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
;

//PRINT AND PRINTLN
PRINT 
  : print par_izq EXPRESIONES par_der punto_coma      { $$ = new NodoAST({label: 'PRINT', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
;
PRINTLN 
  : println par_izq EXPRESIONES par_der punto_coma    { $$ = new NodoAST({label: 'PRINTLN', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
;