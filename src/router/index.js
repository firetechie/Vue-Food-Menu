import Vue from 'vue'
import Router from 'vue-router'
import SignUp from "../components/SignUp.vue"
import SignIn from "../components/SignIn.vue"
import Dashboard from "../components/Dashboard.vue"
import Register from "../components/Register.vue"
import Menu from "../components/Menu.vue"
import QrCode from "../components/QrCode.vue"
import Activation from "../components/Activation.vue"
import ForgotPassword from "../components/ForgotPassword.vue"
import ChangePassword from "../components/ChangePassword.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/menu/:id',
            name: 'Menu',
            component: Menu
        },
        {
            path: '/qrcode/:id',
            name: 'QrCode',
            component: QrCode
        },
        {
            path: '/activate/:id',
            name: 'activation',
            component: Activation
        },
        {
            path: '/forgotpassword',
            name: 'ForgotPassword',
            component: ForgotPassword
        },
        {
            path: '/changepassword/:id',
            name: 'ChangePassword',
            component: ChangePassword
        }
    ]
})