<template>
    <div class="editorContainer">
        <div class="editPannel">edit pannel</div>
        <div class="componentsPannel">components pannel</div>
    </div>
</template>

<script>
export default {
    name: "Editor"
}
</script>

<style scoped>
    .editorContainer {
        display: flex;
        flex-direction: row;
        min-height: inherit;
    }

    .editorContainer div {
        margin: 10px;
        min-height: inherit;
    }

    .editPannel {
        width: 350px;
        background-color: cornsilk;
    }

    .componentsPannel {
        background-color: aliceblue;
        flex: 1 30%;
    }
</style>