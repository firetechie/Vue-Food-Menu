<template>
  <div id="register">
    <p v-if="authenticationFailed">
      <strong>{{ error }}</strong>
    </p>

    <button type="button" v-on:click="addCategory()">Add New Category</button>
    <ul style="list-style-type: none" id="hotel-list">
      <li v-for="item in menu" :key="item.key">
        <div>
          <p>
            <input
              style="margin: 5px"
              type="text"
              name="category"
              v-model="item.category"
              placeholder="Category"
            />
            <button type="button" v-on:click="addMenu(item)">Add Menu</button>
          </p>
          <ul style="list-style-type: none" id="menu-list">
            <li v-for="menuItem in item.items" :key="menuItem.key">
              <div>
                <input
                  type="text"
                  name="name"
                  v-model="menuItem.name"
                  placeholder="Name"
                /><br />
                <input
                  type="text"
                  name="code"
                  v-model="menuItem.code"
                  placeholder="Code"
                /><br />
                <input
                  type="text"
                  name="price"
                  v-model="menuItem.price"
                  placeholder="Price"
                /><br /><br />
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div>
      <button style="margin: 5px" type="button" v-on:click="save()">
        Save
      </button>
      <button type="button" v-on:click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      hotel: {},
      menu: [],
      menuId: "",
      hotelId: "",
      error: "",
      authenticationFailed: false,
    };
  },
  methods: {
    addCategory() {
      this.menu.push({
        category: "",
        items: [
          {
            name: "",
            code: "",
            price: 0,
          },
        ],
      });
    },
    addMenu(category) {
      if (category && category.items) {
        category.items.push({
          name: "",
          code: "",
          price: 0,
        });
      }
    },
    save() {
      if (this.hotelId && this.menu && this.menu.length > 0) {
        this.$http
          .post(`${this.$base_url}/hotel/${this.hotelId}/menu`, this.menu)
          .then((response) => {
            if (response && response.status == 200 && response.data) {
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
    cancel() {
      this.$router.replace({ name: "Dashboard" });
    },
  },
  mounted() {
    this.hotelId = this.$route.params.id;
    if (this.hotelId) {
      this.$http
        .get(`${this.$base_url}/hotel/${this.hotelId}/menu`)
        .then((response) => {
          if (
            response &&
            response.status == 200 &&
            !(response.data instanceof String)
          ) {
            this.menuId = response.data._id;
            if (response.data.menu && response.data.menu.length > 0) {
              response.data.menu.forEach((element) => {
                let menuCategory = {
                  category: "",
                  items: [],
                };

                menuCategory.category = element.category;

                element.items.forEach((item) => {
                  let itemObj = {
                    name: item.name,
                    code: item.code,
                    price: item.price.$numberDecimal,
                  };

                  menuCategory.items.push(itemObj);
                });

                this.menu.push(menuCategory);
              });
            }
          }
        })
        .catch((e) => {
          if (e && e.response) {
            // this.error = e.response.data;
            // this.authenticationFailed = true;
          }
        })
        .then(() => {
          if (this.menu && this.menu.length < 1) {
            this.menu.push({
              category: "",
              items: [
                {
                  name: "",
                  code: "",
                  price: 0,
                },
              ],
            });
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
