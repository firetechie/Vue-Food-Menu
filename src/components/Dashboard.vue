<template>
  <div id="register">
    <button
      style="width: 150px; height: 50px; font-size: 16px"
      type="button"
      v-on:click="createHotel()"
    >
      Create New Hotel
      </button><br /><br /><br />
    <ul style="list-style-type: none" id="hotel-list">
      <li v-for="hotel in hotels" :key="hotel._id">
        <div style="border: 1px solid #000000">
          <b>
            <p style="line-height: 0.3; font-size: 20px">{{ hotel.name }}</p></b
          >
          <p style="line-height: 0.2; font-size: 15px">{{ hotel.address }}</p>
          <p style="line-height: 0.2; font-size: 10px">{{ hotel.city }}</p>
          <h5 style="line-height: 0.2">{{ hotel.pin }}</h5>
          <p style="line-height: 0.2; font-size: 10px">
            {{ hotel.mobileNumber }}
          </p>
          <button
            style="margin: 5px"
            type="button"
            v-on:click="generateQrCode(hotel._id)"
          >
            Generate OR Code
          </button>
          <button
            style="margin: 5px"
            type="button"
            v-on:click="editMenu(hotel._id)"
          >
            Edit Menu</button
          ><br /><br />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      hotels: [],
    };
  },
  methods: {
    createHotel() {
      this.$router.replace({ name: "Register" });
    },
    editMenu(hotelId) {
      this.$router.push({ name: "Menu", params: { id: hotelId } });
    },
    generateQrCode(hotelId) {
      this.$router.push({ name: "QrCode", params: { id: hotelId } });
    },
  },
  mounted() {
    this.$http
      .get(`${this.$base_url}/user/${localStorage.userId}/hotel`)
      .then((response) => {
        if (response && response.status == 200) {
          this.hotels = response.data;
        }
      })
      .catch((e) => {
        if (e && e.response) {
          this.error = e.response.data;
          this.authenticationFailed = true;
        }
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#register {
  border: 1px solid #000000;
  width: 400px;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
