<template>
  <div id="panzoom-element" v-html="grafica"></div>
</template>

<script>
//Panzoom
import Panzoom from "@panzoom/panzoom";
//Viz
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";
let viz = new Viz({ Module, render });

export default {
  props: {
    dot: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      panzoom: null,
      grafica: "",
    };
  },
  beforeDestroy() {
    let item = document.getElementById("panzoom-element");
    item?.removeEventListener("scroll", this.scrollHandler);
    item?.parentElement?.removeEventListener(
      "wheel",
      this.panzoom.zoomWithWheel
    );
  },
  mounted() {
    let item = document.getElementById("panzoom-element");
    item.addEventListener("scroll", this.scrollHandler);
    this.panzoom = Panzoom(item, {
      maxScale: 1000,
    });
    //Zoom with mouse's wheel
    item.parentElement.addEventListener("wheel", this.panzoom.zoomWithWheel);
    viz
      .renderString(this.dot)
      .then((element) => {
        let codigo = element.substring(
          element.indexOf("<svg"),
          element.lastIndexOf(">") + 1
        );
        codigo = codigo.replace(/width=\"([0-9]*pt)\"/, 'width="2000pt"');
        codigo = codigo.replace(/height=\"([0-9]*pt)\"/, 'height="1000pt"');
        this.grafica = codigo;
      })
      .catch((error) => {

        viz = new Viz({ Module, render });

        console.error(error);
      });
  },
  methods: {
    scrollHandler(e) {
      console.log(e);
    },
  },
};
</script>

