<script>
import SideMenu from  './SideMenu.vue'
import Header from  './Header.vue'
import axios from "axios";
export default {

name: 'Dashboard',

 props: [],
 components: {
    SideMenu,
    Header
  },
data () {

    return{
   
      frameworks:[],
      add_button:"Add to list",
      add_buttons:[],
      buttons_style:[],
      selected_frameworks:[],
      checked:[],
      requestdata:"",
      domains:[],
      checkedControls : [],
      checkedDomains:[],
      show_framework:true,
      show_domains:false,
      show_controls:false

    }

}, 

methods: {

  get_frameworks() {
      
      //this.loading = true;

      var config = {
          method: 'GET',
          url: this.api_url+'/api/v1/frameworks',
           headers: { 
         // 'user_token': localStorage.getItem('token'),
        },
          };
          
      axios(config).then(result => {
          
          console.log(result); 
          this.frameworks = result.data;
          for(let i=0;i<this.frameworks.length;i++){
            this.add_buttons[i] = "Add to list";
            this.buttons_style[i] ="btn btn-outline-primary waves-effect waves-light";
          }
      
      }, error => {
         
          console.log(error);
         
      });
  
  
  },


  get_domains_with_controls(){

    // let stringed_array = JSON.stringify(this.selected_frameworks);
    this.show_framework = false;
    this.show_domains = true;
    let frames = [];
   
    for (let i = 0; i < this.selected_frameworks.length; i++) {
      //text += this.selected_frameworks[i] + "<br>";
      console.log(this.selected_frameworks[i]);
      console.log(this.selected_frameworks[i].replace(/(\\r)|(\\n)/g,"\n"));
      frames.push(this.selected_frameworks[i].replace(/(\\r)|(\\n)/g,"\n"))
     
    }

    console.log(this.selected_frameworks);
    console.log(frames);
      //theString.replace(/^\/|\/$/g, '');
    // let final_array = stringed_array.replace("[", "(");
    // final_array = final_array.replace("]", ")");
    // this.requestdata = final_array.replaceAll('"', '\'');

    // console.log(this.requestdata);
    
   
    //frameworks
    var config = {
          method: 'post',
          url: this.api_url+'/api/v1/GetDomainsFromFrameworks',
          headers: { 
                'Content-Type': 'application/json',
            },
          data : {"frameworks":frames}
          
          };
  
          console.log(this.requestdata);
          
      axios(config).then(result => {
          
          console.log(result); 
          this.domains=result.data;
       
      }, error => {
         
          console.log(error);
         
      });
  },

  select_framework(){
  },

  back_to_frameworks(){
    this.show_domains = false;
    this.show_framework = true;
    this.show_controls = false;

  },

  proceed_to_scope(){
     this.show_framework = false;
     this.show_domains = false;
     this.show_controls = true;



  },

  buttonStatus(index){

    console.log(this.selected_frameworks);

    if(this.add_buttons[index]==="Add to list"){
      this.add_buttons[index]="Added"
      this.buttons_style[index]="btn btn-primary waves-effect waves-light";
      this.selected_frameworks.push(this.frameworks[index].reference)
    }else{
      this.add_buttons[index]="Add to list";
      this.buttons_style[index]="btn btn-outline-primary waves-effect waves-light";
      this.remove_from_array(this.selected_frameworks,this.frameworks[index].reference);
    }

  },

  remove_from_array(arr,value){

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            let spliced = arr.splice(i, 1);
            console.log("Removed element: " + spliced);
          
        }
    }
  }




},

created(){

  this.get_frameworks()
},
mounted(){

}

}


</script>

