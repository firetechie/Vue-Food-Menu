<template>
  <div id="login">
    <div>
      <h1>Sign In</h1>
      <p v-if="authenticationFailed">
        <strong>{{error}}</strong>
      </p>
      <label>Email : </label>   
      <input type="text" name="email" v-model="input.email" placeholder="Email" required>
      <br />
       <br />
      <label>Password : </label>
        <input type="password" name="password" v-model="input.password" minlength="8" placeholder="Password" required>
      <br />
      <br />
       <br />
        <button type="button" v-on:click="login()">Sign In </button>
       <br />
       <br />
      <button type="button" v-on:click="forgotpassword()">Forgot Password </button> 
    </div>
    <br />
       <br />
   <button type="button" v-on:click="register()">Sign Up </button>
 
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
      error: "",
      authenticationFailed: false
    };
  },
  methods: {
    login() {
      if (this.input.email != "" && this.input.password != "") {
        this.$http
          .post(`${this.$base_url}/login`, this.input)
          .then(response => {
            if (response && response.status == 200) {
              if (response.data) this.persist(response.data);
              this.$router.replace({ name: "Dashboard" });
            }
          })
          .catch(e => {
            // this.errors.push(e);
            if (e && e.response) {
              this.error = e.response.data;
              this.authenticationFailed = true;
            }
          });
        /*
        if (
          this.input.username == this.$parent.mockAccount.username &&
          this.input.password == this.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "secure" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
      */


     
      }
    },
    register() {
      this.$router.replace({ name: "SignUp" });
    },
    persist(data) {
      if (data) {
        localStorage.userId = data.userId;
        localStorage.access_token = data.token;
      }
    },
    forgotpassword() {
      this.$router.replace({ name: "ForgotPassword" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  width: 400px;
  border: 3px solid #000000;
  background-color: #E5E4E2;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
a {
  float: right;
}
#message {
  display:none;
  background: #f1f1f1;
  color: rgb(0, 0, 0);
  position: relative;
  padding: 20px;
  margin-top: 10px;
}

#message p {
  padding: 10px 35px;
  font-size: 18px;
}

/* Add a green text color and a checkmark when the requirements are right */
.valid {
  color: green;
}
input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
}

/* Style the submit button */
input[type=submit] {
  background-color: #4CAF50;
  color: white;
}

/* Style the container for inputs */
.container {
  background-color: #f1f1f1;
  padding: 20px;
}

/* The message box is shown when the user clicks on the password field */
#message {
  display:none;
  background: #f1f1f1;
  color: #000;
  position: relative;
  padding: 20px;
  margin-top: 10px;
}

#message p {
  padding: 10px 35px;
  font-size: 18px;
}

/* Add a green text color and a checkmark when the requirements are right */
.valid {
  color: green;
}

.valid:before {
  position: relative;
  left: -35px;
  content: "&#10004;";
}

/* Add a red text color and an "x" icon when the requirements are wrong */
.invalid {
  color: red;
}

.invalid:before {
  position: relative;
  left: -35px;
  content: "&#10006;";
}

</style>
