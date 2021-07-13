<template>
  <div class="page-header">
        <nav class="navbar navbar-expand-lg d-flex justify-content-between">
            <div class="" id="navbarNav">
                <ul class="navbar-nav" id="leftNav">
                    <li class="nav-item">
                        <a class="nav-link" @click="toggleSidebar()" id="sidebar-toggle" href="javascript:void(0)"><menu-icon></menu-icon></a>
                    </li>
                </ul>
            </div>
            <div><router-link :to="{name: 'Dashboard'}" class="navbar-brand"><h3><shield-icon size="1.5x"></shield-icon><span>STAMP</span></h3></router-link></div>
            <div class="" id="headerNav">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <span id="profileDropDown" data-bs-toggle="dropdown" aria-expanded="false">Welcome Officer {{user.first_name}}</span>
                        <div class="dropdown-menu dropdown-menu-end profile-drop-menu" aria-labelledby="profileDropDown">
                            <a class="dropdown-item" href="/logout" @click.prevent="logout"><log-out-icon></log-out-icon>Log Out</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import { LogOutIcon, MenuIcon, ShieldIcon } from "vue-feather-icons";
import { mapActions } from "vuex";

export default {
    components: {
        LogOutIcon, MenuIcon, ShieldIcon
    },

    data(){
        return {
            token: this.$store.getters.accessToken,
            api_base_url: this.$router.options.api_base,
            user: this.$store.getters.user
        }
    },
    methods: {
        ...mapActions(['LogOut']),

        logout(){
            fetch(this.api_base_url + "/logout", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.status){
                    this.LogOut();
                    this.$router.push({name: "Login"});
                }
            })
            .catch(err => console.log(err))
        },

        toggleSidebar(){
            let elem = document.getElementsByTagName("BODY")[0];

            let class_name = "sidebar-hidden";

            if(!this.hasClass(elem, class_name)){
                elem.classList.add(class_name);
            }else{
                elem.classList.remove(class_name);
            }
        },

        hasClass(elem,class_name) {
            return elem.className.match(new RegExp('(\\s|^)'+class_name+'(\\s|$)'));
        }
    }
}
</script>


<style scoped>
#profileDropDown 
{
    cursor: pointer;
}

.navbar-brand span {
    position: absolute;
    margin-top: 5px;
}
</style>
