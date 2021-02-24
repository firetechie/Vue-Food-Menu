<template>
  <div id="forgotPassword">
    <p v-if="mailSent">
      <strong
        >Link sent to registered email id if account already exists</strong
      >
    </p>
    <p v-if="error">
      <strong>Failed! Please try again</strong>
    </p>
    <input
      type="text"
      v-if="!mailSent || error"
      name="email"
      v-model="email"
      placeholder="email id"
    />
    <label v-if="mailSent && !error">{{ email }}</label>
    <br />
    <br />
    <button
      type="button"
      v-if="!mailSent && !error"
      v-on:click="changePassword()"
    >
      Change Password
    </button>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: String,
      mailSent: Boolean,
      error: Boolean,
    };
  },
  methods: {
    changePassword() {
      if (this.email) {
        this.$http
          .post(`${this.$base_url}/forgotPassword`, { email: this.email })
          .then((response) => {
            if (response && response.status == 200) {
              this.mailSent = true;
              this.error = false;
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
  },
  mounted() {
    this.email = "";
    this.mailSent = false;
    this.error = false;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#forgotPassword {
  width: 300px;
  border: 1px solid #000000;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
