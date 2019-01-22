<template>
  <div class="cat">
    <h1>Vote</h1>
    <h2>For the cutest</h2>
      <div class= "container">
        <button v-on:click="Vote(cat_left)"><img v-bind:src="this.cat_left.url"></button>
        <button v-on:click="Vote(cat_right)"><img v-bind:src="this.cat_right.url"></button>
      </div>
  </div>
</template>

<script>
import cats from '../assets/Cats.json'
import axios from "axios"

export default {
  name: 'CatMash',
  data () {
    return {
      cat_left: {},
      cat_right: {}
    }
  },
  mounted() {
      this.GetCat();
  },
  methods: {
    Vote: function(e){

      let data = e
      axios.post("/api/Vote", data)    
      .then((response) => {    
          console.log("Vote !")    
      })    
      .catch((errors) => {    
          console.log("Cannot Vote")    
      })
      this.GetCat();
    },
    GetCat:  function(){
      let json = cats
      let random_nb1 = this.GetRandom();
      let random_nb2 = this.GetRandom();

      while(random_nb1 == random_nb2){
          random_nb2 = this.GetRandom();
      }

      this.cat_left = json.images[random_nb1];
      this.cat_right = json.images[random_nb2];

    },
    GetRandom:  function(){
      return Math.floor(Math.random() * 100);
    }
      
  }
}
</script>
<style scoped>
</style>
