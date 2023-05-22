<template>
    <div class="card">
      <router-link to="/" v-if="back" class="card__back">&#8617; Вернуть ко всем заявкам</router-link>
        <h1 class="card__title">
            {{ title }}
            <slot name="header"></slot>
        </h1>
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean
    }
  }
}
</script>
