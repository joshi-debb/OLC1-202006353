
package pkgLibs;
import java_cup.runtime.*;
import java.util.LinkedList;

%%

%{  
    public static LinkedList<Errors> LexicError = new LinkedList<Errors>();
%}

%public 
%class testLex
%cupsym sym

%cup
%line

%char
%column
%full
%ignorecase
%unicode

S = [+/*<>=!"-"]
W = [a-zA-z]
D = [0-9]



id = "_"{W}|({W}|{D})*"_"

tipo = "numero"|"cadena"|"boolean"|"caracter"

entero = {D}|{D}+
flotante = {D}+"."{D}+

cadena = (\"[^\"]*\")|(\"[^\"]*\"(\"[^\"]*\")*)

character = "'"("$" "{"{D}+"}")"'"
caracter = "'"{W}+"'"

comentario = "//"[^\n]*
comentarios = "/*"[^\*]*"*/"

simbolo = [ \t\r\n\f]

exp_cc = ("(")({entero}|{flotante}|{S})+(")")
exp_sc = ({entero}|{flotante}|{S})+

exp_pot = "["({entero}|{flotante}|{S})+"]"
exp = ({exp_cc}|{exp_sc})+

type_cc = ("(")({entero}|{flotante}|{exp}|{id})+(")")
type_sc = ({entero}|{flotante}|{exp}|{id})+

exp_r = ({type_cc}|{type_sc})+


%%

// TIPO DE DATOS

<YYINITIAL>{tipo}   {
                    System.out.println("tk_tipo, lexema:"+yytext());
                    return new Symbol(sym.TIPO, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>{entero}   {
                    System.out.println("tk_int, lexema:"+yytext());
                    return new Symbol(sym.ENTERO, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>{flotante}   {
                    System.out.println("tk_float, lexema:"+yytext());
                    return new Symbol(sym.FLOTANTE, yycolumn+1, yyline+1, yytext());
                  }                  

<YYINITIAL>"boolean"   {
                    System.out.println("tk_Bool, lexema:"+yytext());
                    return new Symbol(sym.BOOLEAN, yycolumn+1, yyline+1, yytext());
                  }

 <YYINITIAL>"verdadero"   {
                    System.out.println("tk_true, lexema:"+yytext());
                    return new Symbol(sym.TRUE, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"falso"   {
                    System.out.println("tk_false, lexema:"+yytext());
                    return new Symbol(sym.FALSE, yycolumn+1, yyline+1, yytext());
                  }                 

<YYINITIAL>{character}   {
                    System.out.println("tk_char, lexema:"+yytext());
                    return new Symbol(sym.CHARACTER, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>{caracter}   {
                    System.out.println("tk_car, lexema:"+yytext());
                    return new Symbol(sym.CARACTER, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>{id}   {
                    System.out.println("tk_id, lexema:"+yytext());
                    return new Symbol(sym.ID, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>{cadena}   {
                    System.out.println("tk_string, lexema:"+yytext());
                    return new Symbol(sym.CADENA, yycolumn+1, yyline+1, yytext());
                  }




//OPERACIONES BASICAS

<YYINITIAL>"+"   {
                    System.out.println("tk_suma, lexema:"+yytext());
                    return new Symbol(sym.MAS, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"-"   {
                    System.out.println("tk_resta, lexema:"+yytext());
                    return new Symbol(sym.MENOS, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"*"   {
                    System.out.println("tk_mult, lexema:"+yytext());
                    return new Symbol(sym.POR, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"/"   {
                    System.out.println("tk_div, lexema:"+yytext());
                    return new Symbol(sym.DIV, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"mod"   {
                    System.out.println("tk_mod, lexema:"+yytext());
                    return new Symbol(sym.MOD, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"potencia"   {
                    System.out.println("tk_pot, lexema:"+yytext());
                    return new Symbol(sym.POT, yycolumn+1, yyline+1, yytext());
                  }



//OPERADORES RELACIONALES

<YYINITIAL>"mayor"   {
                    System.out.println("tk_mayor, lexema:"+yytext());
                    return new Symbol(sym.MAYOR, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"menor"   {
                    System.out.println("tk_menor, lexema:"+yytext());
                    return new Symbol(sym.MENOR, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"mayor_o_igual"   {
                    System.out.println("tk_mayorigual, lexema:"+yytext());
                    return new Symbol(sym.MAYOROIGUAL, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"menor_o_igual"   {
                    System.out.println("tk_menorigual, lexema:"+yytext());
                    return new Symbol(sym.MENOROIGUAL, yycolumn+1, yyline+1, yytext());
                  }


<YYINITIAL>"es_igual"   {
                    System.out.println("tk_igual, lexema:"+yytext());
                    return new Symbol(sym.ESIGUAL, yycolumn+1, yyline+1, yytext());
                  }


<YYINITIAL>"es_diferente"   {
                    System.out.println("tk_diferente, lexema:"+yytext());
                    return new Symbol(sym.ESDIFERENTE, yycolumn+1, yyline+1, yytext());
                  }





//OPERADORES LOGICOS


<YYINITIAL>"or"   {
                    System.out.println("tk_or, lexema:"+yytext());
                    return new Symbol(sym.OR, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"and"   {
                    System.out.println("tk_and, lexema:"+yytext());
                    return new Symbol(sym.AND, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"not"   {
                    System.out.println("tk_not, lexema:"+yytext());
                    return new Symbol(sym.NOT, yycolumn+1, yyline+1, yytext());
                  }




//GLOBALES

<YYINITIAL>"inicio"   {
                    System.out.println("tk_inicio, lexema:"+yytext());
                    return new Symbol(sym.INICIO, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"fin"   {
                    System.out.println("tk_fin, lexema:"+yytext());
                    return new Symbol(sym.FIN, yycolumn+1, yyline+1, yytext());
                  }




//DECLARACIONES

<YYINITIAL>"ingresar"   {
                    System.out.println("tk_ingresar, lexema:"+yytext());
                    return new Symbol(sym.INGRESAR, yycolumn+1, yyline+1, yytext());
                  }
<YYINITIAL>"como"   {
                    System.out.println("tk_como, lexema:"+yytext());
                    return new Symbol(sym.COMO, yycolumn+1, yyline+1, yytext());
                  }
<YYINITIAL>"con_valor"   {
                    System.out.println("tk_convalor, lexema:"+yytext());
                    return new Symbol(sym.CONVALOR, yycolumn+1, yyline+1, yytext());
                  }





//CICLOS Y SENTENCIAS

<YYINITIAL>"si"   {
                    System.out.println("tk_si, lexema:"+yytext());
                    return new Symbol(sym.SI, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"entonces"   {
                    System.out.println("tk_entonces, lexema:"+yytext());
                    return new Symbol(sym.ENTONCES, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"de_lo_contrario"   {
                    System.out.println("tk_delocontrario, lexema:"+yytext());
                    return new Symbol(sym.DELOCONTRARIO, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"o_si"   {
                    System.out.println("tk_osi, lexema:"+yytext());
                    return new Symbol(sym.OSI, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"fin_si"   {
                    System.out.println("tk_finsi, lexema:"+yytext());
                    return new Symbol(sym.FINSI, yycolumn+1, yyline+1, yytext());
                  }


<YYINITIAL>"segun"   {
                    System.out.println("tk_segun, lexema:"+yytext());
                    return new Symbol(sym.SEGUN, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"fin_segun"   {
                    System.out.println("tk_finsegun, lexema:"+yytext());
                    return new Symbol(sym.FINSEGUN, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"para"   {
                    System.out.println("tk_para, lexema:"+yytext());
                    return new Symbol(sym.PARA, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"hasta"  {
                    System.out.println("tk_hasta, lexema:"+yytext());
                    return new Symbol(sym.HASTA, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"hacer"  {
                    System.out.println("tk_hacer, lexema:"+yytext());
                    return new Symbol(sym.HACER, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"con incremental"    {
                    System.out.println("tk_conincremental, lexema:"+yytext());
                    return new Symbol(sym.CONINCREMENTAL, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"fin_para"   {
                    System.out.println("tk_finpara, lexema:"+yytext());
                    return new Symbol(sym.FINPARA, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"mientras"   {
                    System.out.println("tk_mientras, lexema:"+yytext());
                    return new Symbol(sym.MIENTRAS, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"fin_mientras"   {
                    System.out.println("tk_finmientras, lexema:"+yytext());
                    return new Symbol(sym.FINMIENTRAS, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"repetir"    {
                    System.out.println("tk_repetir, lexema:"+yytext());
                    return new Symbol(sym.REPETIR, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"hasta_que"  {
                    System.out.println("tk_hastaque, lexema:"+yytext());
                    return new Symbol(sym.HASTAQUE, yycolumn+1, yyline+1, yytext());
                  }





//RETORNO
<YYINITIAL>"retornar"   {
                    System.out.println("tk_retornar, lexema:"+yytext());
                    return new Symbol(sym.RETORNAR, yycolumn+1, yyline+1, yytext());
                  }


//METODOS Y FUNCIONES


<YYINITIAL>"metodo" {
                    System.out.println("tk_metodo, lexema:"+yytext());
                    return new Symbol(sym.METODO, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"con_parametros" {
                    System.out.println("tk_conparametros, lexema:"+yytext());
                    return new Symbol(sym.CONPARAMETROS, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"fin_metodo" {
                    System.out.println("tk_finmetodo, lexema:"+yytext());
                    return new Symbol(sym.FINMETODO, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"funcion"    {
                    System.out.println("tk_funcion, lexema:"+yytext());
                    return new Symbol(sym.FUNCION, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"fin_funcion"    {
                    System.out.println("tk_finfuncion, lexema:"+yytext());
                    return new Symbol(sym.FINFUNCION, yycolumn+1, yyline+1, yytext());
                  }




//LLAMADA DE FUNCIONES Y METODOS

<YYINITIAL>"ejecutar"   {
                    System.out.println("tk_ejecutar, lexema:"+yytext());
                    return new Symbol(sym.EJECUTAR, yycolumn+1, yyline+1, yytext());
                  }



//IMPRIMIR

<YYINITIAL>"imprimir"   {
                    System.out.println("tk_imprimir, lexema:"+yytext());
                    return new Symbol(sym.IMPRIMIR, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"imprimir_nl"    {
                    System.out.println("tk_imprimirnl, lexema:"+yytext());
                    return new Symbol(sym.IMPRIMIRNL, yycolumn+1, yyline+1, yytext());
                  }





//SIGNOS RESERVADOS

<YYINITIAL>","   {
                    System.out.println("tk_coma, lexema:"+yytext());
                    return new Symbol(sym.COMA, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"."   {
                    System.out.println("tk_punto, lexema:"+yytext());
                    return new Symbol(sym.PUNTO, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>";"   {
                    System.out.println("tk_puntoycoma, lexema:"+yytext());
                    return new Symbol(sym.PYC, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"->"   {
                    System.out.println("tk_asignar, lexema:"+yytext());
                    return new Symbol(sym.ASIGNAR, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"["   {
                    System.out.println("tk_parabre, lexema:"+yytext());
                    return new Symbol(sym.CORABRE, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"]"   {
                    System.out.println("tk_parcierra, lexema:"+yytext());
                    return new Symbol(sym.CORCIERRA, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"("   {
                    System.out.println("tk_parabre, lexema:"+yytext());
                    return new Symbol(sym.PARABRE, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>")"   {
                    System.out.println("tk_parcierra, lexema:"+yytext());
                    return new Symbol(sym.PARCIERRA, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"?"   {
                    System.out.println("tk_intabre, lexema:"+yytext());
                    return new Symbol(sym.INTABRE, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>"¿"   {
                    System.out.println("tk_intcierra, lexema:"+yytext());
                    return new Symbol(sym.INTCIERRA, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>{exp}   {
                    System.out.println("tk_expresion, lexema:"+yytext());
                    return new Symbol(sym.EXP, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>{exp_pot}   {
                    System.out.println("tk_expPot, lexema:"+yytext());
                    return new Symbol(sym.EXPPOT, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>{exp_r}   {
                    System.out.println("tk_expR, lexema:"+yytext());
                    return new Symbol(sym.EXPR, yycolumn+1, yyline+1, yytext());
                  }


//COMENTARIOS

<YYINITIAL>{comentario}   {
                    System.out.println("tk_comentario, lexema:"+yytext());
                    return new Symbol(sym.COMENTARIO, yycolumn+1, yyline+1, yytext());
                  }

<YYINITIAL>{comentarios}   {
                    System.out.println("tk_comentarios, lexema:"+yytext());
                    return new Symbol(sym.COMENTARIOS, yycolumn+1, yyline+1, yytext());
                  }

//SIMBOLOS

<YYINITIAL>{simbolo}   { /* omitirlos */}

 . {
        System.out.println("Error Lexico: "+yytext()+ " Linea: "+yyline+1+" Columna: "+yycolumn+1);
        Errors datos = new Errors(yytext(), yyline+1, yycolumn+1, "Error Léxico", "Simbolo no existe en el lenguaje");
        LexicError.add(datos);   
}
