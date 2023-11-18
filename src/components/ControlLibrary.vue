<script>
import SideMenu from  './SideMenu.vue'
import Header from  './Header.vue'
import Stepbar from  './Stepbar.vue'
import axios from "axios";

export default {

name: 'ControlLibrary',

props: [],
 components: {
    SideMenu,
    Header,
    Stepbar,
 
  },

data () {

    return{
   
        controls:[],
      
    
    }
}, 

methods: {

    get_library() {
        var data = JSON.stringify({"company": "SSNIT_GHANA"});
        var config = {
            method: 'POST',
            url: this.api_url+'/api/v1/GetLibrary',
            headers: { 
            // 'user_token': localStorage.getItem('token'),
        },
        data : data
            };
        axios(config).then(result => {
            
            console.log(result); 
            this.controls = result.data;    
        }, error => {  
            console.log(error);  
        });

        },
    },

created(){

    this.get_library()
},

mounted(){

}



}
</script>

<template>
    <div class="d-flex w-100">
        <SideMenu></SideMenu> 
            <main class="main d-flex flex-column">
                <Header></Header> 
                <div class="content-container">
                    <div class="content">
                        <section class="control-summary card p-0">
                            <div class="card-header bg-white">
                                <h5>Control Summary</h5>
                            </div>
                            <div class="card-body">
                                <div class="row control-summary-row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-3">
                                    <div class="col">
                                        <div class="card-item card d-flex align-items-center justify-content-center">
                                            <div class="text-center">
                                                <h1>{{ controls.length }}</h1>
                                                <h6>Active Controls</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card-item card card d-flex align-items-center justify-content-center">
                                            <div class="text-center">
                                                <div class="progress progress-circle blue-secondary d-flex justify-content-center align-items-center" data-value='5'>
                                                    <span class="progress-left">
                                                        <span class="progress-bar"></span>
                                                    </span>
                                                    <span class="progress-right">
                                                        <span class="progress-bar"></span>
                                                    </span>
                                                    <div class="progress-value d-flex justify-content-center align-items-center">0</div>
                                                </div>
                                                <h6>Deficient</h6>
                                                <a href="#">See Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card-item card card d-flex align-items-center justify-content-center">
                                            <div class="text-center">
                                                <div class="progress progress-circle blue-primary d-flex justify-content-center align-items-center" data-value='5'>
                                                    <span class="progress-left">
                                                        <span class="progress-bar"></span>
                                                    </span>
                                                    <span class="progress-right">
                                                        <span class="progress-bar"></span>
                                                    </span>
                                                    <div class="progress-value d-flex justify-content-center align-items-center">0</div>
                                                </div>
                                                <h6>In Place</h6>
                                                <a href="#">See Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card-item card card d-flex align-items-center justify-content-center">
                                            <div class="text-center">
                                                <div class="progress progress-circle red d-flex justify-content-center align-items-center" data-value="5">
                                                    <span class="progress-left">
                                                        <span class="progress-bar"></span>
                                                    </span>
                                                    <span class="progress-right">
                                                        <span class="progress-bar"></span>
                                                    </span>
                                                    <div class="progress-value d-flex justify-content-center align-items-center">0</div>
                                                </div>
                                                <h6>Ready for Review</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card-item card card d-flex align-items-center justify-content-center">
                                            <div class="text-center">
                                                <div class="progress progress-circle green d-flex justify-content-center align-items-center" data-value="5">
                                                    <span class="progress-left">
                                                        <span class="progress-bar"></span>
                                                    </span>
                                                    <span class="progress-right">
                                                        <span class="progress-bar"></span>
                                                    </span>
                                                    <div class="progress-value d-flex justify-content-center align-items-center">0</div>
                                                </div>
                                                <h6>Monitored</h6>
                                                <a href="#">See Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="card p-0 overflow-hidden">
                            <div class="scrollable-area">
                                <table class="table table-hover scrollable searchable-table">
                                    <thead>
                                        <tr>
                                            <!-- <th class="bg-light">
                                                <div>
                                                    <div class="title-row">NAME</div>
                                                    <div class="search-field-row position-relative">
                                                        <input class="form-control" type="text" placeholder="Search...">
                                                        <button type="button" class="btn p-0 btn-transparent">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                                                <path d="M12.5 8a.5.5 0 0 1-.5.5H4a.5.5 0 1 1 0-1h8a.5.5 0 0 1 .5.5Zm2-3.5h-13a.5.5 0 1 0 0 1h13a.5.5 0 0 0 0-1Zm-5 6h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1Z" fill="#525E75" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th> -->
                                            <th class="bg-light">
                                                <div>
                                                    <div class="title-row">REFERENCE</div>
                                                    <div class="search-field-row position-relative">
                                                        <input class="form-control" type="text" placeholder="Search...">
                                                        <button type="button" class="btn p-0 btn-transparent">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                                                <path d="M12.5 8a.5.5 0 0 1-.5.5H4a.5.5 0 1 1 0-1h8a.5.5 0 0 1 .5.5Zm2-3.5h-13a.5.5 0 1 0 0 1h13a.5.5 0 0 0 0-1Zm-5 6h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1Z" fill="#525E75" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                            <th class="bg-light">
                                                <div>
                                                    <div class="title-row">DESCRIPTION</div>
                                                    <div class="search-field-row position-relative">
                                                        <input class="form-control" type="text" placeholder="Search...">
                                                        <button type="button" class="btn p-0 btn-transparent">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                                                <path d="M12.5 8a.5.5 0 0 1-.5.5H4a.5.5 0 1 1 0-1h8a.5.5 0 0 1 .5.5Zm2-3.5h-13a.5.5 0 1 0 0 1h13a.5.5 0 0 0 0-1Zm-5 6h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1Z" fill="#525E75" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                            <th class="bg-light">
                                                <div>
                                                    <div class="title-row">DOMAINS</div>
                                                    <div class="search-field-row position-relative">
                                                        <input class="form-control" type="text" placeholder="Search...">
                                                        <button type="button" class="btn p-0 btn-transparent">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                                                <path d="M12.5 8a.5.5 0 0 1-.5.5H4a.5.5 0 1 1 0-1h8a.5.5 0 0 1 .5.5Zm2-3.5h-13a.5.5 0 1 0 0 1h13a.5.5 0 0 0 0-1Zm-5 6h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1Z" fill="#525E75" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                            <th class="bg-light">
                                                <div>
                                                    <div class="title-row">REGULATIONS</div>
                                                    <div class="search-field-row position-relative">
                                                        <input class="form-control" type="text" placeholder="Search...">
                                                        <button type="button" class="btn p-0 btn-transparent">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                                                <path d="M12.5 8a.5.5 0 0 1-.5.5H4a.5.5 0 1 1 0-1h8a.5.5 0 0 1 .5.5Zm2-3.5h-13a.5.5 0 1 0 0 1h13a.5.5 0 0 0 0-1Zm-5 6h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1Z" fill="#525E75" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody style="height: 313px;">
                                        <tr v-for="(control, index) in controls" :key="index">
                                            <td class="table-details"> {{ control.Scf_ref }}</td>
                                            <td class="table-details">{{control.Scf_control}}</td>
                                            <td class="table-details">{{control.Scf_domain}}</td>
                                            <td class="table-details"></td>
                                        </tr>
                                      
                                     
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
</template>
