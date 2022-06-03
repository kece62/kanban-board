import { defineStore } from "pinia";

export const useTaskStore = defineStore({
  id: "columns",
  state: () => ({
    id: 0,
    columns: [
      {
        title: "todo",
        tasks: [],
      },
      {
        title: "in progress",
        tasks: [],
      },
      {
        title: "done",
        tasks: [],
      },
    ],
  }),
  getters: {
    getColumns() {
      return this.columns;
    },
  },
  actions: {
    determineAndChangeDoneForTask(task) {
      // we just have 3 columns, so we can do it in a non dynamic way
      // if we got more maybe do something similar to deleteTask()

      var found = this.columns[0].tasks.find(
        (element) => element.id == task.id
      );
      if (found) return (this.columns[0].tasks[task.id].done = false);

      found = this.columns[1].tasks.find((element) => element.id == task.id);
      if (found) return (this.columns[1].tasks[task.id].done = false);

      this.columns[2].tasks[task.id].done = true;
    },

    addTask(task) {
      this.columns[0].tasks.push({ ...task, id: this.id++ });
    },

    deleteTask(task) {
      this.columns.forEach((column) => {
        const found = column.tasks.find((element) => element.id == task.id);

        if (found) column.tasks.pop(found);
      });
    },
  },
});
