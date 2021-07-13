<template>
    <div class="modal fade" ref="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Register Corps Member</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" @click="member = {}" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row" id="add-member-form" @submit.prevent="addMember()">
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" @keyup="cleanup('first_name')" v-model="member.first_name" id="firstName" maxlength="255" placeholder="Paul" required />
                                    <label for="firstName">First Name</label>
                                    <small class="text-danger" v-for="error in errors.first_name" :key="error"><alert-triangle-icon></alert-triangle-icon> {{ error }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" @keyup="cleanup('middle_name')" v-model="member.middle_name" id="middleName" maxlength="255" placeholder="Emmanuel" required />
                                    <label for="middleName">Middle Name</label>
                                    <small class="text-danger" v-for="error in errors.middle_name" :key="error"><alert-triangle-icon></alert-triangle-icon> {{ error }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" @keyup="cleanup('last_name')" v-model="member.last_name" id="lastName" maxlength="255" placeholder="Adekunle" required />
                                    <label for="lastName">Last Name</label>
                                    <small class="text-danger" v-for="error in errors.last_name" :key="error"><alert-triangle-icon></alert-triangle-icon> {{ error }}</small>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <input type="email" class="form-control" @keyup="cleanup('email')" v-model="member.email" id="email" maxlength="255" placeholder="pauladekunle@gmail.com" required />
                                    <label for="email">Email</label>
                                    <small class="text-danger" v-for="error in errors.email" :key="error"><alert-triangle-icon></alert-triangle-icon> {{ error }}</small>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" @keyup="cleanup('phone_number')" v-model="member.phone_number" id="phoneNumber" maxlength="255" placeholder="08023112233" required />
                                    <label for="phoneNumber">Phone Number</label>
                                    <small class="text-danger" v-for="error in errors.phone_number" :key="error"><alert-triangle-icon></alert-triangle-icon> {{ error }}</small>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" @keyup="cleanup('corps_member_id')" v-model="member.corps_member_id" id="corpsMemberId" maxlength="255" placeholder="LA/203432" required />
                                    <label for="corpsMemberId">Corps Member ID</label>
                                    <small class="text-danger" v-for="error in errors.corps_member_id" :key="error"><alert-triangle-icon></alert-triangle-icon> {{ error }}</small>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <select class="form-select" v-model="member.gender" id="gender" aria-label="Gender" required>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <label for="gender">Gender</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <select class="form-select" v-model="member.batch" id="batch" aria-label="Batch" required>
                                        <option :value="'Batch A, ' + year">Batch A, {{ year }}</option>
                                        <option :value="'Batch B,' + year">Batch B, {{ year }}</option>
                                        <option :value="'Batch C,' + year">Batch C, {{ year }}</option>
                                    </select>
                                    <label for="batch">Batch</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <select class="form-select" v-model="member.state" @change="sortLgas()"  id="stateOfDeployment" aria-label="State of Deployment" required>
                                        <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
                                    </select>
                                    <label for="stateOfDeployment">State of Deployment</label>
                                </div>
                            </div>
                        </div>
                         <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <select class="form-select" v-model="member.lga" id="lga" aria-label="LGA of Deployment" required>
                                        <option v-for="lga in lgas" :key="lga" :value="lga">{{ lga }}</option>
                                    </select>
                                    <label for="lga">LGA of Deployment</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <input type="text" @keyup="cleanup('next_of_kin')" class="form-control" v-model="member.next_of_kin" id="nextOfKin" maxlength="255" placeholder="Fadekemi Adeyemi" required />
                                    <label for="nextOfKin">Next of Kin</label>
                                    <small class="text-danger" v-for="error in errors.next_of_kin" :key="error"><alert-triangle-icon></alert-triangle-icon> {{ error }}</small>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-3">
                                <div class="form-floating">
                                    <input type="text" @keyup="cleanup('next_of_kin_phone')" class="form-control" v-model="member.next_of_kin_phone" id="nextOfKinPhone" maxlength="255" placeholder="08023112233" required />
                                    <label for="nextOfKinPhone">Next of Kin (Phone)</label>
                                    <small class="text-danger" v-for="error in errors.next_of_kin_phone" :key="error"><alert-triangle-icon></alert-triangle-icon> {{ error }}</small>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" ref="close" data-bs-dismiss="modal" @click="member = {}">Close</button>
                <button type="submit" form="add-member-form" class="btn btn-primary" :class="[{disabled: processing.submit}]">Create Account</button>
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
    components: {
        AlertTriangleIcon
    },
    data(){
        return {
            year: new Date().getFullYear(),
            nigeria: Nigeria,
            states: [],
            lgas: [],
            member: {},
            processing: {
                submit: false
            },
            errors: {
                first_name: [],
                middle_name: [],
                last_name: [],
                email: [],
                phone_number: [],
                corps_member_id: [],
                batch: [],
                next_of_kin: [],
                next_of_kin_phone: []
            },
            api_base_url: this.$router.options.api_base,
            token: this.$store.getters.accessToken,
        }
    },
    created(){
        this.setStates();
    },
    methods: {
        addMember(){
            this.processing.submit = true;

            this.member.place_of_deployment = this.member.lga + ", " + this.member.state;

            fetch(this.api_base_url + "/corps-member", {
                method: "post",
                body: JSON.stringify(this.member),
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

                    Vue.$toast.open('Member added successfully!');

                    this.$emit("fetchMembers");
                }else{
                    Vue.$toast.error(res.message);

                    this.errors.first_name = data.errors.first_name !== undefined ? data.errors.first_name : [];
                    this.errors.middle_name = data.errors.middle_name !== undefined ? data.errors.middle_name : [];
                    this.errors.last_name = data.errors.last_name !== undefined ? data.errors.last_name : [];
                    this.errors.email = data.errors.email !== undefined ? data.errors.email : [];
                    this.errors.phone_number = data.errors.phone_number !== undefined ? data.errors.phone_number : [];
                    this.errors.corps_member_id = data.errors.corps_member_id !== undefined ? data.errors.corps_member_id : [];
                    this.errors.batch = data.errors.batch !== undefined ? data.errors.batch : [];
                    this.errors.next_of_kin = data.errors.next_of_kin !== undefined ? data.errors.next_of_kin : [];
                    this.errors.next_of_kin_phone = data.errors.next_of_kin_phone !== undefined ? data.errors.next_of_kin_phone : [];
                }
            })
            .catch(err => console.log(err));
        },

        setStates(){
            for (let i in this.nigeria) {
                this.states.push(this.nigeria[i].state.name)
            }
        },

        sortLgas(){
            let state = this.member.state;

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

            if(el === "first_name"){
                this.errors.first_name = [];
            }else if(el === "middle_name"){
                this.errors.middle_name = [];
            }else if(el === "last_name"){
                this.errors.last_name = [];
            }else if(el === "email"){
                this.errors.email = [];
            }else if(el === "phone_number"){
                this.errors.phone_number = [];
            }else if(el === "corps_member_id"){
                this.errors.corps_member_id = [];
            }else if(el === "batch"){
                this.errors.batch = [];
            }else if(el === "next_of_kin"){
                this.errors.next_of_kin = [];
            }else if(el === "next_of_kin_phone"){
                this.errors.next_of_kin_phone = [];
            }
        }
        
    }
}
</script>


