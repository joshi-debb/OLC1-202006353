
package pkgLibs;

public class Errors {
    String lexema, tipo, descripcion;
    int linea, columna;

    public Errors(String lex, int lin, int col, String tipo, String desc){
        this.lexema=lex;
        this.linea=lin;
        this.columna=col;
        this.tipo= tipo;
        this.descripcion=desc;
    }
    public String get(){
        return "[ Linea: "+this.linea+" , Columna: "+this.columna+" , Tipo: "+this.tipo+ " , Lexema: "+this.lexema+" , Descripcion: "+this.descripcion+" ]";
    }
}


