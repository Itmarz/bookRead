<template>
    <div class="shuqi_show">
            <div class="view">
                <div class="conceal">
                    <div class="bookcaselist" v-for="(item,index) in bookList" @click='reading(index)'>
                        <div :class="cLass" @click="remove(item.name,index)">删除</div>
                        <img :src="item.images"/>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
  name: 'bookstore',
  props: ['hide'],
  data (){
      return {
          bookList: [],
          cLass: '',
      }
  },
  created (){
      this.loading();
  },
  methods: {
      loading (){
            this.cLass = this.hide
            this.$http.get('http://localhost:8080/api/getlibrary')
                  .then( function(data){
                          this.bookList = data.data.data
                  })
      },
      reading (index){
            if(!this.hide)
                return;
            this.$router.push( '/read?book='+this.bookList[index].name+'&chapter='+this.bookList[index].read +'&bookList=true')
      },
      remove (book,i){
          this.$http.get('http://localhost:8080/api/setlibrary?contain=remove&book='+book)
                .then(function(data){
                    this.bookList.splice( i,1 );
                    this.cLass = 'hide'
                    this.$emit( "hide",'hide')
                })
      }
  },
  watch: {
      hide: {
            handler(curVal,oldVal){
　　　　this.cLass = curVal;
　　　},
　　　deep:true
        }
  }
}
</script>

<style>
.shuqi_show{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid #eeeeee;
}
.view{
    overflow: hidden;
}
.conceal{
    width: 105%;
}
.bookcaselist{
    display: flex;
    position: relative;
    flex-direction: column;
    width: 29%;
    height: 170px;
    margin-right: 4%;
    margin-bottom: 10px;
    float: left;
    box-sizing: border-box;
}
.bookcaselist>div{
    position: absolute;
    width: 100%;
    height: 82%;
    padding: 8%;
    color: #fff;
    font-size: 20px;
    line-height: 130px;
    text-align: center;
    opacity: 0.7;
    filter: alpha(opacity=30);
    background-color: #000;
    box-sizing: border-box;
}
.bookcaselist img{
    flex: 8;
    width: auto;
    padding: 8%;
    overflow: hidden;
    box-shadow: 0 1px 2px #999;
    background: #fff;
}

.bookcaselist span{
    flex: 2;
    text-align: center;
    font-size:12px;
    line-height:26px;
}
</style>
