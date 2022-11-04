package pkgProject;

import pkgLibs.*;

import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.*;

import javax.swing.filechooser.FileNameExtensionFilter;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JOptionPane;
import java.io.IOException;
import java.util.ArrayList;
import pkgLibs.testLex;
import pkgLibs.testSintact;

public class interfazGrafica extends JFrame {

    //FUENTES Y COLORES
    Font fg1 = new Font("Courier New", Font.BOLD, 12);
    Font fg2 = new Font("Courier New", Font.BOLD, 14);

    Color cl1 = new Color(167, 210, 203);
    Color cl2 = new Color(238, 238, 228);
    Color cl3 = new Color(155, 242, 49);
    Color cl4 = new Color(12, 212, 156);
    Color cl5 = new Color(242, 211, 136);
    Color cl6 = new Color(255, 149, 81);
    Color cl7 = new Color(254, 219, 57);

    //CONTADOR DE ERRORES
    public static int contErrors = 0;
    public static JLabel lblt3;

    //PANEL GENERAL
    private static JPanel PanelGeneral;
    //VENTANA PRINCIPAL
    public static JFrame moduloMain;

    //TEXTAREA Y COMOBOBOX
    public static JTextArea txtArea1;
    public static JComboBox fileComboBox;
    public static JComboBox reportComboBox;
    public static JComboBox viewComboBox;

    testLex lexico;
    testSintact sintactico;

    public interfazGrafica() {

        moduloMain = new JFrame();

        //RECUADRO MODULO PRINCIPAL
        moduloMain.setLayout(null);
        moduloMain.setTitle("Proyecto 1 OLC1");
        Toolkit pantalla = Toolkit.getDefaultToolkit();
        Dimension tamano = pantalla.getScreenSize();
        int altura = tamano.height;
        int ancho = tamano.width;
        moduloMain.setLocation(ancho / 4, altura / 16);
        moduloMain.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        moduloMain.setResizable(false);
        moduloMain.setVisible(true);

        componentes();

        moduloMain.pack();
        moduloMain.setSize(900, 600);

    }

