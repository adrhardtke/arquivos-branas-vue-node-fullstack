<script lang="ts">
    export default {
        data() {
            return {
                newColumn: {
                    name: ""
                },
                board: {
                    name: "Project A",
                    columns: [
                        { name: 'Todo' },
                        { name: 'Doing' },
                        { name: 'Done' }
                    ]
                }
            }
        },
        methods: {
            addColumn(newColumn: any){
                this.board.columns.push(newColumn)
                this.newColumn = { name: ""}
            }
        },
    }
</script>

<template>
    <p>OptionsApi</p>
    <div>
        {{ board.name }}
    </div>
    <span v-text="board.name"></span>
    <ul>
        <li v-for="column in board.columns">{{ column.name}}</li>
    </ul>
    <input type="text" v-model="newColumn.name" />
    <button @click="addColumn(newColumn)">Add</button>
    <!-- <button v-on:click="addColumn(newColumn)">Add</button> -->
</template>

<style>

</style>