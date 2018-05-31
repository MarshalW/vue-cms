<template>
    <div class="editorContainer">
        <div v-if="status==='loading'">Loading ..</div>
        <div v-if="status==='saving'">Saving ..</div>
        <div v-if="status==='show'" class="editPannel">
            <div>编辑面板</div>
            <div class="editHeadContainer">标题： {{article.title}}</div>
            <div class="editContentContainer">
                <div>内容</div>
                <div class="contentItems">
                    <draggable v-model="article.contentItems" :options="{group:'content'}">
                        <transition-group>
                            <template v-for="(item,index) in article.contentItems">
                                <!-- 文本条目  -->
                                <div v-if="item.type=='textComponent'"
                                     class="contentItem" :key="index">
                                    <button v-on:click="removeContentItem(item)">删除</button>
                                    <div contenteditable="true" @input="event=>{item.data.text=event.target.innerText}">
                                        {{item.data.text}}
                                    </div>
                                </div>
                                <!-- 图片条目 -->
                                <div v-else-if="item.type=='imageComponent'"
                                     class="contentItem" :key="index"
                                     v-bind:style="{backgroundColor:'cornflowerblue',height:item.data.height}"
                                >
                                    <button v-on:click="removeContentItem(item)">删除</button>
                                    <div>{{item.data.imgSrc}}</div>
                                </div>
                            </template>
                        </transition-group>
                    </draggable>
                </div>
            </div>
        </div>
        <div v-if="status==='show'" class="componentsPannel">
            <div>
                <span style="margin-right: 10px">组件面板</span>
                <button v-on:click="save">保存</button>
                <button v-on:click="reset">重置</button>
                <button v-on:click="back" style="margin-left: 5px;">返回</button>
            </div>
            <div>文本组件
                <button v-on:click="addBlankTextItem" style="margin-left: 5px;">增加</button>
            </div>
            <div class="imageComponentContainer">
                <div>图片组件
                    <button @click="addNewImageComponent" style="margin-left: 10px">增加</button>
                </div>
                <div class="imageComponentItems">
                    <draggable v-model="article.components.imageComponents"
                               :options="{group:{name:'content',pull:'clone',put:false}}">
                        <transition-group>
                            <div class="imageComponent"
                                 v-for="(item, index) in article.components.imageComponents" :key="index"
                                 v-bind:style="{backgroundColor:'cornflowerblue'}"
                            >
                                <button v-on:click="removeImageComponentItem(item)">删除</button>
                                <div>{{item.data.imgSrc}}</div>
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
import {Article, read, save, clone} from './editor'


let imageCount = 0

export default {
    name: "Editor",
    list: null,
    components: {
        draggable
    },
    props: ['params'],

    mounted: function () {
        if (this.params && this.params.id) {
            read(this.params.id).then((article) => {
                this._article = article
                this.article = clone(article)
                this.status = 'show'
            })
        } else {
            this._article = new Article()
            this.article = new Article()
            this.status = 'show'
        }

        this.$on('removeContentItem', function (item) {
            let a = true
            while (a) {
                if (this.article.contentItems.indexOf(item) > -1) {
                    this.article.contentItems.splice(this.article.contentItems.indexOf(item), 1)
                } else {
                    break
                }
            }
        })
    },
    beforeDestroy: function () {
    },
    methods: {
        addNewImageComponent: function () {
            imageCount++
            this.article.components.imageComponents.push({
                type: 'imageComponent',
                data: {
                    imgSrc: `p${imageCount}.png`,
                    height: '100px'
                }
            })
        },
        addBlankTextItem: function () {
            this.article.contentItems.unshift({
                type: 'textComponent',
                data: {
                    text: '-'
                }
            })
        },
        back: function () {
            this.$bus.$emit('navigate', 'list')
        },
        reset: function () {
            this.article = clone(this._article)
        },
        save: function () {
            this.status = 'saving'
            save(this.article).then(() => {
                this.$bus.$emit('navigate', 'list')
            })
        },
        removeContentItem: function (item) {
            this.article.contentItems.splice(this.article.contentItems.indexOf(item), 1)
        },
        removeImageComponentItem: function (item) {
            this.$emit('removeContentItem', item)
            this.article.components.imageComponents.splice(this.article.components.imageComponents.indexOf(item), 1)
        }
    },
    data: function () {
        return {
            status: 'loading',
            article: {}
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
        /*display: flex;*/
        /*flex-direction: row;*/
        background-color: beige;
    }

    .imageComponentItems span {
        display: flex;
        flex-direction: row;
        flex-flow: wrap;
    }

    .imageComponent {
        width: 60px;
        height: 60px;
    }

    .contentItems .imageComponent {
        width: auto;
    }

</style>