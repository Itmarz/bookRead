<template>
      <div class="read">
         <x-header :left-options="{showBack	: true ,preventGoBack: revert}" :right-options="{showMore: true}"  @on-click-more="showMenus = true" @on-click-back="back">品质阅读</x-header>
           <div class="Catalog">
                  <span class="title">{{bookName}}</span>
                  <div v-for="item in catalog">{{item}}</div>
          </div>
          <confirm v-model="confirmShow" :title="confirmTitle">
           </confirm>
          <loading v-model="show" :text="text"></loading>
          <div class="read_main">
                  <span class="chapter">{{catalog[number-1]}}</span>
                  <div class="paragraph" v-for="item in reading">{{item}}</div>
                  <div class="around">
                      <span @click="prev" :class="prevActive()">上一章</span>
                      <span @click="next" @click.native="nexts" :class="nextActive()">下一章</span>
                  </div>
          </div>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
      </div>
</template>
<script>
import { Loading , XHeader , Actionsheet , Confirm   } from 'vux'
export default{
    components:{
        Loading,
        XHeader,
        Actionsheet,
        Confirm
    },
    name: 'read',
    data (){
        return {
            reading: [],
            number: 1,
            bookName: '',
            bookList: false,
            catalog: {},
            show: false,
            text: 'Processing',
            showMenus: false,
            menus: {
                    menu1: 'Take Photo',
                    menu2: 'Choose from photos'
             },
             confirmShow: false,
             revert: true,
             confirmTitle: '是否加入书架'
        }
    },
    created (){
        this.loading()
    },
    methods: {
         loading (){
            var book = this.$route.query.book,
                  read  = this.$route.query.chapter,
                  bookList = this.$route.query.bookList,
                   arr1= [ "零",
                              "一",
                              "二",
                              "三",
                              "四",
                              "五",
                              "六",
                              "七",
                              "八",
                              "九",
                              "十"];
                    this.number = read;
                    this.bookName = book;
                    this.bookList = bookList;
                    this.$vux.loading.show({
                        text: 'Loading'
                    })
            this.$http.get('http://localhost:8080/api/read?book='+book+'&read='+read)
                  .then(function(data){
                      this.reading = data.data.data;
                      this.$vux.loading.hide()
                  })
             this.$http.get('http://localhost:8080/api/catalog?book='+book)
                  .then(function(data){
                      this.catalog = data.data.data
                  })
         },
         prev (){
              if( this.number ==1 ) return;
              this.number--;
              this.$http.get('http://localhost:8080/api/read?book='+this.bookName+'&read='+this.number)
                    .then(function(data){
                          this.reading = data.data.data
                          this.$vux.loading.hide()
                    })
              this.reading = ['正在加载中']
              this.$vux.loading.show({
                  text: 'Loading'
              })
         },
         prevActive (){
              return this.number == 1?'con':''
         },
         next (){
            if( this.number == this.catalog.length+1 ) return;
            this.number++;
            this.$http.get('http://localhost:8080/api/read?book='+this.bookName+'&read='+this.number)
                  .then(function(data){
                      this.reading = data.data.data
                      this.show = false
                  })
            this.reading = ['正在加载中']
            this.show = true;
         },
         nextActive (){
              return this.number == this.catalog.length+1?'con':''
         },
         back (){
              if( this.bookList ){
                  this.$http.get('http://localhost:8080/api/setlibrary?book='+this.bookName+'&read='+this.number)
                          .then(function(data){
                              console.log(data)
                          })
                  window.history.go(-1)
              }else{
                 this.$http.get('http://localhost:8080/api/setlibrary?contain=true&book='+this.bookName+'&read='+this.number)
                      .then(function(data){
                          console.log(data)
                      })
              }
         }

    }
}
</script>

<style>
.mask{
    position:fixed;
    width:100%;
    top:0;
    left:0;
    bottom:0;
    background:rgba(0, 0, 0, .3);
    z-index:2;
}
.read{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.read .eject{
    position: absolute;
    bottom: 86px;
    left: 4px;
    width:10px;
    height:10px;
    border-radius:50%;
    z-index:10;
    opacity: 0.8;
    color: #666;
}
.chapter{
    width: 100%;
    height: 50px;
    color: #313131;
    text-align: center;
    display: block;
    line-height: 50px;
    font-size: 18px;
}

.Catalog{
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    z-index: 10;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
    background: #fff;
}
.Catalog .title{
    width: 100%;
    height: 35px;
    display: block;
    text-align: center;
    line-height: 35px;
    font-size: 15px;
}

.Catalog div{
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    color: #666;
    padding-left: 10px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:normal;
}
.read_main{
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    line-height: 25px;
    padding: 9px;
    font-size: 18px;
    color: #666;
}

.read_main .paragraph{
     text-indent: 1em;
}

.around{
    width: 100%;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
}
.around span{
    width: 50%;
    height: 100%;
    float: left;
    text-align: center;
    color: lawngreen;
    display: inline-block;
}
.around .con{
    color: #999
}
</style>
