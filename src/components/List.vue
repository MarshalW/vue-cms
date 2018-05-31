<template>
    <div>
        <div v-if="list" class="listContainer">
            <div>
                <button @click="navigate">创建文章</button>
            </div>
            <div class="listContent">
                <div v-for="item in list" @click="editIt(item.id)" class="listItem">
                    <div>id: {{item.id}}</div>
                    <div>title: {{item.title}}</div>
                </div>
            </div>
        </div>
        <div v-else>加载中...</div>
    </div>
</template>

<script>
import {read} from './list'

export default {
    name: "List",
    mounted: function () {
        getResults().then((list) => {
            this.list = list
        })
    },
    methods: {
        navigate: function () {
            this.$bus.$emit('navigate', 'editor')
        },
        editIt: function (id) {
            this.$bus.$emit('navigate', 'editor', {id})
        }
    },
    data: function () {
        return {
            list: null
        }
    }
}

function getResults () {
    return new Promise(function (resolve) {
        setTimeout(resolve, 1000, read())
    })
}
</script>

<style scoped>
    .listContainer {
        display: flex;
        flex-direction: column;
        min-height: 700px;

        margin: 10px;
    }

    .listContent {
        flex: 8;
        background-color: mistyrose;
        min-height: inherit;
        margin: 10px;

        display: flex;
        flex-direction: column;
    }

    .listItem {
        background-color: lightgreen;
        width: inherit;
        height: 100px;
        margin: 10px;
    }

</style>