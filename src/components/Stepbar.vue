<script>
export default {

name: 'Stepbar',

props: [ 'current_step'],

data () {

    return{

        current_step:this.current_step

    }

}, 

methods: {}

}
</script>

<template>
   <section class="card step-wizard">
                            <ul class="step-wizard-list d-flex align-items-center">
                                <li :class="current_step[0]">
                                    <span class="progress-count">1</span>
                                    <span class="progress-label">Select Frameworks</span>
                                </li>
                                <li :class="current_step[1]">
                                    <span class="progress-count">2</span>
                                    <span class="progress-label">Refine Controls</span>
                                </li>
                                <li :class="current_step[2]">
                                    <span class="progress-count">3</span>
                                    <span class="progress-label">Scope Overview</span>
                                </li>
                            </ul>
                        </section>
</template>
