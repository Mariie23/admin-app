<template>
    <div v-if="sidebar" class="sidebar">
        <span class="sidebar__close" @click="close">&times;</span>
        <div class="sidebar__content">
            <p>Добро пожаловать в системуу учёта заявок! Будем рады помочь вашему бизнесу.</p>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup () {
    const store = useStore()
    const sidebar = computed(() => store.state.sidebar)
    return {
      sidebar,
      close: () => store.commit('closeSidebar')
    }
  }
}
</script>
