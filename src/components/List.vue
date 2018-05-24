<template>
    <div>
        <button v-if="list" @click="navigate">进入编辑器</button>
        <div v-else>加载中...</div>
    </div>
</template>

<script>
export default {
    name: "List",
    mounted: function () {
        getResults().then((list) => {
            this.list = list
        })
    },
    methods: {
        navigate: function () {
            this.$bus.$emit('navigate', 'Editor')
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
        setTimeout(resolve, 2000, [])
    })
}
</script>

<style scoped>

</style>