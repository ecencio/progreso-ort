<script setup lang="ts">
import type { Subject as SubjectType } from "@/types/Plan";
import SubjectChipInfo from "./SubjectChipInfo.vue";
import usePrerequisites from "@/composables/prerequisitesModel";
import { useDisplay } from "vuetify";
import { ref } from "vue";
import { computed } from "vue";

const { mdAndDown } = useDisplay();

const props = defineProps<{
  subject: SubjectType;
  size: number | undefined;
}>();

const size = props.subject.hasOptions ? 12 : props.size;

const { openPrerequisites } = usePrerequisites();
function openModal() {
  if (props.subject.prerequisites) {
    openPrerequisites(props.subject.title, props.subject.prerequisites);
  }
}

const optLen = props.subject.options?.length || 0;

const apprComp = computed(() =>
  props.subject.options?.some((s) => s.approval.total)
);

const exp = ref(1);
</script>

<template>
  <template v-if="props.subject.hasOptions">
    <v-expansion-panels class="my-2" :model-value="exp">
      <v-expansion-panel :value="1" style="background-color: #e2e9f1">
        <v-expansion-panel-title>
          <p class="title w-100">
            {{ props.subject.title }}
            <v-icon v-if="apprComp" color="#3f8142">
              mdi-checkbox-marked-circle
            </v-icon>
          </p>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row class="d-flex">
            <Subject
              v-for="(option, ind) in props.subject.options"
              :subject="option"
              :key="option.id"
              :size="
                ind === optLen - 1 ? ((ind + 1) % 2 === 0 ? 6 : undefined) : 6
              "
            />
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </template>
  
  <template v-else>
    <v-col :cols="mdAndDown ? 12 : size">
      <v-card class="w-100 h-100">
        <v-card-title class="overflow-auto">
          <p class="title w-100">{{ props.subject.title }}</p>
        </v-card-title>
        <v-card-text class="d-flex flex-wrap">
          <SubjectChipInfo
            v-if="props.subject.processed && props.subject.prerequisites"
            :pre="props.subject.prerequisites"
            :approval="props.subject.approval"
            :openModal="openModal"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </template>
</template>

<style scoped>
.title {
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
}
</style>
