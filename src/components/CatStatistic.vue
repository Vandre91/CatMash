<template>
  <div class="cats">
    <h1>Cat Statistic</h1>
    <h2>The Most 10 cutest cat</h2>
    <ul v-for="i in this.data">
  <li>
    {{ i.vote }}
  </li>
</ul>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'CatStatistic',
  data () {
    return {
      data: ""
    }
  },
    mounted() {
        this.GetAllCats();
    },
    methods: {
      GetAllCats: function(){
        axios.get("/api/GetStatistic")    
        .then((response) => {        
            this.data = response.data;
        })    
        .catch((errors) => {    
            console.log(errors)    
        }) 
      }
    }
}
</script>

<style scoped>
</style>
