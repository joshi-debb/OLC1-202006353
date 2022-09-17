package pkgLibs;

public class generator {


    public static void generarCompilador() {
        try {
            String ruta = "src/pkgLibs/"; //ruta donde tenemos los archivos con extension .jflex y .cup
            String opcFlex[] = {ruta + "analisisLexico.jflex", "-d", ruta};
            jflex.Main.generate(opcFlex);
            String opcCUP[] = {"-destdir", ruta, "-parser", "testSintact", ruta + "analisisSintactico.cup"};
            java_cup.Main.main(opcCUP);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
