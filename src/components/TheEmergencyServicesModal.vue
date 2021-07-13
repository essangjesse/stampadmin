<template>
    <div class="modal fade" ref="modal" id="emergencyServices" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="emergencyServicesLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="emergencyServicesLabel">Select Emergency Services To Contact</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" @click="emergency_services = []" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row" id="emergency-services-form" @submit.prevent="contactEmergencyService()">
                        <div class="col-sm-12">
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" v-model="emergency_services" value="police" type="checkbox" id="police" />
                                    <label class="form-check-label" for="police">
                                        <h6>Police</h6>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="emergency_services" value="fire-service" type="checkbox" id="fire-service" />
                                    <label class="form-check-label" for="fire-service">
                                        <h6>Fire Service</h6>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="emergency_services" value="ambulance" type="checkbox" id="ambulance" />
                                    <label class="form-check-label" for="ambulance">
                                        <h6>Ambulance</h6>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="emergency_services" value="nema" type="checkbox" id="nema" />
                                    <label class="form-check-label" for="nema">
                                        <h6>NEMA</h6>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" ref="close" @click="emergency_services = []" data-bs-dismiss="modal">Close</button>
                <button type="submit" form="emergency-services-form" class="btn btn-primary" :class="[{disabled: processing.submit}]">Contact Emergency Service</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Vue from 'vue';

Vue.use(VueToast, {
    position: 'top'
});

export default {
    props: ["caseId"],
    data(){
        return {
            emergency_services: [],
            processing: {
                submit: false
            }
        }
    },
    methods: {
        contactEmergencyService(){
            if(this.emergency_services.length > 0){
                this.$refs["close"].click();

                Vue.$toast.open("Case " + this.caseId + " successfully sent to the selected emergency services.");
            }else{
                Vue.$toast.error("Please select at least one emergency service!");
            }
        }
    }
};
</script>