    private void componentes() {

        //PANEL GENERAL PARA COMPONENTES
        PanelGeneral = new JPanel();
        PanelGeneral.setLayout(null);
        PanelGeneral.setBackground(cl1);
        PanelGeneral.setBounds(0, 0, 900, 600);
        PanelGeneral.setVisible(true);
        PanelGeneral.setBorder(BorderFactory.createLineBorder(Color.black));
        moduloMain.add(PanelGeneral);

        //TEXTO TITULO
        JLabel lblt1 = new JLabel("OLC1_2S_2022<202006353>");
        lblt1.setFont(fg1);
        lblt1.setBounds(675, 20, 165, 20);
        lblt1.setHorizontalAlignment(SwingConstants.CENTER);
        PanelGeneral.add(lblt1);

        //TITULO ERRORES
        JLabel lblt2 = new JLabel("Errors");
        lblt2.setFont(fg1);
        lblt2.setBounds(55, 520, 150, 30);
        lblt2.setHorizontalAlignment(SwingConstants.CENTER);
        PanelGeneral.add(lblt2);

        //TEXTO ERRORES
        lblt3 = new JLabel();
        lblt3.setFont(fg1);
        lblt3.setBounds(0, 520, 150, 30);
        lblt3.setText(String.valueOf(contErrors));
        lblt3.setHorizontalAlignment(SwingConstants.CENTER);
        PanelGeneral.add(lblt3);

        //BOTON DE RUN
        JButton botonRun = new JButton("Run");
        botonRun.setFont(fg1);
        botonRun.setBounds(new Rectangle(770, 50, 75, 20));
        botonRun.setBackground(cl3);
        botonRun.addActionListener(run);
        PanelGeneral.add(botonRun);

        //BOTON DE CLEAN
        JButton botonClean = new JButton("Clean");
        botonClean.setFont(fg1);
        botonClean.setBounds(new Rectangle(675, 50, 75, 20));
        botonClean.setBackground(cl4);
        botonClean.addActionListener(clean);
        PanelGeneral.add(botonClean);

        //BOTON DE VIEW CODEGOLANG
        JButton viewPython = new JButton("Code Golang");
        viewPython.setFont(fg1);
        viewPython.setBounds(new Rectangle(525, 520, 150, 20));
        viewPython.setBackground(cl6);
        viewPython.addActionListener(golang);
        PanelGeneral.add(viewPython);

        //BOTON DE VIEW CODEPYTHON
        JButton viewGolang = new JButton("Code Python");
        viewGolang.setFont(fg1);
        viewGolang.setBounds(new Rectangle(695, 520, 150, 20));
        viewGolang.setBackground(cl7);
        viewGolang.addActionListener(python);
        PanelGeneral.add(viewGolang);

        //FILE COMBOBOX
        fileComboBox = new JComboBox();
        fileComboBox.setFont(fg1);
        fileComboBox.setBackground(cl5);
        //LLENADO DEL COMBOBOX
        fileComboBox.addItem("File");
        fileComboBox.addItem("Open File");
        fileComboBox.addItem("Save As");
        fileComboBox.setBounds(46, 35, 100, 25);
        fileComboBox.addActionListener(files);
        PanelGeneral.add(fileComboBox);

        //REPORT COMBOBOX
        reportComboBox = new JComboBox();
        reportComboBox.setFont(fg1);
        reportComboBox.setBackground(cl5);
        //LLENADO DEL COMBOBOX
        reportComboBox.addItem("Report");
        reportComboBox.addItem("Flowchart");
        reportComboBox.addItem("Errors");
        reportComboBox.addActionListener(reports);
        reportComboBox.setBounds(175, 35, 100, 25);
        PanelGeneral.add(reportComboBox);

        //VIEW COMBOBOX
        viewComboBox = new JComboBox();
        viewComboBox.setFont(fg1);
        viewComboBox.setBackground(cl5);
        //LLENADO DEL COMBOBOX
        viewComboBox.addItem("View");
        viewComboBox.addItem("User Manual");
        viewComboBox.addItem("Technical Manual");
        viewComboBox.addActionListener(manuals);
        viewComboBox.setBounds(300, 35, 100, 25);
        PanelGeneral.add(viewComboBox);

        //TEXT AREA
        txtArea1 = new JTextArea("\n");
        txtArea1.setBackground(cl2);
        txtArea1.setFont(fg2);
        PanelGeneral.add(txtArea1);

        JScrollPane scroll = new JScrollPane();
        scroll.setViewportView(txtArea1);
        scroll.setBounds(46, 90, 800, 400);
        scroll.setVisible(true);
        PanelGeneral.add(scroll);

    }
    


    //ACCION DE LIMPIAR
    ActionListener clean = new ActionListener() {
        @SuppressWarnings("deprecation")
        @Override
        public void actionPerformed(ActionEvent e) {
            txtArea1.setText("");
            JOptionPane.showMessageDialog(null, "Area de trabajo limpia", null, 1);
        }
    };

    //ACCION DE CORRER
    ActionListener run = new ActionListener() {
        @SuppressWarnings("deprecation")
        @Override
        public void actionPerformed(ActionEvent e) {
             
            Nodo cabeza = null;

            JOptionPane.showMessageDialog(null, "Pseudocodigo Ejectuado", null, 1);
            try {
                lexico = new testLex(new BufferedReader(new StringReader(txtArea1.getText())));
                sintactico = new testSintact(lexico);
                sintactico.parse();
                
                //imprimir lor errores lexicos, sintacticos y semanticos
                for (Errors x : lexico.LexicError) {
                    contErrors+=1;
                }
                for (Errors x : sintactico.SyntaxErrors) {
                    contErrors+=1;
                }
                
                cabeza = sintactico.getRaiz();

                if (cabeza != null) {
                    Arbol arbol = new Arbol(cabeza);
                    arbol.GraficarSintactico();
                }
            } catch (Exception el) {
                System.out.println("Error en la entrada");
            }
        }
    };

    //ACCION DE GENERAR GOLANG
    ActionListener golang = new ActionListener() {
        @SuppressWarnings("deprecation")
        @Override
        public void actionPerformed(ActionEvent e) {
            JOptionPane.showMessageDialog(null, "Codigo Generado en Golang", null, 1);
            txtArea1.setText("");
            txtArea1.setText(sintactico.golang.replace("null"," "));
        }
    };

    //ACCION DE GENERAR PYRHON
    ActionListener python = new ActionListener() {
        @SuppressWarnings("deprecation")
        @Override
        public void actionPerformed(ActionEvent e) {

            JOptionPane.showMessageDialog(null, "Codigo Generado en Python", null, 1);
        }
    };

