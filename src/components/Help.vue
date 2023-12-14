<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false)
</script>

<template>
  <v-btn
    variant="plain"
    density="comfortable"
    icon="mdi-help-circle"
    color="#661020"
    style="margin: 10px 7px 0px"
  >
    <v-icon>mdi-help-circle</v-icon>
    <v-dialog
      v-model="dialog"
      activator="parent"
      width="auto"
    >
      <v-card class="pa-5">
        <v-card-text>
          <p class="text-h4">Cómo obtener el TOKEN</p>
          <p class="text-h5 mt-2">Chrome</p>
          <ul class="my-2">
            <li>Ve al sitio de Gestión: <a href="https://gestion.ort.edu.uy/">https://gestion.ort.edu.uy/</a></li>
            <li>Inicia sesión</li>
            <li>Presiona la tecla F12 en el sitio web de Gestión</li>
            <li>Selecciona "Aplicación"</li>
            <li>Expande "Almacenamiento de sesión" y selecciona <em>https://gestion.ort.edu.uy/</em></li>
            <li>Copia el valor de "token"</li>
          </ul>
          <p class="text-h5 mt-2">Firefox</p>
          <ul class="my-2">
            <li>Ve al sitio de Gestión: <a href="https://gestion.ort.edu.uy/">https://gestion.ort.edu.uy/</a></li>
            <li>Inicia sesión</li>
            <li>Presiona la tecla F12 en el sitio web de Gestión</li>
            <li>Selecciona "Almacenamiento"</li>
            <li>Expande "Almacenamiento de sesión" y selecciona <em>https://gestion.ort.edu.uy/</em></li>
            <li>Copia el valor de "token"</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>