
<template>
  <q-page class="constrain q-pa-lg">

  <div>
    <q-splitter style=" padding-top: 10px; padding-left: 40px;">
      <template v-slot:after>
        <q-tabs v-model="tab" vertical style="width: 150px; height: 473px; background-color: black;">

            <q-btn-group push style="width: 150px; height: 45px; padding-top: 0px; background-color: black;">
              <q-btn label="OLC1_<202006353>" class="bg-black text-white" style="width: 150px;" disabled/>
            </q-btn-group>

            <q-tab label="Editor" name="editor" style="background-color: gold"/>
            <q-tab label="Símbolos" name="tabla_de_simbolos" style="background-color: #1CD6CE;" />
            <q-tab label="Errores" name="errores" style="background-color: #FF1E1E" />
            <q-tab label="AST" name="ast" style="background-color: #CDDEFF" />

            <q-btn-group push style="width: 150px; height: 45px; padding-top: 0px; background-color: black;">
              <q-btn  label="Ejecutar" @click="ejecutar" style="width: 150px; background-color: #06FF00;"/>
            </q-btn-group>

            <q-btn-group push style="width: 150px; height: 45px; padding-top: 0px; background-color: black;">
              <q-btn label="Limpiar" @click="limpiar" style="width: 150px; background-color: #E8F9FD;"/>
            </q-btn-group>

        </q-tabs>

        <q-tabs v-model="tab" vertical style="width: 150px; height: 136px; background-color: black;">

            <q-btn-group push style="width: 150px; height: 45px; padding-top: 0px; background-color: black;">
              <q-btn push icon="directions" @click="add_to_codemirror" style="width: 45px; background-color: #D8D9CF;"/>
              <input type="file" id="lectura" style="padding-top: 10px; background-color: #D8D9CF; width: 85px; "/>
              <q-btn style="width: 20px; background-color: #D8D9CF;"/>
            </q-btn-group>

            <q-btn-group push style="width: 150px; height: 45px; padding-top: 0px; background-color: black;">
              <q-btn push label="Crear" @click="create" style="width: 150px; background-color: #D8D9CF;"/>
            </q-btn-group>

            <q-btn-group push style="width: 150px; height: 45px; padding-top: 0px; background-color: black;">
              <q-btn push label="Guardar" @click="save" style="width: 150px; background-color: #D8D9CF;"/>
            </q-btn-group>

        </q-tabs>

      </template>

      <template v-slot:before>
        <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up" style="width:700px; " >
          <q-tab-panel name="editor" style="height: 607px">
              <codemirror v-model="code" :options="cmOptions" @input="codigoEditado" />
              <q-list dark separator dense  class="bg-grey-10 text-white">
                <q-item
                  clickable
                  v-ripple
                  v-for="(item, index) in salida"
                  :key="index"
                >
                  <q-item-section>{{ item }}</q-item-section>
                </q-item>
              </q-list>
          </q-tab-panel>

          <q-tab-panel name="errores" class="bg-grey-4 text-black" style="height: 607px">
            <div class="q-pa-md">
                <q-table
                  color="primary"
                  title="Tabla de Errores"
                  :data="errores"
                  :columns="columns"
                  row-key="name"
                  dark
                  dense
                  :pagination ="{ rowsPerPage: 50 }"
                  rows-per-page-label="Errores por página"  
                class="bg-white text-black" />
              </div>  
          </q-tab-panel>

          <q-tab-panel name="tabla_de_simbolos" class="bg-white text-black" style="height: 607px">

            <tabla-simbolos :entornos="entornos"/>

          </q-tab-panel>

          <q-tab-panel name="ast"  class="bg-white text-white" style="height: 607px">
            <ast :dot="dot" />  
          </q-tab-panel>

        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</q-page>
</template>

<script>
var text = "";
    function leerArchivo(e) {
      var archivo = e.target.files[0];
      if (!archivo) {
        return;
      }
      var lector = new FileReader();
      lector.onload = function(e) {
        var contenido = e.target.result;
          text = contenido;
      };
      lector.readAsText(archivo);
   };
   window.addEventListener('load',() => {document.getElementById('lectura').addEventListener('change',leerArchivo)})


import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/paraiso-light.css";
import "codemirror/mode/javascript/javascript.js";
import AnalizerTraduccion from "../Analizer/gramatica";

