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
'type'        return 'type';
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
  const { NodoAST } = require('../arbol/nodoAST');
  const error_1 = require("../arbol/error");
  const errores_1 = require("../arbol/errores");
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

%start S

%%

S
  : INSTRUCCIONES EOF { return new NodoAST({label: 'S', hijos: [$1], linea: yylineno}); }
;


INSTRUCCIONES
  : INSTRUCCIONES INSTRUCCION  { $$ = new NodoAST({label: 'INSTRUCCIONES', hijos: [...$1.hijos, ...$2.hijos], linea: yylineno}); }
  | INSTRUCCION                { $$ = new NodoAST({label: 'INSTRUCCIONES', hijos: [...$1.hijos], linea: yylineno}); }
;

INSTRUCCION
  : DECLARACION_VARIABLE    { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | DECLARACION_FUNCION     { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | DECLARACION_TYPE        { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | DEC_ARREGLOS            { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | ASIGNACION              { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | PUSH_ARREGLO            { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | ARRAY_POP               { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | PRINT                   { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | PRINTLN                 { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | INSTRUCCION_IF          { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | SWITCH                  { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | BREAK                   { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | RETURN                  { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | CONTINUE                { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | WHILE                   { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | DO_WHILE                { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | FOR                     { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | FOR_OF                  { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | FOR_IN                  { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | LLAMADA_FUNCION         { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | RUN_FUNCION             { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | INCREMENTO_DECREMENTO   { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
  | ARRAY_LENGTH            { $$ = new NodoAST({label: 'INSTRUCCION', hijos: [$1], linea: yylineno}); }
;

EXP
  : menos EXP %prec umenos              { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2], linea: yylineno}); }
  | EXP mas EXP                         { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP menos EXP                       { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP por EXP                         { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP div EXP                         { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP mod EXP                         { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP potencia EXP                    { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | id mas_mas                          { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2], linea: yylineno}); }
  | id menos_menos                      { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2], linea: yylineno}); }
  | par_izq EXP par_der                 { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP mayor EXP                       { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP menor EXP                       { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP mayor_igual EXP                 { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP menor_igual EXP                 { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP igual_que EXP                   { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP dif_que EXP                     { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP and EXP                         { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | EXP or EXP                          { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2, $3], linea: yylineno}); }
  | not EXP                             { $$ = new NodoAST({label: 'EXP', hijos: [$1, $2], linea: yylineno}); }
  | number                              { $$ = new NodoAST({label: 'EXP', hijos: [new NodoAST({label: 'NUMBER', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | cadena                              { $$ = new NodoAST({label: 'EXP', hijos: [new NodoAST({label: 'STRING', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | character                           { $$ = new NodoAST({label: 'EXP', hijos: [new NodoAST({label: 'STRING', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | id                                  { $$ = new NodoAST({label: 'EXP', hijos: [new NodoAST({label: 'ID', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | true                                { $$ = new NodoAST({label: 'EXP', hijos: [new NodoAST({label: 'BOOLEAN', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | false                               { $$ = new NodoAST({label: 'EXP', hijos: [new NodoAST({label: 'BOOLEAN', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | null                                { $$ = new NodoAST({label: 'EXP', hijos: [new NodoAST({label: 'NULL', hijos: [$1], linea: yylineno})], linea: yylineno}); }
  | cor_izq LISTA_EXPRESIONES cor_der   { $$ = new NodoAST({label: 'EXP', hijos: [$1,$2,$3], linea: yylineno}); }
  | cor_izq cor_der                     { $$ = new NodoAST({label: 'EXP', hijos: [$1,$2], linea: yylineno}); }
  | ACCESO_ARREGLO                      { $$ = new NodoAST({label: 'EXP', hijos: [$1], linea: yylineno}); }
  | ARRAY_POP                           { $$ = new NodoAST({label: 'EXP', hijos: [$1], linea: yylineno}); }
  | TYPE                                { $$ = new NodoAST({label: 'EXP', hijos: [$1], linea: yylineno}); }
  | TERNARIO                            { $$ = new NodoAST({label: 'EXP', hijos: [$1], linea: yylineno}); }
  | LLAMADA_FUNCION_EXP                 { $$ = new NodoAST({label: 'EXP', hijos: [$1], linea: yylineno}); }
;

LISTA_DECLARACIONES 
  : LISTA_DECLARACIONES coma DEC_ID                           { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | LISTA_DECLARACIONES coma DEC_ID_TIPO                      { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | LISTA_DECLARACIONES coma DEC_ID_TIPO_CORCHETES            { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | LISTA_DECLARACIONES coma DEC_ID_EXP                       { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | LISTA_DECLARACIONES coma DEC_ID_TIPO_EXP                  { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | LISTA_DECLARACIONES coma DEC_ID_TIPO_CORCHETES_EXP        { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [...$1.hijos,$3], linea: yylineno}); }
  | DEC_ID                                                    { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_TIPO                                               { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_TIPO_CORCHETES                                     { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_EXP                                                { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_TIPO_EXP                                           { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | DEC_ID_TIPO_CORCHETES_EXP                                 { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [$1], linea: yylineno}); }
  | CASTEOS                                                   { $$ = new NodoAST({label: 'LISTA_DECLARACIONES', hijos: [$1], linea: yylineno}); }
;


DEC_ID_TIPO_CORCHETES 
  : id dos_puntos TIPO_VARIABLE_NATIVA LISTA_CORCHETES  { $$ = new NodoAST({label: 'DEC_ID_TIPO_CORCHETES', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;
DEC_ID_TIPO  
  : id dos_puntos TIPO_VARIABLE_NATIVA                  { $$ = new NodoAST({label: 'DEC_ID_TIPO', hijos: [$1,$2,$3], linea: yylineno}); }
;
DEC_ID  
  : id                                                  { $$ = new NodoAST({label: 'DEC_ID', hijos: [$1], linea: yylineno}); }
;


TIPO_DEC_VARIABLE
  : let         { $$ = new NodoAST({label: 'TIPO_DEC_VARIABLE', hijos: [$1], linea: yylineno}); }
  | const       { $$ = new NodoAST({label: 'TIPO_DEC_VARIABLE', hijos: [$1], linea: yylineno}); }
  | int         { $$ = new NodoAST({label: 'TIPO_DEC_VARIABLE', hijos: [$1], linea: yylineno}); }
  | double      { $$ = new NodoAST({label: 'TIPO_DEC_VARIABLE', hijos: [$1], linea: yylineno}); }
  | char        { $$ = new NodoAST({label: 'TIPO_DEC_VARIABLE', hijos: [$1], linea: yylineno}); }
  | string      { $$ = new NodoAST({label: 'TIPO_DEC_VARIABLE', hijos: [$1], linea: yylineno}); }
  | boolean     { $$ = new NodoAST({label: 'TIPO_DEC_VARIABLE', hijos: [$1], linea: yylineno}); }
;

TIPO_VARIABLE_NATIVA
  : string      { $$ = new NodoAST({label: 'TIPO_VARIABLE_NATIVA', hijos: [$1], linea: yylineno}); }
  | number      { $$ = new NodoAST({label: 'TIPO_VARIABLE_NATIVA', hijos: [$1], linea: yylineno}); }
  | int         { $$ = new NodoAST({label: 'TIPO_VARIABLE_NATIVA', hijos: [$1], linea: yylineno}); }
  | double      { $$ = new NodoAST({label: 'TIPO_VARIABLE_NATIVA', hijos: [$1], linea: yylineno}); }
  | char        { $$ = new NodoAST({label: 'TIPO_VARIABLE_NATIVA', hijos: [$1], linea: yylineno}); }
  | boolean     { $$ = new NodoAST({label: 'TIPO_VARIABLE_NATIVA', hijos: [$1], linea: yylineno}); }
  | void        { $$ = new NodoAST({label: 'TIPO_VARIABLE_NATIVA', hijos: [$1], linea: yylineno}); }
  | id          { $$ = new NodoAST({label: 'TIPO_VARIABLE_NATIVA', hijos: [new NodoAST({label: 'ID', hijos: [$1], linea: yylineno})], linea: yylineno}); }
;

//DECLARACION VARIABLES
DECLARACION_VARIABLE 
  : TIPO_DEC_VARIABLE LISTA_DECLARACIONES punto_coma  { $$ = new NodoAST({label: 'DECLARACION_VARIABLE', hijos: [$1,$2,$3], linea: yylineno});  }
;
//DECLARACION EXPRESIONES
DEC_ID_EXP 
  : id igual EXP { $$ = new NodoAST({label: 'DEC_ID_EXP', hijos: [$1,$2,$3], linea: yylineno}); }
;

//ASIGNACION
ASIGNACION 
  : id TIPO_IGUAL EXP punto_coma                      { $$ = new NodoAST({label: 'ASIGNACION', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | id LISTA_ACCESOS_TYPE TIPO_IGUAL EXP punto_coma   { $$ = new NodoAST({label: 'ASIGNACION', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
  | ACCESO_ARREGLO TIPO_IGUAL EXP punto_coma          { $$ = new NodoAST({label: 'ASIGNACION', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;
TIPO_IGUAL 
  : igual         { $$ = new NodoAST({label: 'TIPO_IGUAL', hijos: [$1], linea: yylineno}); }
  | mas igual     { $$ = new NodoAST({label: 'TIPO_IGUAL', hijos: [$1,$2], linea: yylineno}); }
  | menos igual   { $$ = new NodoAST({label: 'TIPO_IGUAL', hijos: [$1,$2], linea: yylineno}); }
;

//DECLARACION DE FUNCIONES
DECLARACION_FUNCION 
  : id par_izq par_der dos_puntos TIPO_VARIABLE_NATIVA llave_izq INSTRUCCIONES llave_der                                      { $$ = new NodoAST({label: 'DECLARACION_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7, $8], linea: yylineno}); }
  | id par_izq par_der dos_puntos TIPO_VARIABLE_NATIVA LISTA_CORCHETES llave_izq INSTRUCCIONES llave_der                      { $$ = new NodoAST({label: 'DECLARACION_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9], linea: yylineno}); }
  | id par_izq par_der llave_izq INSTRUCCIONES llave_der                                                                      { $$ = new NodoAST({label: 'DECLARACION_FUNCION', hijos: [$1, $2, $3, $4, $5, $6], linea: yylineno}); }
  | id par_izq LISTA_PARAMETROS par_der dos_puntos TIPO_VARIABLE_NATIVA llave_izq INSTRUCCIONES llave_der                     { $$ = new NodoAST({label: 'DECLARACION_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9], linea: yylineno}); }
  | id par_izq LISTA_PARAMETROS par_der dos_puntos TIPO_VARIABLE_NATIVA LISTA_CORCHETES llave_izq INSTRUCCIONES llave_der     { $$ = new NodoAST({label: 'DECLARACION_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7, $8, $9, $10], linea: yylineno}); }
  | id par_izq LISTA_PARAMETROS par_der llave_izq INSTRUCCIONES llave_der                                                     { $$ = new NodoAST({label: 'DECLARACION_FUNCION', hijos: [$1, $2, $3, $4, $5, $6, $7], linea: yylineno}); }

;
LISTA_CORCHETES 
  : LISTA_CORCHETES cor_izq cor_der   { $$ = new NodoAST({label: 'LISTA_CORCHETES', hijos: [...$1.hijos, '[]'], linea: yylineno}); }
  | cor_izq cor_der                   { $$ = new NodoAST({label: 'LISTA_CORCHETES', hijos: ['[]'], linea: yylineno}); }
;
PARAMETRO 
  : TIPO_DEC_VARIABLE id { $$ = new NodoAST({label: 'PARAMETRO', hijos: [$1, $2], linea: yylineno}); }
;
LISTA_PARAMETROS 
  : LISTA_PARAMETROS coma PARAMETRO     { $$ = new NodoAST({label: 'LISTA_PARAMETROS', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
  | PARAMETRO                           { $$ = new NodoAST({label: 'LISTA_PARAMETROS', hijos: [$1], linea: yylineno}); }
;

//DECLARACION DE ARREGLOS
DEC_ARREGLOS
  : TIPO_DEC_VARIABLE LISTA_ACCESOS_ARREGLO id igual new TIPO_DEC_VARIABLE LISTA_ACCESOS_ARREGLO punto_coma     { $$ = new NodoAST({label: 'DEC_ARREGLOS', hijos: [$1,$2,$3,$6,$7], linea: yylineno}); }
  | TIPO_DEC_VARIABLE LISTA_ACCESOS_ARREGLO id igual tochararray par_izq EXP par_der punto_coma                 { $$ = new NodoAST({label: 'DEC_ARREGLOS', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9], linea: yylineno}); }
  | TIPO_DEC_VARIABLE LISTA_ACCESOS_ARREGLO id igual llave_izq REC_ARREGLOS llave_der punto_coma                { $$ = new NodoAST({label: 'DEC_ARREGLOS', hijos: [$1,$2,$3,$6], linea: yylineno}); }
  | TIPO_DEC_VARIABLE LISTA_ACCESOS_ARREGLO id igual llave_izq LISTA_EXPRESIONES llave_der punto_coma           { $$ = new NodoAST({label: 'DEC_ARREGLOS', hijos: [$1,$2,$3,$6], linea: yylineno}); }
;

REC_ARREGLOS
  : REC_ARREGLOS coma llave_izq LISTA_EXPRESIONES llave_der     { $$ = new NodoAST({label: 'REC_ARREGLOS', hijos: [...$1.hijos,$4], linea: yylineno}); } 
  | llave_izq LISTA_EXPRESIONES llave_der                       { $$ = new NodoAST({label: 'REC_ARREGLOS', hijos: [$2], linea: yylineno}); }
;
LISTA_EXPRESIONES 
  : LISTA_EXPRESIONES coma EXP    { $$ = new NodoAST({label: 'LISTA_EXPRESIONES', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
  | EXP                           { $$ = new NodoAST({label: 'LISTA_EXPRESIONES', hijos: [$1], linea: yylineno}); }
;

//POP EN UN VECTOR
ARRAY_POP 
  : id punto pop par_izq par_der punto_coma  { $$ = new NodoAST({label: 'ARRAY_POP', hijos: [$1,$2,$3,$4,$5,$6], linea: yylineno}); }
;

//PUSH EN UN VECTOR
PUSH_ARREGLO 
  : id punto push par_izq EXP par_der punto_coma                      { $$ = new NodoAST({label: 'PUSH_ARREGLO', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
  | id LISTA_ACCESOS_TYPE punto push par_izq EXP par_der punto_coma   { $$ = new NodoAST({label: 'PUSH_ARREGLO', hijos: [$1,$2,$3,$4,$5,$6,$7,$8], linea: yylineno}); }
;

//TAMANO DE UN VECTOR
ARRAY_LENGTH 
  : TIPO_DEC_VARIABLE id igual length par_izq ACCESO_ARREGLO par_der  punto_coma  { $$ = new NodoAST({label: 'ARRAY_LENGTH', hijos: [$1,$2,$3,$4,$5,$6,$7,$8], linea: yylineno}); }
  | TIPO_DEC_VARIABLE id igual length par_izq id par_der punto_coma               { $$ = new NodoAST({label: 'ARRAY_LENGTH', hijos: [$1,$2,$3,$4,$5,$6,$7,$8], linea: yylineno}); }
;

ACCESO_ARREGLO 
  : id LISTA_ACCESOS_ARREGLO { $$ = new NodoAST({label: 'ACCESO_ARREGLO', hijos: [$1, $2], linea: yylineno}); }
;
LISTA_ACCESOS_TYPE 
  : LISTA_ACCESOS_TYPE punto id                         { $$ = new NodoAST({label: 'LISTA_ACCESOS_TYPE', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
  | punto id                                            { $$ = new NodoAST({label: 'LISTA_ACCESOS_TYPE', hijos: [$1,$2], linea: yylineno}); }
  | LISTA_ACCESOS_TYPE punto id LISTA_ACCESOS_ARREGLO   { $$ = new NodoAST({label: 'LISTA_ACCESOS_TYPE', hijos: [...$1.hijos,$2,$3,$4], linea: yylineno}); }
  | punto id LISTA_ACCESOS_ARREGLO                      { $$ = new NodoAST({label: 'LISTA_ACCESOS_TYPE', hijos: [$1,$2,$3], linea: yylineno}); }
;
LISTA_ACCESOS_ARREGLO 
  : LISTA_ACCESOS_ARREGLO cor_izq EXP cor_der   { $$ = new NodoAST({label: 'LISTA_ACCESOS_ARREGLO', hijos: [...$1.hijos,$2,$3,$4], linea: yylineno}); }
  | cor_izq EXP cor_der                         { $$ = new NodoAST({label: 'LISTA_ACCESOS_ARREGLO', hijos: [$1,$2,$3], linea: yylineno}); }
  | LISTA_ACCESOS_ARREGLO cor_izq CAST cor_der  { $$ = new NodoAST({label: 'LISTA_ACCESOS_ARREGLO', hijos: [...$1.hijos,$2,$3,$4], linea: yylineno}); }
  | cor_izq CAST cor_der                        { $$ = new NodoAST({label: 'LISTA_ACCESOS_ARREGLO', hijos: [$1,$2,$3], linea: yylineno}); }
  | LISTA_ACCESOS_ARREGLO cor_izq cor_der       { $$ = new NodoAST({label: 'LISTA_ACCESOS_ARREGLO', hijos: [...$1.hijos,$2,$3], linea: yylineno}); }
  | cor_izq cor_der                             { $$ = new NodoAST({label: 'LISTA_ACCESOS_ARREGLO', hijos: [$1,$2], linea: yylineno}); }
;

//CICLO WHILE
WHILE 
  : while par_izq EXP par_der llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'WHILE', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
;

//CICLO DO WHILE
DO_WHILE 
  : do llave_izq INSTRUCCIONES llave_der while par_izq EXP par_der punto_coma { $$ = new NodoAST({label: 'DO_WHILE_UNTIL', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9], linea: yylineno}); }
  | do llave_izq INSTRUCCIONES llave_der until par_izq EXP par_der punto_coma { $$ = new NodoAST({label: 'DO_WHILE_UNTIL', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9], linea: yylineno}); }
;

//CICLO FOR
FOR 
  : for par_izq DECLARACION_VARIABLE EXP punto_coma ASIGNACION_FOR par_der llave_izq INSTRUCCIONES llave_der  { $$ = new NodoAST({label: 'FOR', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10], linea: yylineno}); }
  | for par_izq ASIGNACION EXP punto_coma ASIGNACION_FOR par_der llave_izq INSTRUCCIONES llave_der            { $$ = new NodoAST({label: 'FOR', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10], linea: yylineno}); }
;
FOR_OF 
  : for par_izq TIPO_DEC_VARIABLE id of EXP par_der llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'FOR_OF', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10], linea: yylineno}); }
;
FOR_IN 
  : for par_izq TIPO_DEC_VARIABLE id in EXP par_der llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'FOR_IN', hijos: [$1,$2,$3,$4,$5,$6,$7,$8,$9,$10], linea: yylineno}); }
;
ASIGNACION_FOR 
  : id TIPO_IGUAL EXP   { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2,$3], linea: yylineno}); }
  | id mas_mas          { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2], linea: yylineno}); }
  | id menos_menos      { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2], linea: yylineno}); }
  | id mas EXP          { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2,$3], linea: yylineno}); }
  | id menos EXP        { $$ = new NodoAST({label: 'ASIGNACION_FOR', hijos: [$1,$2,$3], linea: yylineno}); }
;

//SENTENCIA SWITHC
SWITCH 
  : switch par_izq EXP par_der llave_izq LISTA_CASE llave_der { $$ = new NodoAST({label: 'SWITCH', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
;
LISTA_CASE 
  : LISTA_CASE CASE     { $$ = new NodoAST({label: 'LISTA_CASE', hijos: [...$1.hijos,$2], linea: yylineno}); }
  | CASE                { $$ = new NodoAST({label: 'LISTA_CASE', hijos: [$1], linea: yylineno}); }
  | DEFAULT             { $$ = new NodoAST({label: 'LISTA_CASE', hijos: [$1], linea: yylineno}); }
  | LISTA_CASE DEFAULT  { $$ = new NodoAST({label: 'LISTA_CASE', hijos: [...$1.hijos,$2], linea: yylineno}); }
;
CASE 
  : case EXP dos_puntos INSTRUCCIONES { $$ = new NodoAST({label: 'CASE', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;
DEFAULT 
  : default dos_puntos INSTRUCCIONES { $$ = new NodoAST({label: 'DEFAULT', hijos: [$1,$2,$3], linea: yylineno}); }
;
CONTINUE 
  : continue punto_coma { $$ = new NodoAST({label: 'CONTINUE', hijos: [$1, $2], linea: yylineno}); }
;
BREAK 
  : break punto_coma { $$ = new NodoAST({label: 'BREAK', hijos: [$1,$2], linea: yylineno}); }
;
RETURN 
  : return EXP punto_coma { $$ = new NodoAST({label: 'RETURN', hijos: [$1,$2,$3], linea: yylineno}); }
  | return punto_coma     { $$ = new NodoAST({label: 'RETURN', hijos: [$1,$2], linea: yylineno}); }
;

//SENTENCIA IF
INSTRUCCION_IF 
  : IF                      { $$ = new NodoAST({label: 'INSTRUCCION_IF', hijos: [$1], linea: yylineno}); }
  | IF ELSE                 { $$ = new NodoAST({label: 'INSTRUCCION_IF', hijos: [$1,$2], linea: yylineno}); }
  | IF LISTA_ELSE_IF        { $$ = new NodoAST({label: 'INSTRUCCION_IF', hijos: [$1,$2], linea: yylineno}); }
  | IF LISTA_ELSE_IF ELSE   { $$ = new NodoAST({label: 'INSTRUCCION_IF', hijos: [$1,$2,$3], linea: yylineno}); }
;
IF 
  : if par_izq EXP par_der llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'IF', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
;
ELSE 
  : else llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'ELSE', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;
ELSE_IF 
  : elif par_izq EXP par_der llave_izq INSTRUCCIONES llave_der { $$ = new NodoAST({label: 'ELSE_IF', hijos: [$1,$2,$3,$4,$5,$6,$7], linea: yylineno}); }
;
LISTA_ELSE_IF 
  : LISTA_ELSE_IF ELSE_IF   { $$ = new NodoAST({label: 'LISTA_ELSE_IF', hijos: [...$1.hijos, $2], linea: yylineno}); }
  | ELSE_IF                 { $$ = new NodoAST({label: 'LISTA_ELSE_IF', hijos: [$1], linea: yylineno}); }
;

//EJECUTAR FUNCION
RUN_FUNCION 
  : run id par_izq par_der punto_coma                   { $$ = new NodoAST({label: 'RUN_FUNCION', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
  | run id par_izq LISTA_EXPRESIONES par_der punto_coma { $$ = new NodoAST({label: 'RUN_FUNCION', hijos: [$1,$2,$3,$4,$5,$6], linea: yylineno}); }
;

//LLAMADA DE FUNCION
LLAMADA_FUNCION 
  : id par_izq par_der punto_coma                   { $$ = new NodoAST({label: 'LLAMADA_FUNCION', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | id par_izq LISTA_EXPRESIONES par_der punto_coma { $$ = new NodoAST({label: 'LLAMADA_FUNCION', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
;
//LLAMADA DE FUNCION COMO EXPRESION
LLAMADA_FUNCION_EXP 
  : id par_izq par_der                          { $$ = new NodoAST({label: 'LLAMADA_FUNCION_EXP', hijos: [$1,$2,$3], linea: yylineno}); }
  | id par_izq LISTA_EXPRESIONES par_der        { $$ = new NodoAST({label: 'LLAMADA_FUNCION_EXP', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | typeof par_izq LISTA_EXPRESIONES par_der    { $$ = new NodoAST({label: 'LLAMADA_FUNCION_EXP', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | tostring par_izq LISTA_EXPRESIONES par_der  { $$ = new NodoAST({label: 'LLAMADA_FUNCION_EXP', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | tolower par_izq LISTA_EXPRESIONES par_der   { $$ = new NodoAST({label: 'LLAMADA_FUNCION_EXP', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | toupper par_izq LISTA_EXPRESIONES par_der   { $$ = new NodoAST({label: 'LLAMADA_FUNCION_EXP', hijos: [$1,$2,$3,$4], linea: yylineno}); }
  | round par_izq LISTA_EXPRESIONES par_der     { $$ = new NodoAST({label: 'LLAMADA_FUNCION_EXP', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;

//CASTEOS
CASTEOS
  : id igual par_izq TIPO_DEC_VARIABLE par_der EXP  { $$ = new NodoAST({label: 'CAST_EXP', hijos: [$1,$2,$3,$4,$5,$6], linea: yylineno}); }
;
CAST
  : par_izq TIPO_DEC_VARIABLE par_der EXP           { $$ = new NodoAST({label: 'CAST', hijos: [$1,$2,$3,$4], linea: yylineno}); }
;

//INCREMENTO Y DECREMENTO
INCREMENTO_DECREMENTO
  : id mas_mas punto_coma       { $$ = new NodoAST({label: 'INCREMENTO_DECREMENTO', hijos: [$1,$2,$3], linea: yylineno}); }
  | id menos_menos punto_coma   { $$ = new NodoAST({label: 'INCREMENTO_DECREMENTO', hijos: [$1,$2,$3], linea: yylineno}); }
  | mas_mas id punto_coma       { $$ = new NodoAST({label: 'INCREMENTO_DECREMENTO', hijos: [$1,$2,$3], linea: yylineno}); }
  | menos_menos id punto_coma   { $$ = new NodoAST({label: 'INCREMENTO_DECREMENTO', hijos: [$1,$2,$3], linea: yylineno}); }
;

//OPERADOR TERNARIO
TERNARIO 
  : EXP interrogacion EXP dos_puntos EXP { $$ = new NodoAST({label: 'TERNARIO', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
;

//PRINT AND PRINTLN
PRINT 
  : print par_izq LISTA_EXPRESIONES par_der punto_coma      { $$ = new NodoAST({label: 'PRINT', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
;
PRINTLN 
  : println par_izq LISTA_EXPRESIONES par_der punto_coma    { $$ = new NodoAST({label: 'PRINT', hijos: [$1,$2,$3,$4,$5], linea: yylineno}); }
;