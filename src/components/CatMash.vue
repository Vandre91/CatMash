<template>
  <div class="vote">
    <br>
    <h1>Vote for the cutest cat</h1>
    <br>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-sm-4 "><a v-on:click="Vote(cat_left)"><img class="img-responsive" v-bind:src="this.cat_left.url" /></a></div>
        <div class="col-md-6 col-sm-4 "><a v-on:click="Vote(cat_right)"><img class="img-responsive" v-bind:src="this.cat_right.url" /></a></div>
      </div>
    </div>
    <br>
    <router-link to="/CatStatistic"><h2>See the Statistic</h2></router-link>
  </div>
</template>

<script>
/* eslint-disable */
import cats from '../assets/Cats.json'
import axios from 'axios'

export default {
  name: 'CatMash',
  data () {
    return {
      cat_left: {},
      cat_right: {}
    }
  },
  mounted(){
    this.GetCat();
  },
  methods:{
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
      let random_Nb1 = this.GetRandom();
      let random_Nb2 = this.GetRandom();

      while(random_Nb1 == random_nb2){
          random_Nb2 = this.GetRandom();
      }

      this.cat_left = json.images[random_Nb1];
      this.cat_right = json.images[random_Nb2];

    },
    GetRandom:  function(){
      return Math.floor(Math.random() * 100);
    }
      
  }
}
</script>
<style scoped>
img {
  width:500px;
  height:500px;
  filter: gray;
  -webkit-filter: grayscale(1); 
    -webkit-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.75);
    margin-bottom:20px;
}

img:hover {
  filter: none;
  -webkit-filter: grayscale(0); 
 
}
</style>
