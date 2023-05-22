<template>
    <div class="filter">
        <div class="form-control">
            <input type="text" placeholder="Начните вводить имя" v-model="name">
        </div>
        <div class="form-control">
            <select id="status" v-model="status">
                <option disabled>Выберите статус</option>
                <option value="done">Выполнен</option>
                <option value="cancelled">Отменён</option>
                <option value="active">Актвен</option>
                <option value="pending">Выполняется</option>
                <option value="all">Посмотреть все</option>
            </select>
        </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup (_, { emit }) {
    const name = ref()
    const status = ref()

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1] === 'all' ? null : values[1]
      })
    })
    return {
      name, status
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter {
    display: flex;
    justify-content: flex-start;
    gap: 32px;
  }
  .form-control {
    width: 30%;
    margin: 0;
  }
</style>
