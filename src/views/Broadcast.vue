<template>
    <div class="page-container">
        <top-bar></top-bar>
        <navigation></navigation>
        <div class="page-content">
            <div class="main-wrapper">
                <div class="row" v-if="broadcasts.length > 0 && !loading">
                    <div class="col-sm-12">
                        <div class="card table-widget">
                            <div class="card-body">
                                <form><input class="form-control search float-right" type="text" placeholder="search" aria-label="Search"></form>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"><h6>Broadcast ID</h6></th>
                                                <th scope="col"><h6>Date/Time Sent</h6></th>
                                                <th scope="col"><h6>Sending Officer</h6></th>
                                                <th scope="col"><h6>Expected Responses</h6></th>
                                                <th scope="col"><h6>Reported Safe</h6></th>
                                                <th scope="col"><h6>Reported Unsafe</h6></th>
                                                <th scope="col"><h6>Pending</h6></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :class="[{active: broadcast.id == active_broadcast.id }]" @click="switchActive(broadcast)" v-for="broadcast in broadcasts" :key="broadcast.id">
                                                <th scope="row">{{ broadcast.id_formatted }}</th>
                                                <td>{{ broadcast.created_at }}</td>
                                                <td>{{ broadcast.user.first_name }} {{ broadcast.user.middle_name }} {{ broadcast.user.last_name }}</td>
                                                <td>{{ broadcast.expected_responses }}</td>
                                                <td>{{ broadcast.reported_safe }}</td>
                                                <td>{{ broadcast.reported_unsafe }}</td>
                                                <td>{{ broadcast.pending_responses }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- <div class="row">
                                        <div class="col-md-12 controls">
                                            <span>Showing 1 to 10 of 57 entries</span>
                                            <nav class="float-right">
                                                <ul class="pagination">
                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                    <li class="page-item disabled"><a class="page-link" href="javascript:void(0)">1 of 1</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p><strong class="text-primary">{{ active_broadcast.id_formatted }}</strong></p>
                                    </div>
                                    <div class="col-sm-3">
                                        <p><strong class="text-primary">Description:</strong> <span>{{ active_broadcast.description }}</span></p>
                                    </div>
                                    <div class="col-sm-3">
                                        <p><strong class="text-primary">Case ID:</strong> <span>{{ active_broadcast.incident.id_formatted }}</span></p>  
                                    </div>
                                    <div class="col-sm-3">
                                        <p><strong class="text-primary">Broadcast Areas:</strong> <br><span>{{ active_broadcast.areas }}</span></p>  
                                    </div>
                                </div>
                            </div>
                            <div class="table-widget">
                                <div class="card-body">
                                    <h5 class="card-title">Responses</h5>
                                    <form><input class="form-control search float-right" type="text" placeholder="search" aria-label="Search"></form>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col"><h6>Corps Member ID</h6></th>
                                                    <th scope="col"><h6>Status</h6></th>
                                                    <th scope="col"><h6>Response</h6></th>
                                                    <th scope="col"><h6>Response Time</h6></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="response in responses" :key="response.id">
                                                    <th scope="row">{{ response.user.corps_member_id }}</th>
                                                    <td>{{ response.is_safe ? 'Safe' : 'Unsafe' }}</td>
                                                    <td>{{ response.is_auto ? 'Auto' : 'Self' }}</td>
                                                    <td>{{ response.created_at }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!-- <div class="row">
                                            <div class="col-md-12 controls">
                                                <span>Showing 1 to 10 of 57 entries</span>
                                                <nav class="float-right">
                                                    <ul class="pagination">
                                                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                        <li class="page-item disabled"><a class="page-link" href="javascript:void(0)">1 of 1</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div> -->
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
                                <h5 class="card-title">No broadcasts are open</h5>
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
import { ArchiveIcon } from "vue-feather-icons";
import Pusher from "pusher-js";

export default {
    components: {
        TopBar,
        Navigation,
        ArchiveIcon
    },

    data(){
        return {
            loading: true,
            broadcasts: [],
            active_broadcast: {},
            responses: [],
            api_base_url: this.$router.options.api_base,
            token: this.$store.getters.accessToken,
        }
    },

    created(){
        this.fetchBroadcasts();
    },

    mounted(){
        let pusher = new Pusher('4f9f03f1a8066c8172af', {
            cluster: 'eu'
        });

        let channel = pusher.subscribe('response-channel');
            channel.bind('my-response', e => {
            this.fetchResponses(e.id);
        });
    },

    methods: {
        fetchBroadcasts(){
            fetch(this.api_base_url + "/broadcast", {
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
                    this.broadcasts = res.data;
                    this.active_broadcast = this.broadcasts[0];
                    this.fetchResponses(this.active_broadcast.id);
                }
            })
            .catch(err => console.log(err));
        },

        fetchResponses(id){
            fetch(this.api_base_url + "/response/" + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.status){
                    this.responses = res.data;
                }
            })
            .catch(err => console.log(err));
        },

        switchActive(broadcast){
            this.active_broadcast = broadcast;
            this.fetchResponses(broadcast.id);
        }

    }
}
</script>

<style scoped>
tr {
    cursor: pointer;
}

tr.active, .empty-widget svg {
    color: #269400 !important;
}

.float-right {
    float: right;
}

.form-control.search {
    position:relative; 
    width: 175px !important;
    margin-right:15px;
    top: -10px;
}

.controls {
    padding:15px 40px;
}

.table-widget .table-responsive {
    clear:both; 
    position:relative;
}

.table-widget .card-body {
    height: 400px;
    overflow: scroll;
}
</style>
