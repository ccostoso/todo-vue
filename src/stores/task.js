import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { allTasks, createTask, updateTask, completeTask, removeTask } from "../http/task-api";

export const useTaskStore = defineStore('taskStore', () => {
    // Store
    const tasks = ref([]);

    // Getters
    const incompleteTasks = computed(() => tasks.value.filter(task => !task.is_completed))
    const completedTasks = computed(() => tasks.value.filter(task => task.is_completed));

    // Actions
    const fetchAllTasks = async () => {
        const { data } = await allTasks();
        // Variables defined with ref need to use value property to assign a value.
        tasks.value = data.data;
    };

    const handleAddedTask = async task => {
        const { data: createdTask } = await createTask(task);
        console.log(createdTask);
        tasks.value.unshift(createdTask.data);
    }

    const handleUpdatedTask = async task => {
        const { data: updatedTask } = await updateTask(task.id, {
            name: task.name,
        });
    
        const currentTask = tasks.value.find(item => item.id === task.id);
        currentTask.name = updatedTask.data.name;
    };
    
    const handleCompletedTask = async task => {
        const { data: completedTask } = await completeTask(task.id, {
            is_completed: task.is_completed,
        });
    
        const currentTask = tasks.value.find(item => item.id === task.id);
        currentTask.is_completed = completedTask.data.is_completed;
    };
    
    const handleRemovedTask = async task => {
        await removeTask(task.id);
        const index = tasks.value.findIndex(item => item.id === task.id);
    
        tasks.value.splice(index, 1);
    }

    return { 
        tasks, 
        incompleteTasks, 
        completedTasks, 
        fetchAllTasks,
        handleAddedTask,
        handleUpdatedTask,
        handleCompletedTask,
        handleRemovedTask,
    };
});

