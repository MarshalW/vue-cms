<template>
    <div id="app">
        <List v-if="this.currentView==='List'"/>
        <Editor v-if="this.currentView==='Editor'"/>
    </div>
</template>

<script>
import List from './components/List.vue'
import Editor from './components/Editor.vue'

export default {
    name: 'app',
    components: {
        List,
        Editor
    },
    mounted: function () {
        this.$bus.$on('navigate', (viewName) => {
            this.currentView = viewName
        })
    },
    beforeDestroy: function () {
        this.$bus.$off('navigate')
    },
    data: function () {
        return {
            currentView: 'List'
        }
    },
    methods: {}
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: beige;
        margin-top: 60px;

        margin-left: auto;
        margin-right: auto;
        width: 600px;
        min-height: 750px;
    }
</style>
