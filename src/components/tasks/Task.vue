<template>
    <li class="list-group-item py-3" :key="task.id">
        <div class="d-flex justify-content-start align-items-center">
            <input 
                class="form-check-input mt-0" 
                type="checkbox" 
                :class="completedClass" 
                :checked="task.is_completed" 
                @change="markTaskAsCompleted"
            />
            <div class="ms-2 flex-grow-1" :class="completedClass" title="Double click the text to edit or remove"
                @dblclick="isEdit = true">
                <div class="relative" v-if="isEdit">
                    <input 
                        class="editable-task" 
                        type="text" 
                        @keyup.esc="undo" 
                        @keyup.enter="updateTask"
                        v-focus
                        v-model="editingTask"
                    />
                </div>
                <span v-else>{{ task.name }}</span>
            </div>
            <!-- <div class="task-date">24 Feb 12:00</div> -->
        </div>
        <TasksActions 
            @edit="isEdit = true" 
            @remove="removeTask"
            v-show="!isEdit" 
        />
    </li>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import TasksActions from './TasksActions.vue';

const props = defineProps({
    task: Object,
});

const isEdit = ref(false);
const editingTask = ref(props.task.name);
const completedClass = computed(() => props.task.is_completed ? "completed" : "");

const vFocus = {
    mounted: (element) => element.focus(),
}

const emit = defineEmits(['updated', 'completed', 'removed']);

const updateTask = event => {
    const updatedTask = { ...props.task, name: event.target.value };
    isEdit.value = false;
    emit('updated', updatedTask);
}

const undo = () => {
    isEdit.value = false;
    editingTask.value = props.task.name;
}

const markTaskAsCompleted = event => {
    const updatedTask = { ...props.task, is_completed: !props.task.is_completed };
    emit('completed', updatedTask);
}

const removeTask = event => {
    if (confirm("Are you sure?")) {
        emit('removed', props.task);
    }
}
</script>