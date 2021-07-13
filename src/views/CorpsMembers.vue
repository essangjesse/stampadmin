<template>
    <div class="page-container">
        <top-bar></top-bar>
        <navigation></navigation>
        <div class="page-content">
            <div class="main-wrapper">
                <corps-member-modal @fetchMembers="fetchCorpsMembers()"></corps-member-modal>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card table-widget">
                            <div class="card-body">
                                <button class="btn btn-primary float-right add" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><user-plus-icon></user-plus-icon> Register</button>
                                <form><input class="form-control search float-right" type="text" placeholder="search" aria-label="Search"></form>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"><h6>Full Name</h6></th>
                                                <th scope="col"><h6>Corps Member ID</h6></th>
                                                <th scope="col"><h6>Batch</h6></th>
                                                <th scope="col"><h6>Phone Number</h6></th>
                                                <th scope="col"><h6>Email</h6></th>
                                                <th scope="col"><h6>Time/Date Enrolled</h6></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :class="[{active: corps_member.id === member.id}]" v-for="member in corps_members" :key="member.id" @click="displayActive(member.id)">
                                                <th scope="row">{{ member.first_name }} {{ member.last_name }} </th>
                                                <td>{{ member.corps_member_id }}</td>
                                                <td>{{ member.batch }}</td>
                                                <td>{{ member.phone_number }}</td>
                                                <td>{{ member.email }}</td>
                                                <td>{{ member.created_at }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12" v-if="corps_members.length > 0">
                        <div class="card profile-widget">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <h5 class="card-title">Corps Member Profile</h5>
                                        <figure v-if="corps_member.avatar == null">
                                            <img src="@/assets/images/profile-image-1.png" v-show="corps_member.gender === 'Female'" width="100" alt="corp-member-profile-image">
                                            <img src="@/assets/images/profile-image-2.png" v-show="corps_member.gender === 'Male'" width="100" alt="corp-member-profile-image">
                                        </figure>
                                        <!-- <button class="btn btn-primary"><edit-icon></edit-icon> Edit Profile</button> -->
                                    </div>
                                    <div class="col-sm-8">
                                        <h5 class="card-title mt-sm f-600">{{ corps_member.first_name }} {{ corps_member.middle_name }} {{ corps_member.last_name }} </h5>
                                        <p><strong>Gender:</strong> <span>{{ corps_member.gender }}</span></p>
                                        <p><strong>Corps Member ID:</strong> <span>{{ corps_member.corps_member_id }}</span></p>
                                        <p><strong>Place of Deployment:</strong> <span>{{ corps_member.place_of_deployment }}</span></p>
                                        <p><strong>Batch:</strong> <span>{{ corps_member.batch }}</span></p>
                                        <p><strong>Phone Number:</strong> <span>{{ corps_member.phone_number }}</span><a :href="'tel:' + corps_member.phone_number" class="float-right"><phone-icon></phone-icon></a></p>
                                        <p><strong>Email:</strong> <span>{{ corps_member.email }}</span><a :href="'mailto:' + corps_member.email" class="float-right"><mail-icon></mail-icon></a></p>
                                        <p><strong>Next of Kin:</strong> <span>{{ corps_member.next_of_kin }}</span></p>
                                        <p><strong>Next of Kin (Phone):</strong> <span>{{ corps_member.next_of_kin_phone }}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TopBar from "@/components/TheTopBar.vue"
import Navigation from "@/components/TheNavigation.vue";
import CorpsMemberModal from "@/components/TheCorpsMemberModal.vue";

import { PhoneIcon, MailIcon, UserPlusIcon } from "vue-feather-icons";

export default {
    components: {
        TopBar,
        Navigation,
        CorpsMemberModal,
        PhoneIcon,
        MailIcon,
        UserPlusIcon
    },

    data(){
        return {
            corps_member: {},
            token: this.$store.getters.accessToken,
            corps_members: [],
            api_base_url: this.$router.options.api_base
        };
        
    },

    mounted(){
        this.fetchCorpsMembers()
    },

    methods: {
        fetchCorpsMembers(){
            fetch(this.api_base_url + "/corps-member", {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.status){
                    this.corps_members = res.data;
                    this.corps_member = this.corps_members[0];
                }
            })
            .catch(err => console.log(err));
        },
        displayActive(id){
            this.corps_member = this.corps_members.find(member => member.id == id);
        }
    }
}
</script>

<style scoped>
tr {
    cursor: pointer;
}

tr.active, .profile-widget svg {
    color: #269400 !important;
}

.float-right {
    float: right;
}

.btn.add {
    position:relative;
    margin-right:15px;
    top: -10px;
}

.controls {
    padding:15px 40px;
}

.form-control.search {
    position:relative; 
    width: 175px !important;
    margin-right:15px;
    top: -10px;
}

.table-widget .card-body {
    height: 400px;
    overflow: scroll;
}

.table-widget .table-responsive {
    clear:both; 
    position:relative;
}
</style>