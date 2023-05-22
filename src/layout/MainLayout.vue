<template>
    <div class="wrapper">
        <the-nav-bar></the-nav-bar>
        <the-sidebar></the-sidebar>
        <div class="container">
          <app-message></app-message>
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TheNavBar from '../components/TheNavbar.vue'
import AppMessage from '@/components/ui/AppMessage.vue'
import TheSidebar from '@/components/TheSidebar.vue'
export default {
  components: { TheNavBar, AppMessage, TheSidebar }
}
</script>