    //ACCION DE ARCHIVOS
    ActionListener files = new ActionListener() {
        @SuppressWarnings("deprecation")
        @Override
        public void actionPerformed(ActionEvent e) {
            String f = (String) fileComboBox.getSelectedItem();

            switch (f) {
                case "Open File":
                    try {

                        JFileChooser file = new JFileChooser();
                        FileNameExtensionFilter filter = new FileNameExtensionFilter("olc", "OLC");
                        file.setFileFilter(filter);
                        file.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
                        file.showOpenDialog(null);
                        File archivo = file.getSelectedFile();
                        String ruta = (archivo.getAbsolutePath());

                        getCountentOfFile(ruta);

                    } catch (Exception el) {
                        JOptionPane.showMessageDialog(null, "No se ha podido cargar el archivo", null, 2);
                    }

                    break;
                case "Save As":
                    try {

                        JFileChooser file = new JFileChooser();
                        FileNameExtensionFilter filter = new FileNameExtensionFilter("olc", "OLC");
                        file.setFileFilter(filter);
                        file.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
                        file.showOpenDialog(null);
                        File archivo = file.getSelectedFile();

                        setCountentOfFile(archivo);

                    } catch (Exception el) {
                        JOptionPane.showMessageDialog(null, "No se ha podido guardar el archivo", null, 2);
                    }
                    break;
                default:
                    fileComboBox.setSelectedItem("File");
                    break;
            }
        }
    };

    //ACCION DE REPORTES
    ActionListener reports = new ActionListener() {
        @SuppressWarnings("deprecation")
        @Override
        public void actionPerformed(ActionEvent e) {
            String r = (String) reportComboBox.getSelectedItem();

            switch (r) {
                case "Flowchart":
                    System.out.println("Tokens");
                    break;
                case "Errors":
                    System.out.println("Errores");
                    try {
                        GenerarHTML();
                        
                        Desktop.getDesktop().open(new File("Errores.html"));
       
                    } catch (Exception el) {
                        JOptionPane.showMessageDialog(null, "Listas de errores vacias", null, 2);
                    }

                    break;
                default:
                    break;
            }

        }
    };

