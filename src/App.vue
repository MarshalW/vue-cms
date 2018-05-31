<template>
    <div id="app">
        <List v-if="this.current.name==='list'"/>
        <Editor v-if="this.current.name==='editor'" v-bind:params="this.current.params"/>
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
        this.$bus.$on('navigate', (viewName, params) => {
            this.current = {
                name: viewName,
                params
            }
        })
    },
    beforeDestroy: function () {
        this.$bus.$off('navigate')
    },
    data: function () {
        return {
            current: {name: 'list'}
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
