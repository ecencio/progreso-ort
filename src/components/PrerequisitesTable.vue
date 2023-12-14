<script setup lang="ts">
import { Prerequisite, Requirement } from "@/types/Plan";
import { PropType } from "vue";

const props = defineProps({
  prerequisite: {
    type: Object as PropType<Prerequisite>,
    required: true,
  },
  showStanding: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const color = (meets: boolean) => {
  return meets ? "#4caf50" : "#f44336";
};

const getRecText = (rec: Requirement) => {
  const subCount = rec.subjects.length;
  if (subCount === rec.min) return "Los siguientes créditos:";

  return `Al menos ${rec.min} de los siguientes créditos:`;
};

const approveStanding = () => {
  return (
    (props.prerequisite.standingObtained || 0) > props.prerequisite.standing
  );
};
</script>

<template>
  <v-table density="compact" class="table my-2">
    <tbody>
      <template v-for="rec in props.prerequisite.requirement">
        <tr style="background-color: #d7d4d4a1">
          <td colspan="2">{{ getRecText(rec) }}</td>
          <td :style="{ color: color(rec.meets) }" class="meets td">
            {{ rec.meets ? "&#x2714;" : "&#10008;" }}
          </td>
        </tr>
        <tr v-for="sub in rec.subjects" :key="sub.title">
          <td>{{ sub.title }}</td>
          <td>{{ sub.type === "P" ? "Crédito Parcial" : "Crédito Total" }}</td>
          <td :style="{ color: color(sub.meets) }" class="meets td">
            {{ sub.meets ? "&#x2714;" : "&#10008;" }}
          </td>
        </tr>
      </template>
      <tr v-if="showStanding" style="background-color: #d7d4d4a1">
        <td colspan="2">
          {{
            `El crédito total aprobado de ${
              props.prerequisite.standing
            } materias del título.${
              !approveStanding()
                ? ` (Tienes ${props.prerequisite.standingObtained})`
                : ""
            }`
          }}
        </td>
        <td :style="{ color: color(approveStanding()) }" class="meets td">
          {{ approveStanding() ? "&#x2714;" : "&#10008;" }}
        </td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: center; font-weight: bold">
          {{
            props.prerequisite.meets
              ? "Requisito cumplido"
              : "Requisito no cumplido"
          }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
.meets {
  text-align: center;
  width: 15px;
}
.table {
  border: 1px solid #727272bb;
  border-collapse: collapse;
  border-radius: 5px;
}
td {
  height: calc(var(--v-table-row-height, 52px) - 25px) !important;
}
</style>

<!-- type Requirement = {
  meets: boolean;
  min: number;
  subjects: Pre[];
} -->
