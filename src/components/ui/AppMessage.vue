<template>
    <div v-if="message" class="alert">
        <h3 class="alert__title">Ошибка</h3>
        <div class="alert__text">{{ message }}</div>
        <span class="alert__close" @click="close">&times;</span>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup () {
    const store = useStore()
    const message = computed(() => store.state.message)
    return {
      message,
      close: () => { store.commit('clearMessage') }
    }
  }
}
</script>
