<script setup lang="ts">
import { ref } from "vue";
import Semester from "./components/Semester.vue";
import usePlan from "@/composables/plan";
import Prerequisites from "@/components/Prerequisites.vue";
import { isPlan } from "@/utils";
import Help from "./components/Help.vue";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const token = ref();
const loading = ref(false);

const { plan } = usePlan();

const { processSubjects, setToken, setPlan } = usePlan();

async function updateRequeriments() {
  loading.value = true;
  setToken(token.value);
  try {
    await processSubjects();
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
}

function exportJson() {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(plan.value));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "Plan2019_ORT.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function openFileDialog() {
  const input = document.createElement("input");
  input.accept = ".json";
  input.type = "file";
  input.onchange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        // A little check to see if the file is a plan, is not to deep so can be wrong
        if (isPlan(data)) {
          setPlan(data);
        } else {
          throw new Error();
        }
      } catch (e) {
        console.log(e);
        window.alert("El archivo no es un plan valido");
      }
    };

    reader.readAsText(file);
  };
  input.click();
}
</script>

<template>
  <Prerequisites />
  <v-toolbar title="Ingeniería Sistemas - Plan 2019" color="#661020">
  </v-toolbar>
  <v-container class="mt-2 container">
    <v-row class="d-flex flex-wrap justify-center">
      <v-col>
        <v-text-field v-model="token" label="Token" required />
      </v-col>
      <v-col :cols="smAndDown ? 'auto' : 3">
        <Help />
        <v-btn
          color="#661020"
          :disabled="loading || !token"
          :loading="loading"
          style="margin: 10px 7px 0px"
          @click="updateRequeriments"
        >
          Cargar
        </v-btn>
      </v-col>

      <v-col
        :cols="smAndDown ? 12 : 4"
        :class="smAndDown ? 'd-flex justify-center' : ''"
      >
        <v-btn
          @click="exportJson"
          :class="smAndDown ? 'mb-4' : 'mbtn'"
          variant="outlined"
        >
          Exportar
        </v-btn>
        <v-btn
          :class="smAndDown ? 'ml-4 mb-4' : 'mbtn'"
          @click="openFileDialog"
          variant="outlined"
          >Importar</v-btn
        >
      </v-col>
    </v-row>
    <Semester
      v-for="semester in plan.semesters"
      :semester="semester"
      :key="semester.name"
    />
  </v-container>
</template>

<style scoped>
.container {
  width: 100%;
  @media only screen and (min-width: 1920px) {
    width: 75%;
  }
}
.mbtn {
  margin: 10px 7px 0px;
}
</style>
