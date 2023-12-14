import type { Prerequisites } from "@/types/Plan";
import { ref } from "vue";

const open = ref<boolean>(false);
const prerequisites = ref<Prerequisites>()
const title = ref<string>('')

export default function usePrerequisites() {
  function openPrerequisites(newTitle: string, newPrerequisites: Prerequisites) {
    prerequisites.value = newPrerequisites;
    title.value = newTitle;
    open.value = true;
  }

  function closePrerequisites() {
    open.value = false;
  }

  return {
    open,
    prerequisites,
    title,
    openPrerequisites,
    closePrerequisites
  }
}
