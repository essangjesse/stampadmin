<template>
    <div class="modal fade" ref="modal" id="broadcastModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="broadcastModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="broadcastModalLabel">Broadcast</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" @click="broadcast = []" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row" id="broadcast-form" @submit.prevent="broadcastCase()">
                        <div class="col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <textarea class="form-control" @keyup="cleanup('description')" v-model="broadcast.description" maxlength="600" placeholder="Start typing..." required></textarea>
                                    <label for="phoneNumber">Description</label>
                                    <small class="text-danger" v-for="error in errors.description" :key="error"><alert-triangle-icon></alert-triangle-icon> {{ error }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <select class="form-select" v-model="broadcast.state" @change="sortLgas()"  id="state" aria-label="state" required>
                                         <option value="">Select State</option>
                                        <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
                                    </select>
                                    <label for="state">State</label>
                                </div>
                            </div>
                        </div>
                         <div class="col-sm-6">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <select class="form-select" v-model="broadcast.lga" id="lga" aria-label="lga">
                                        <option value="">All LGAs</option>
                                        <option v-for="lga in lgas" :key="lga" :value="lga">{{ lga }}</option>
                                    </select>
                                    <label for="lga">LGA</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12" v-show="broadcast.areas.length > 0">
                            <div class="mb-3">
                              <span class="badge bg-primary m-2" v-for="area in broadcast.areas" :key="area"> {{ area }} <button type="button" class="btn-close btn-small" @click="removeArea(area)" aria-label="Close"></button></span>
                            </div>
                        </div>
                        <div class="col-sm-12">
                           <div class="text-center">
                                <button type="button" @click="addArea(broadcast.state, broadcast.lga)" class="btn btn-primary">Add</button>
                           </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" ref="close" @click="clearBrodcastData()" data-bs-dismiss="modal">Close</button>
                <button type="submit" form="broadcast-form" class="btn btn-primary" :class="[{disabled: processing.submit}]">Send Broadcast</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Nigeria from "@/assets/js/nigeria.min.js";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Vue from 'vue';
import { AlertTriangleIcon } from "vue-feather-icons";

Vue.use(VueToast, {
    position: 'top'
});

export default {
    props: ["caseId"],
    components: {
        AlertTriangleIcon
    },
    data(){
        return {
            broadcast: {
                incident_id: this.caseId,
                description: "",
                state: "",
                lga: "",
                areas: [],
            },
            nigeria: Nigeria,
            states: [],
            lgas: [],
            processing: {
                submit: false
            },
            errors: {
                description: []
            },
            api_base_url: this.$router.options.api_base,
            token: this.$store.getters.accessToken,
        }
    },
    created(){
        this.setStates();
    },
    methods: {
        addArea(state, lga){
            if(state === ""){
                Vue.$toast.error("Please select an area to broadcast to.");
            }else if(state !== "" && lga === ""){
                if(this.broadcast.areas.includes(state)){
                   Vue.$toast.error("Area is already in broadcast list."); 
                }else{
                    this.broadcast.areas.push(state);
                }
            }else{
                if(this.broadcast.areas.includes(state + ', ' + lga)){
                   Vue.$toast.error("Area is already in broadcast list."); 
                }else{
                    this.broadcast.areas.push(state + ', ' + lga);
                }
            }
        },

        removeArea(val){
            let areas = this.broadcast.areas;

            for(let i in areas){
                if(areas[i] == val)
                    areas.splice(i, 1);
            }

            this.broadcast.areas = areas;
        },

        broadcastCase(){
            if(this.broadcast.areas.length > 0){
                this.processing.submit = true;

                fetch(this.api_base_url + "/broadcast", {
                    method: "post",
                    body: JSON.stringify(this.broadcast),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.token
                    }
                })
                .then(res => res.json())
                .then(res => {
                    this.processing.submit = false;
                    let data = res.data;
                    if(res.status){
                        this.$refs["close"].click();

                        Vue.$toast.open('Case broadcasted successfully!');
                    }else{
                        Vue.$toast.error(res.message);

                        this.errors.description = data.errors.description !== undefined ? data.errors.description : [];
                    }
                })
                .catch(err => console.log(err));
            }else{
                Vue.$toast.error("Please select at least one area to receive this broadcast.");
            }
        },

        clearBrodcastData(){
            this.broadcast = {
                incident_id: this.caseId,
                description: "",
                state: "",
                lga: "",
                areas: [],
            }
        },

        setStates(){
            for (let i in this.nigeria) {
                this.states.push(this.nigeria[i].state.name)
            }
        },

        sortLgas(){
            let state = this.broadcast.state;

            this.lgas = [];

            for (let i in this.nigeria) {
                if(this.nigeria[i].state.name == state) {
                    let locals = this.nigeria[i].state.locals;

                    for(let j in locals){
                        this.lgas.push(locals[j].name);
                    }
                }
            }
        },

        cleanup(el){
            if(el === "description"){
                this.errors.description = [];
            }
        }
    },

};
</script>
