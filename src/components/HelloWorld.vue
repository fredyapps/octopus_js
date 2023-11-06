<script>
import HeaderMenu from  './SideMenu.vue'
import Footer from  './Header.vue'
import axios from "axios";
export default {

name: 'HelloWord',

 props: [],
 components: {
    'header-menu': HeaderMenu,
    'footer-portion': Footer
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
  
  <header-menu></header-menu>  
    <!-- header-bg -->

    <div class="wrapper">
        <div class="container-fluid">
            <!-- Page-Title -->
            <div class="page-title-box">
                <div class="row align-items-center">
                    <div class="col-sm-6">
                        
                    </div>
                    <div class="col-sm-6">
                     
                    </div>
                </div>
                <!-- end row -->
            </div>

            
      <div v-if="show_framework">
            <div class="row" >
                <div class="col-md-6 col-xl-3" v-for="(framework, index) in frameworks" :key="framework.id">
                   <!-- Simple card -->
               
                    <div class="card m-b-30"  >
                      <div class="three-dots">...</div>
                      <div class="header-container">
                        <img
                          :src=framework.version
                          alt="default-image"
                          class="company-image"
                        />
                        <div class="header-text">
                          <h2 class="header-text-main">{{framework.name}}</h2>
                          <p class="header-text-secondary">Card Processing</p>
                        </div>
                      </div>
              
                      <div class="access">
                        <div class="access-card">
                          <h2 class="number red">{{framework.Number_of_controls}}</h2>
                          <p>Controls</p>
                        </div>
                        <div class="access-card">
                          <h2 class="number green">--</h2>
                          <p>Groups</p>
                        </div>
                      </div>
              
                      <div class="bottom-content">
                        <button @click="buttonStatus(index)" :class=buttons_style[index]>
                          <div>{{add_buttons[index]}}</div>
                        </button>
              
                        <div class="bottom-image-container">
                          <div>
                            <!-- <img src="your-image-source" alt="message" /> -->
                            <!-- @click="check_credentials_data()" :disabled="isActive" -->
                          </div>
                        </div>
                      </div>
                    </div>

                </div><!-- end col -->
  
            </div>
            <div class="row"> 

                <div class="col-md-3">
                <button type="button" class="btn btn-secondary btn-lg waves-effect waves-light">{{selected_frameworks.length}} selected</button>

                </div>
                <div class="col-md-6"></div>
                <div class="col-md-3">
                <button @click="get_domains_with_controls()" type="button" class="btn btn-primary waves-effect waves-light">Proceed to Refine Controls</button>

                </div>
                    
            </div>
      </div>
          
      <div  v-if="show_domains">
            <div id="accordion" class="row">
             
                <!-- <h4 class="header-title">Selected controls classified by domain</h4> -->

             
                                    <div class="card accordcard col-md-12" v-for="(domain, index) in domains" :key="index">
                                        <div class="" :id="'heading'+index">
                                            <h5 class="mb-0 mt-0 font-14">
                                              <!-- <input type="checkbox"  :value="domain.SCFIdentifier" v-model="checkedDomains"/> &nbsp; -->
                                                <a data-toggle="collapse" data-parent="#accordion" :href="'#'+domain.SCFIdentifier" aria-expanded="false" :aria-controls=domain.SCFIdentifier class="text-dark collapsed">
                                                  
                                                   {{domain.SCFDomain}}    {{domain.SCFIdentifier}}
                                                </a>
                                                
                                            </h5>
                                        </div>

                                        <div :id=domain.SCFIdentifier class="collapse" :aria-labelledby="'heading'+index" data-parent="#accordion" style="">
                                            <div class="card-body">
                                                <div class="table-responsive">
                                                    <table class="table table-hover mb-0">
                                                      
                                                        <tbody>
                                                        <tr v-for="(control, indexo) in domain.Controls" :key="indexo">
                                                            <th scope="row">
                                                              <input type="checkbox"  :value="control" v-model="checkedControls"/>
                                                            </th>
                                                            <td>{{ control.Scf_control }}</td>
                                                            <td>{{ control.Scf_ref}}</td>
                                                            <td>{{ control.Scf_domain }}</td>
                                                        </tr>
                                                    
                                                    
                                                        </tbody>
                                                    </table>
                                                </div>
                                        
                                            </div>
                                        </div>
                                        &nbsp;
                                    </div> 
                                    <!-- &nbsp; -->
 
            </div> <!-- end row -->  
            <div class="row">
                    <button @click="back_to_frameworks()" type="button" class="btn btn-secondary btn-lg waves-effect waves-light"> Back to framework</button>
                    <button  @click="proceed_to_scope()" type="button" class="btn btn-primary waves-effect waves-light">Proceed to scope overview</button>

              
            </div>
      </div>

            <div class="row" v-if="show_controls">
              <div class="col-12">
                  <div class="card m-b-30">
                        <div class="card-body">

                            <h4 class="mt-0 header-title">Review your Selected Controls </h4>
                            <p class="sub-title../plugins">

                            </p>

                            <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Control</th>
                                    <th>Domain</th>
                               
                                </tr>
                                </thead>


                                <tbody>
                                <tr v-for="(control, indexo) in checkedControls" :key="indexo">
                                    <td>{{ control.Scf_ref }}</td>
                                    <td>{{ control.Scf_control }}</td>
                                    <td>{{ control.Scf_domain }}</td>
                                 
                                </tr>
                             
                                </tbody>
                            </table>

                        </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 col-xl-3" >
                        <div class="m-b-30">

                            <button @click="back_to_frameworks()" type="button" class="btn btn-secondary btn-lg waves-effect waves-light"> Back to framework</button>
                        </div>
                    </div>
                    <div class="col-md-6 col-xl-3" >
                        
                            <div class="m-b-30">
                                <button  type="button" data-toggle="modal" data-target=".bs-example-modal-center" class="btn btn-primary waves-effect waves-light">Confirm scope</button>
                            </div> 
                    </div> 
                  </div>

                </div> <!-- end col -->

            </div>

        </div>
        <!-- end container-fluid -->
        
    </div>
    <!-- end wrapper -->

    <div class="col-sm-6 col-md-3 m-t-30">
                                  

                                    <div class="modal fade bs-example-modal-center" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title mt-0">Confirm Scope</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Are you sure you want to confirm Control scope ?</p>
                                                    <p>You can redefine scope later at any point, but any changes made will affect
                                                      report results as well as assessment questions, if you decide to
                                                    </p>
                                                    <p>Proceed to Gap Assessment</p>
                                                    <div class="row">
                                                      <div class="col-md-6"></div>
                                                      <div class="col-md-6">
                                                          <button type="button" data-dismiss="modal" class="btn btn-outline-danger waves-effect waves-light">Cancel</button>&nbsp;
                                                          
                                                          <button type="button" class="btn btn-primary waves-effect waves-light">Confirm Scope</button>
                                                   
                                                      </div>
                                                   
                                                    </div>
                                                </div>
                                              
                                              </div><!-- /.modal-content -->
                                        </div><!-- /.modal-dialog -->
                                    </div><!-- /.modal -->
                                </div>

    <footer-portion></footer-portion> 
  


</template>

<style scoped>

</style>