import { Ejecucion } from "../ejecucion/ejecucion";
import { Errores } from "../AST/errores";
import { Error as InstanciaError } from "../AST/error";
import { Entornos } from "../ejecucion/entornos";

export default {
  components: {
    codemirror,
    ast: require("../components/Ast").default,
    tablaSimbolos: require("../components/TablaSimbolos").default,
  },
  data() {
    return {
      code: "",
      cmOptions: {
        tabSize: 4,
        matchBrackets: true,
        styleActiveLine: true,
        mode: "text/javascript",
        // theme: "paraiso-light",
        lineNumbers: true,
        line: false,
      },
      output: "salida de ejemplo",
      tab: "editor",
      dot: "",
      salida: [],
      errores: [],
      entornos: [],

      columns: [
        { name: "numero", label: "#", field: "numero", align: "center" },
        { name: "tipo", label: "Tipo", field: "tipo", align: "center" },
        { name: "descripcion",label: "Descripcion",field: "descripcion",align: "center"},
        { name: "linea", label: "Linea", field: "linea", align: "center" },
        { name: "columna", label: "Columna", field: "columna", align: "center" },
        
      ],
      columns2: [
        { name: "id", label: "Id", field: "id", align: "center" },
        { name: "tip", label: "Tipo", field: "tip", align: "center" },
        { name: "linea", label: "Linea", field: "linea", align: "center" },
        { name: "columna", label: "Columna", field: "columna", align: "center" },
      ],

    };
  },
  methods: {
    notificar(variant, message) {
      this.$q.notify({
        message: message,
        position: 'top',
        color: variant,
        multiLine: false,
        actions: [
          {
            label: "Ok",
            color: "orange",
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    },

    ejecutar() {
      if (this.code.trim() == "") {
        this.notificar("", `No hay texto en el editor`);
        return;
      }
      this.inicializarValores();
      try {
        const raiz = AnalizerTraduccion.parse(this.code);
        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "",
            "No fue posible obtener la raíz de la ejecución"
          );
          return;
        }
        let ejecucion = new Ejecucion(raiz);
        this.dot = ejecucion.getDot();
        //Valido si puedo ejecutar (no deben existir funciones anidadas)
        if(!ejecucion.puedoEjecutar(raiz)){
          this.notificar("", "No se puede realizar una ejecución con funciones anidadas");
          return;
        }
        ejecucion.ejecutar();
        // ejecucion.imprimirErrores();
        this.salida = ejecucion.getSalida();
        this.notificar("", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
      }
      this.errores = Errores.getInstance().lista;
      this.entornos = Entornos.getInstance().lista;
      console.log(entornos);

    },

    inicializarValores() {
      Errores.getInstance().clear();
      Entornos.getInstance().clear();
      this.errores = [];
      this.entornos = [];
      this.salida = [];
      this.dot = '';
      text = '';
    },

    validarError(error) {
      const json = JSON.stringify(error);
      this.notificar("",`Error en la entrada`);
      const objeto = JSON.parse(json);

      if ( objeto != null && objeto instanceof Object && objeto.hasOwnProperty("hash")) {
        Errores.getInstance().push(
          new InstanciaError({
            numero: Errores.getInstance().getError_L(),
            tipo: "sintactico",
            descripcion: `No se esperaba el token: "${objeto.hash.token}" `,
            linea: objeto.hash.loc.first_line,
            columna: objeto.hash.loc.last_column,
          })
        );
      }
    },

    codigoEditado(codigo){
      this.inicializarValores();
    },
    limpiar(){
      this.code = '';
      this.inicializarValores();
    },
    add_to_codemirror(){
      if(text != ''){
        this.code = text;
        this.notificar("",'Contenido Agregado');
      }else if (text == ''){
        this.notificar("",'Archivo Vacio');
      }
      
      },

    create(){
          const a = document.createElement("a");
          const conte = "",
            blob = new Blob([conte],{type:"octect/stream"}),
            url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = 'archivo en blanco.olc';
          a.click();
          window.URL.revokeObjectURL(url);
        },

    save(){
          const a = document.createElement("a");
          const conte = this.code,
            blob = new Blob([conte],{type:"octect/stream"}),
            url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = 'estado actual.olc';
          a.click();
          window.URL.revokeObjectURL(url);
        }

  },

  
};
</script>

<style lang="css">
.CodeMirror {
  height: 575px;
  background-color: #EAEAEA;
}
</style>

