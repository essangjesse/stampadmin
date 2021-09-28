<template>
    <div class="page-container">
        <top-bar></top-bar>
        <navigation></navigation>
        <div class="page-content">
            <div class="main-wrapper">
                <video-modal v-if="cases.length > 0 && active_case.video != null" :video="active_case.video"></video-modal>
                <emergency-services-modal v-if="cases.length > 0" :case-id="active_case.id_formatted"></emergency-services-modal>
                <broadcast-modal v-if="cases.length > 0" :case-id="active_case.id"></broadcast-modal>
                <close-modal @fetchCaseEvent="fetchCases()" v-if="cases.length > 0" :case-id="active_case.id"></close-modal>
                <div class="row" v-if="cases.length > 0 && !loading">
                    <div class="col-sm-6 col-xl-8">
                        <div class="card map-widget">
                            <GmapMap
                            :center="{lat:map.lat, lng:map.lng}"
                            :zoom="15"
                            style="width: 100%; height: 400px"
                            >
                            <GmapMarker
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"
                                :clickable="true"
                                :draggable="true"
                                @click="center=m.position"
                            />
                            </GmapMap>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="card table-widget">
                            <div class="card-body">
                                <h5 class="card-title">Open Cases</h5>
                                <form><input class="form-control search float-right" type="text" placeholder="search" aria-label="Search"></form>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"><h6>Case ID</h6></th>
                                                <th scope="col"><h6>Time/Date Logged</h6></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :class="[{active: incident.id == active_case.id}]" @click="switchActive(incident)" v-for="incident in cases" :key="incident.id">
                                                <th scope="row">{{ incident.id_formatted }}</th>
                                                <td>{{ incident.created_at }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-8">
                        <div class="card profile-widget">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <h5 class="card-title">Corps Member Profile</h5>
                                        <figure v-if="active_case.user.avatar == null">
                                            <img src="@/assets/images/profile-image-1.png" v-show="active_case.user.gender === 'Female'" width="100" alt="corp-member-profile-image">
                                            <img src="@/assets/images/profile-image-2.png" v-show="active_case.user.gender === 'Male'" width="100" alt="corp-member-profile-image">
                                        </figure>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5 class="card-title mt-sm f-600">{{ active_case.user.first_name }} {{ active_case.user.middle_name }} {{ active_case.user.last_name }} </h5>
                                        <p><strong>Gender:</strong> <span>{{ active_case.user.gender }}</span></p>
                                        <p><strong>Corps Member ID:</strong> <span>{{ active_case.user.corps_member_id }}</span></p>
                                        <p><strong>Place of Deployment:</strong> <span>{{ active_case.user.place_of_deployment }}</span></p>
                                        <p><strong>Batch:</strong> <span>{{ active_case.user.batch }}</span></p>
                                        <p><strong>Phone Number:</strong> <span>{{ active_case.user.phone_number }}</span><a :href="'tel:' + active_case.user.phone_number" class="float-right"><phone-icon></phone-icon></a></p>
                                        <p><strong>Email:</strong> <span>{{ active_case.user.email }}</span><a :href="'mailto:' + active_case.user.email" class="float-right"><mail-icon></mail-icon></a></p>
                                        <p><strong>Next of Kin:</strong> <span>{{ active_case.user.next_of_kin }}</span></p>
                                        <p><strong>Next of Kin (Phone):</strong> <span>{{ active_case.user.next_of_kin_phone }}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="card case-widget">
                            <img v-if="active_case.image == null" src="@/assets/images/no-image.jpg" class="card-img-top" alt="case-details-image">
                            <img v-else :src="'https://stamp.allbattery.ng/uploads/images/' + active_case.image" class="card-img-top" alt="case-details-image">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <h5 class="card-title">Case Details</h5>
                                        <p><strong>Reported By:</strong> <span>{{active_case.user.corps_member_id}}</span></p>  
                                        <p><strong>Time and Date:</strong> <span>{{active_case.created_at}}</span></p>  
                                        <p><strong>Location:</strong> <span>{{active_case.location}}</span></p>  
                                        <p><strong>Incident Type:</strong> <span>{{active_case.type}}</span></p>  
                                        <p><strong>Description:</strong> <span>{{active_case.description ? active_case.description : '&mdash;' }}</span></p>
                                        <p v-show="active_case.video"><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#videoModal"><play-icon></play-icon>Play Video</button></p>
                                        <h5 class="card-title mt-5">Take Action</h5>
                                        <p><button class="btn btn-primary" @click="escalate()">Escalate</button><button data-bs-toggle="modal" data-bs-target="#broadcastModal" class="btn btn-primary ml-10">Broadcast</button></p>
                                        <p><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emergencyServices">Emergency Services</button></p>
                                        <p><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#closeCase">Close Case</button></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-md-12">
                        <div class="card empty-widget">
                            <div class="card-body text-center">
                                <archive-icon size="75"></archive-icon>
                                <h5 class="card-title">All cases have been closed</h5>
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
import Navigation from "@/components/TheNavigation.vue"
import VueToast from 'vue-toast-notification';
import "vue-toast-notification/dist/theme-sugar.css";
import Vue from "vue";
import Pusher from "pusher-js";
import CloseModal from "@/components/TheCloseModal.vue";
import VideoModal from "@/components/TheVideoModal.vue";
import BroadcastModal from "@/components/TheBroadcastModal.vue";
import EmergencyServicesModal from "@/components/TheEmergencyServicesModal.vue";
import { PhoneIcon, MailIcon, PlayIcon, ArchiveIcon } from "vue-feather-icons";

Vue.use(VueToast, {
    position: 'top'
});

export default {
    components: {
        TopBar, 
        Navigation,
        PhoneIcon,
        MailIcon,
        PlayIcon,
        ArchiveIcon,
        CloseModal,
        VideoModal,
        BroadcastModal,
        EmergencyServicesModal,
    },
    data(){
        return {
            cases: [],
            corps_members: [],
            active_case: {},
            api_base_url: this.$router.options.api_base,
            token: this.$store.getters.accessToken,
            loading: true,
            map: {
                lat: null,
                lng: null
            },
            markers: []
        }
    },
    mounted(){
        let pusher = new Pusher('4f9f03f1a8066c8172af', {
            cluster: 'eu'
        });

        let channel = pusher.subscribe('incident-channel');
            channel.bind('my-incident', () => {
            this.fetchCases();
        });
    },
    created(){
        this.fetchCases();
    },
    methods: {
        fetchCases(){
            fetch(this.api_base_url + "/incident", {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.status){
                    this.loading = false;
                    this.cases = res.data;
                    this.active_case = this.cases[0];
                    this.fetchCorpsMembers();
                    this.getCoords(this.active_case.location);
                }
            })
            .catch(err => console.log(err));
        },

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

                    this.corps_members.forEach(member => {
                        let location = {
                            "position": {
                                "lng": member.location.lng,
                                "lat": member.location.lat
                            }
                        };

                        this.markers.push(location);
                    });
                }
            })
            .catch(err => console.log(err));
        },

        getCoords(address){
            let endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCumEqypUHb-bP2iwBgRVYbFo5ma6ksj4k";

            fetch(endpoint, {
                headers: {
                    "Accept": "application/json",
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.status == "OK"){
                    let location = res.results[0].geometry.location;

                    this.map = {
                        lat: location.lat,
                        lng: location.lng
                    };
                }
            })
            .catch(err => console.log(err));
        },

        escalate(){
            Vue.$toast.open('Case ' + this.active_case.id_formatted + ' has been escalated to the relevant authorities.');
        },

        switchActive(incident){
            this.active_case = incident;
            this.getCoords(this.active_case.location);
        }
    }
}
</script>

<style scoped>
.map-widget .card-body {
    height: 400px;
}

.table-widget .card-body {
    height: 400px;
    overflow: scroll;
}

tr {
    cursor: pointer;
}

tr.active, .profile-widget svg, .empty-widget svg {
    color: #269400 !important;
}

.mt-sm {
    margin-top: 5px;
}

.ml-sm {
    margin-left: 2px;
}

.ml-10 {
    margin-left: 10px;
}

.f-600 {
    font-weight: 600;
}

.float-right {
    float: right;
}

.form-control.search {
    position:relative; 
    top: -60px; 
    width: 175px !important;
    margin-right:15px;
}

.table-widget .table-responsive {
    clear:both; 
    position:relative;
    top: -50px; 
}
</style>