    //ACCION DE MANUALES
    ActionListener manuals = new ActionListener() {
        @SuppressWarnings("deprecation")
        @Override
        public void actionPerformed(ActionEvent e) {
            String v = (String) viewComboBox.getSelectedItem();
            
            

            switch (v) {
                case "User Manual":
                    System.out.println("manual de usuario");
                    try {
                        
                        Desktop.getDesktop().open(new File("Usuario.pdf"));
       
                    } catch (Exception el) {
                        JOptionPane.showMessageDialog(null, "Listas de errores vacias", null, 2);
                    }

                    
                    break;
                case "Technical Manual":
                    System.out.println("manual tecnico");
                    try {
                        
                        Desktop.getDesktop().open(new File("Tecnico.pdf"));
       
                    } catch (Exception el) {
                        JOptionPane.showMessageDialog(null, "Listas de errores vacias", null, 2);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    public static void getCountentOfFile(String ruta) {

        File archivo;
        FileReader fr = null;
        BufferedReader br;

        try {
            archivo = new File(ruta);
            fr = new FileReader(archivo);
            br = new BufferedReader(fr);

            String contenido = "";
            String linea;
            while ((linea = br.readLine()) != null) {
                contenido += linea + "\n";
            }
            txtArea1.append(contenido);
        } catch (FileNotFoundException exception) {
            System.out.println("No se encontro el archivo");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != fr) {
                    fr.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }

    public static void setCountentOfFile(File ruta) {

        FileWriter fichero = null;
        try {
            fichero = new FileWriter(ruta);
            fichero.write(txtArea1.getText());
        } catch (FileNotFoundException ex) {
            JOptionPane.showMessageDialog(null, "Error al guardar");
        } catch (IOException ex) {
            JOptionPane.showMessageDialog(null, "Error al guardar");
        }finally {
            try {
                if (null != fichero) {
                    fichero.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }

    public static void GenerarHTML() {

        String cabeza = "<!DOCTYPE html>\n"
                + "<html lang=\"es\">\n"
                + "<head>\n"
                + "         <style>\n"
                + "            header{\n"
                + "             background-color: #EE6055;\n"
                + "             border: 5px solid black;\n"
                + "             padding: 20px 20px;\n"
                + "             text-align: center;\n"
                + "             font-weight: bold;\n"
                + "             width: 75%;\n"
                + "             border-radius: 20px;\n"
                + "           }\n"
                + "           body{\n"
                + "             background-color: #FFD97D;\n"
                + "             text-align: center;\n"
                + "             font-family: Arial, Helvetica, sans-serif;\n"
                + "             font-style: italic;\n"
                + "             margin: 50px auto;\n"
                + "           }\n"
                + "           #texto1{\n"
                + "             font-size: medium;\n"
                + "             background-color: #eb9234;\n"
                + "             border: 0.1px solid black;\n"
                + "             padding: 20px 20px;\n"
                + "           text-align: center;\n"
                + "             width: 80%;\n"
                + "             border-radius: 20px;\n"
                + "           }\n"
                + "           #texto2{\n"
                + "             text-align: right;\n"
                + "             font-size: small;\n"
                + "             font-weight: bolder;\n"
                + "             width: 90%;\n"
                + "           }\n"
                + "           #headtable{\n"
                + "             text-align: center;\n"
                + "             font-size: large;\n"
                + "           font-weight: bolder;\n"
                + "         }\n"
                + "         #bodytable{\n"
                + "           text-align: center;\n"
                + "           font-size: small;\n"
                + "           font-weight: lighter;\n"
                + "         }\n"
                + "       #subBody{\n"
                + "         background-color: #e0b653;\n"
                + "         text-align: center;\n"
                + "         font-family: Arial, Helvetica, sans-serif;\n"
                + "       font-style: italic;\n"
                + "       margin: 50px auto;\n"
                + "       width: 75%;\n"
                + "       border-radius: 20px;\n"
                + "       border: 0.1px solid black;\n"
                + "     }\n"
                + "     table{\n"
                + "       align-items: center;\n"
                + "       border: 5px solid black;\n"
                + "       background-color: #60D394;\n"
                + "       font-style: italic;\n"
                + "       padding: 20px 20px;\n"
                + "       width: 75%;"
                + "       border-radius: 20px;\n"
                + "     }\n"
                + "         </style>"
                + "       <meta charset=\"UTF-8\" />\n"
                + "       <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n"
                + "       <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n"
                + "       <title >Reporte De Errores</title>\n"
                + "     </head>\n"
                + "     <body>\n"
                + "       <header style=\"margin: 0 auto\"/>\n"
                + "       <h1 class=\"text-center" + "style=\"font-size: xx-large;\"/>REPORTE DE ERRORES</h1>\n"
                + "       </header>\n"
                + "       <main>\n"
                + "         <section id = \"subBody\"/>\n"
                + "           <h1 class=\"text-center\"/>Tabla De Errores Lexicos</h1>\n"
                + "           <table style=\"margin: 0 auto\" />\n"
                + "             <thead >\n"
                + "               <tr id =\"headtable\"/>\n"
                + "                 <th scope=\"col\">Token</th>\n"
                + "                 <th scope=\"col\">caracter</th>\n"
                + "                 <th scope=\"col\">Fila</th>\n"
                + "                 <th scope=\"col\">Columna</th>\n"
                + "               </tr>\n"
                + "             </thead>\n"
                + "             <tbody>\n"
                + "               <tr id =\"bodytable\"/>\n";
        String datos = testLex.Error_List;
        String cola = "</tr>\n"
                + "             </tbody>\n"
                + "           </table>\n"
                + "             </tbody>\n"
                + "           </table>\n"
                + "         </section>\n"
                + "       </main>\n"
                + "     </body>\n"
                + "   </html>\n";

        FileWriter escribir;
        try {
            PrintWriter pw = new PrintWriter("Errores.html");
            pw.close();

            escribir = new FileWriter("Errores.html", true);
            escribir.write("");
            escribir.write(cabeza);
            escribir.write(datos);
            escribir.write(cola);
            escribir.close();

        } catch (FileNotFoundException ex) {
            JOptionPane.showMessageDialog(null, "Error al guardar, ponga nombre al archivo");
        } catch (IOException ex) {
            JOptionPane.showMessageDialog(null, "Error al guardar, en la salida");
        }

    }

}
