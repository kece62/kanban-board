<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/Task";

export default {
  setup() {
    const hidden = ref(true);
    const task = ref({});
    const store = useTaskStore();
    const disabled = ref(true);

    function setDisabled() {
      console.log(task.value);
      if (task.value.title != undefined && task.value.category != undefined) {
        if (task.value.title.length > 0 && task.value.category.length > 0) {
          disabled.value = false;
        }
      }
    }

    function isDisabled() {
      return disabled.value;
    }

    function addTask(task) {
      store.addTask({ done: false, ...task });
      handleCancel();
    }

    function handleCancel() {
      task.value = {};
      hidden.value = !hidden.value;
      disabled.value = true;
    }

    function changeHidden() {
      hidden.value = !hidden.value;
    }
    return {
      hidden,
      changeHidden,
      handleCancel,
      task,
      addTask,
      disabled,
      isDisabled,
      setDisabled,
    };
  },
  data() {
    return {
      input: ["title", "category"],
    };
  },
};
</script>

<template>
  <button
    class="rounded-full w-48 text-textcolor bg-secondary shadow-2xl border-2 font-semibold border-solid border-textcolor mx-auto mt-8 mb-8 p-1 hover:transition duration-200 ease-in-out transform hover:scale-110"
    @click="changeHidden"
  >
    add story
  </button>

  <div
    v-show="!hidden"
    class="flex justify-items-center items-center w-full h-full fixed insert-0 z-40 top-0 bg-primary/80"
  >
    <div
      class="flex flex-col justify-items-center items-center w-1/4 h-2/6 mx-auto z-50 border-2 border-solid border-gray-400 text-textcolor bg-secondary rounded-lg shadow-lg"
    >
      <div class="flex flex-col mb-4 m-2">
        <h1>enter story details</h1>
      </div>

      <div class="flex flex-col mb-4">
        <label for="category">category</label>
        <input
          v-model="task.category"
          type="text"
          name="category"
          :class="
            disabled
              ? 'border-2 border-solid border-red-800'
              : 'border-2 border-solid border-gray-400'
          "
          class="rounded bg-secondary"
          :keyup="setDisabled()"
          required
        />
      </div>
      <div class="flex flex-col mb-4">
        <label for="title">title</label>
        <input
          v-model="task.title"
          type="text"
          name="title"
          :class="
            disabled
              ? 'border-2 border-solid border-red-800'
              : 'border-2 border-solid border-gray-400'
          "
          class="rounded bg-secondary"
          :keyup="setDisabled()"
          required
        />

        <div
          class="flex flex-row space-x-6 pt-4 justify-items-center items-center"
        >
          <button
            class="w-20 rounded border-2 textcolor border-solid border-textcolor"
            @click="handleCancel"
          >
            cancel
          </button>

          <button
            @click="addTask(task)"
            class="w-20 rounded textcolor border-2 border-solid border-textcolor"
            :class="disabled ? 'bg-gray-600' : 'bg-green-900'"
            :disabled="isDisabled()"
          >
            add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
