<script>
import SideMenu from  './SideMenu.vue'
import Header from  './Header.vue'
import Stepbar from  './Stepbar.vue'
import axios from "axios";

export default {

name: 'Frameworks',

 props: [],
 components: {
    SideMenu,
    Header,
    Stepbar,
 
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
      show_controls:false,
      frameworkSearchKey : '',
      library_created: false,
      show_redirect : false,
      load_spinner: false,
      show_search_bar: true,
      current_step:['step-wizard-item current-item','step-wizard-item','step-wizard-item'],
      scope_to_submit:{req_owner:"Sed",controls:[],company_id:"SSNIT_GHANA"}

    }

}, 

methods: {

  get_frameworks() {
      
      //this.loading = true;
      var config = {
          method: 'GET',
          url: this.api_url+'/api/v1/frameworks',
           headers: { 
         
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
   
    
    this.show_framework = false;
    this.load_spinner = true;

    this.current_step[0] = 'step-wizard-item';
    this.current_step[1] = 'step-wizard-item current-item';
    this.current_step[2] = 'step-wizard-item';
    let frames = [];
   
    for (let i = 0; i < this.selected_frameworks.length; i++) {
  
      frames.push(this.selected_frameworks[i].replace(/(\\r)|(\\n)/g,"\n"))
     
    }

    console.log(this.selected_frameworks);
    console.log(frames);
   
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

          
          this.CheckAllControlsByDefault();
          this.load_spinner = false;
          this.show_search_bar = false;
          this.show_domains = true;
         
       
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
    this.show_search_bar = true;

    this.get_frameworks();
    this.current_step[0] = 'step-wizard-item  current-item';
    this.current_step[1] = 'step-wizard-item';
    this.current_step[2] = 'step-wizard-item';

  },

  proceed_to_scope(){
     this.show_framework = false;
     this.show_domains = false;
     this.show_controls = true;

    this.current_step[0] = 'step-wizard-item' ;
    this.current_step[1] = 'step-wizard-item';
    this.current_step[2] = 'step-wizard-item current-item';

  },


//   confirm_scope(){

//     this.scope_to_submit.controls = [];
//     for (let i = 0; i < this.checkedControls.length; i++) {
       
//         this.scope_to_submit.controls.push(this.checkedControls[i].Uuid );
        
//     }

//     console.log(this.scope_to_submit.controls);

//         var data = JSON.stringify({
//     "req_owner": "the owner",
//     "controls": [
//         "85257ab3-b5c4-47da-a071-82c202b55e38",
//         "82213f6c-3421-4925-9000-cec4484c779d",
//         "1a201bcc-3aa6-4e41-a4d5-cca7adc8e797",
//         "590a58ad-b8dd-42e0-bbe6-e86f448198d9"
//     ],
//     "company_id": "SSNIT_GHANA"
// });
//         var config = {
//             method: 'POST',
//             url: this.api_url+'/api/v1/ConfirmScope',
//             headers: { 
       
//         },
//         data : data
//             };
//         axios(config).then(result => {
            
//             console.log(result); 
               
//         }, error => {  
//             console.log(error);  
//         });

//   },

confirm_scope(){

        this.scope_to_submit.controls = [];
        for (let i = 0; i < this.checkedControls.length; i++) {
            this.scope_to_submit.controls.push(this.checkedControls[i].Uuid );
        }
        var data = JSON.stringify(this.scope_to_submit);

        var config = {
        method: 'post',
        url: this.api_url+'/api/v1/ConfirmScope',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(response.data);
        

        //window.location.href = "/library";
        })
        .catch(function (error) {
        console.log(error);
        });

     
        this.current_step[0] = 'step-wizard-item';
        this.current_step[1] = 'step-wizard-item';
        this.current_step[2] = 'step-wizard-item';
        this.library_created = true;
        this.show_redirect = true;
        this.show_controls = false;

},

  back_to_refine_controls(){
       this.show_framework = false;
       this.show_domains = true;
       this.show_controls = false;
       this.current_step[0] = 'step-wizard-item';
       this.current_step[1] = 'step-wizard-item  current-item';
       this.current_step[2] = 'step-wizard-item';
  
  },

  buttonStatus(index){

        console.log(this.selected_frameworks);

        if(this.add_buttons[index]==="Add to list"){
        this.add_buttons[index]="Added"
        this.buttons_style[index]="btn btn-primary";
        this.selected_frameworks.push(this.frameworks[index].reference)
        }else{
        this.add_buttons[index]="Add to list";
        this.buttons_style[index]="btn btn-outline-primary";
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
  },

  checkAllLinkedControls(checkedDomains,domain){

      console.log("========== printing checkedDomain ==========");
      console.log(checkedDomains);
      console.log("========== printing domain ==========");
      console.log(domain);
      var found = false;
      for (let i = 0; i < checkedDomains.length; i++) {

        //added domain has been found in the domains array
        if (checkedDomains[i] === domain) {

            found = true;
        }
    }

    if(found === true){
            for (let j = 0; j < this.domains.length; j++){
                
                if(this.domains[j].SCFIdentifier===domain){
                    
                        for (let k = 0; k < this.domains[j].Controls.length; k++){
                            this.removeSelectedControl(this.domains[j].Controls[k]);
                            this.checkedControls.push(this.domains[j].Controls[k]);
                               
                        }
                }
            } 

     
    }else{
        for (let j = 0; j < this.domains.length; j++){
                
                if(this.domains[j].SCFIdentifier===domain){
                    
                        for (let k = 0; k < this.domains[j].Controls.length; k++){
                            this.removeSelectedControl(this.domains[j].Controls[k]);
                        }
                }
            } 
    }

  

  },


  CheckAllControlsByDefault(){

    this.checkedDomains=[]; this.checkedControls=[]; 

    for (let i = 0; i < this.domains.length; i++){
                
                        this.checkedDomains.push(this.domains[i].SCFIdentifier);
                        for (let j = 0; j < this.domains[i].Controls.length; j++){
                         
                            this.checkedControls.push(this.domains[i].Controls[j]);
                            
                        }
                
    } 
        
  },


  removeSelectedControl(control){

        for (let i = 0; i < this.checkedControls.length; i++) {

            if (this.checkedControls[i].Uuid === control.Uuid) {
               
                 this.checkedControls.splice(i, 1);
          
            }
        }
  },


  searchFramework(){

    console.log("===================printing frameworkSearchKey value======================");
    console.log(this.frameworkSearchKey);
    //console.log(str.toLowerCase().includes(substr));
  },


  go_to_library(){

    this.$router.push('ControlLibrary')
  },




  concatStrings(concat_arr){

    let final_string = '';
    for(let i=0;i<concat_arr.length;i++){
       final_string = final_string +' ' +concat_arr[i] +' | ';
    }
    return final_string;
  }




},

created(){
  this.library_created = false;
  this.show_redirect = false;
  this.get_frameworks()
},
mounted(){

}

}


</script>

<template>
  
  <div class="d-flex w-100">
    <SideMenu></SideMenu>  
            <main class="main">
                <Header></Header>  
                <div class="content-container">
                    <div class="content">
                      
                        <!-- <section class="card feature-card text-center">
                            <div class="card-body mx-auto p-0">
                                <h2>Get started by scoping your controls from our library of 1000+ pre-mapped controls across 150+ frameworks or regulations.</h2>
                                <p>Select from the complete framework of frameworks and establish your master control library. Select the regulations you would like to comply with and make them operational for your organization.</p>
                                <p>{{ checkedControls }}</p>
                              
                                <div class="btn-wrap">
                                    <a href="#" class="btn btn-primary">Import All</a>
                                </div>
                            </div>
                        </section> -->
                        
                        <Stepbar :current_step="current_step"></Stepbar>  

                        <div v-if="library_created"  class="alert alert-success" role="alert">
                              Controls successfully added to your library!
                        </div>

                        <section  v-if="show_search_bar" class="section-title d-sm-flex justify-content-between align-items-center">
                            <h2 class="fw-semibold mb-2 mb-sm-0">Choose Frameworks</h2>
                            <div v-if="load_spinner" class="spinner-border" role="status">
                                 <span class="sr-only"></span>
                            </div>
                            <form class="search-bar card p-2 p-lg-3 flex-row flex-nowrap align-items-center">
                                <button type="submit" class="btn p-0 btn-search">
                                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
                                        <path stroke="#8B94A5" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.333" d="M8.25 14.25a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM15.75 15.75l-3.262-3.262" />
                                    </svg>
                                </button>
                                <input type="text" class="form-control border-0" id="search" placeholder="Search for Frameworks" @change="searchFramework()" v-model="frameworkSearchKey">
                            </form>
                        </section>
                       
                        <section  v-if="show_framework" class="frameworks-widget d-grid gap-4">
                           
                            <div class="card framework-widget-item" v-for="(framework, index) in frameworks" :key="framework.id">
                                <div class="card-heading d-flex align-items-center">
                                    <figure class="rounded-circle">
                                        <img :src=framework.version alt="image">
                                    </figure>
                                    <div class="card-text">
                                        <h4>{{framework.name}}</h4>
                                        <span></span>
                                    </div>
                                </div>
                                <div class="card-body px-0 d-flex flex-wrap flex-sm-nowrap">
                                    <div class="card w-100">
                                        <h4 class="text-danger">{{framework.Number_of_controls}}</h4>
                                        <span>Controls</span>
                                    </div>
                                    <div class="card w-100">
                                        <h4 class="text-green">{{framework.Number_of_domains}}</h4>
                                        <span>groups</span>
                                    </div>
                                </div>
                                <div class="card-footer-section d-flex align-items-center justify-content-between">
                                    <button  @click="buttonStatus(index)" :class=buttons_style[index]>{{add_buttons[index]}}</button>
                                    <div class="action-buttons d-flex align-items-center justify-content-center">
                                        <button class="btn btn-outline-secondary rounded-circle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
                                                <path stroke="#74767C" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.303 14.302a7.505 7.505 0 0 1-8.463 1.504c-.41-.166-.746-.299-1.066-.299-.89.005-1.998.868-2.574.293-.576-.576.288-1.684.288-2.58 0-.32-.128-.65-.293-1.06a7.503 7.503 0 0 1 12.109-8.465 7.502 7.502 0 0 1 0 10.607Z" clip-rule="evenodd" />
                                                <path stroke="#74767C" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.954 9.31h.007M8.948 9.31h.007M5.941 9.31h.007" />
                                            </svg>
                                        </button>
                                        <button class="btn btn-outline-secondary rounded-circle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                                <path stroke="#74767C" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1.154 7.699c-.805-2.513.136-5.385 2.773-6.234A4.505 4.505 0 0 1 8 2.149c1.091-.844 2.679-1.129 4.065-.684 2.638.85 3.584 3.721 2.78 6.234C13.593 11.68 8 14.749 8 14.749s-5.552-3.021-6.846-7.05Z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                        <button class="btn btn-outline-secondary rounded-circle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="none">
                                                <path stroke="#74767C" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 13.386c4.23 0 6.186-.543 6.375-2.72 0-2.177-1.364-2.037-1.364-4.707C13.01 3.873 11.034 1.5 8 1.5S2.99 3.873 2.99 5.959c0 2.67-1.365 2.53-1.365 4.706.19 2.186 2.146 2.72 6.375 2.72Z" clip-rule="evenodd" />
                                                <path stroke="#74767C" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.792 15.643c-1.024 1.136-2.62 1.15-3.652 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                         
                        </section>

                        <section  v-if="show_framework" class="d-flex flex-wrap flex-sm-nowrap align-items-center">
                            <div class="framework-selected">{{selected_frameworks.length}} Frameworks Selected</div>
                            <a  @click="get_domains_with_controls()" class="btn btn-primary d-flex align-items-center ms-sm-auto mt-2 mt-sm-0">
                                Proceed to Refine Controls
                                <svg class="arrow-right ms-1" xmlns="http://www.w3.org/2000/svg" width="10" height="12" fill="none">
                                    <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1.5 11 4.293-4.293c.333-.333.5-.5.5-.707 0-.207-.167-.374-.5-.707L1.5 1" />
                                </svg>
                            </a>
                        </section>

                        <section v-if="show_domains" class="accordion-section d-grid">
                            <div class="accordion" id="refineControlsAccordion">
                                <div class="accordion-item card p-0 overflow-hidden" v-for="(domain, index) in domains" :key="index">
                                    <h2 class="accordion-header ps-3 d-flex align-items-center" :id="'heading_'+index">
                                        <div class="check-wrap position-relative">
                                            <input checked class="form-check-input" type="checkbox" :name="domain.SCFIdentifier" :id="domain.SCFIdentifier" :value="domain.SCFIdentifier" v-model="checkedDomains" @change='checkAllLinkedControls(checkedDomains,domain.SCFIdentifier)'>
                                            <label :for="domain.SCFIdentifier" class="check-box d-flex justify-content-center align-items-center"></label>
                                        </div>

                                        <button class="accordion-button bg-transparent shadow-none rounded-0 ps-0" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse_'+index" aria-expanded="true" :aria-controls="'collapse_'+index">
                                            {{domain.SCFDomain}} ({{ domain.Controls.length }})
                                        </button>
                                    </h2>
                                    <div :id="'collapse_'+index" class="accordion-collapse collapse show" :aria-labelledby="'heading_'+index" data-bs-parent="#refineControlsAccordion">
                                        <div class="accordion-body">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex" v-for="(control, indexo) in domain.Controls" :key="indexo">
                                                    <div class="check-wrap position-relative">
                                                        <input class="form-check-input" type="checkbox" :name="control.Scf_ref" :id="control.Scf_ref" :value="control" v-model="checkedControls">
                                                        <label :for="control.Scf_ref" class="check-box d-flex justify-content-center align-items-center"></label>
                                                    </div>
                                                    <div>
                                                        <span class="me-4">{{ control.Scf_ref}}</span>
                                                        <span>{{ control.Scf_control }}</span>
                                                        <p> {{concatStrings(control.Control_details)}}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>         
                            </div>
                        </section>

                        <section v-if="show_domains" class="d-flex flex-wrap flex-sm-nowrap align-items-center">
                            <div class="framework-selected">{{selected_frameworks.length}}  Frameworks Selected</div>
                            <a @click="back_to_frameworks()" class="btn btn-outline-primary bg-white ms-sm-auto mt-2 mt-sm-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" fill="none">
                                    <path stroke="#3060F1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.5 1 2.207 5.293c-.333.333-.5.5-.5.707 0 .207.167.374.5.707L6.5 11" />
                                </svg>
                                Back to Frameworks
                            </a>

                            <a @click="proceed_to_scope()" class="btn btn-primary d-flex align-items-center ms-sm-3 mt-2 mt-sm-0">
                                Proceed to scope overview
                                <svg class="arrow-right ms-1" xmlns="http://www.w3.org/2000/svg" width="10" height="12" fill="none">
                                    <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1.5 11 4.293-4.293c.333-.333.5-.5.5-.707 0-.207-.167-.374-.5-.707L1.5 1" />
                                </svg>
                            </a>
                        </section>

                        <section class="table-area card p-0" v-if="show_controls">
                            <table class="table table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">CONTROL CODE</th>
                                        <th scope="col">CONTROLS</th>
                                        <th scope="col">FRAMEWORKS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(control, indexo) in checkedControls" :key="indexo">
                                        <td>{{ control.Scf_ref }}</td>
                                        <td>{{ control.Scf_control }}</td>
                                        <td>{{concatStrings(control.Control_details)}}</td>
                                    </tr>
                                  
                                </tbody>
                            </table>
                        </section>
                        <section class="d-flex flex-wrap flex-sm-nowrap align-items-center" v-if="show_controls">
                            <div class="framework-selected">{{selected_frameworks.length}} Frameworks Selected</div>
                            <a  @click="back_to_refine_controls()" class="btn btn-outline-primary bg-white ms-sm-auto mt-2 mt-sm-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" fill="none">
                                    <path stroke="#3060F1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.5 1 2.207 5.293c-.333.333-.5.5-.5.707 0 .207.167.374.5.707L6.5 11" />
                                </svg>
                                Back to Refine Controls
                            </a>

                            <button data-bs-toggle="modal" data-bs-target="#confirmModal" class="btn btn-primary d-flex align-items-center ms-sm-3 mt-2 mt-sm-0">
                                Confirm Scope
                                <svg class="arrow-right ms-1" xmlns="http://www.w3.org/2000/svg" width="10" height="12" fill="none">
                                    <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1.5 11 4.293-4.293c.333-.333.5-.5.5-.707 0-.207-.167-.374-.5-.707L1.5 1" />
                                </svg>
                            </button>
                    
                        </section>

                        <section class="d-flex flex-wrap flex-sm-nowrap align-items-center" v-if="show_redirect">
                           
                            <!-- <a  @click="back_to_refine_controls()" class="btn btn-outline-primary bg-white ms-sm-auto mt-2 mt-sm-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" fill="none">
                                    <path stroke="#3060F1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.5 1 2.207 5.293c-.333.333-.5.5-.5.707 0 .207.167.374.5.707L6.5 11" />
                                </svg>
                                Back to Refine Controls
                            </a> -->

                            <button @click="go_to_library()" class="btn btn-primary d-flex align-items-center ms-sm-3 mt-2 mt-sm-0">
                                Go to your control Library
                                <svg class="arrow-right ms-1" xmlns="http://www.w3.org/2000/svg" width="10" height="12" fill="none">
                                    <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1.5 11 4.293-4.293c.333-.333.5-.5.5-.707 0-.207-.167-.374-.5-.707L1.5 1" />
                                </svg>
                            </button>
                    
                        </section>


                        <!-- Modal -->
                        <div class="modal fade" id="confirmModal" aria-labelledby="confirmModal" aria-hidden="true" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="card confirm-scope-card">
                                    <div class="d-flex align-items-start mb-2">
                                        <h2 class="modal-title">Confirm Scope</h2>
                                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body px-0">
                                        <h6>Are you sure you want to confirm Control Scope?</h6>
                                        <h6>You can redefine later at any point in the future.</h6>
                                    </div>
                                    <footer class="modal-btn-wrapper d-flex justify-content-end">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="confirm_scope()">Confirm Scope</button>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                        <!-- Modal -->
                     
                    </div>
                </div>
            </main>
        </div>

</template>

<style scoped>

</style>
