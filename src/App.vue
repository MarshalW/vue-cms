<template>
    <div id="app">
        <Editor/>
    </div>
</template>

<script>
import Editor from './components/Editor.vue'

export default {
    name: 'app',
    components: {
        Editor
    }
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
