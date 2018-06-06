<template>
    <div>
        <div v-if="list" class="listContainer">
            <div>
                <button @click="create">创建文章</button>
                <button @click="remove" style="margin-left: 10px;">删除文章</button>
            </div>
            <div class="listContent">
                <div v-for="item in list" @click="modify(item.id)" class="listItem" v-bind:key="item.id">
                    <input type="checkbox" name="removeId" value="item.id"
                           @click.stop="clickCheckBox(item.id)"/>
                    <div>id: {{item.id}}</div>
                    <div>title: {{item.title}}</div>
                </div>
            </div>
        </div>
        <div v-else>加载中...</div>
    </div>
</template>

<script>
import Article from './article'

export default {
    name: "List",
    mounted: function () {
        Article.browse({}).then((page) => {
            this.list = page.results
            this.removeIds = new Set()
        })
    },
    methods: {
        create: function () {
            this.$bus.$emit('navigate', 'editor')
        },
        modify: function (id) {
            this.$bus.$emit('navigate', 'editor', {id})
        },
        remove: function () {
            if (this.removeIds.size > 0) {
                let c = confirm('点击确认按钮执行删除操作')
                if (c) {
                    this.list = null
                    Article.remove(this.removeIds).then(() => {
                        Article.browse({}).then((page) => {
                            this.removeIds.clear()
                            this.list = page.results
                        })
                    })
                }
            }
        },
        clickCheckBox: function (id) {
            if (this.removeIds.has(id)) {
                this.removeIds.delete(id)
            } else {
                this.removeIds.add(id)
            }
        }
    },
    data: function () {
        return {
            list: null,
            removeIds: new Set()
        }
    }
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