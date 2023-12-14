<script setup lang="ts">
import usePrerequisites from "@/composables/prerequisitesModel";
import PrerequisitesTable from "./PrerequisitesTable.vue";
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
const { open, prerequisites, title } = usePrerequisites();
</script>

<template>
  <v-dialog
    v-model="open"
    width="auto"
    :minWidth="mdAndUp ? '550px' : undefined"
  >
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <p class="text-subtitle-1">
          Previas para inscripción o crédito parcial
        </p>
        <prerequisites-table
          v-if="prerequisites?.enroll"
          :prerequisite="prerequisites?.enroll"
          showStanding
        />
        <p class="text-subtitle-1">
          Previas para la aprobación del crédito total
        </p>
        <prerequisites-table
          v-if="prerequisites?.approval"
          :prerequisite="prerequisites?.approval"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
