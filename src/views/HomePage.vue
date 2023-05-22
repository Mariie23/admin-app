<template>
  <div v-if="loading" class="loader">Идёт загрузка...</div>
   <app-page v-else title="Заявки">
      <template #header>
        <button class="btn" @click="modal = true">Создать</button>
      </template>
      <request-filter v-model="filterReq"></request-filter>
      <request-table :requests="requests"></request-table>

      <Teleport to="body">
        <app-modal v-if="modal" title="Создать заявку"  @close="modal = false">
            <request-modal-body @create="modal = false"></request-modal-body>
        </app-modal>
      </Teleport>
   </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage.vue'
import RequestTable from '@/components/request/RequestTable.vue'
import RequestModalBody from '@/components/request/RequestModalBody.vue'
import RequestFilter from '@/components/request/RequestFilter.vue'
import AppModal from '@/components/ui/AppModal.vue'

import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
  components: { AppPage, RequestTable, AppModal, RequestModalBody, RequestFilter },
  setup () {
    const store = useStore()
    const loading = ref(false)
    onMounted(async () => {
      loading.value = true
      await store.dispatch('requestModule/load')
      loading.value = false
    })
    const modal = ref(false)
    const filterReq = ref({})
    const requests = computed(() => store.getters['requestModule/requests']
      .filter(request => {
        if (filterReq.value.name) {
          return request.fio.includes(filterReq.value.name)
        }
        return request
      })
      .filter(request => {
        if (filterReq.value.status) {
          return request.status === filterReq.value.status
        }
        return request
      }))
    return {
      modal, requests, loading, filterReq
    }
  }
}
</script>
