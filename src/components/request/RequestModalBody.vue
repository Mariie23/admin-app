<template>
    <form class="modal__body" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="fio">ФИО</label>
            <input :class="{invalid: fioError}" type="text" id="fio" v-model="fio" @blur="fioBlur">
            <small v-if="fioError">{{ fioError }}</small>
        </div>
        <div class="form-control">
            <label for="phone">Телефон</label>
            <input :class="{invalid: pError}" type="tel" id="phone" v-model="phone" @blur="pBlur">
            <small v-if="pError">{{ pError }}</small>
        </div>
        <div class="form-control">
            <label for="sum">Сумма</label>
            <input :class="{invalid: sumError}" type="number" id="sum" v-model="sum" @blur="sumBlur">
            <small v-if="sumError">{{ sumError }}</small>
        </div>
        <div class="form-control">
            <label for="status">Статус</label>
            <select id="status" v-model="status">
                <option value="done">Выполнен</option>
                <option value="cancelled">Отменён</option>
                <option value="active">Актвен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>
        <button class="btn">Создать</button>
    </form>
</template>

<script>
import { useModalForm } from '../../use/modal-form'
import { useStore } from 'vuex'
export default {
  emits: ['create'],
  setup (_, { emit }) {
    const store = useStore()
    const submit = async values => {
      await store.dispatch('requestModule/createRequest', values)
      emit('create')
    }
    return { ...useModalForm(submit) }
  }
}
</script>

<style scoped>
  .btn {
    margin-top: 12px;
  }
</style>
