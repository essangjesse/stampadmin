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
                                <p>Reset your password</p>
                            </div>
                            <form>
                                <div class="mb-3">
                                    <div class="form-floating">
                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="floatingPasswordConfirmation" placeholder="Confirm Password" />
                                        <label for="floatingPasswordConfirmation">Confirm Password</label>
                                    </div>
                                </div>
                                <div class="d-grid">
                                    <router-link :to="{name: 'Dashboard'}" class="btn btn-primary">Reset Password</router-link>
                                </div>
                            </form>
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
