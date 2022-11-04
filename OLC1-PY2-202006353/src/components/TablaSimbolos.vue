<template>
  <div>
    <q-list dark bordered separator dense v-if="entornos != null">
      <q-item
        v-ripple
        v-for="(entorno, indexEntorno) in entornos"
        :key="indexEntorno"
      >
        <q-item-section class="q-pb-md">
          <!-- Banner que identifica el entorno -->
          <q-banner class="bg-white text-black">
          TABLA DE SIMBOLOS
          </q-banner>
          <!-- Variables -->
          <!-- <q-item-label class="q-pt-md">*** VARIABLES ***</q-item-label> -->
          <q-item-label
            class="text-black"
            caption
            v-for="(variable, index) in entorno['variables']"
            :key="`var-${index}`"
            >{{ variable[1].toString() }}
          
          </q-item-label>
          <!-- Funciones -->
          <!-- <q-item-label class="q-pt-md">*** FUNCIONES ***</q-item-label> -->
          <q-item-label
            class="text-black"
            caption
            v-for="(funcion, indexFuncion) in entorno['funciones']"
            :key="`fn-${indexFuncion}`"
            >{{ funcion[1].toString() }}</q-item-label
          >
          <!-- TYPES -->
          <!-- <q-item-label class="q-pt-md">*** TYPES ***</q-item-label> -->
          <q-item-label
            caption
            v-for="(type, indextype) in entorno['types']"
            :key="`tp-${indextype}`"
            >{{ type[1].getSalidaBase() }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    entornos: {
      required: true,
      type: Array,
      default: [],
    },
  },
};
</script>
