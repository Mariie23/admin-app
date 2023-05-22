<template>
    <h3 v-if="requests.length === 0" style="text-align: center;">Заявок пока нет</h3>
    <table v-else class="request-table">
        <thead>
            <tr>
                <td>#</td>
                <td>ФИО</td>
                <td>Телефон</td>
                <td>Сумма</td>
                <td>Статус</td>
                <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, idx) in requests" :key="r.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ r.fio }}</td>
                <td>{{ r.phone }}</td>
                <td>{{ currency(r.sum) }}</td>
                <td>{{ r.status }}</td>
                <td>
                  <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: r.id}}">
                    <button class="btn btn-outline" @click="navigate">Изменить</button>
                  </router-link>
                </td>
            </tr>
          </tbody>
    </table>
</template>

<script>
import { currency } from '@/utils/currency'
export default {
  props: {
    requests: {
      type: Array
    }
  },
  setup () {
    return {
      currency
    }
  }
}
</script>
