<template>
    <form class="auth-form" @submit.prevent="onSubmit">
        <h2 class="auth-form__title">Добро пожаловать!</h2>
        <div :class="['form-control', {invalid: eError}]">
          <input class="auth-form__input" type="email" placeholder="Email" v-model="email" @blur="eBlur">
          <small v-if="eError">{{ eError }}</small>
        </div>
        <div :class="['form-control', {invalid: pError}]">
          <input class="auth-form__input" type="password" placeholder="Пароль" v-model="password" @blur="pBlur">
          <small v-if="pError">{{ pError }}</small>
        </div>
        <button class="btn primary" :disabled="isSubmitting">Войти</button>
    </form>
</template>

<script>
import useLoginForm from '../use/login-form.js'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { error } from '../utils/error'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()

    const message = route.query.message
    if (message) store.dispatch('setMessage', error(message))
    return { ...useLoginForm() }
  }
}
</script>

<style lang="scss" scoped>
.auth-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
  .form-control {
    width: 50%;
  }
  .auth-form__title {
    margin-bottom: 1rem;
  }
  .auth-form__input {
    margin-bottom: 8px;
    padding: 8px;
    display: block;
    border: none;
    border-bottom: 2px solid rgb(174, 174, 174);
    font-family: inherit;
    font-size: 1rem;
    &:focus {
      outline: none;
      border-bottom: 2px solid rgba(0, 0, 0, 0.6);
    }
    .invalid & {
      border: 1px solid rgb(179 0 0);
    }
  }
  .auth-form__title {
    color: rgb(179 0 0);
    text-align: center;
    font-size: 2.25rem;
    font-weight: 500;
  }
</style>
