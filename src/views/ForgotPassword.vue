<template>
    <div class="login-page">
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-12 col-lg-4">
                    <div class="card login-box-container">
                        <div class="card-body">
                            <div class="authent-logo">
                                <router-link :to="{name: 'Login'}" class="navbar-brand"><h3><shield-icon size="1.5x"></shield-icon><span>STAMP</span></h3></router-link>
                            </div>
                            <div class="authent-text">
                                <p>Forgot your password?</p>
                                <p>Let's help you reset it.</p>
                            </div>
                            <form>
                                <div class="mb-3">
                                    <div class="form-floating">
                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                </div>
                                <div class="d-grid">
                                    <router-link :to="{name: 'Dashboard'}" class="btn btn-primary">Send Reset Link</router-link>
                                </div>
                            </form>
                            <div class="authent-reg">
                                <p>Remember Password? <router-link :to="{name: 'Login'}">Return to login page</router-link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ShieldIcon } from "vue-feather-icons";

export default {
    components: {
        ShieldIcon
    }
}
</script>
