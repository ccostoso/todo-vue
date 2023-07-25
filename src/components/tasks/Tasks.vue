<template>
    <div class="card mt-2" v-if="tasks.length && show">
        <ul class="list-group list-group-flush">
            <!-- The @updated="$emit('updated', $event) function uses $ sign notation on emit to pass emission/$event payload up to parent component TasksPage" -->
            <Task 
                v-for="task in tasks" 
                :task="task" 
                :key="task.id" 
                @updated="handleUpdatedTask($event)"
                @removed="handleRemovedTask($event)" 
                @completed="handleCompletedTask($event)" 
            />
        </ul>
    </div>
</template>

<script setup>
import { useTaskStore } from '../../stores/task';
import { defineProps } from 'vue';
import Task from './Task.vue';

const store = useTaskStore();

const { handleUpdatedTask, handleRemovedTask, handleCompletedTask } = store;

const props = defineProps({
    tasks: Array,
    show: {
        type: Boolean,
        default: true,
    }
});
</script>