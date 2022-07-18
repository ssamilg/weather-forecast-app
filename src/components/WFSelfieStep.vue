<script>
import { mapActions } from 'vuex';

export default {
  name: 'WFSelfieStep',
  data() {
    return {
      video: null,
      canvas: null,
      imgSrc: '',
    };
  },
  mounted() {
    this.canvas = this.$refs.canvasRef;
    this.video = this.$refs.videoRef;

    this.startCapture();
  },
  computed: {
    isPhotoModeOn() {
      return this.imgSrc === '';
    },
  },
  methods: {
    ...mapActions(['setImgURL']),
    startCapture() {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch((err) => {
          // TODO proper error handling should be added here
          console.log(err);
        });
    },
    initCanvas() {
      this.canvas.setAttribute('width', this.video.videoWidth);
      this.canvas.setAttribute('height', this.video.videoHeight);
    },
    takePicture() {
      const context = this.canvas.getContext('2d');
      context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
      this.imgSrc = this.canvas.toDataURL('image/png');

      this.setImgURL(this.imgSrc);
    },
    retakePhoto() {
      this.imgSrc = '';
      this.startCapture();
    },
  },
};
</script>

<template>
  <div id="wF-selfie-step">
    <v-layout align-center justify-center>
      <v-flex md10 xs12>
        <video
          v-show="isPhotoModeOn"
          height="100%"
          width="100%"
          ref="videoRef"
          @canplay="initCanvas()"
        >
          <track src="" kind="captions">
          No Stream Available...
        </video>

        <img
          v-show="!isPhotoModeOn"
          :src="imgSrc"
          alt="Your selfie"
          height="100%"
          width="100%"
        >
      </v-flex>
    </v-layout>

    <canvas ref="canvasRef" style="display:none"/>

    <v-layout justify-center align-center wrap>
      <v-btn v-if="isPhotoModeOn" depressed color="primary" class="mt-2" @click="takePicture()">
        <v-icon class="mr-2">mdi-camera</v-icon>
        Take Photo
      </v-btn>

      <template v-else>
        <v-flex xs12 md4 mt-2>
          <v-layout justify-center>
            <v-flex shrink>
              <v-btn depressed color="primary" @click="retakePhoto()">
                <v-icon class="mr-2">mdi-refresh</v-icon>
                Retake Photo
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs12 md4 mt-2>
          <v-layout justify-center>
            <v-flex shrink>
              <v-btn depressed color="success" @click="$emit('next-step')">
                <v-icon class="mr-2">mdi-check</v-icon>
                Continue
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </template>
    </v-layout>

    <v-layout justify-center mt-2>
      <v-flex shrink>
        <v-btn outlined color="grey" @click="$emit('prev-step')">
          <v-icon class="mr-2">mdi-chevron-left</v-icon>
          Back
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="scss">
#wF-selfie-step {
  height: 100%;
  overflow: auto;
}
</style>
