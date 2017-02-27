<template>
    <div class="fact">
        <div class="list">
            <span :class="select(0)" @click="selected = 0">专题</span>
            <span :class="select(1)" @click="selected = 1 ">分类</span>
        </div>
        <div>
            <div class="arrangement" v-for="(item,index) in showF">
                  <span class="bg" :class="cLass[index]"></span><span class="content">{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'fact',
    data (){
        return {
            selected: 0,
            list: {},
            showF: [],
            cLass: []
        }
    },
    created (){
        this.loading()
    },
    methods: {
        loading (){
            this.$http.get('http://localhost:8080/api/fact')
                  .then( function(data){
                      this.list = data.data.data
                      this.showF = data.data.data.classification
                      this.cLass = data.data.data.Color_version
                  })
        },
        select (index){
            return this.selected==index?'con':''
        }
    },
    watch: {
        selected: {
            handler(curVal,oldVal){
　　　　var item = curVal == 0?'classification':'special'
                 this.showF = this.list[item]
　　　},
　　　deep:true
        }
    }
}
</script>

<style>
.fact{
    border-top: 1px solid #eee;
}

.list{
    display: flex;
    height: 20px;
    line-height: 20px;
    width: 30%;
    text-align: center;
    margin: 6px auto;
    border: 1px solid slateblue;
    border-radius: 3px;
}

.list span{
    flex: 1;
    font-size: 12px;
    color: slateblue;
}

.list .con{
    background: slateblue;
    color: #fff;
}

.arrangement{
    height:40px;
    display: flex;
    overflow: hidden
}
.arrangement .bg{
    display: inline-block;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    margin: 11px 11px;
}
.arrangement .content{
    flex: 1;
    display: inline-block;
    line-height: 40px;
    font-size: 13px;
}
.lightsalmon{
    background: lightsalmon
}
.lightcoral{
    background: lightcoral
}
.lightpink{
    background: lightpink
}
.lightblue{
    background: lightblue
}
.lightgray{
    background: lightgray
}
.lawngreen{
    background: lawngreen
}
.mediumpurple{
    background: mediumpurple
}

</style>
