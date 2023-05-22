<template>
    <header class="header">
        <div class="container">
            <nav class="navbar">
                <h3 class="navbar__logo logo">Admin<span>App</span></h3>
                <ul class="navbar__menu menu">
                    <li class="menu__item">
                        <router-link to="/" class="menu__link">Заявки</router-link>
                    </li>
                    <li class="menu__item">
                        <router-link to="/help" class="menu__link">Помощь</router-link>
                    </li>
                    <li class="menu__item">
                        <a href="#" class="menu__link" @click.prevent="openSidebar">Сообщения</a>
                    </li>
                    <li class="menu__item">
                        <a href="#" class="menu__link" @click.prevent="logout">Выход</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup () {
    const router = useRouter()
    const store = useStore()
    const logout = () => {
      store.commit('authModule/logout')
      router.push('/auth')
    }
    const openSidebar = () => {
      store.commit('openSidebar')
    }
    return {
      logout, openSidebar
    }
  }
}
</script>
