<script setup lang="ts">
import type { Approval, Prerequisites } from "@/types/Plan";
import { computed } from "vue";

const props = defineProps<{
  pre: Prerequisites;
  approval: Approval;
  openModal: () => void;
}>();

const colorApproval = computed(() => {
  return props.pre.approval.meets ? "#4caf50" : "#f44336";
});
const colorEnroll = computed(() => {
  return props.pre.enroll.meets ? "#4caf50" : "#f44336";
});
</script>

<template>
  <p v-if="props.approval.partial || props.approval.total" class="chips">
    <v-chip
      :color="props.approval.total ? '#3f8142' : '#6ea740'"
      variant="flat"
      rounded
      prepend-icon="mdi-checkbox-marked-circle"
    >
      {{ props.approval.total ? "Aprobado" : "Aprobación Parcial" }}
    </v-chip>
  </p>
  <p v-else class="chips">
    <v-chip :color="colorEnroll" @click="openModal" rounded>Inscripción</v-chip>
    <v-chip :color="colorApproval" class="ml-2" @click="openModal" rounded>
      Exoneración
    </v-chip>
  </p>
</template>

<style scoped>
.chips {
  width: 100%;
  text-align: center;
}
</style>
