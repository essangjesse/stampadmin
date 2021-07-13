<template>
   <div class="page-sidebar">
        <ul class="list-unstyled accordion-menu">
            <li class="sidebar-title">Navigation</li>
            <li>
                <router-link :to="{name: 'Dashboard'}"><home-icon></home-icon>Dashboard</router-link>
            </li>
            <li>
                <router-link :to="{name: 'Broadcast'}"><rss-icon></rss-icon>Broadcasts</router-link>
            </li>
            <li>
                <router-link :to="{name: 'CorpsMembers'}"><user-icon></user-icon>Corps Members</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { HomeIcon, RssIcon, UserIcon } from "vue-feather-icons";

export default {
    components: {
        HomeIcon, RssIcon, UserIcon
    }
}
</script>

<style scoped>
.router-link-exact-active
{
    border-radius: 10px;
    background-color: #f3f6f9;
    color: #269400 !important;
    font-weight: 500;
}

.router-link-exact-active svg {
    color: #269400 !important;
}
</style>