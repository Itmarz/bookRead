<template>
  <div class='content'>
      <header>
            <span class='continue_reading' @click="administration()" :class="{ 'opacity': select}">管理</span>
            <span class='title'>书架</span>
            <span class='search'></span>
      </header>

      <div class='main'>
          <router-view :hide="hide"></router-view>
      </div>

      <footer>
            <router-link  v-for="(item,index) in showF" :to="{ path:routing[index],query:{ select: index } }" >
                <img :src="item.img"/>
                <span :class="{'act': index==select }">{{item.title}}</span>
            </router-link>
      </footer>
   </div>
</template>

<script>
export default {
  name: 'app',
  data (){
      return {
          footer: [],
          showF: [],
          hide: 'hide',
          select: 0,
          routing: ["bookstore","hot","fact","feedback"]
      }
  },
  created (){
        this.loading();
        if( this.$route.query.select ){
            this.select = this.$route.query.select
        }
        this.$on( "change",function(data){
              shows(this.footer,this,data)
         })
         this.$on( "hide",function(data){
              this.hide = data
              console.log(1)
         })
  },
  methods: {
      loading (){
        this.$http.get( "http://localhost:8080/api/footer" )
              .then(function(data){
                  this.footer = data.data.data
                  shows(data.data.data,this,this.select)
              })
      },
      loadMovie (data){
          this.$emit( "change",data.query.select );
      },
      highlight (index){
          return index==this.select?'act':'';
      },
      administration (){
            this.hide = ''
      }
  },
  watch: {
    '$route': 'loadMovie'
  }
}
function shows(arr,that,len){
    var obj = [];
    for( let i=0;i<arr.length;i++){
          obj.push(arr[i][0])
    }
    obj[len] = arr[len][1];
    that.showF = obj;
    that.select = len;
}
</script>

<style>
html,body,.container,.content{
    width: 100%;
    height: 100%;
    font-family: "Microsoft YaHei UI";
    box-sizing: border-box;
    font-size: 12px;
    overflow: hidden;
}
.content{
    display: flex;
    flex-direction: column;
}
.content>header{
    height: 50px;
    line-height: 50px;
    display: flex;
    border-bottom: 1px solid #eee;
}
.continue_reading{
    width: 50px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin: 11px;
}
.title{
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
}
.search{
  width: 50px;
  height: 50px;
  margin: 0 11px ;
  background: url("/static/images/search.jpg") no-repeat;
  background-position: 25px 11px;
  background-size: 24px;
}
.content>.main{
    flex: 1;
    overflow: hidden;
}
.content>footer{
    height: 50px;
    display: flex;
    border-top: 1px solid #eee;
}
.content>footer a{
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    padding: 5px 0;
    color: #000;
    text-align: center
 }
 .content>footer img {
    width: 25px;
    height: 25px;
    display: block;
    margin: 0 auto;
 }
 .content>footer span{
    height: 15px;
    width: 100%;
    line-height: 15px;
    text-align: center;
 }
 .content .act{
    color: #2e8dda;
 }
 .opacity{
    opacity: 0
 }
</style>

var foos = document.getElementsByClassName('foo');
foos.style.fontFamily = 'italic';