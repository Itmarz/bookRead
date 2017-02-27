<template>
    <div class="details">
    <x-header :left-options="{showBack	: true }" >{{bookName}}</x-header>
        <div class="details_main">
            <div class="images"><img :src="directory.images"/></div>
            <div class="text">
                <div class="bookname">{{directory.name}}</div>
                <div class="author">作者：{{directory.author}}</div>
                <div class="size">大小： {{size()}}</div>
                <button @click='join_to'>{{join}}</button>
                <button :class="hide" @click="Probation">马上试读</button>
            </div>
        </div>
        <loading v-model="show" :text="text"></loading>
        <div class="explain">
            简介
            <div>
            {{directory.Introduction_to_the}}
            </div>
        </div>
    </div>
</template>

<script>
import { Loading , XHeader } from 'vux'
export default{
    components: {
        XHeader,
        Loading
    },
    name: 'details',
    data (){
        return {
            directory: {},
            bookList: [],
            show: false,
            join: '添加到书架',
            bookName: '',
            information: {},
            hide: '',
            text: 'Processing',
        }
    },
    created (){
        this.loading()
    },
    methods: {
        loading (){
              var book = this.$route.query.bookName;
              this.$vux.loading.show({
               text: 'Loading'
              })
              this.bookName = book;
              this.$http.get('http://localhost:8080/api/datails?bookName='+book)
                    .then(function(data){
                          this.directory = data.data.data;
                    })
               this.$http.get('http://localhost:8080/api/getlibrary')
                    .then( function(data){
                            this.bookList = data.data.data
                    })
        },
        size (){
        var size = this.directory.size
            if( size<1000 ){
                return size+'字'
            }else{
                return size/1000+'k 字'
            }
        },
        join_to (){
              if( this.join == '打开' ){
                    this.$router.push('/read?book='+this.directory.name+'&chapter=1&bookList=true')
              }else{
                    this.$http.get('http://localhost:8080/api/setlibrary?contain=123&book='+this.bookName+'&read=1')
                          .then(function(data){
                              this.join = '打开'
                              this.hide = 'hide'
                          })
              }
        },
        Probation (){
              this.$router.push('/read?book='+this.directory.name+'&chapter=1&bookList=false')
        }
    },
    watch: {
        bookList: {
              handler(curVal,oldVal){
                   this.$vux.loading.hide()
　　　       for( var i=0;i<curVal.length;i++ ){
                        if( this.bookName == curVal[i].name ){
                                this.join = '打开'
                                this.hide = 'hide'
                                this.information = curVal[i]
                        }
                  }
              },　　　　　　　　
　　　  deep:true
        }
    }
}
</script>

<style>
.details{
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #313131;
}

.details_main{
    display: flex;
    box-sizing: border-box;
     padding: 10px;
}
.details_main .images{
    width: 80px;
    height: 120px;
    padding: 3px;
    background: #fff;
    border: 1px solid #eee;
    box-shadow:0 1px 2px #999;
}
.images img{
    width: 100%;
    height: 100%;
}

.details_main .text{
    flex: 1;
    padding-left: 15px;
}

.text .bookname{
    font-size: 15px;
    line-height: 30px;
    height: 30px;
}
.text .author{
    font-size: 12px;
    height: 25px;
    line-height: 25px;
}
.text .size{
    font-size: 12px;
    height: 35px;
    line-height: 30px;
}

.text button{
    width: 70px;
    height: 22px;
    background: none;
    outline: none;
    color: #666;
    float: left;
    margin-right: 20px;
    font-size: 12px;
    padding: 0;
    line-height: 22px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.explain{
    font-size: 12px;
    padding: 20px 10px 0;
}
.explain div{
    text-indent: 2em;
    line-height: 20px;
}
.hide{
    display: none;
}
</style>
