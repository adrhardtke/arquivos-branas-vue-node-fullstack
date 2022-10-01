<script setup lang="ts">
    import { onMounted, reactive, ref, inject } from 'vue';
    import Board from '../domain/entity/Board'
    import Card from '../domain/entity/Card'
        
    const state = reactive({board: new Board('')})
    // board.addColumn("Todo", true)
    // board.addColumn("Doing", true)
    // board.addColumn("Done")
    // board.addCard("Todo","A",3)
    // board.addCard("Todo","B",6)
    // board.addCard("Todo","C",9)

    // board.addCard("Done", "D", 12)
    // board.addCard("Done", "E", 15)
    // board.addCard("Done", "F", 18)

    const columnName = ref("")
    const newCard = reactive<Card>(new Card("",0))
    onMounted(async () => {
       const serviceFactory: any = inject("serviceFactory")
       const boardService = serviceFactory.createBoardService()
       const board = await boardService.getBoard(1)
       state.board = board
    }),
    
</script>

<template>
    <p>
        {{ state.board.name }}
        <strong>Estimative total: {{state.board.getEstimative()}}</strong>
    </p>
    <div class="column" v-for="column in state.board.columns">
        {{ column.name}}
        <span @click="state.board.deleteColumn(column)">(x)</span>
        <br/>
        <div v-if="column.hasEstimative">
        </div>
        {{column.getEstimative()}} 
        <div class="card" v-for="card in column.cards">
            {{ card.title }} 
            <div v-show="column.hasEstimative">
                <span @click="card.decreaseEstimative()">(-)</span>
                {{card.estimative}}
                <span @click="card.increaseEstimative()">(+)</span>
                <span @click="column.deleteCard(card)">(X)</span>
            </div>
        </div>
        <div class="new-card">
            <input type="text" name="title" id="title" v-model="newCard.title" placeholder="card title" @keyup.enter="column.addCard(newCard.title, newCard.estimative)"/>
            <input type="number" name="estimative" id="estimative" v-model="newCard.estimative"/>
        </div>
    </div>
    
    <input type="text" v-model="columnName" />
    <button @click="state.board.addColumn(columnName)">Add</button>
</template>

<style>
    * {
        box-sizing: border-box;
    }
    .column {
        display: inline-block;
        width: 200px;
        background-color: #eee;
        min-height: 200px;
        border: 1px solid black;
        text-align: center;
        vertical-align: top;
        padding: 4px;
    }
    .card {
        width: 100%;
        background-color: #fff;
        margin-bottom: 5px;
        border: 1px solid black;
        margin-top: 16px;
    }

    .new-card {
        margin-top: 16px;
        width: 100%;
        background-color: #fff;
        margin-bottom: 5px;
        border: 1px solid dashed;
    }

    .new-card input + input {
        margin-top: 4px;
    }
</style>