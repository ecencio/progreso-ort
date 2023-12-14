<script setup lang="ts">
import type { Semester } from "@/types/Plan";
import Subject from "./Subject.vue";
import { ref } from "vue";
import { computed } from "vue";

const props = defineProps<{
  semester: Semester;
}>();

const subWithoutOpts = props.semester.subjects.filter(
  (s) => !s.hasOptions
).length;

const exp = ref(1);

const approved = computed(() =>
  props.semester.subjects.every((s) => {
    if (s.hasOptions) {
      return s.options?.some((o) => o.approval.total);
    } else {
      return s.approval.total;
    }
  })
);
</script>

<template>
  <v-expansion-panels class="mb-6" :model-value="exp">
    <v-expansion-panel :value="1" style="background-color: #e3eded7d">
      <v-expansion-panel-title>
        <p class="text-h5 w-100 text-center">
          {{ props.semester.name }}
          <v-icon v-if="approved" color="#3f8142">
            mdi-checkbox-marked-circle
          </v-icon>
        </p>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row class="d-flex">
          <Subject
            v-for="(subject, ind) in props.semester.subjects"
            :subject="subject"
            :key="subject.id"
            :size="
              ind === subWithoutOpts - 1
                ? (ind + 1) % 2 === 0
                  ? 6
                  : undefined
                : 6
            "
          />
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
