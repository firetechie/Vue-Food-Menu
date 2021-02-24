<template>
  <div id="changePassword">
    <p>
      <strong>{{ email }}</strong>
    </p>
    <input
      type="text"
      v-if="!success"
      name="password"
      v-model="password"
      placeholder="password"
    />
    <label v-if="error">Please try again</label>
    <div v-if="success">
      <p>Password changed successfully</p>
      <button type="button" v-on:click="signIn()">Sign In</button>
    </div>
    <button type="button" v-if="!success" v-on:click="changePassword()">
      Change Password
    </button>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      email: String,
      password: String,
      mailSent: Boolean,
      error: Boolean,
      token: String,
      success: Boolean,
    };
  },
  methods: {
    changePassword() {
      if (this.email && this.password) {
        this.$http
          .post(`${this.$base_url}/changePassword`, {
            email: this.email,
            password: this.password,
            token: this.token,
          })
          .then((response) => {
            if (response && response.status == 200) {
              this.success = true;
            }
          })
          .catch((e) => {
            if (e && e.response) {
              this.error = true;
              this.mailSent = false;
            }
          });
      }
    },
    signIn() {
      this.$router.replace({ name: "SignIn" });
    },
  },
  mounted() {
    this.success = false;
    this.email = "";
    this.password = "";
    this.error = false;
    let activationCode = this.$route.fullPath.replace("/changepassword/", "");
    if (activationCode) {
      this.$http
        .post(`${this.$base_url}/validateChangePassword`, {
          token: activationCode,
        })
        .then((response) => {
          if (
            response &&
            response.status == 200 &&
            response.data &&
            response.data.email
          ) {
            this.email = response.data.email;
            this.token = activationCode;
          }
        })
        .catch((e) => {
          if (e && e.response) {
            this.error = true;
          }
        });
    } else {
      this.error = true;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#register {
  width: 500px;
  border: 1px solid #000000;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
