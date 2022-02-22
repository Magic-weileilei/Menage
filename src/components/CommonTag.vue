<template>
  <div class="tabs">
    <el-tag 
    v-for="(tag,index) in tags"
    :key="tag.name"
    :closable="tag.name !== 'home'"
    :effect="$route.name === tag.name ? 'dark' : 'plain'"
    @click="changeMenu(tag)"
    @close="handeleClose(tag,index)"
    size="small"
    >
      {{ tag.label }}
    </el-tag>
    
  </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        name: 'CommonTag',
        data() {
            return {

            }
        },
        computed: {
            ...mapState({
                tags: state => state.tab.tabsList
            })
        },
        methods: {
            ...mapMutations({
                close: 'closeTag'
            }),
            changeMenu(item) {
                this.$router.push({
                    name: item.name
                })
            },
            handeleClose(tag, index) {
                const length = this.tags.length - 1

                // 关闭标签，从而关闭store中的tabsList
                this.close(tag)
                if (tag.name !== this.$router.name) {
                    return
                }
                // 若点击最后一个，页面跳转到前一个
                if (index === length) {
                    this.$router.push(this.tags[index - 1].name)
                } else {
                    // 若点击的是中间的，让它向右跳转
                    ths.$router.push(this.tags[index].name)
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .tabs {
        padding: 20px;
        .el-tag {
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>