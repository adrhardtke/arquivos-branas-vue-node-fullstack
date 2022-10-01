<script setup lang="ts">
import { reactive, ref } from 'vue';
    
    const board = reactive({
        name: "Project B",
        columns: [
            { name: 'Todo' },
            { name: 'Doing' },
            { name: 'Done' }
        ]
    })

    const columnName = ref("") // ref é para tipos primitivos e reactive para array e objetos

    function addColumn(){
        board.columns.push({ name: columnName.value })
        columnName.value = ""
    }
</script>

<template>
    <p>Composition API</p>
    <p>
        {{ board.name }}
    </p>
    <span v-text="board.name"></span>
    <ul>
        <li v-for="column in board.columns">{{ column.name}}</li>
    </ul>
    {{ columnName }}
    <input type="text" v-model="columnName" />
    <button @click="addColumn()">Add</button>
    <!-- <button v-on:click="addColumn(columnName)">Add</button> -->
</template>

<style>

</style>