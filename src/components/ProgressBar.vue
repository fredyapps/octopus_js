<script>
import HeaderMenu from  './HeaderMenu.vue'
import Footer from  './Footer.vue'
import axios from "axios";
export default {

name: 'ProgressBar',

 props: [],
 components: {
    'header-menu': HeaderMenu,
    'footer-portion': Footer
  },
data () {

    return{

  

    }

}, 

methods: {}

}

</script>



<template>
  
  <!-- <header-menu></header-menu>   -->
    <!-- header-bg -->

    <div class="root">
     <div class="container">
          <ul class="progressbar">
            <li class="active">Step 1</li>
            <li>Step 2</li>
            <li>Step 3</li>
            <li>Step 4</li>
 
          </ul>
      </div>
  </div>

    <!-- <footer-portion></footer-portion>  -->
  


</template>

<style scoped>
.container{
  width: 100%;
  position: absolute;
  z-index: 1;
}
.progressbar li{
  float: left;
  width: 20%;
  position: relative;
  text-align: center;
}

.progressbar li:before{
  content:counter(step);
  counter-increment: step;
  content:"1";
  width: 30px;
  height: 30px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 27px;
  background: white;
  color: #bebebe;
  text-align: center;
  font-weight: bold;
}

.progressbar{
  counter-reset: step;
}

.progressbar li:after{
  content: '';
  position: absolute;
  width:100%;
  height: 3px;
  background: #979797;
  top: 15px;
  left: -50%;
  z-index: -1;
}

.progressbar li.active + li:after{
 background: #3aac5d;
}
.progressbar li.active + li:before{
border-color: #3aac5d;
background: #3aac5d;
color: white
}


</style>