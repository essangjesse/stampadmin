<template>
    <div class="modal fade" ref="modal" id="closeCase" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="closeCaseLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="closeCaseLabel">Close Case</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" @click="emergency_services = []" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to close this case?</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" ref="close" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" :class="[{disabled: processing.submit}]" @click="closeCase()">Confirm Action</button>
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
            processing: {
                submit: false
            },
            api_base_url: this.$router.options.api_base,
            token: this.$store.getters.accessToken,
        }
    },
    methods: {
        closeCase(){
            this.processing.submit = true;

            fetch(this.api_base_url + "/incident/"+ this.caseId +"/close", {
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
                if(res.status){
                    this.$refs["close"].click();

                    Vue.$toast.open('Case closed successfully!');

                    this.$emit("fetchCaseEvent");
                }else{
                    Vue.$toast.error(res.message);
                }
            })
            .catch(err => console.log(err));
        }
    }
};
</script>
