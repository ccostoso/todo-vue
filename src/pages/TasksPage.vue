<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask />

                    <!-- List of incomplete tasks -->
                    <Tasks 
                        :tasks="incompleteTasks"
                    />

                    <!-- Toggle button -->
                    <!-- Show button only if there are any incomplete or completed tasks -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <!-- When button is clicked, completed tasks are either shown if hidden, or hidden if shown -->
                        <button class="btn btn-sm btn-secondary" @click="showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed</span>
                            <span v-else>Hide Completed</span>
                        </button>
                    </div>

                    <!-- List of complete tasks -->
                    <Tasks 
                        :tasks="completedTasks" 
                        :show="completedTasksAreVisible && showCompletedTasks"
                    />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/task";
import Tasks from "../components/tasks/Tasks.vue";
import NewTask from "../components/tasks/NewTask.vue";

const store = useTaskStore();
const { completedTasks, incompleteTasks } = storeToRefs(store);
const { fetchAllTasks } = store;

const tasks = ref([]);

onMounted(async () => {
    await fetchAllTasks();
})

const showToggleCompletedBtn = computed(() => incompleteTasks.value.length && completedTasks.value.length)
const completedTasksAreVisible = computed(() => !incompleteTasks.length || completedTasks.length);
const showCompletedTasks = ref(false || completedTasksAreVisible.value);
</script>