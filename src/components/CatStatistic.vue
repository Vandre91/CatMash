<template>
  <div class="container">
    <br>
    <h3 class="h3">The cutest cat</h3>
    <div class="row">
        <div class="col-md-3 col-sm-6" v-for="i in this.data">
            <div class="product-grid">
                <div class="product-image">
                    <a href="#">
                        <img class="pic" v-bind:src="i.url">
                    </a>
                </div>
                <div class="product-content">
                    <h3 class="title"><a>Vote: {{i.vote}}</a></h3>
                </div>
            </div>
        </div>
    </div>
    <br>
    <router-link to="/"><h1>Return to the vote</h1></router-link>
  </div>
</template>

<script>
/* eslint-disable */
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
  h3.h3{text-align:center;margin:1em;text-transform:capitalize;font-size:1.7em;}
  .product-grid,.product-grid .product-image{overflow:hidden}
  .product-grid{font-family:'Open Sans',sans-serif;text-align:center;position:relative;transition:all .5s ease 0s}
  .product-grid .product-image a img {width:200px;height:200px;}
  .product-grid .product-image a{display:block}
  .product-grid .product-image img{width:100%;height:auto;transition:all .5s ease 0s}
  .product-grid:hover .product-image img{transform:scale(1.1)}
  .product-grid .product-content{padding:12px 12px 15px;transition:all .5s ease 0s}
  .product-grid .title{font-size:20px;font-weight:600;text-transform:capitalize;margin:0 0 10px;transition:all .3s ease 0s}
  .product-grid .title a{color:#000}
  .product-grid .title a:hover{color:#2e86de}
  .product-grid .price{font-size:18px;font-weight:600;color:#2e86de}
  .product-grid .price span{color:#999;font-size:15px;font-weight:400;text-decoration:line-through;margin-left:7px;display:inline-block}
  .product-grid .social{background-color:#fff;width:100%;padding:0;margin:0;list-style:none;opacity:0;transform:translateX(-50%);position:absolute;bottom:-50%;left:50%;z-index:1;transition:all .5s ease 0s}
  .product-grid .social li{display:inline-block}
  .product-grid .social li a{color:#909090;font-size:16px;line-height:45px;text-align:center;height:45px;width:45px;margin:0 7px;border:1px solid #909090;border-radius:50px;display:block;position:relative;transition:all .3s ease-in-out}
  .product-grid .social li a:hover{color:#fff;background-color:#2e86de;width:80px}
  .product-grid .social li a:after,.product-grid .social li a:before{content:attr(data-tip);color:#fff;background-color:#2e86de;font-size:12px;letter-spacing:1px;line-height:20px;padding:1px 5px;border-radius:5px;white-space:nowrap;opacity:0;transform:translateX(-50%);position:absolute;left:50%;top:-30px}
  .product-grid .social li a:after{content:'';height:15px;width:15px;border-radius:0;transform:translateX(-50%) rotate(45deg);top:-20px;z-index:-1}
  .product-grid .social li a:hover:after,.product-grid .social li a:hover:before{opacity:1}
  @media only screen and (max-width:990px){.product-grid{margin-bottom:30px}
  }
</style>
