<script>
import KanbanCard from "./KanbanCard.vue";
import draggable from "vuedraggable";
import PopUp from "./PopUp.vue";
import { useTaskStore } from "../stores/Task";
import { ref } from "vue";

export default {
  setup() {
    const columns = ref([]);
    const store = useTaskStore();

    function changeDone(task) {
      store.determineAndChangeDoneForTask(task);
    }
    function taskDeleted(task) {
      store.deleteTask(task);
    }

    return {
      columns,
      store,
      changeDone,
      taskDeleted,
    };
  },

  components: {
    KanbanCard,
    draggable,
    PopUp,
  },

  methods: {
    onChanged({ added }) {
      this.changeDone({ ...added.element });
    },
  },
};
</script>

<template>
  <div class="container h-full mx-auto">
    <div class="flex flex-1 flex-col">
      <PopUp :hidden="true" />
      <div
        class="grid grid-cols-3 w-9/12 grid-flow-col mx-auto m-6 p-6 mt-0 gap-4 bg-secondary rounded-lg shadow-2xl"
      >
        <div
          v-for="column in store.columns"
          :key="column.title"
          class="flex flex-col justify-items-center items-center bg-primary rounded"
        >
          <div class="flex flex-row justify-between items-baseline w-full pb-2">
            <h1 class="text-lg font-semibold text-textcolor p-2">
              > {{ column.title }}
            </h1>
            <p
              class="text-center align-middle text-lg font-semibold bg-secondary opacity-70 rounded-lg text-textcolor p-2 mt-2 mr-6 w-10"
            >
              {{ column.tasks.length }}
            </p>
          </div>
          <draggable
            v-model="column.tasks"
            group="tasks"
            class="w-11/12"
            @end="drag = false"
            @change="onChanged"
            :emptyInsertThreshold="100"
            item-key="id"
          >
            <template #item="{ element }">
              <div class="w-full">
                <KanbanCard
                  :key="element.id"
                  :task="element"
                  @taskDeleted="taskDeleted"
                />
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
