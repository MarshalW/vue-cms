<template>
    <div class="editorContainer">
        <div class="editPannel">
            <div>编辑面板</div>
            <div class="editHeadContainer">标题</div>
            <div class="editContentContainer">
                <div>内容</div>
                <div class="contentItems">
                    <draggable v-model="contentItems">
                        <transition-group>
                            <div class="contentItem"
                                 v-for="item in contentItems" :key="item.id"
                                 v-bind:style="{height:item.height+'px'}">
                            </div>
                        </transition-group>
                    </draggable>
                </div>
            </div>
        </div>
        <div class="componentsPannel">
            <div>组件面板</div>
            <div class="imageComponentContainer">
                <div>图片组件</div>
                <div class="imageComponentItems">
                    <div class="imageComponent"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: "Editor",
    components: {
        draggable
    },
    data: function () {
        return {
            contentItems: [
                {
                    id: 1,
                    height: 50
                },
                {
                    id: 2,
                    height: 80
                },
                {
                    id: 13,
                    height: 40
                }
            ]
        }
    }
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
    }

    .editPannel {
        display: flex;
        flex-direction: column;
        width: 350px;
        background-color: cornsilk;
    }

    .componentsPannel {
        background-color: aliceblue;
        flex: 1 30%;
    }

    .editHeadContainer {
        flex: 1;
        background-color: blanchedalmond;
    }

    .editContentContainer {
        flex: 7;
        background-color: blanchedalmond;
        display: flex;
        flex-direction: column;
    }

    .contentItems {
        flex: 9;
        display: flex;
        flex-direction: column;
        background-color: whitesmoke;
        width: auto;
    }

    .contentItem {
        width: auto;
        /*height: 50px;*/
        background-color: lightgreen;
    }

    .imageComponentContainer {
        display: flex;
        flex-direction: column;
        background-color: azure;
        width: 200px;
        min-height: 120px;
    }

    .imageComponentItems {
        display: flex;
        flex-direction: row;
        background-color: beige;
    }

    .imageComponent {
        width: 60px;
        height: 60px;
        background-color: deeppink;
    }
</style>