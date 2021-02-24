<template>
  <div id="register">
    <h1>Sign Up</h1>
    <p v-if="authenticationFailed">
      <strong>{{ error }}</strong>
    </p>
    <input
      type="text"
      name="email"
      v-model="input.email"
      placeholder="Email"
    /><br /><br />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
    />
    <br />
    <br />
    <button type="button" v-on:click="register()">Sign Up</button>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      error: "",
      authenticationFailed: false,
    };
  },
  methods: {
    register() {
      if (this.input.email != "" && this.input.password != "") {
        this.$http
          .post(`${this.$base_url}/user`, this.input)
          .then((response) => {
            if (response && response.status == 200) {
              this.$router.replace({ name: "SignIn" });
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
#register {
  width: 300px;
  border: 1px solid #000000;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
