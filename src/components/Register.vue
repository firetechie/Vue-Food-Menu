<template>
  <!-- <div id="register">
    <h1>Sign Up</h1>
    <p v-if="authenticationFailed">
      <strong>{{error}}</strong>
    </p>
    <input type="text" name="email" v-model="input.email" placeholder="Email" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="register()">Sign Up</button>
  </div>-->

  <div id="wrapper">
    <div id="inner1">
      <h1>Sign Up</h1>
      <br />
      <br />
      <p v-if="authenticationFailed">
        <strong>{{ error }}</strong>
      </p>
    </div>
    <div id="inner1">
      <label id="1">Hotel Name :</label
      ><span
        ><br />
        <input
          type="text"
          name="name"
          v-model="input.name"
          placeholder="Hotel Name"
      /></span>
    </div>
    <br />
    <div id="inner1">
      <label id="2">Address :</label
      ><span
        ><br />
        <input
          type="text"
          name="address"
          v-model="input.address"
          placeholder="Address"
      /></span>
    </div>
    <br />
    <div id="inner1">
      <label id="3">City :</label
      ><span
        ><br />
        <input type="text" name="city" v-model="input.city" placeholder="City"
      /></span>
    </div>
    <br />
    <div id="inner1">
      <label id="4">Pin :</label
      ><span
        ><br />
        <input type="text" name="pin" v-model="input.pin" placeholder="Pin"
      /></span>
    </div>
    <br />
    <div id="inner2">
      <label id="5">Mobile Number :</label
      ><span
        ><br />
        <input
          type="text"
          name="mobileNumber"
          v-model="input.mobileNumber"
          placeholder="Mobile Number"
      /></span>
    </div>
    <br /><br /><br />
    <br />
    <button type="button" v-on:click="register()">Save</button>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      input: {
        name: "",
        address: "",
        city: "",
        pin: "",
        mobileNumber: "",
      },
      error: "",
      authenticationFailed: false,
    };
  },
  methods: {
    register() {
      if (
        this.input.name != "" &&
        this.input.address != "" &&
        this.input.city != "" &&
        this.input.pin != "" &&
        this.input.mobileNumber != ""
      ) {
        this.$http
          .post(
            `${this.$base_url}/user/${localStorage.userId}/hotel`,
            this.input
          )
          .then((response) => {
            if (response && response.status == 200) {
              this.$router.replace({ name: "Dashboard" });
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrapper {
  margin-left: auto;
  margin-right: auto;
  height: 500px;
  width: 500px;
  border: 3px solid #000000;
}

label {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 18px;
  color: rgb(0, 0, 0);
  height: 20px;
  width: 1px;
  margin-top: 10px;
  margin-right: 180px;
  text-align: left;
  clear: both;
}
#1 {
  float: left;
  clear: left;
  width: 100%;
  padding-bottom: 1em;
}
#2 {
  float: left;
  clear: left;
  width: 100%;
  padding-bottom: 1em;
}
#3 {
  float: left;
  clear: left;
  width: 100%;
  padding-bottom: 1em;
}
#4 {
  float: left;
  clear: left;
  width: 100%;
  padding-bottom: 1em;
}
#5 {
  float: left;
  clear: left;
  width: 100%;
  padding-bottom: 1em;
}
input {
  height: 20px;
  width: 300px;
  border: 1px solid rgb(0, 0, 0);
  margin-top: 10px;
  float: auto;
}
#register {
  width: 500px;
  border: 1px solid #000000;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
