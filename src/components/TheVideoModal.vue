<template>
    <div class="modal fade" ref="modal" id="videoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="emergencyServicesLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="videoModalLabel">Video</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <video ref="video" :src="'http://67.207.69.246/uploads/videos/' + video" controls width="100%"></video>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" ref="close" data-bs-dismiss="modal" @click="resetVideo()">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["video"],

    methods: {
        resetVideo(){
            this.$refs["video"].pause();
            this.$refs["video"].currentTime = 0;
        }
    }
};
</script>