<template>
  
  <div class="d-flex w-100">
            <aside id="sidebar" class="sidebar collapse d-lg-block">
                <div class="main-logo">
                    <a href="index.html"> <img src="./../assets/images/main-logo.png" alt="Octopus logo"></a>
                </div>
                <nav class="sidebar-nav">
                    <ul>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" fill="none">
                                        <path fill="#fff" d="M13.386 5.725 7.761.418A1.125 1.125 0 0 0 6.24.41l-.007.008L.614 5.725a1.125 1.125 0 0 0-.364.829v6.5a1.125 1.125 0 0 0 1.125 1.125H4.75a1.125 1.125 0 0 0 1.125-1.125V9.679h2.25v3.375a1.125 1.125 0 0 0 1.125 1.125h3.375a1.125 1.125 0 0 0 1.125-1.125v-6.5a1.127 1.127 0 0 0-.364-.829Zm-.761 7.329H9.25V9.679a1.125 1.125 0 0 0-1.125-1.125h-2.25A1.125 1.125 0 0 0 4.75 9.679v3.375H1.375v-6.5l.008-.007L7 1.24l5.618 5.304.008.007-.001 6.502Z" />
                                    </svg>
                                </div>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="select-frameworks.html">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M4.5 7.812v-4.57a.563.563 0 0 0-1.124 0v4.57a2.25 2.25 0 0 0 0 4.36v3.444a.563.563 0 0 0 1.125 0v-3.445a2.25 2.25 0 0 0 0-4.36Zm-.562 3.304a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm5.625-6.68V3.242a.563.563 0 0 0-1.125 0v1.196a2.25 2.25 0 0 0 0 4.36v6.82a.563.563 0 0 0 1.125 0v-6.82a2.25 2.25 0 0 0 0-4.36Zm-.562 3.305a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm7.312 4.5a2.255 2.255 0 0 0-1.687-2.18v-6.82a.563.563 0 0 0-1.125 0v6.82a2.25 2.25 0 0 0 0 4.36v1.196a.563.563 0 0 0 1.125 0V14.42a2.255 2.255 0 0 0 1.687-2.18Zm-2.25 1.126a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Z" />
                                    </svg>
                                </div>
                                Control Scope
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="m15.023 6.218-3.938-3.937a.564.564 0 0 0-.398-.165h-6.75a1.125 1.125 0 0 0-1.124 1.125v12.376a1.125 1.125 0 0 0 1.124 1.124h10.126a1.125 1.125 0 0 0 1.124-1.124v-9a.56.56 0 0 0-.164-.399ZM11.25 4.037l2.017 2.017H11.25V4.037Zm2.813 11.58H3.937V3.24h6.188v3.375a.562.562 0 0 0 .563.563h3.374v8.438Zm-2.25-5.626a.563.563 0 0 1-.563.563h-4.5a.563.563 0 0 1 0-1.125h4.5a.562.562 0 0 1 .563.562Zm0 2.25a.563.563 0 0 1-.563.563h-4.5a.563.563 0 0 1 0-1.125h4.5a.562.562 0 0 1 .563.563Z" />
                                    </svg>
                                </div>
                                Assessments
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M16.313 12.242h-.563v-6.75a1.687 1.687 0 0 0-1.688-1.688H3.938A1.687 1.687 0 0 0 2.25 5.491v6.75h-.563a.562.562 0 0 0-.562.563v1.125a1.688 1.688 0 0 0 1.688 1.688h12.374a1.687 1.687 0 0 0 1.688-1.688v-1.125a.563.563 0 0 0-.563-.563ZM3.374 5.492a.562.562 0 0 1 .563-.563h10.124a.562.562 0 0 1 .563.562v6.75H3.375v-6.75Zm12.375 8.437a.563.563 0 0 1-.563.563H2.813a.563.563 0 0 1-.563-.563v-.563h13.5v.563Zm-5.063-7.313a.562.562 0 0 1-.562.563h-2.25a.563.563 0 0 1 0-1.125h2.25a.562.562 0 0 1 .563.562Z" />
                                    </svg>
                                </div>
                                Asset Inventory
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M11.813 11.117a.562.562 0 0 1-.563.562h-4.5a.563.563 0 0 1 0-1.125h4.5a.562.562 0 0 1 .563.563Zm-.563-2.813h-4.5a.563.563 0 1 0 0 1.125h4.5a.562.562 0 1 0 0-1.125Zm3.938-4.5v11.813a1.125 1.125 0 0 1-1.126 1.124H3.938a1.125 1.125 0 0 1-1.126-1.124V3.803a1.125 1.125 0 0 1 1.126-1.125h2.549a3.37 3.37 0 0 1 5.026 0h2.55a1.125 1.125 0 0 1 1.124 1.125ZM6.75 4.929h4.5a2.25 2.25 0 0 0-4.5 0Zm7.313-1.125h-1.881c.128.361.193.742.193 1.125v.562a.562.562 0 0 1-.563.563H6.189a.563.563 0 0 1-.563-.563V4.93c0-.383.065-.764.193-1.125h-1.88v11.813h10.124V3.803Z" />
                                    </svg>
                                </div>
                                Manager
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M16.313 15.054a.563.563 0 0 1-.563.563H2.25a.563.563 0 0 1-.563-.563V3.804a.562.562 0 1 1 1.125 0v7.642l3.54-3.54a.563.563 0 0 1 .796 0L9 9.759l3.705-3.705H11.25a.562.562 0 1 1 0-1.125h2.813a.562.562 0 0 1 .562.562v2.813a.562.562 0 0 1-1.125 0V6.849l-4.102 4.103a.562.562 0 0 1-.796 0L6.75 9.099l-3.938 3.938v1.454H15.75a.562.562 0 0 1 .563.563Z" />
                                    </svg>
                                </div>
                                Indicators
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M15.023 5.093 12.21 2.281a.564.564 0 0 0-.398-.165H6.189a1.125 1.125 0 0 0-1.125 1.125v1.125H3.938a1.125 1.125 0 0 0-1.126 1.125v10.126a1.125 1.125 0 0 0 1.126 1.124h7.874a1.125 1.125 0 0 0 1.126-1.124V14.49h1.124a1.125 1.125 0 0 0 1.126-1.124V5.49a.56.56 0 0 0-.165-.398Zm-3.21 10.523H3.936V5.491H9.33l2.482 2.483V15.617Zm2.25-2.25h-1.126V7.742a.56.56 0 0 0-.164-.398L9.96 4.531a.562.562 0 0 0-.398-.165H6.188V3.241h5.392l2.482 2.483v7.643Zm-3.938-2.25a.563.563 0 0 1-.563.563H6.188a.563.563 0 0 1 0-1.125h3.375a.562.562 0 0 1 .562.563Zm0 2.25a.563.563 0 0 1-.563.563H6.188a.563.563 0 0 1 0-1.125h3.375a.562.562 0 0 1 .562.563Z" />
                                    </svg>
                                </div>
                                Documents
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M7.031 8.615a.563.563 0 0 0 .282-.487V3.066a.563.563 0 0 0-.75-.528 7.317 7.317 0 0 0-4.754 8.227.563.563 0 0 0 .835.385L7.03 8.615Zm-.843-4.697v3.885L2.82 9.746c-.008-.106-.008-.213-.008-.317a6.196 6.196 0 0 1 3.375-5.511Zm9.164 1.891-.02-.038-.022-.035A7.316 7.316 0 0 0 9 2.116a.562.562 0 0 0-.562.563v6.457l-5.542 3.227a.562.562 0 0 0-.202.774 7.312 7.312 0 0 0 13.619-3.708 7.266 7.266 0 0 0-.96-3.62Zm-5.79-2.542a6.191 6.191 0 0 1 4.493 2.597L9.563 8.48V3.267ZM9 15.617a6.221 6.221 0 0 1-5.027-2.58L9.275 9.95l.015-.01 5.328-3.103A6.188 6.188 0 0 1 9 15.617Z" />
                                    </svg>
                                </div>
                                Reporting Center
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M17.227 8.208a1.125 1.125 0 0 0-.915-.467h-1.125V6.616a1.125 1.125 0 0 0-1.124-1.125H9.188L7.238 4.03a1.135 1.135 0 0 0-.675-.225h-3.75a1.125 1.125 0 0 0-1.126 1.125v10.125a.563.563 0 0 0 .563.563h12.593a.563.563 0 0 0 .534-.385l2.003-6.01a1.127 1.127 0 0 0-.153-1.014ZM6.563 4.93l1.95 1.462c.195.146.431.225.675.225h4.874v1.125H4.906a1.125 1.125 0 0 0-1.068.77l-1.026 3.077V4.929h3.751Zm7.875 9.563H3.03l1.876-5.626h11.407l-1.875 5.626Z" />
                                    </svg>
                                </div>
                                Knowledge Base
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M9.844 13.085a.844.844 0 1 1-1.688 0 .844.844 0 0 1 1.688 0ZM9 5.491c-1.551 0-2.813 1.136-2.813 2.532v.281a.562.562 0 0 0 1.125 0v-.281c0-.774.758-1.407 1.688-1.407.93 0 1.688.633 1.688 1.407 0 .773-.758 1.406-1.688 1.406a.562.562 0 0 0-.563.562v.563a.563.563 0 0 0 1.126 0v-.05c1.282-.236 2.25-1.26 2.25-2.481C11.813 6.627 10.55 5.49 9 5.49Zm7.313 3.938A7.313 7.313 0 1 1 9 2.116a7.32 7.32 0 0 1 7.313 7.313Zm-1.125 0A6.187 6.187 0 1 0 9 15.617a6.195 6.195 0 0 0 6.188-6.188Z" />
                                    </svg>
                                </div>
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M15.75 3.804H2.25a1.125 1.125 0 0 0-1.125 1.125v9a1.125 1.125 0 0 0 1.125 1.125h13.5a1.125 1.125 0 0 0 1.125-1.125v-9a1.125 1.125 0 0 0-1.125-1.125Zm0 1.125v1.687H2.25V4.93h13.5Zm0 9H2.25V7.741h13.5v6.188Zm-1.125-1.688a.563.563 0 0 1-.563.563h-2.25a.562.562 0 1 1 0-1.125h2.25a.562.562 0 0 1 .563.563Zm-4.5 0a.563.563 0 0 1-.563.563H8.438a.563.563 0 0 1 0-1.125h1.124a.562.562 0 0 1 .563.563Z" />
                                    </svg>
                                </div>
                                Subscription
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none" viewBox="0 0 18 19">
                                        <path fill="#fff" d="M16.875 15.054H15.75V7.179a1.125 1.125 0 0 0-1.125-1.125h-4.5V2.679a1.126 1.126 0 0 0-1.75-.937l-5.624 3.75a1.125 1.125 0 0 0-.501.937v8.625H1.125a.562.562 0 1 0 0 1.125h15.75a.562.562 0 1 0 0-1.125Zm-2.25-7.875v7.875h-4.5V7.179h4.5Zm-11.25-.75L9 2.68v12.375H3.375V6.429Zm4.5 1.875v1.125a.562.562 0 1 1-1.125 0V8.304a.562.562 0 1 1 1.125 0Zm-2.25 0v1.125a.562.562 0 1 1-1.125 0V8.304a.562.562 0 1 1 1.125 0Zm0 3.938v1.124a.563.563 0 0 1-1.125 0v-1.124a.563.563 0 1 1 1.125 0Zm2.25 0v1.124a.563.563 0 0 1-1.125 0v-1.124a.563.563 0 1 1 1.125 0Z" />
                                    </svg>
                                </div>
                                Organization
                            </a>
                        </li>
                        <li>
                            <a class="d-flex align-items-center" href="#">
                                <div class="nav-icon d-flex align-items-center justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none">
                                        <path fill="#fff" d="M8.998 6.054a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75Zm0 5.625a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm6.188-2.098a5.493 5.493 0 0 0 0-.304l1.049-1.31a.563.563 0 0 0 .104-.497 7.538 7.538 0 0 0-.765-1.846.562.562 0 0 0-.422-.276l-1.668-.186a5.505 5.505 0 0 0-.21-.21l-.198-1.673a.562.562 0 0 0-.277-.421 7.573 7.573 0 0 0-1.845-.765.563.563 0 0 0-.497.105L9.15 3.241h-.304l-1.31-1.046a.562.562 0 0 0-.497-.105 7.566 7.566 0 0 0-1.845.765.562.562 0 0 0-.277.422l-.185 1.67c-.073.07-.144.141-.211.212l-1.672.192a.562.562 0 0 0-.422.277 7.574 7.574 0 0 0-.764 1.846.562.562 0 0 0 .104.496l1.044 1.307v.304l-1.047 1.31a.562.562 0 0 0-.104.497 7.54 7.54 0 0 0 .765 1.846.563.563 0 0 0 .422.276l1.667.185c.07.074.14.144.211.211l.195 1.672a.562.562 0 0 0 .277.422c.579.335 1.2.593 1.846.765a.563.563 0 0 0 .496-.105l1.307-1.043c.102.002.203.002.304 0l1.31 1.049a.563.563 0 0 0 .497.104 7.541 7.541 0 0 0 1.846-.765.563.563 0 0 0 .276-.422l.186-1.668c.073-.07.143-.14.21-.211l1.673-.197a.562.562 0 0 0 .422-.277 7.57 7.57 0 0 0 .764-1.846.563.563 0 0 0-.105-.496L15.186 9.58Zm-1.132-.457c.012.203.012.407 0 .61a.562.562 0 0 0 .122.385l.998 1.247a6.43 6.43 0 0 1-.438 1.055l-1.59.18a.563.563 0 0 0-.358.185c-.135.153-.28.297-.432.432a.563.563 0 0 0-.185.359l-.177 1.587c-.338.177-.69.324-1.054.438l-1.248-.997a.562.562 0 0 0-.351-.123h-.034a5.178 5.178 0 0 1-.61 0 .562.562 0 0 0-.386.122l-1.25.998a6.438 6.438 0 0 1-1.055-.438l-.18-1.587a.562.562 0 0 0-.185-.358 5.208 5.208 0 0 1-.432-.432.562.562 0 0 0-.359-.186l-1.587-.177a6.422 6.422 0 0 1-.438-1.054l.997-1.248a.562.562 0 0 0 .123-.385 5.2 5.2 0 0 1 0-.61.562.562 0 0 0-.123-.386l-.997-1.25c.114-.363.26-.716.438-1.054l1.587-.18a.563.563 0 0 0 .358-.185c.136-.153.28-.297.432-.432a.562.562 0 0 0 .186-.36l.177-1.586a6.42 6.42 0 0 1 1.055-.438l1.247.997c.109.087.246.131.385.123.203-.012.407-.012.61 0a.563.563 0 0 0 .386-.123l1.25-.997c.363.114.716.26 1.054.438l.18 1.587a.563.563 0 0 0 .186.358c.152.135.296.28.431.432.093.104.22.17.359.185l1.588.177c.177.338.323.69.438 1.055l-.998 1.247a.562.562 0 0 0-.122.389h.002Z" />
                                    </svg>
                                </div>
                                Setting
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main class="main">
                <header class="header d-flex flex-nowrap bg-white navbar navbar-explan">
                    <button class="btn d-lg-none sidebar-toggle" id="sidebar-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="true" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="d-flex ms-auto action-btns">
                        <button class="btn btn-outline-secondary btn-notification rounded-circle d-flex align-items-center justify-content-center">
                            <div class="icon-box">
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="none">
                                    <path stroke="#74767C" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 12.02c3.877 0 5.67-.497 5.844-2.493 0-1.995-1.25-1.867-1.25-4.315C11.593 3.3 9.78 1.125 7 1.125c-2.781 0-4.593 2.175-4.593 4.087 0 2.448-1.25 2.32-1.25 4.315C1.33 11.53 3.123 12.02 7 12.02Z" clip-rule="evenodd" />
                                    <path stroke="#74767C" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.642 14.09c-.937 1.04-2.4 1.053-3.347 0" />
                                </svg>
                            </div>
                        </button>
                        <a href="#" class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center">
                            <div class="icon-box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none">
                                    <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4.583v12.834M4.583 11h12.834" />
                                </svg>
                            </div>
                        </a>
                        <button class="btn btn-primary border-0 p-0  rounded-circle">
                            <img src="./../assets/images/profile-image.png" alt="prifile-image">
                        </button>
                    </div>
                </header>
                <div class="content-container">
                    <div class="content">
                        <section class="card feature-card text-center">
                            <svg class="feature-vector mx-auto" xmlns="http://www.w3.org/2000/svg" width="169" height="113" fill="none">
                                <g clip-path="url(#a)">
                                    <path fill="#fff" stroke="#E1E4E5" stroke-width=".751" d="M125.931 29.444a13.525 13.525 0 0 0-8.94-12.727L95.793 9.086l.127-.354-.127.354a32.985 32.985 0 0 0-22.347 0L52.22 16.73a13.524 13.524 0 0 0-8.94 12.713v34.055c0 8.67 6.07 16.27 13.66 22.375C64.518 91.967 73.52 96.5 79.2 99.046h.001a13.136 13.136 0 0 0 10.811 0h.001c5.68-2.545 14.682-7.085 22.258-13.183 7.59-6.109 13.661-13.709 13.661-22.364V29.444Z" />
                                    <path fill="#3060F1" fill-rule="evenodd" d="M119.047 61.788V33.662a11.481 11.481 0 0 0-7.589-10.803l-17.507-6.303a27.552 27.552 0 0 0-18.667 0l-17.53 6.314a11.48 11.48 0 0 0-7.59 10.792v28.126c0 14.615 20.447 25.43 29.85 29.643a11.16 11.16 0 0 0 9.184 0c9.402-4.214 29.849-15.051 29.849-29.643Z" clip-rule="evenodd" />
                                    <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.821" d="M100.461 44.879 82.505 62.718 71.731 52.014" />
                                    <path fill="#3060F1" d="M33.505 57.768c-7.912 0-14.327-6.415-14.327-14.327s6.415-14.327 14.327-14.327 14.327 6.415 14.327 14.327-6.415 14.327-14.327 14.327Z" />
                                    <path fill="#fff" fill-rule="evenodd" d="M38.446 48.453v.705a.706.706 0 0 1-.706.706h-8.47a.706.706 0 0 1-.705-.706v-.716c0-2.133 2.44-3.519 4.94-3.519 2.5 0 4.94 1.387 4.94 3.52m-3.193-9.713a2.47 2.47 0 1 1-3.493 3.494 2.47 2.47 0 0 1 3.493-3.494Z" clip-rule="evenodd" />
                                    <path fill="url(#b)" d="M34.983 22.311c2.313 1.148 5.383-.328 5.383-.328s-.683-3.334-2.997-4.48c-2.313-1.147-5.381.326-5.381.326s.682 3.335 2.995 4.482Z" />
                                    <path fill="url(#c)" d="M110.277 102.261c-2.864 1.717-6.973.13-6.973.13s.538-4.369 3.403-6.083c2.864-1.716 6.97-.132 6.97-.132s-.537 4.369-3.4 6.085Z" />
                                    <path fill="#3060F1" d="M20.348 22.416a1.57 1.57 0 1 1 0 3.142 1.57 1.57 0 0 1 0-3.142ZM131.736 9.678a2.954 2.954 0 1 1 0 5.908 2.954 2.954 0 0 1 0-5.908ZM138.049 42.16a1.57 1.57 0 1 0 0-3.14 1.57 1.57 0 0 0 0 3.14Z" />
                                    <path fill="#E1E4E5" d="M50.133 96.757a2.219 2.219 0 1 0 0-4.438 2.219 2.219 0 0 0 0 4.438ZM21.567 69.758a2.79 2.79 0 1 0 0-5.578 2.79 2.79 0 0 0 0 5.578ZM131.56 50.89a2.215 2.215 0 1 0 4.278 1.149 2.215 2.215 0 0 0-4.278-1.148ZM32.148 73.504c1.252 0 2.267-.812 2.267-1.813 0-1.002-1.015-1.814-2.267-1.814s-2.267.812-2.267 1.814c0 1.001 1.015 1.813 2.267 1.813ZM27.276 86.32a3.618 3.618 0 1 0 7.237 0 3.618 3.618 0 0 0-7.237 0ZM138.012 22.88h-.032c-.192 2.709-2.207 2.75-2.207 2.75s2.222.044 2.222 3.175c0-3.131 2.223-3.174 2.223-3.174s-2.015-.042-2.206-2.752ZM44.855 6.76h-.032c-.183 2.702-2.118 2.743-2.118 2.743s2.134.043 2.134 3.165c0-3.122 2.133-3.165 2.133-3.165s-1.934-.042-2.117-2.743Z" />
                                    <path fill="#3060F1" d="M125.469 84.3h21.745v16.448h-21.745V84.301Z" />
                                    <path fill="#3060F1" fill-rule="evenodd" d="M136.397 84.751c-2.723 0-5.149.1-7.131.225-1.88.12-3.325 1.554-3.46 3.42a57.161 57.161 0 0 0-.163 4.036c0 1.309.067 2.708.163 4.036.135 1.866 1.58 3.3 3.46 3.42 4.749.3 9.512.3 14.261 0 1.88-.12 3.325-1.554 3.46-3.42.096-1.328.163-2.727.163-4.036 0-1.308-.067-2.708-.163-4.035-.135-1.867-1.58-3.301-3.46-3.42-2.374-.15-4.752-.226-7.13-.226Zm-7.326-2.84a6.732 6.732 0 0 0-6.33 6.264 60.413 60.413 0 0 0-.17 4.257c0 1.406.071 2.883.17 4.257a6.731 6.731 0 0 0 6.33 6.265c4.879.309 9.772.309 14.651 0a6.73 6.73 0 0 0 6.329-6.265c.1-1.374.171-2.851.171-4.257 0-1.405-.071-2.883-.171-4.257-.246-3.405-2.922-6.048-6.329-6.265a116.156 116.156 0 0 0-14.651 0Z" clip-rule="evenodd" />
                                    <path fill="#fff" fill-rule="evenodd" d="M137.933 93.558a3.072 3.072 0 1 0-3.073 0v1.946a1.54 1.54 0 0 0 .949 1.42 1.534 1.534 0 0 0 2.007-.832 1.54 1.54 0 0 0 .117-.588v-1.947Z" clip-rule="evenodd" />
                                    <path fill="#3060F1" fill-rule="evenodd" d="M128.716 77.07a7.681 7.681 0 0 1 15.361 0v6.145a1.536 1.536 0 1 1-3.072 0V77.07a4.608 4.608 0 1 0-9.217 0v6.145a1.537 1.537 0 0 1-3.072 0V77.07Z" clip-rule="evenodd" />
                                </g>
                                <defs>
                                    <linearGradient id="b" x1="43.865" x2="24.788" y1="25.89" y2="10.8" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#fff" />
                                        <stop offset="1" stop-color="#EEE" />
                                    </linearGradient>
                                    <linearGradient id="c" x1="99.195" x2="122.237" y1="107.786" y2="86.377" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#fff" />
                                        <stop offset="1" stop-color="#EEE" />
                                    </linearGradient>
                                    <clipPath id="a">
                                        <path fill="#fff" d="M0 0h169v112.667H0z" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div class="card-body mx-auto p-0">
                                <h2>Get started by scoping your controls from our library of 1000+ pre-mapped controls across 150+ frameworks or regulations.</h2>
                                <p>Select from the complete framework of frameworks and establish your master control library. Select the regulations you would like to comply with and make them operational for your organization.</p>
                                <div class="btn-wrap">
                                    <a href="#" class="btn btn-primary">Import</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>

</template>

<style scoped>

</style>
