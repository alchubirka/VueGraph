<template>
  <div id="app">
    <svg width="50px" viewBox="0 0 300 120">
      <defs>
        <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  style="stop-color:rgba(103, 103, 103, 0.84)" />
          <stop offset="100%" style="stop-color:rgba(116, 116, 116, 0)"/>
        </linearGradient>
      </defs>
      <g fill="url(#linear-gradient)">
        <path v-for="(graph, i) in graphs" :d="getPathGraphArea(i)" :class="'path-graph'+i" />
      </g>
      <path fill="none" v-for="(graph, i) in graphs" :d="getPathGraph(i)" :class="'graph path'+i" />
    </svg>
    <div class="row">
      <ul v-for="(graph, key) in graphs">
        <li v-for="(cord, i) in graph">
          <input type="range" v-model="graphs[key][i]" />
          <span>{{ cord }}</span>
          <button @click.stop="removeCord(key,i)">x</button>
        </li>
        <li>
          <button class="w50" @click.stop="addCord(key)">+</button>
          <button class="w50" @click.stop="removeGraph(key)">x</button>  
        </li>
        
      </ul>
    </div>
    <button @click="addGraph">AddGraph</button>
    <pre>
      {{ graphs }}
    </pre>
  </div>
</template>

<script>
import _ from "lodash";
import buildGraph from "./buildGraph.js";
import buildArea from "./buildArea.js";

export default {
  name: "App",
  data() {
    return {
      graphs: []
    };
  },
  created() {
    this.$set(this, "graphs", JSON.parse(localStorage.getItem("graphs")) || []);
    this.$watch(
      "graphs",
      _.debounce(newVal => {
        localStorage.setItem("graphs", JSON.stringify(newVal));
      }, 100),
      { deep: true }
    );
  },
  methods: {
    addGraph() {
      //this.$set(this.graphs, Object.keys(this.graphs).length, {});
      this.graphs.push([]);
    },
    removeGraph(key) {
      this.$delete(this.graphs, key);
    },
    addCord(key) {
      //this.$set(this.graphs[key], Object.keys(this.graphs[key]).length, 0);
      this.graphs[key].push(0);
    },
    removeCord(keyG, keyC) {
      this.$delete(this.graphs[keyG], keyC);
    },
    getPathGraph(key) {
      //let path = buildGraph(Object.values(this.graphs[key]));
      let path = buildGraph(this.graphs[key]);
      return path;
    },
    getPathGraphArea(key) {
      //let path = buildArea(Object.values(this.graphs[key]));
      let path = buildArea(this.graphs[key]);
      return path;
    }
  }
};
</script>

<style>
.row {
  display: flex;
}

.row > * {
  flex: 1;
}

.w50 {
  width: 50%;
}

.graph.path0 {
  stroke-dasharray: 14;
  stroke-width: 3;
  stroke: black;
}

.graph.path1 {
  stroke-width: 3;
  stroke: black;
}
</style>
