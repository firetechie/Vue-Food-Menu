<template>
  <div id="activation">
    <div v-if="isActivated">
      <div>
        <p>Activation Success</p>
        <button type="button" v-on:click="signIn()">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activation",
  data() {
    return {
      isActivated: Boolean,
    };
  },
  methods: {
    signIn() {
      this.$router.replace({ name: "SignIn" });
    },
  },
  mounted() {
    this.isActivated = false;
    let activationCode = this.$route.fullPath.replace("/activate/", "");
    if (activationCode) {
      this.$http
        .post(`${this.$base_url}/activate`, { token: activationCode })
        .then((response) => {
          if (response && response.status == 200) {
            this.isActivated = true;
          }
        })
        .catch((e) => {
          if (e && e.response) {
            this.isActivated = false;
          }
        });
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
