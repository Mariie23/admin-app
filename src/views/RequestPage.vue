<template>
    <div v-if="loading" class="loader">Идёт загрузка...</div>
    <app-page back v-else-if="request" title="Заявка">
        <div class="request-field">
            <strong>ФИО</strong>
            {{ request.fio }}
        </div>
        <div class="request-field">
            <strong>Телефон</strong>
            {{ request.phone }}
        </div>
        <div class="request-field">
            <strong>Сумма</strong>
            {{ currency(request.sum) }}
        </div>
        <div class="form-control">
            <select id="status" v-model="status">
                <option value="done">Выполнен</option>
                <option value="cancelled">Отменён</option>
                <option value="active">Актвен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>
        <button v-if="hasChanged" class="btn" @click="update">Обновить</button>
        <button class="btn btn-outline" @click="remove">Удалить</button>
    </app-page>
    <div v-else>Заявка не найдена</div>
</template>

<script>
import AppPage from '@/components/ui/AppPage.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
export default {
  components: { AppPage },
  setup () {
    const loading = ref(false)
    const request = ref({})
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const status = ref()
    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('requestModule/loadById', route.params.id)
      status.value = request.value.status
      loading.value = false
    })
    const hasChanged = computed(() => { return request.value.status !== status.value })
    const remove = async () => {
      await store.dispatch('requestModule/remove', route.params.id)
      router.push('/')
    }
    const update = async () => {
      const data = { ...request.value, id: route.params.id, status: status.value }
      await store.dispatch('requestModule/update', data)
      request.value.status = status.value
    }

    return {
      loading, request, currency, status, hasChanged, remove, update
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    margin-right: 16px;
  }
  .form-control {
    margin: 12px 0 24px;
  }
</style>
