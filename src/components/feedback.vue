<template>
    <div class="feedback">
        <div class="backlist" v-for="item in item">
            <img :src="item.images"/>
            <span>{{item.text}}</span>
        </div>
    </div>
</template>

<script>
export default{
    name: 'feedback',
    data (){
        return {
            item: []
        }
    },
    created (){
          this.loading()
    },
    methods: {
        loading (){
            this.$http.get('http://localhost:8080/api/feedback')
                  .then(function(data){
                      this.item = data.data.data
                  })
        }
     }
}
</script>

<style>
.feedback{
    width: 100%;
    border-top: 1px solid #eee;
}

.backlist{
    height: 30px;
    line-height: 30px;
    display: flex;
}


.backlist img{
    width: 50px;
    height: 100%;
    padding: 6px 20px 5px  6px ;
    box-sizing: border-box;
}
.backlist span{
    font-size: 12px;
}
</style>
