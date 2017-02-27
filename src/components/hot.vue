<template>
      <div class="hot">
              <div class="booklist" v-for="item in hotList" >
                  <img :src="item.images"/>
                  <div class="Introduction" @click="datails(item.name)">
                      <span class="name">
                          <span class="bookname">{{item.name}}</span>
                          <span class="author">{{item.author}}</span>
                      </span>
                      <span class="num">{{item.len}}人在追</span>
                      <span class="text">{{item.text}}</span>
                  </div>
              </div>
      </div>
</template>

<script>
export default {
    name: "hot",
    data (){
          return {
              hotList: []
          }
    },
    created (){
          this.loading();
    },
    methods: {
          loading (){

              this.$http.get('http://localhost:8080/api/hot')
                    .then(function(data){
                          this.hotList = data.data.data
                    })
          },
          datails (name){
                this.$router.push('/datails?bookName='+name)
          }
    }
}
</script>

<style>
.hot{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto
}
 .booklist{
    display: flex;
    height: 100px;
    overflow: hidden;
    padding: 10px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
}

.hot .booklist img{
    width: 55px;
    height: 100%;
    padding: 0 8px;
}

.hot .booklist .Introduction{
    flex: 1;
}

.hot .Introduction .name{
    display: block;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
}

.hot .Introduction .author{
    padding: 0 15px;
    font-size: 13px;
    color: #313131;
}

.Introduction .num{
    display: block;
    font-size: 11px;
    padding-bottom: 10px;
    line-height: 25px;
    color: #ccc;
}

.Introduction .text{
    font-size: 12px;
    color: #999;
    height: 15px;
    display: block;
    overflow: hidden;
    text-overflow : ellipsis;
    white-space : normal;
}
</style>
