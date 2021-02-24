<template>
  <div>
    <div ref="pdfLayout">
      <h2>{{ hotel.name }}</h2>
      <div>
        <canvas ref="canvas" id="canvas"></canvas>
      </div>
      <h3>OPEN PHONE CAMERA & SCAN FOR MENU</h3>
      <div class="SoftwareProviderDetails" style="text-align: center">
        <a
          href="https://www.google.com"
          target="_blank"
          style="text-align: center"
          >NON TOUCH MENU</a
        >
        <img class="imagePixel" :src="require('../assets/facebook.png')" />
        <img class="imagePixel" :src="require('../assets/instagram.png')" />
        <img class="imagePixel" :src="require('../assets/twitter.png')" />
      </div>
    </div>
    <div>
      <br /><br />
      <button v-on:click="download()">Download</button><br /><br />
      <button type="button" v-on:click="cancel()">Go Back</button>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
//import * as html2pdf from "html2pdf.js";

export default {
  name: "QrCode",
  data() {
    return {
      hotel: {},
    };
  },
  methods: {
    download() {
      // var element = this.$refs.pdfLayout;
      // var opt = {
      //  margin: 1,
      // filename: "MenuQrCode.pdf",
      //  image: { type: "jpeg", quality: 0.98 },
      // html2canvas: { scale: 2 },
      //  jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      // };
      // html2pdf()
      // .set(opt)
      //.from(element)
      // .save();
    },
    cancel() {
      this.$router.replace({ name: "Dashboard" });
    },
  },
  mounted() {
    let hotelId = this.$route.params.id;
    if (hotelId) {
      let address = `${this.$base}${hotelId}`;
      QRCode.toCanvas(this.$refs.canvas, address, { width: 500 }, (error) => {
        if (error) console.error(error);
        console.log("success!");
      });

      this.$http
        .get(`${this.$base_url}/hotel/${hotelId}`)
        .then((response) => {
          if (response && response.status == 200) {
            this.hotel = response.data;
          }
        })
        .catch((e) => {
          if (e && e.response) {
            this.error = e.response.data;
            this.authenticationFailed = true;
          }
        });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imagePixel {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

#login {
  width: 500px;
  border: 1px solid #000000;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
a {
  float: right;
}
</style>
