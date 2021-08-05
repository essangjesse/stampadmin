<template>
    <div class="login-page">
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-12 col-lg-4">
                    <div class="card login-box-container">
                        <form class="card-body">
                            <div class="authent-logo">
                                <router-link :to="{name: 'Login'}" class="navbar-brand"><h3><shield-icon size="1.5x"></shield-icon><span>STAMP</span></h3></router-link>
                            </div>
                            <div class="authent-text">
                                <p>Welcome to STAMP</p>
                                <p>Please sign in to your account.</p>
                            </div>

                            <form @submit.prevent="login">
                                <div v-show="showAuthenticationError" @click="clearErrors()" class="alert alert-danger">
                                    <alert-triangle-icon></alert-triangle-icon> Authentication Error
                                </div>
                                <div class="mb-3">
                                    <div class="form-floating">
                                        <input type="email" @keyup="clearErrors()" v-model="user.email" class="form-control" maxlength="255" id="floatingInput" placeholder="name@example.com" required />
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-floating">
                                        <input type="password" @keyup="clearErrors()" v-model="user.password" class="form-control" maxlength="255" id="floatingPassword" placeholder="Password" required/>
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" v-model="user.remember" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Remember me</label>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary" :class="[{disabled: processing.submit}]">Sign In</button>
                                </div>
                            </form>
                            <div class="authent-reg">
                                <p>Forgot Password? <router-link :to="{name: 'ForgotPassword'}">Click here to reset</router-link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ShieldIcon, AlertTriangleIcon } from "vue-feather-icons";
import { mapActions } from "vuex";

export default {
    components: {
        ShieldIcon,
        AlertTriangleIcon
    },
    data(){
        return {
            user: {
                "email": "",
                "password": "" ,
                "remember": false
            },
            clientPublic: 2,
            clientSecret: "AMpnJrBVuFxvSM7k0V7sYt05S59lPxfOat9g3p0F",
            processing: {
                submit: false
            },
            showAuthenticationError: false,
            isAuthenticated: this.$store.getters.isAuthenticated,
            api_base_url: this.$router.options.api_base
        }
    },
    mounted(){
        this.redirectifAuthenticated();  
    },
    methods: {
         ...mapActions(["SetUser", "SetToken", "SetLogInTime", "SetRemember"]),
         login(){
            this.processing.submit = true;

            fetch(this.api_base_url + "/login", {
                method: "post",
                body: JSON.stringify(this.user),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Client-Public": this.clientPublic,
                    "Client-Secret": this.clientSecret 
                }
            })
            .then(res => res.json())
            .then(res => {
                this.processing.submit = false;
                if(res.status){
                    let token = res.token, user = res.data;
                    this.SetToken(token);
                    this.SetUser(user);
                    this.SetLogInTime();
                    if(this.user.remember)
                        this.SetRemember();
                    this.$router.push({name: "Dashboard"});
                }else{
                    this.showAuthenticationError = true;
                }
            })
            .catch(err => console.log(err));
        },
        redirectifAuthenticated(){
            if(this.isAuthenticated)
                this.$router.push({name: "Dashboard"});
        },
        clearErrors(){
            this.showAuthenticationError = false;
        }
    }
}
</script>

