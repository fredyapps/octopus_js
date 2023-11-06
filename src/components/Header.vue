<script>
export default {

name: 'Header',

data () {}, 

methods: {}

}
</script>

<template>
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
</template>
