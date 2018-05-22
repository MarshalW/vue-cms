<template>
    <div class="editorContainer">
        <div class="editPannel">
            <div>编辑面板</div>
            <div class="editHeadContainer">标题</div>
            <div class="editContentContainer">
                <div>内容</div>
                <div class="contentItems">
                    <draggable v-model="contentItems" :options="{group:'content'}">
                        <transition-group>
                            <div :class="item.className"
                                 v-for="(item,index) in contentItems" :key="index"
                                 v-bind:style="{height:item.height+'px',backgroundColor:item.color}">
                                <button v-on:click="remove(item)">删除</button>
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
                    <draggable v-model="imageItems" :options="{group:{name:'content',pull:'clone',put:false}}">
                        <transition-group>
                            <div class="imageComponent"
                                 v-for="item in imageItems" :key="item.id"
                                 v-bind:style="{backgroundColor:item.color}"
                            >
                            </div>
                        </transition-group>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

const contentItems = [
    {
        id: 1,
        height: 50,
        className: 'contentItem'
    },
    {
        id: 2,
        height: 80,
        className: 'contentItem'
    },
    {
        id: 13,
        height: 40,
        className: 'contentItem'
    }
]

const imageItems = [
    {
        id: 455,
        height: 120,
        className: 'imageComponent',
        color: 'deeppink'
    },
    {
        id: 2455,
        height: 120,
        className: 'imageComponent',
        color: 'yellow'
    }
]

export default {
    name: "Editor",
    components: {
        draggable
    },
    methods: {
        remove: function (item) {
            this.contentItems.splice(this.contentItems.indexOf(item), 1)
        }
    },
    data: function () {
        return {
            contentItems,
            imageItems
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
        max-height: 500px;
        overflow: auto;
    }

    .contentItem {
        width: auto;
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
    }

    .contentItems .imageComponent {
        width: auto;
    }

</style>