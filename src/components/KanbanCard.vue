<script>
import { XIcon } from "@heroicons/vue/solid";

export default {
  props: { task: {} },
  components: { XIcon },
  methods: {
    deleteTask(task) {
      //please inform the parent( kanbanboard)  that a change shad been done
      this.$emit("taskDeleted", task);
    },
  },
};
</script>

<template>
  <div
    :class="task.done ? 'line-through' : ''"
    class="flex flex-none flex-col p-4 m-2 font-mono text-textcolor bg-secondary rounded-lg shadow-xl hover:transition duration-200 ease-in-out transform hover:scale-110"
  >
    <div class="flex flex-row justify-between">
      <p class="text-gray-200 italic text-xs mt-1 w-full">
        {{ task.category }}
      </p>
      <button @click="deleteTask(task)" class="h-5 w-5">
        <XIcon
          class="h-3 w-3 hover:transition duration-200 ease-in-out transform hover:scale-110"
        />
      </button>
    </div>
    <p class="font-bold text-lg mt-2">
      {{ task.title }}
    </p>
  </div>
</template>
